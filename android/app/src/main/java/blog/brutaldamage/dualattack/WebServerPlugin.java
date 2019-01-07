package blog.brutaldamage.dualattack;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.wifi.WifiManager;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import java.io.IOException;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;
import java.util.HashMap;

import android.text.format.Formatter;
import android.util.Log;


import static android.content.Context.WIFI_SERVICE;

@NativePlugin()
public class WebServerPlugin extends Plugin {

    private int _port;
    public HashMap<String, Object> responses = new HashMap<String, Object>();
    public NanoHTTPDWebserver nanoHTTPDWebserver;

    @PluginMethod()
    public void startServer(PluginCall call) {
        if(isConnectedInWifi()){
            try {
                if(this.nanoHTTPDWebserver == null) {
                    _port = call.getInt("port", 8080);

                    this.nanoHTTPDWebserver = new NanoHTTPDWebserver(_port, this);
                    this.nanoHTTPDWebserver.start();

                    Log.d(
                            this.getClass().getName(),
                            "Server is running on: " +
                                    this.nanoHTTPDWebserver.getHostname() + ":" +
                                    this.nanoHTTPDWebserver.getListeningPort()
                    );
                }

                call.resolve();
            } catch (IOException ex) {
                call.error(ex.getLocalizedMessage(), ex);
            }
        }
        else{
            call.error("WIFI connection is required");
        }
    }

    @PluginMethod()
    public void sendResponse(PluginCall call) {
        String requestId = call.getString("requestId");

        JSObject data = call.getData();

        this.responses.put(requestId, data);

        call.resolve();
    }

    @PluginMethod()
    public void stopServer(PluginCall call) {
        if (this.nanoHTTPDWebserver != null) {
            this.nanoHTTPDWebserver.stop();
        }
        call.resolve();
    }

    @PluginMethod()
    public void getURL(PluginCall call) {
        String url = getIpAccess();
        JSObject json = new JSObject();
        json.put("url", url);
        call.resolve(json);
    }

    public void sendRequestEvent(JSObject data) {
        JSObject ret = new JSObject();
//        ret.put("value", "some value");
        notifyListeners("httpRequestReceived", data);
//        bridge.triggerDocumentJSEvent("httpRequestReceived", data.toString());
    }

    private String getIpAccess() {
        Context context = getContext().getApplicationContext();
        WifiManager wifiManager = (WifiManager) context.getSystemService(WIFI_SERVICE);
        int ipAddress = wifiManager.getConnectionInfo().getIpAddress();
        final String formatedIpAddress = String.format("%d.%d.%d.%d", (ipAddress & 0xff), (ipAddress >> 8 & 0xff), (ipAddress >> 16 & 0xff), (ipAddress >> 24 & 0xff));
        return "http://" + formatedIpAddress + ":" + _port;
	}

    public boolean isConnectedInWifi() {
        Context context = getContext().getApplicationContext();
        WifiManager wifiManager = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
        NetworkInfo networkInfo = ((ConnectivityManager)context.getSystemService(Context.CONNECTIVITY_SERVICE)).getActiveNetworkInfo();
        if (networkInfo != null && networkInfo.isAvailable() && networkInfo.isConnected()
                && wifiManager.isWifiEnabled() && networkInfo.getTypeName().equals("WIFI")) {
            return true;
        }
        return false;
    }
}