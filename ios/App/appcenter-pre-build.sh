#!/usr/bin/env bash
(cd ../../ && npm run build)
(cd ../../ && npx cap sync)