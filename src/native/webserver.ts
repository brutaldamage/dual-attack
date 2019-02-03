import { CallbackID } from '@capacitor/core'
import { Plugin } from '@capacitor/core/dist/esm/definitions'

declare global {
    interface PluginRegistry {
        WebServerPlugin?: WebServerPlugin;
    }
}

export type WebServerOnRequestCallback = (data: WebServerRequest, err?: any) => void;

export interface WebServerUrl {
    url: string;
}

export interface WebServerRunningResult {
    isRunning: boolean;
}

export interface WebServerRequest {
    requestId: string;
    body : string;
    headers: any;
    method: string;
    path: string;
    query: string;
}

export interface WebServerResponse {
    requestId: string;
    status: number;
    body : string;
    headers: any;
}

export interface WebServerPlugin extends Plugin {
    isRunning(): Promise<WebServerRunningResult>;
    getURL(): Promise<WebServerUrl>;
    startServer(): Promise<any>;
    stopServer(): Promise<any>;
    sendResponse(response: WebServerResponse);
}