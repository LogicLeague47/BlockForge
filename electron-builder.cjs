const hasMacCreds = Boolean(process.env.CSC_LINK && process.env.APPLE_API_KEY);
// Ad-hoc-signed apps get flagged as "malware" on macOS 15+.
// Build unsigned when no real Developer ID cert is available, so the app
// launches normally (right-click → Open bypasses Gatekeeper if prompted).
const macIdentity = process.env.CSC_LINK ? undefined : null;

module.exports = {
  appId: "com.blockforge.game",
  productName: "BlockForge",
  directories: {
    output: "release",
  },
  publish: [
    {
      provider: "github",
      owner: "LogicLeague47",
      repo: "BlockForge",
    },
  ],
  files: [
    "dist/**/*",
    "electron/**/*",
    "!dist/downloads/**",
  ],
  win: {
    target: ["portable"],
    artifactName: "BlockForge-windows.exe",
  },
  mac: {
    category: "public.app-category.games",
    icon: "build/icon.png",
    target: ["dmg", "zip"],
    artifactName: "BlockForge-mac-${arch}.dmg",
    // hardenedRuntime MUST be off when there's no real Developer ID cert.
    // A hardened-runtime claim with only a linker signature makes Gatekeeper on
    // macOS 15+ show the "cannot verify whether this app contains malware"
    // screen. Plain ad-hoc apps run fine with right-click → Open.
    hardenedRuntime: false,
    gatekeeperAssess: false,
    identity: macIdentity,
    entitlements: "build/entitlements.mac.plist",
    entitlementsInherit: "build/entitlements.mac.plist",
    notarize: hasMacCreds,
  },
  linux: {
    target: ["AppImage"],
    artifactName: "BlockForge-linux.${ext}",
  },
};
