//
//  WebServerPlugin.m
//  App
//
//  Created by Drew on 11/22/18.
//

#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(WebServerPlugin, "WebServerPlugin",
           CAP_PLUGIN_METHOD(getURL, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(startServer, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(stopServer, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(onRequest, CAPPluginReturnCallback);
           CAP_PLUGIN_METHOD(sendResponse, CAPPluginReturnNone);
           )
