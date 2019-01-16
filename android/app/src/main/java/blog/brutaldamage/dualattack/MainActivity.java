package blog.brutaldamage.dualattack;

import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.analytics.Analytics;
import com.microsoft.appcenter.crashes.Crashes;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);


    String appCenterKey = getAppCenterSecret();
    if(appCenterKey != null) {
      AppCenter.start(getApplication(), appCenterKey, Analytics.class, Crashes.class);
    }

    requestWindowFeature(Window.FEATURE_NO_TITLE);

    Window window = getWindow();

    window.setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
    window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      add(WebServerPlugin.class);
    }});
  }

  private String getAppCenterSecret()
  {
    try { return getResources().getString(getResources().getIdentifier("app_center_secret", "string", getPackageName())); }
    catch(Exception ex) { return null; }
  }
}
