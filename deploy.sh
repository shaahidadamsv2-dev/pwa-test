#!/bin/bash
git pull origin main
sudo docker-compose build web
sudo docker-compose up -d web
