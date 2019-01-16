//
//  Variables.swift
//  App
//
//  Created by Drew on 1/15/19.
//

import Foundation

struct Environment {
    
    static var appCenterSecret: String = Environment.variable(named: "APP_CENTER_SECRET") ?? CI.appCenterSecretKey
    
    static func variable(named name: String) -> String? {
        let processInfo = ProcessInfo.processInfo
        guard let value = processInfo.environment[name] else {
            return nil
        }
        return value
    }
}
