# Change to match your CPU core count
workers 1

# Min and Max threads per worker
threads 1, 4

app_dir = File.expand_path("../..", __FILE__)
tmp_dir = File.join(app_dir, 'tmp')
log_dir = File.join(app_dir, 'log')

# Default to production
rails_env = ENV['RAILS_ENV'] || "production"
environment rails_env

# Set up socket location
bind 'tcp://0.0.0.0:8080'

# Logging
stdout_redirect File.join(log_dir, 'puma.stdout.log'), File.join(log_dir, 'puma.stderr.log'), true

# Set master PID and state locations
pidfile File.join(tmp_dir, 'puma.pid')
state_path File.join(tmp_dir, 'puma.state')
