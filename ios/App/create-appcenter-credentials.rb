#!/usr/bin/ruby

file_content = <<-CREDS_FILE_STRING
struct AppCenterCredentials {
    static let appSecret = "#{ENV['APP_CENTER_SECRET_IOS']}"
}
CREDS_FILE_STRING

file = File.new("App/AppCenterCredentials.swift", "w")
file.puts(file_content)
file.close
