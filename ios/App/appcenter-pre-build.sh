#!/usr/bin/env bash
(cd ../../ && npm install)
(cd ../../ && npm run build)
(cd ../../ && npx cap sync)

pod install