// Lightweight analytics — tracks daily/monthly active users and servers created.
// Data stored in localStorage, no external services.

const STORAGE_KEY = 'bf_analytics';
const SERVER_COUNT_KEY = 'bf_analytics_servers';
const MAX_DAYS = 90;

function _load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function _save(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function _today() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function _thisMonth() {
  return new Date().toISOString().slice(0, 7); // YYYY-MM
}

function _prune(data) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - MAX_DAYS);
  const cutoffStr = cutoff.toISOString().slice(0, 10);
  for (const key of Object.keys(data)) {
    if (key.length === 10 && key < cutoffStr) delete data[key];
  }
}

// Call on every game start. Generates a unique ID per CrazyGames account
// (or random local ID for non-CG users) and records today's date.
export function trackLogin() {
  const data = _load();
  let uid = null;
  try {
    uid = window.CrazyGames?.SDK?.user?.getUsername?.() || null;
  } catch {}
  if (!uid) {
    try { uid = localStorage.getItem('bf_analytics_uid'); } catch {}
    if (!uid) {
      uid = 'local_' + Math.random().toString(36).slice(2, 10);
      try { localStorage.setItem('bf_analytics_uid', uid); } catch {}
    }
  }
  const today = _today();
  if (!data[today]) data[today] = [];
  if (!data[today].includes(uid)) data[today].push(uid);
  _prune(data);
  _save(data);
}

// Call each time a server is created.
export function trackServerCreated() {
  try {
    const n = parseInt(localStorage.getItem(SERVER_COUNT_KEY) || '0', 10) + 1;
    localStorage.setItem(SERVER_COUNT_KEY, String(n));
  } catch {}
}

// Returns [{date, count}] for the last N days (default 7).
export function getDailyUsers(days = 7) {
  const data = _load();
  const result = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    result.push({ date: key, count: (data[key] || []).length });
  }
  return result;
}

// Returns [{month, count}] for the last N months (default 3).
export function getMonthlyUsers(months = 3) {
  const data = _load();
  const monthMap = {};
  for (const [dateKey, uids] of Object.entries(data)) {
    const m = dateKey.slice(0, 7); // YYYY-MM
    if (!monthMap[m]) monthMap[m] = new Set();
    for (const uid of uids) monthMap[m].add(uid);
  }
  const result = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toISOString().slice(0, 7);
    result.push({ month: key, count: (monthMap[key] || new Set()).size });
  }
  return result;
}

// Returns total servers ever created.
export function getTotalServersCreated() {
  try { return parseInt(localStorage.getItem(SERVER_COUNT_KEY) || '0', 10); } catch { return 0; }
}

// Returns today's unique user count.
export function getTodayUsers() {
  const data = _load();
  return (data[_today()] || []).length;
}

// Returns this month's unique user count.
export function getThisMonthUsers() {
  const data = _load();
  const month = _thisMonth();
  const set = new Set();
  for (const [dateKey, uids] of Object.entries(data)) {
    if (dateKey.startsWith(month)) {
      for (const uid of uids) set.add(uid);
    }
  }
  return set.size;
}
