#!/bin/sh

set -e

BRANCH=$(echo "$GITHUB_REF" | sed -e 's/refs\/heads\///')

if echo "$BRANCH" | grep "^master$"; then
  echo 'Deploying production';
  yarn deploy:production
else
  echo 'Deploying staging';
  yarn deploy:staging
fi;
