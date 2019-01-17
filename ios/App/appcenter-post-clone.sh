#!/usr/bin/env bash

##
## install node for capacitor
##
set -ex
brew uninstall node@6
NODE_VERSION="8.9.4"
curl "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.pkg" > "$HOME/Downloads/node-installer.pkg"
sudo installer -store -pkg "$HOME/Downloads/node-installer.pkg" -target "/"

##
## run the npm tasks
##
(cd ../../ && npm install)
(cd ../../ && npm run build)


## grant permission to run ruby script
chmod +x ./create-appcenter-credentials.rb