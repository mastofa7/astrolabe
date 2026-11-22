package com.mostafa.astrolabe;
import android.app.Activity;
import android.app.ProgressDialog;
import android.app.AlertDialog;
import android.os.Build;
import android.provider.Settings;
import androidx.core.content.FileProvider;
import java.io.*;
import java.net.*;
import java.security.MessageDigest;
import org.json.*;
import android.os.Bundle;
import android.os.Handler;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.GeolocationPermissions;
import android.content.Intent;
import android.net.Uri;
import android.content.pm.PackageManager;
import java.util.Locale;

public class MainActivity extends Activity implements SensorEventListener {
  private WebView web;
  private File pendingApk;
  private boolean downloading = false;
  private static final String APK_URL = "https://github.com/mastofa7/astrolabe/releases/latest/download/astrolab.apk";
  private boolean handleApk(String url) {
    if (APK_URL.equals(url)) { downloadUpdate(); return true; }
    return false;
  }
  private void updateError(String text) {
    new AlertDialog.Builder(this).setTitle("تحديث التطبيق").setMessage(text)
      .setPositiveButton("حسنًا", null).show();
  }
  private void downloadUpdate() {
    if (downloading) return;
    downloading = true;
    ProgressDialog progress = new ProgressDialog(this);
    progress.setTitle("تحديث أسطرلاب");
    progress.setMessage("جارٍ تنزيل الإصدار الجديد داخل التطبيق...");
    progress.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
    progress.setIndeterminate(true); progress.setCancelable(false); progress.show();
    new Thread(() -> {
      File part = new File(getCacheDir(), "update.part");
      try {
        // Resolve the asset and require GitHub's published SHA-256 digest.
        HttpURLConnection meta = (HttpURLConnection)new URL("https://api.github.com/repos/mastofa7/astrolabe/releases/latest").openConnection();
        meta.setConnectTimeout(20000); meta.setReadTimeout(30000);
        JSONObject release;
        try (InputStream in=meta.getInputStream(); ByteArrayOutputStream out=new ByteArrayOutputStream()) {
          byte[] buf=new byte[8192]; int n; while((n=in.read(buf))!=-1)out.write(buf,0,n);
          release=new JSONObject(out.toString("UTF-8"));
        } finally { meta.disconnect(); }
        String assetUrl=null, expected=null;
        JSONArray assets=release.getJSONArray("assets");
        for(int i=0;i<assets.length();i++) {
          JSONObject a=assets.getJSONObject(i);
          if("astrolab.apk".equals(a.optString("name"))) {
            assetUrl=a.getString("browser_download_url"); expected=a.optString("digest"); break;
          }
        }
        if(assetUrl==null || !assetUrl.startsWith("https://github.com/mastofa7/astrolabe/releases/download/") || expected==null || !expected.startsWith("sha256:"))
          throw new IOException("تعذّر التحقق من بيانات الإصدار. حاول لاحقًا.");
        HttpURLConnection c=(HttpURLConnection)new URL(assetUrl).openConnection();
        c.setConnectTimeout(20000); c.setReadTimeout(30000); c.setInstanceFollowRedirects(true);
        MessageDigest hash=MessageDigest.getInstance("SHA-256");
        try(InputStream in=c.getInputStream(); FileOutputStream out=new FileOutputStream(part)) {
          if(!"https".equals(c.getURL().getProtocol()))throw new IOException("اتصال غير آمن");
          long total=c.getContentLengthLong(), count=0, last=0; byte[] buf=new byte[65536]; int n;
          while((n=in.read(buf))!=-1) {
            count+=n; if(count>150*1024*1024)throw new IOException("حجم ملف غير متوقع");
            out.write(buf,0,n); hash.update(buf,0,n);
            long now=System.currentTimeMillis();
            if(now-last>200){last=now; final int pct=total>0?(int)(count*100/total):0;
              runOnUiThread(()->{progress.setIndeterminate(total<=0);progress.setProgress(pct);});}
          }
        } finally {c.disconnect();}
        StringBuilder digest=new StringBuilder();for(byte b:hash.digest())digest.append(String.format(Locale.US,"%02x",b));
        if(!expected.equalsIgnoreCase("sha256:"+digest))throw new IOException("فشل التحقق من سلامة الملف؛ لم يُثبّت شيء.");
        android.content.pm.PackageInfo info=getPackageManager().getPackageArchiveInfo(part.getPath(),0);
        if(info==null || !getPackageName().equals(info.packageName) || info.versionCode<=getPackageManager().getPackageInfo(getPackageName(),0).versionCode)
          throw new IOException("الملف ليس إصدارًا أحدث صالحًا من أسطرلاب.");
        File apk=new File(getCacheDir(),"astrolab-update.apk");
        if(apk.exists()&&!apk.delete())throw new IOException("تعذّر استبدال الملف السابق");
        if(!part.renameTo(apk))throw new IOException("تعذّر حفظ الملف");
        runOnUiThread(()->{downloading=false;progress.dismiss();pendingApk=apk;installPending();});
      } catch(Exception e) {
        part.delete(); runOnUiThread(()->{downloading=false;progress.dismiss();updateError("تعذّر تنزيل التحديث بأمان. تأكد من الإنترنت وأعد المحاولة.\n"+e.getMessage());});
      }
    }).start();
  }
  private void installPending() {
    if(pendingApk==null || !pendingApk.exists())return;
    if(Build.VERSION.SDK_INT>=26 && !getPackageManager().canRequestPackageInstalls()) {
      new AlertDialog.Builder(this).setTitle("السماح بتثبيت التحديث")
        .setMessage("فعّل «السماح من هذا المصدر» لأسطرلاب مرة واحدة، ثم ارجع للتطبيق لإكمال التثبيت.")
        .setPositiveButton("فتح الإعدادات",(d,w)->startActivityForResult(new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,Uri.parse("package:"+getPackageName())),190))
        .setNegativeButton("إلغاء",(d,w)->pendingApk=null).show(); return;
    }
    try {
      Uri uri=FileProvider.getUriForFile(this,getPackageName()+".updates",pendingApk);
      Intent install=new Intent(Intent.ACTION_VIEW).setDataAndType(uri,"application/vnd.android.package-archive")
        .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
      startActivity(install); pendingApk=null;
    }catch(Exception e){updateError("تعذّر فتح شاشة التثبيت. أعد المحاولة.");}
  }
  @Override protected void onActivityResult(int request,int result,Intent data) {
    super.onActivityResult(request,result,data);
    if(request==190){if(Build.VERSION.SDK_INT<26||getPackageManager().canRequestPackageInstalls())installPending();else pendingApk=null;}
  }
  private SensorManager sm;
  private Sensor rotVec, gameVec, accel, mag;
  private int activeKind = 0; // 0 none, 1 rotvec, 2 game, 3 accmag
  private final float[] grav = new float[3];
  private final float[] geom = new float[3];
  private boolean haveGrav = false, haveGeom = false;
  private long lastSend = 0;
  private double smA = Double.NaN, smB = Double.NaN, smG = Double.NaN;
  private static final double SMOOTH = 0.25;
  private volatile boolean pageHasEvents = false;
  private final Handler handler = new Handler();
  private final Runnable probe = new Runnable() {
    @Override public void run() {
      web.evaluateJavascript("window.__bridgeEvents|0", v -> {
        try { if (Integer.parseInt(v.replace("\"","").trim()) > 0) pageHasEvents = true; } catch (Exception ignore) {}
      });
      handler.postDelayed(this, 1500);
    }
  };

  @Override protected void onCreate(Bundle b) {
    super.onCreate(b);
    web = new WebView(this);
    WebSettings s = web.getSettings();
    s.setJavaScriptEnabled(true);
    s.setDomStorageEnabled(true);
    s.setAllowFileAccess(true);
    web.setWebViewClient(new WebViewClient() {
      @Override public void onPageFinished(WebView view, String url) {
        view.evaluateJavascript("try{window.__astrolabNative='android'}catch(e){}", null);
      }
      @Override public boolean shouldOverrideUrlLoading(WebView view, String url) {
        if (handleApk(url)) return true;
        if (url != null && (url.startsWith("http://") || url.startsWith("https://"))) {
          try { startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url))); } catch (Exception ignore) {}
          return true;
        }
        return false;
      }
    });
    web.setDownloadListener((url, ua, cd, mime, len) -> {
      if (handleApk(url)) return;
      try { startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url))); } catch (Exception ignore) {}
    });
    web.setWebChromeClient(new WebChromeClient() {
      @Override public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback cb) {
        cb.invoke(origin, true, false);
      }
    });
    if (checkSelfPermission(android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED)
      requestPermissions(new String[]{android.Manifest.permission.ACCESS_FINE_LOCATION}, 1);
    sm = (SensorManager) getSystemService(SENSOR_SERVICE);
    rotVec = sm.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR);
    gameVec = sm.getDefaultSensor(Sensor.TYPE_GAME_ROTATION_VECTOR);
    accel = sm.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
    mag = sm.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD);
    web.loadUrl("file:///android_asset/www/atlas/index.html");
    setContentView(web);
    handler.postDelayed(probe, 2000);
  }

  @Override protected void onResume() {
    super.onResume();
    if (rotVec != null) { activeKind = 1; sm.registerListener(this, rotVec, SensorManager.SENSOR_DELAY_GAME); }
    else if (gameVec != null) { activeKind = 2; sm.registerListener(this, gameVec, SensorManager.SENSOR_DELAY_GAME); }
    else if (accel != null && mag != null) { activeKind = 3;
      sm.registerListener(this, accel, SensorManager.SENSOR_DELAY_GAME);
      sm.registerListener(this, mag, SensorManager.SENSOR_DELAY_GAME);
    } else activeKind = 0;
  }

  @Override protected void onPause() {
    super.onPause();
    sm.unregisterListener(this);
  }

  @Override public void onAccuracyChanged(Sensor sensor, int accuracy) {}

  private static double circSmooth(double prev, double cur, double range) {
    double d = ((cur - prev + range * 1.5) % range) - range / 2.0;
    return (prev + SMOOTH * d + range) % range;
  }

  @Override public void onSensorChanged(SensorEvent e) {
    if (pageHasEvents) return; // WebView delivers real orientation events itself
    float[] R = new float[9];
    int t = e.sensor.getType();
    if (t == Sensor.TYPE_ROTATION_VECTOR || t == Sensor.TYPE_GAME_ROTATION_VECTOR) {
      SensorManager.getRotationMatrixFromVector(R, e.values);
    } else if (t == Sensor.TYPE_ACCELEROMETER) {
      System.arraycopy(e.values, 0, grav, 0, 3); haveGrav = true;
      if (!haveGeom) return;
      if (!SensorManager.getRotationMatrix(R, null, grav, geom)) return;
    } else if (t == Sensor.TYPE_MAGNETIC_FIELD) {
      System.arraycopy(e.values, 0, geom, 0, 3); haveGeom = true;
      if (!haveGrav) return;
      if (!SensorManager.getRotationMatrix(R, null, grav, geom)) return;
    } else return;
    // W3C DeviceOrientation: R = Rz(alpha)·Rx(beta)·Ry(gamma), row-major R
    double alpha = (Math.toDegrees(Math.atan2(-(double) R[1], (double) R[4])) + 360.0) % 360.0;
    double beta = Math.toDegrees(Math.asin(Math.max(-1.0, Math.min(1.0, (double) R[7]))));
    double gamma = Math.toDegrees(Math.atan2(-(double) R[6], (double) R[8]));
    if (Double.isNaN(smA)) { smA = alpha; smB = beta; smG = gamma; }
    else {
      smA = circSmooth(smA, alpha, 360.0);
      smB = smB + SMOOTH * (beta - smB);
      smG = circSmooth(smG, (gamma + 540.0) % 360.0 - 180.0 + 360.0, 360.0);
      if (smG > 180.0) smG -= 360.0;
    }
    long now = System.currentTimeMillis();
    if (now - lastSend < 33) return;
    lastSend = now;
    final String js = String.format(Locale.US,
      "try{window.dispatchEvent(new DeviceOrientationEvent('deviceorientationabsolute',{alpha:%f,beta:%f,gamma:%f,absolute:true}))}catch(err){try{var ev=document.createEvent('Event');ev.initEvent('deviceorientationabsolute',true,true);ev.alpha=%f;ev.beta=%f;ev.gamma=%f;ev.absolute=true;window.dispatchEvent(ev)}catch(e2){}}",
      smA, smB, smG, smA, smB, smG);
    web.evaluateJavascript(js, null);
  }

  @Override public void onBackPressed() {
    if (web.canGoBack()) web.goBack(); else super.onBackPressed();
  }
}
