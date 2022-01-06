#!/bin/sh
set -e

chown node:node -R /home/node/junkbox

exec "$@"
