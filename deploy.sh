#!/bin/bash
git pull origin main
docker-compose build web
docker-compose up -d web
