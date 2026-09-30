package com.blockforge.game;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;

// In-app updater: downloads an APK with the system DownloadManager (works
// inside the WebView where <a download>/navigation can't) and fires the
// package installer when it completes. Called from src/appupdate.js.
@CapacitorPlugin(name = "BFUpdate")
public class BFUpdatePlugin extends Plugin {
  private long lastDownloadId = -1;
  private String lastFileName = "BlockForge-android.apk";
  private BroadcastReceiver receiver = null;

  @PluginMethod
  public void downloadAndInstall(PluginCall call) {
    String url = call.getString("url");
    String fileName = call.getString("fileName", "BlockForge-android.apk");
    if (url == null || url.isEmpty()) { call.reject("Missing url"); return; }
    try {
      Context ctx = getContext();
      lastFileName = fileName;
      DownloadManager dm = (DownloadManager) ctx.getSystemService(Context.DOWNLOAD_SERVICE);
      if (dm == null) { call.reject("No download service"); return; }
      try {
        File stale = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), fileName);
        if (stale.exists()) stale.delete();
      } catch (Exception ignored) {}
      DownloadManager.Request req = new DownloadManager.Request(Uri.parse(url));
      req.setTitle("BlockForge update");
      req.setDescription("Downloading new version…");
      req.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
      req.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName);
      req.setMimeType("application/vnd.android.package-archive");
      lastDownloadId = dm.enqueue(req);

      if (receiver != null) {
        try { ctx.unregisterReceiver(receiver); } catch (Exception ignored) {}
        receiver = null;
      }
      receiver = new BroadcastReceiver() {
        @Override public void onReceive(Context c, Intent intent) {
          long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
          if (id != lastDownloadId) return;
          DownloadManager.Query q = new DownloadManager.Query().setFilterById(id);
          try (Cursor cur = dm.query(q)) {
            if (cur != null && cur.moveToFirst()) {
              int status = cur.getInt(cur.getColumnIndexOrThrow(DownloadManager.COLUMN_STATUS));
              if (status == DownloadManager.STATUS_SUCCESSFUL) promptInstall(c);
            }
          } catch (Exception ignored) {}
        }
      };
      IntentFilter filter = new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE);
      if (Build.VERSION.SDK_INT >= 33) {
        ctx.registerReceiver(receiver, filter, Context.RECEIVER_NOT_EXPORTED);
      } else {
        ctx.registerReceiver(receiver, filter);
      }
      JSObject ret = new JSObject();
      ret.put("started", true);
      call.resolve(ret);
    } catch (Exception e) {
      call.reject("Download failed: " + e.getMessage());
    }
  }

  private void promptInstall(Context ctx) {
    try {
      File apk = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), lastFileName);
      Uri uri;
      if (Build.VERSION.SDK_INT >= 24) {
        uri = FileProvider.getUriForFile(ctx, ctx.getPackageName() + ".fileprovider", apk);
      } else {
        uri = Uri.fromFile(apk);
      }
      Intent intent = new Intent(Intent.ACTION_VIEW);
      intent.setDataAndType(uri, "application/vnd.android.package-archive");
      intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
      ctx.startActivity(intent);
    } catch (Exception ignored) {}
  }
}
