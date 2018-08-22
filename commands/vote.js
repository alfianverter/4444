const DBL = require('dblapi.js');
const dbl = new DBL(process.env.DBL_TOKEN);

exports.run = async (bot, message, args) => {
dbl.hasVoted(message.author.id).then(voted => {
    if (!voted) return message.reply(`Give Miyuki Upvotes on DBL | https://discordbots.org/bot/477953740406784000/vote`)

    if (voted)  return message.reply('You already give me upvote. Comeback in 12 Hour :)')
})
}
