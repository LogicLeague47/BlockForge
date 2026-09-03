import { resolveCgUsername } from './multiplayer.js';
import { getUserSetting, setUserSetting } from './storage.js';
import { filterProfanity } from './profanity.js';
import { setSkinUser } from './skins.js';
import { cgGameplayStart, cgHappyTime } from './cg-helper.js';

// ===== CrazyGames Account Linking System =====
// Handles linking Google, GitHub, and game accounts to CrazyGames users
// Follows CrazyGames integration rules: no external login buttons,
// automatic registration, and seamless account syncing

export class AccountLinker {
  constructor() {
    this.userData = null;
    this.cgSdkPromise = this._getCrazyGamesSDK();
  }

  // Get CrazyGames SDK with proper polling for readiness
  async _getCrazyGamesSDK() {
    if (window.CrazyGames && window.CrazyGames.SDK) {
      return window.CrazyGames.SDK;
    }

    return new Promise((resolve) => {
      let tries = 0;
      const id = setInterval(() => {
        if (window.CrazyGames && window.CrazyGames.SDK) {
          clearInterval(id);
          resolve(window.CrazyGames.SDK);
        } else if (++tries > 100) {
          clearInterval(id);
          resolve(null);
        }
      }, 50);
    });
  }

  // Get CrazyGames SDK instance
  async getSDK() {
    const sdk = await this.cgSdkPromise;
    if (!sdk) {
      console.warn('CrazyGames SDK not available');
      return null;
    }
    return sdk;
  }

  // Is the CG account system usable here? (False on embeds — gate everything.)
  async cgAvailable() {
    try {
      const sdk = await this.getSDK();
      const u = sdk && sdk.user;
      if (!u) return false;
      const v = u.isUserAccountAvailable;
      return typeof v === 'function' ? !!v() : !!v;
    } catch (_) {
      return false;
    }
  }

  // v3 getUser (async). Normalized to { id, username, avatar } where id is
  // the display-only __dangerousUserId — NEVER used for authentication
  // (ToS: auth decisions require a server-verified getUserToken() JWT).
  async cgGetUser() {
    try {
      const sdk = await this.getSDK();
      const u = sdk && sdk.user;
      if (!u || typeof u.getUser !== 'function') return null;
      const me = await u.getUser();
      if (!me) return null;
      return {
        id: me.__dangerousUserId || me.userId || null,
        username: me.username || null,
        avatar: me.profilePictureUrl || me.avatar || null,
      };
    } catch (_) {
      return null;
    }
  }

  // Raw JWT for server-side auth (verified by our backend, never decoded here).
  async cgGetUserToken() {
    try {
      const sdk = await this.getSDK();
      const u = sdk && sdk.user;
      if (!u || typeof u.getUserToken !== 'function') return null;
      return await u.getUserToken();
    } catch (_) {
      return null;
    }
  }

  // Standard CG account-link modal (ToS: use this, never build your own).
  // Resolves { ok, answer: 'yes'|'no'|null, code? }.
  async requestAccountLink() {
    try {
      const sdk = await this.getSDK();
      const u = sdk && sdk.user;
      if (!u || typeof u.showAccountLinkPrompt !== 'function') {
        return { ok: false, answer: null, code: 'unavailable' };
      }
      const res = await u.showAccountLinkPrompt();
      const answer = res && res.response;
      return { ok: answer === 'yes', answer: answer || null };
    } catch (e) {
      return { ok: false, answer: null, code: (e && e.code) || 'unknown' };
    }
  }

  // ToS launch flow: availability gate → logged-in users auto-register/login
  // via the backend (verified token); logged-out users play as guests with NO
  // auto-created DB account and NO auth modal (both forbidden).
  async initCrazyGamesUser(playerName, password) {
    try {
      if (!(await this.cgAvailable())) {
        return this._initLocalUser(playerName, password);
      }
      const cgUser = await this.cgGetUser();
      if (cgUser && cgUser.username) {
        console.log('Returning CrazyGames user:', cgUser.username);
        return await this._syncExistingAccount(cgUser, playerName);
      }
      // Logged-out visitor: guest session, no popups, no DB account.
      console.log('CrazyGames guest — continuing without an account');
      return {
        success: true,
        username: playerName,
        userId: null,
        isGuest: true,
        created: false,
        linked: false,
      };
    } catch (error) {
      console.error('Error initializing CrazyGames user:', error);
      return this._initLocalUser(playerName, password);
    }
  }

  // Sync existing account with game database
  async _syncExistingAccount(cgUser, playerName) {
    const sdk = await this.getSDK();
    const cgId = cgUser.id;

    try {
      // Use the unique CrazyGames user account ID to fetch game progress
      const cgUsername = cgUser.username || `cg_${cgId}`;
      const cgAvatar = cgUser.avatar || null;

      // Filter profanity from CrazyGames username
      const filteredName = filterProfanity(cgUsername);

      // Set player name and skin
      window.playerName = filteredName;
      if (cgAvatar) {
        setSkinUser(filteredName, cgAvatar);
      }

      // Store the CrazyGames ID for account linking
      localStorage.setItem('bf_cg_user_id', cgId);
      localStorage.setItem('bf_cg_username', filteredName);

      // Fetch saved progress from our database using CrazyGames ID as key
      const gameProgress = await this._fetchGameProgress(cgId);

      // Save user info
      localStorage.setItem('bf_player_name', filteredName);

      // If this is the first login, create the account
      if (!gameProgress.exists) {
        await this._createGameAccount(cgId, filteredName);
      }

      // Trigger CG gameplay start for CrazyGames builds
      if (window.location.hostname.includes('crazygames.com')) {
        cgGameplayStart();
      }

      return {
        success: true,
        username: filteredName,
        userId: cgId,
        isGuest: false,
        progress: gameProgress.data,
        avatar: cgAvatar,
        linked: true
      };
    } catch (error) {
      console.error('Error syncing existing account:', error);
      return {
        success: false,
        error: error.message || 'Failed to sync existing account'
      };
    }
  }

  // Create a linked account for new CrazyGames user
  async _createLinkedAccount(cgUser, playerName, password) {
    const cgId = cgUser.id;

    try {
      // Use registered CrazyGames username as our username
      const cgUsername = cgUser.username || `cg_${cgId}`;
      const filteredName = filterProfanity(cgUsername);

      // Create the game account with a hashed password
      const accountData = {
        userId: cgId,
        username: filteredName,
        passwordHash: this._hashPassword(password),
        salt: this._generateSalt(),
        role: 'player',
        createdAt: Date.now(),
        cgLinked: true
      };

      // Save to our database using CrazyGames ID as the key
      await this._saveGameProgress(cgId, accountData, null);

      // Store CrazyGames-specific data
      localStorage.setItem('bf_player_name', filteredName);
      localStorage.setItem('bf_cg_user_id', cgId);
      localStorage.setItem('bf_cg_username', filteredName);

      // Set skin from CrazyGames avatar if available
      if (cgUser.avatar) {
        setSkinUser(filteredName, cgUser.avatar);
      }

      return {
        success: true,
        username: filteredName,
        userId: cgId,
        isGuest: false,
        created: true,
        linked: true
      };
    } catch (error) {
      console.error('Error creating linked account:', error);
      return {
        success: false,
        error: error.message || 'Failed to create linked account'
      };
    }
  }

  // Create a guest account for users not logged into CrazyGames
  async _createGuestAccount(playerName, password) {
    try {
      const guestId = 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

      const accountData = {
        userId: guestId,
        username: playerName,
        passwordHash: this._hashPassword(password),
        salt: this._generateSalt(),
        role: 'player',
        createdAt: Date.now(),
        cgLinked: false,
        isGuest: true
      };

      // Save to our database
      await this._saveGameProgress(guestId, accountData, null);

      // Store guest-specific data
      localStorage.setItem('bf_player_name', playerName);

      return {
        success: true,
        username: playerName,
        userId: guestId,
        isGuest: true,
        created: true,
        linked: false
      };
    } catch (error) {
      console.error('Error creating guest account:', error);
      return {
        success: false,
        error: error.message || 'Failed to create guest account'
      };
    }
  }

  // Create a new game account (for local game accounts)
  async _createGameAccount(userId, username) {
    const accountData = {
      userId,
      username,
      role: 'player',
      createdAt: Date.now(),
      cgLinked: localStorage.getItem('bf_cg_user_id') !== null
    };

    // If password exists, hash it
    const savedPass = localStorage.getItem('bf_login_pass');
    if (savedPass) {
      const password = this._xorDecode(savedPass);
      accountData.passwordHash = this._hashPassword(password);
      accountData.salt = this._generateSalt();
    }

    await this._saveGameProgress(userId, accountData, null);
  }

  // Fetch game progress from our custom database using CrazyGames ID
  async _fetchGameProgress(cgId) {
    try {
      const sdk = await this.getSDK();
      const key = `bf_progress_${cgId}`;

      if (sdk && sdk.data) {
        const data = await sdk.data.getItem(key);
        if (data) {
          return { exists: true, data: JSON.parse(data) };
        }
      }

      // Fallback to localStorage
      const localData = localStorage.getItem(key);
      if (localData) {
        return { exists: true, data: JSON.parse(localData) };
      }

      return { exists: false, data: null };
    } catch (error) {
      console.error('Error fetching game progress:', error);
      return { exists: false, data: null };
    }
  }

  // Save game progress to our custom database
  async _saveGameProgress(cgId, accountData, existingProgress) {
    try {
      const sdk = await this.getSDK();
      const key = `bf_progress_${cgId}`;

      if (sdk && sdk.data) {
        // Combine account data with existing progress
        const progressData = {
          ...existingProgress,
          account: accountData,
          lastUpdated: Date.now()
        };
        await sdk.data.setItem(key, JSON.stringify(progressData));
      }

      // Always save to localStorage as backup
      const localProgressData = {
        ...existingProgress,
        account: accountData,
        lastUpdated: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(localProgressData));
    } catch (error) {
      console.error('Error saving game progress:', error);
      throw error;
    }
  }

  // Account linking - link external accounts (Google, GitHub) to CrazyGames
  async linkExternalAccount(provider, externalId, externalUsername, externalAvatar = null) {
    try {
      const sdk = await this.getSDK();
      if (!sdk) {
        throw new Error('CrazyGames SDK not available');
      }

      const userModule = sdk.user;
      if (!userModule || typeof userModule.getUser !== 'function') {
        throw new Error('No CrazyGames user logged in');
      }
      const me = await userModule.getUser();
      const cgId = me && (me.__dangerousUserId || me.userId);
      if (!cgId) {
        throw new Error('No CrazyGames user logged in');
      }

      // Store external account linkage
      const linkData = {
        provider,
        externalId,
        externalUsername,
        externalAvatar,
        linkedAt: Date.now(),
        cgId
      };

      // Save to our database
      const key = `bf_linked_${cgId}`;

      if (sdk && sdk.data) {
        await sdk.data.setItem(key, JSON.stringify(linkData));
      }

      localStorage.setItem(key, JSON.stringify(linkData));

      // Update the user's linked accounts list
      const linkedAccounts = await this.getLinkedAccounts();
      linkedAccounts[provider] = linkData;

      localStorage.setItem(`bf_linked_${cgId}`, JSON.stringify(linkedAccounts));

      return {
        success: true,
        provider,
        cgId,
        linked: true
      };
    } catch (error) {
      console.error(`Error linking ${provider} account:`, error);
      return {
        success: false,
        error: error.message || `Failed to link ${provider} account`
      };
    }
  }

  // Get all linked external accounts for the current CrazyGames user
  async getLinkedAccounts() {
    try {
      const cgId = localStorage.getItem('bf_cg_user_id');
      if (!cgId) {
        return {};
      }

      const sdk = await this.getSDK();
      const key = `bf_linked_${cgId}`;

      if (sdk && sdk.data) {
        const data = await sdk.data.getItem(key);
        if (data) {
          return JSON.parse(data);
        }
      }

      const localData = localStorage.getItem(key);
      return localData ? JSON.parse(localData) : {};
    } catch (error) {
      console.error('Error getting linked accounts:', error);
      return {};
    }
  }

  // Create a new game account to link to CrazyGames
  async createGameAccountForLinking(username, password, displayName = null) {
    try {
      // Check if this username already exists
      const exists = await this._checkUsernameExists(username);
      if (exists) {
        throw new Error('Username already taken');
      }

      const gameId = 'game_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

      const accountData = {
        userId: gameId,
        username,
        passwordHash: this._hashPassword(password),
        salt: this._generateSalt(),
        role: 'player',
        createdAt: Date.now(),
        cgLinked: false,
        needsCgLinking: true,
        displayName: displayName || username
      };

      // Save to our database
      await this._saveGameProgress(gameId, accountData, null);

      return {
        success: true,
        gameId,
        username,
        message: 'Game account created. You can now link it to your CrazyGames account.'
      };
    } catch (error) {
      console.error('Error creating game account:', error);
      return {
        success: false,
        error: error.message || 'Failed to create game account'
      };
    }
  }

  // Complete the linking of a game account to CrazyGames.
  // ToS: consent goes through CG's standard account-link modal, never a
  // custom prompt. Aborts unless the player answers "yes".
  async completeGameAccountLinking(gameAccountId, cgId) {
    try {
      const sdk = await this.getSDK();
      if (!sdk) {
        throw new Error('CrazyGames SDK not available');
      }
      const consent = await this.requestAccountLink();
      if (!consent.ok) {
        return {
          success: false,
          error: consent.code === 'userNotAuthenticated'
            ? 'Log in to CrazyGames first.'
            : 'Linking cancelled.',
          code: consent.code,
        };
      }

      // Fetch the game account data
      const gameProgress = await this._fetchGameProgress(gameAccountId);
      if (!gameProgress.exists) {
        throw new Error('Game account not found');
      }

      const gameAccount = gameProgress.data.account;

      // Update the account to mark it as linked to CrazyGames
      gameAccount.cgLinked = true;
      gameAccount.cgId = cgId;
      gameAccount.linkedAt = Date.now();

      // Transfer existing game progress if any
      const existingProgress = gameProgress.data.progress || {};

      // Save the linked account with merged data
      await this._saveGameProgress(cgId, gameAccount, existingProgress);

      // Update the game account to mark linking complete
      const updatedGameAccount = { ...gameAccount, cgLinked: true, cgId };
      await this._saveGameProgress(gameAccountId, updatedGameAccount, existingProgress);

      return {
        success: true,
        gameId: gameAccountId,
        cgId,
        username: gameAccount.username,
        message: 'Game account successfully linked to CrazyGames!'
      };
    } catch (error) {
      console.error('Error completing game account linking:', error);
      return {
        success: false,
        error: error.message || 'Failed to complete game account linking'
      };
    }
  }

  // Initialize a local user (when CrazyGames SDK is not available)
  _initLocalUser(playerName, password) {
    const userId = 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    const accountData = {
      userId,
      username: playerName,
      passwordHash: this._hashPassword(password),
      salt: this._generateSalt(),
      role: 'player',
      createdAt: Date.now(),
      cgLinked: false,
      isLocal: true
    };

    localStorage.setItem('bf_player_name', playerName);

    return {
      success: true,
      username: playerName,
      userId,
      isGuest: !playerName.startsWith('Guest'),
      created: true,
      linked: false,
      isLocal: true
    };
  }

  // Helper functions for password hashing and salt generation
  _generateSalt() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  _hashPassword(password, salt = null) {
    if (!salt) {
      salt = this._generateSalt();
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);

    return new Promise(resolve => {
      crypto.subtle.digest('SHA-256', data).then(hash => {
        const hashArray = Array.from(new Uint8Array(hash));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        resolve(salt + ':' + hashHex);
      });
    });
  }

  // Check if a username already exists
  async _checkUsernameExists(username) {
    // Check localStorage for existing usernames
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('bf_progress_')) {
        try {
          const data = localStorage.getItem(key);
          if (data) {
            const progress = JSON.parse(data);
            if (progress.account && progress.account.username === username) {
              return true;
            }
          }
        } catch (_) {}
      }
    }
    return false;
  }

  // XOR encode/decode for password obfuscation (existing function from main.js)
  _xorDecode(str) {
    let out = '';
    for (let i = 0; i < str.length; i++) out += String.fromCharCode(str.charCodeAt(i) ^ 0x5A);
    return out;
  }

  _xorEncode(str) {
    let out = '';
    for (let i = 0; i < str.length; i++) out += String.fromCharCode(str.charCodeAt(i) ^ 0x5A);
    return out;
  }
}

