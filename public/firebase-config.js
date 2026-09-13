// Firebase config — REPLACE with your own Firebase project credentials.
// Go to https://console.firebase.google.com → create project →
// Enable Realtime Database → copy the config from Project Settings.
//
// This is the ONLY server needed — Firebase handles matchmaking + signaling.
// Free tier: 1GB storage, 10GB/month transfer — more than enough for P2P matchmaking.

window.FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
