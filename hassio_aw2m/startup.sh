#!/bin/bash

if [ -f "/data/options.json" ]
then
  for s in $(echo $values | jq -r "to_entries|map(\"\(.key)=\(.value|tostring)\")|.[]" /data/options.json ); do
    export $s;
  done
fi

node --no-deprecation dist/main.js
