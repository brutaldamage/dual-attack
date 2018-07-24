
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
        "id": "cordova-plugin-networkinterface.networkinterface",
        "file": "plugins/cordova-plugin-networkinterface/www/networkinterface.js",
        "pluginId": "cordova-plugin-networkinterface",
        "clobbers": [
          "window.networkinterface"
        ]
      },
      {
        "id": "cordova-plugin-webserver.webserver",
        "file": "plugins/cordova-plugin-webserver/webserver.js",
        "pluginId": "cordova-plugin-webserver",
        "clobbers": [
          "webserver"
        ]
      }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-networkinterface": "2.0.0",
      "cordova-plugin-webserver": "1.0.1"
    };
    // BOTTOM OF METADATA
    });
    