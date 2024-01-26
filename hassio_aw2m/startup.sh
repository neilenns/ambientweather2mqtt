#!/usr/bin/env bashio
# shellcheck shell=bash

# Delete the old VERBOSE option to avoid warnings in the logs
if bashio::config.exists "VERBOSE"; then
  bashio::addon.option "VERBOSE"
fi

if [ -f "/data/options.json" ]
then
  for s in $(echo $values | jq -r "to_entries|map(\"\(.key)=\(.value|tostring)\")|.[]" /data/options.json ); do
    export $s;
  done
fi

node --no-deprecation dist/main.js
