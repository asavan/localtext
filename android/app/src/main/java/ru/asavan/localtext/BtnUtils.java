package ru.asavan.localtext;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.widget.Button;

import com.google.androidbrowserhelper.trusted.QualityEnforcer;
import com.google.androidbrowserhelper.trusted.TwaLauncher;

import java.util.Map;

import androidx.browser.trusted.TrustedWebActivityIntentBuilder;

public class BtnUtils {
    private final int staticContentPort;
    private final int webSocketPort;
    private final boolean secure;
    private final Activity activity;
    private AndroidStaticAssetsServer server = null;
    private WebSocketBroadcastServer webSocketServer = null;

    public BtnUtils(Activity activity, int staticContentPort, int webSocketPort, boolean secure) {
        this.staticContentPort = staticContentPort;
        this.webSocketPort = webSocketPort;
        this.activity = activity;
        this.secure = secure;
    }

    public void addButtonBrowser(final String host, Map<String, String> parameters, int btnId) {
        addButtonBrowser(host, parameters, btnId, null);
    }

    public void addButtonBrowser(final String host, Map<String, String> parameters, int btnId, String text) {
        Button btn = activity.findViewById(btnId);
        if (text != null && !text.isEmpty()) {
            String newText = btn.getText() + " " + text;
            btn.setText(newText);
        }
        btn.setOnClickListener(v -> launchBrowser(host, parameters));
    }

    public void addButtonTwa(String host, Map<String, String> parameters, int id) {
        addButtonTwa(host, parameters, id, null);
    }

    public void addButtonTwa(String host, Map<String, String> parameters, int id, String text) {
        Button btn = activity.findViewById(id);
        if (text != null) {
            String newText = btn.getText() + " " + text;
            btn.setText(newText);
        }
        btn.setOnClickListener(v -> launchTwa(host, parameters));
    }

    private void launchBrowser(String host, Map<String, String> parameters) {
        startServerAndSocket();
        Uri launchUri = Uri.parse(UrlUtils.getLaunchUrl(host, parameters));
        activity.startActivity(new Intent(Intent.ACTION_VIEW, launchUri));
    }

    public void launchTwa(String host, Map<String, String> parameters) {
        startServerAndSocket();
        Uri launchUri = Uri.parse(UrlUtils.getLaunchUrl(host, parameters));
        TwaLauncher launcher = new TwaLauncher(activity);
        launcher.launch(new TrustedWebActivityIntentBuilder(launchUri), new QualityEnforcer(), null, null);
    }

    private void startServerAndSocket() {
        if (server != null) {
            return;
        }
        try {
            Context applicationContext = activity.getApplicationContext();
            server = new AndroidStaticAssetsServer(applicationContext, staticContentPort, secure);
            if (webSocketServer == null) {
                webSocketServer = new WebSocketBroadcastServer(applicationContext, webSocketPort, secure);
                webSocketServer.start(0);
            }
        } catch (Exception e) {
            Log.e("BTN_UTILS", "main", e);
        }
    }

    protected void onDestroy() {
        if (server != null) {
            server.stop();
        }
        if (webSocketServer != null) {
            webSocketServer.stop();
        }
    }
}
