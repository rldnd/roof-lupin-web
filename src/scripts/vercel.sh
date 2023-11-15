#!/bin/bash
 
if [[ $VERCEL_GIT_COMMIT_REF == "main"  ]] ; then 
  echo "[main branch] - production"
  yarn build:prod
else if [[ $VERCEL_GIT_COMMIT_REF == "develop" ]]
  echo "[develop branch] - staging"
  yarn build:staging
fi
