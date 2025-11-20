module.exports = {
  apps: [
    {
      name: "margins-prod",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 9000
      },
      instances: "max",              // use all available CPU cores
      exec_mode: "cluster",          // cluster mode for load balancing
      watch: false,                  // no file watching in production
      max_memory_restart: "1G",      // restart if memory exceeds 1GB
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,                    // prefix logs with timestamp
      autorestart: true,             // auto-restart on crash
      max_restarts: 10,              // limit restart attempts
      min_uptime: "10s",             // min uptime before considering stable
      listen_timeout: 3000,          // timeout for graceful reload
      kill_timeout: 5000             // timeout for graceful shutdown
    }
  ]
};
