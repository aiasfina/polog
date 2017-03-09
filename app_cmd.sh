#!/usr/bin/env bash

eval "$(rbenv init -)"
exec bundle exec puma -C ./config/puma.rb