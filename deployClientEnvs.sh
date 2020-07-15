#!/bin/bash
PROJECT_PATH="${1}"

for HOST in "${@:2}"
do
    scp -Cr client/.env.* "harrison@${HOST}:${PROJECT_PATH}/current/client"
done
