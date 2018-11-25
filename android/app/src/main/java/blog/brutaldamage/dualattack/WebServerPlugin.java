package blog.brutaldamage.dualattack;

import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin()
public class WebServerPlugin extends Plugin {

    private int _port;
    public HashMap<String, Object> responses;
    public PluginCall onRequestCall;
    public NanoHTTPDWebserver nanoHTTPDWebserver;

    @PluginMethod()
    public void startServer(PluginCall call) {

         _port = call.getInteger("port", 8080);

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

    @PluginMethod()
    public void onRequest(PluginCall call) {
        this.onRequestCall = call;
        // call will get its success value from the NanoServer implementation
    }

    @PluginMethod()
    public void sendResponse(PluginCall call) {
        Log.d(this.getClass().getName(), "Got sendResponse: " + args.toString());
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
		WifiManager wifiManager = (WifiManager) getApplicationContext().getSystemService(WIFI_SERVICE);
		int ipAddress = wifiManager.getConnectionInfo().getIpAddress();
		final String formatedIpAddress = String.format("%d.%d.%d.%d", (ipAddress & 0xff), (ipAddress >> 8 & 0xff), (ipAddress >> 16 & 0xff), (ipAddress >> 24 & 0xff));
		return "http://" + formatedIpAddress + ":" + _port;
	}
}