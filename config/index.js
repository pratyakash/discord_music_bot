const bot_config = {
  prefix: process.env.PREFIX,
  bot_token: process.env.BOT_TOKEN,
  status_refresh_time: process.env.STATUS_REFRESH_TIME,
  admin_key: process.env.ADMIN_KEY,
  "emoji": {
    "play": "âļī¸",
    "stop": "âšī¸",
    "queue": "đ",
    "success": "âī¸",
    "repeat": "đ",
    "error": "â",
    "heart": "â¤ī¸",
    "clock": "đ",
    "speaker": "đ",
    "timer": "âą",
    "headphone": "đ§"
  }
}

module.exports.bot_config = bot_config;