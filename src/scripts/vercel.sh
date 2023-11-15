#!/bin/bash
 
if [[ $VERCEL_GIT_COMMIT_REF == "main"  ]] ; then 
  echo "[main branch] - production"
  yarn build:prod
else
  echo "[develop branch] - stage"
  yarn build:stage
fi
