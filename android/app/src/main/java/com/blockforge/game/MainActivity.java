package com.blockforge.game;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // Local updater plugin (download + install APK from inside the app).
    registerPlugin(BFUpdatePlugin.class);
  }
}
