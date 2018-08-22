const Discord = require('discord.js');

exports.run = (client, message, args) => {
   
    
    
    let embed = new Discord.RichEmbed()
    .setAuthor("Invite me...", client.user.displayAvatarURL)
    .addField("Invite MioAkiyama", "[Click Here](https://discordapp.com/oauth2/authorize?client_id=477953740406784000&scope=bot&permissions=36760832)")
    .addField("DiscordBotList", "[Click Here](https://discordbots.org/bot/477953740406784000)")
    .setFooter(`Requested by: ${message.author.tag} | Beta v0.1.1`, message.author.displayAvatarURL)
    .setColor("AQUA");
	    
	   message.channel.send(embed);
    
    }
    
    
