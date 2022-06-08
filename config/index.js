const bot_config = {
  prefix: process.env.PREFIX,
  bot_token: process.env.BOT_TOKEN,
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