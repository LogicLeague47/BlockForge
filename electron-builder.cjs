const hasMacCreds = Boolean(process.env.CSC_LINK && process.env.APPLE_API_KEY);

module.exports = {
  appId: "com.blockforge.game",
  productName: "BlockForge",
  directories: {
    output: "release",
  },
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
    target: ["dmg"],
    artifactName: "BlockForge-mac-${arch}.dmg",
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: "build/entitlements.mac.plist",
    entitlementsInherit: "build/entitlements.mac.plist",
    notarize: hasMacCreds,
  },
  linux: {
    target: ["AppImage"],
    artifactName: "BlockForge-linux.${ext}",
  },
};
