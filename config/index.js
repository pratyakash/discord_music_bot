const bot_config = {
  prefix: process.env.PREFIX,
  bot_token: process.env.BOT_TOKEN,
  status_refresh_time: process.env.STATUS_REFRESH_TIME,
  admin_key: process.env.ADMIN_KEY,
  "emoji": {
    "play": "▶️",
    "stop": "⏹️",
    "queue": "📄",
    "success": "☑️",
    "repeat": "🔁",
    "error": "❌",
    "heart": "❤️",
    "clock": "🕜",
    "speaker": "🔊",
    "timer": "⏱",
    "headphone": "🎧"
  }
}

module.exports.bot_config = bot_config;