package blog.brutaldamage.dualattack;

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
    public HashMap<String, Object> responses;
    public PluginCall onRequestCall;
    public NanoHTTPDWebserver nanoHTTPDWebserver;

    @PluginMethod()
    public void startServer(PluginCall call) {

        try {
            _port = call.getInt("port", 8080);

            this.nanoHTTPDWebserver = new NanoHTTPDWebserver(_port, this);
            this.nanoHTTPDWebserver.start();

            Log.d(
                    this.getClass().getName(),
                    "Server is running on: " +
                            this.nanoHTTPDWebserver.getHostname() + ":" +
                            this.nanoHTTPDWebserver.getListeningPort()
            );

            call.resolve();
        }
        catch(IOException ex)
        {
            call.error(ex.getLocalizedMessage(), ex);
        }
    }

    @PluginMethod()
    public void onRequest(PluginCall call) {
        this.onRequestCall = call;
        call.save();
        // call will get its success value from the NanoServer implementation
    }

    @PluginMethod()
    public void sendResponse(PluginCall call) {
//       Log.d(this.getClass().getName(), "Got sendResponse: " + args.toString());
        String requestId = call.getString("requestId");

        this.responses.put(requestId, call.getData());

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

    private String getIpAccess() {
        WifiManager wifiManager = (WifiManager) getContext().getApplicationContext().getSystemService(WIFI_SERVICE);
        int ipAddress = wifiManager.getConnectionInfo().getIpAddress();
        final String formatedIpAddress = String.format("%d.%d.%d.%d", (ipAddress & 0xff), (ipAddress >> 8 & 0xff),
                (ipAddress >> 16 & 0xff), (ipAddress >> 24 & 0xff));
//        String formatedIpAddress = getLocalIpAddress();
		return "http://" + formatedIpAddress + ":" + _port;
	}

    public String getLocalIpAddress() {
        try {
            for (Enumeration<NetworkInterface> en = NetworkInterface.getNetworkInterfaces(); en.hasMoreElements();) {
                NetworkInterface intf = en.nextElement();
                for (Enumeration<InetAddress> enumIpAddr = intf.getInetAddresses(); enumIpAddr.hasMoreElements();) {
                    InetAddress inetAddress = enumIpAddr.nextElement();
                    if (!inetAddress.isLoopbackAddress()) {
                        String ip = Formatter.formatIpAddress(inetAddress.hashCode());
//                        Log.i(TAG, "***** IP="+ ip);
                        return ip;
                    }
                }
            }
        } catch (SocketException ex) {
//            Log.e(TAG, ex.toString());
        }
        return null;
    }
}