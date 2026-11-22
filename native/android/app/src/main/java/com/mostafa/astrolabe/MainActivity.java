package com.mostafa.astrolabe;
import android.app.Activity;
import android.os.Bundle;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.GeolocationPermissions;
import android.content.pm.PackageManager;
import java.util.Locale;

public class MainActivity extends Activity implements SensorEventListener {
  private WebView web;
  private SensorManager sm;
  private Sensor rotVec, gameVec, accel, mag;
  private int activeKind = 0; // 0 none, 1 rotvec, 2 game, 3 accmag
  private final float[] grav = new float[3];
  private final float[] geom = new float[3];
  private boolean haveGrav = false, haveGeom = false;
  private long lastSend = 0;
  private double lastAz = 9999, lastAlt = 9999;
  private double smAz = Double.NaN, smAlt = Double.NaN;
  private static final double SMOOTH = 0.12;

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
        sendStatus();
      }
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
    web.loadUrl("file:///android_asset/www/index.html");
    setContentView(web);
  }

  @Override protected void onResume() {
    super.onResume();
    if (rotVec != null) { activeKind = 1; sm.registerListener(this, rotVec, SensorManager.SENSOR_DELAY_GAME); }
    else if (gameVec != null) { activeKind = 2; sm.registerListener(this, gameVec, SensorManager.SENSOR_DELAY_GAME); }
    else if (accel != null && mag != null) { activeKind = 3;
      sm.registerListener(this, accel, SensorManager.SENSOR_DELAY_GAME);
      sm.registerListener(this, mag, SensorManager.SENSOR_DELAY_GAME);
    } else activeKind = 0;
    sendStatus();
  }

  private void sendStatus() {
    String kind = activeKind == 1 ? "rotvec" : activeKind == 2 ? "game" : activeKind == 3 ? "accmag" : "none";
    final String js = "try{window.__astrolabSensorStatus&&window.__astrolabSensorStatus('" + kind + "')}catch(e){}";
    web.evaluateJavascript(js, null);
  }

  @Override protected void onPause() {
    super.onPause();
    sm.unregisterListener(this);
  }

  @Override public void onAccuracyChanged(Sensor sensor, int accuracy) {}

  @Override public void onSensorChanged(SensorEvent e) {
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
    double alt = Math.toDegrees(Math.asin(Math.max(-1.0, Math.min(1.0, -(double) R[8]))));
    double az = (Math.toDegrees(Math.atan2(-(double) R[2], -(double) R[5])) + 360.0) % 360.0;
    if (Double.isNaN(smAz)) { smAz = az; smAlt = alt; }
    else {
      double dAz = ((az - smAz + 540.0) % 360.0) - 180.0;
      smAz = (smAz + SMOOTH * dAz + 360.0) % 360.0;
      smAlt = smAlt + SMOOTH * (alt - smAlt);
    }
    long now = System.currentTimeMillis();
    if (now - lastSend < 40) return;
    double dz = ((smAz - lastAz + 540.0) % 360.0) - 180.0;
    if (Math.abs(dz) < 0.05 && Math.abs(smAlt - lastAlt) < 0.05 && now - lastSend < 500) return;
    lastSend = now; lastAz = smAz; lastAlt = smAlt;
    double alpha = (360.0 - smAz) % 360.0;
    double beta = smAlt + 90.0;
    final String js = String.format(Locale.US,
      "try{if(window.__astrolabOrient){window.__astrolabOrient(%f,%f)}else{window.dispatchEvent(new DeviceOrientationEvent('deviceorientation',{alpha:%f,beta:%f,gamma:0,absolute:true}))}}catch(err){try{var ev=document.createEvent('Event');ev.initEvent('deviceorientation',true,true);ev.alpha=%f;ev.beta=%f;ev.gamma=0;ev.absolute=true;window.dispatchEvent(ev)}catch(e2){}}",
      smAz, smAlt, alpha, beta, alpha, beta);
    web.evaluateJavascript(js, null);
  }

  @Override public void onBackPressed() {
    if (web.canGoBack()) web.goBack(); else super.onBackPressed();
  }
}
