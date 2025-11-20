module.exports = {
  apps: [
    {
      name: "margins-dev",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
        PORT: 9000
      },
      watch: true,                    // auto-restart when files change (good for dev)
      ignore_watch: [
        "node_modules",
        ".next",                     // Next.js build folder – don’t restart on this
        "logs",
        ".git"
      ],
      watch_delay: 1000,            // faster restarts
      max_memory_restart: "300M"   // optional – restart if it uses too much RAM
    }
  ]
};
