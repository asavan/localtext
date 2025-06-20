package ru.asavan.localtext;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

import java.util.LinkedHashMap;
import java.util.Map;


public class AndroidWebServerActivity extends Activity {
    private static final int STATIC_CONTENT_PORT = 8080;
    private static final int WEB_SOCKET_PORT = 8088;
    private static final String WEB_GAME_URL = "https://asavan.github.io/localtext/";
    public static final String MAIN_LOG_TAG = "LOCAL_TEXT_TAG";
    private static final boolean secure = false;

    private BtnUtils btnUtils;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        btnUtils = new BtnUtils(this, STATIC_CONTENT_PORT, WEB_SOCKET_PORT, secure);
        try {
            final HostUtils hostUtils = new HostUtils(STATIC_CONTENT_PORT, WEB_SOCKET_PORT, secure);
            final String host = hostUtils.getStaticHost(IpUtils.getIPAddressSafe());
            Map<String, String> mainParams = new LinkedHashMap<>();
            mainParams.put("sh", host);
            mainParams.put("wh", hostUtils.getSocketHost(IpUtils.LOCALHOST));

            addButtons(hostUtils, host, mainParams);
            btnUtils.launchTwa(hostUtils.getStaticHost(IpUtils.LOCALHOST), mainParams);
        } catch (Exception e) {
            Log.e(MAIN_LOG_TAG, "main", e);
        }
    }

    private void addButtons(HostUtils hostUtils, String host, Map<String, String> mainParams) {
        btnUtils.addButtonTwa(WEB_GAME_URL, mainParams, R.id.twa_web);
        btnUtils.addButtonTwa(hostUtils.getStaticHost(IpUtils.LOCALHOST), mainParams, R.id.twa_localhost);
        btnUtils.addButtonBrowser(host, mainParams, R.id.launch_browser, host);
    }

    @Override
    protected void onDestroy() {
        if (btnUtils != null) {
            btnUtils.onDestroy();
        }
        super.onDestroy();
    }
}
