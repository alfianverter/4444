const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const os = require('os');
    const arch = os.arch()
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
  
    let totalSeconds = process.uptime();
    let realTotalSecs = Math.floor(totalSeconds % 60);
    let days = Math.floor((totalSeconds % 31536000) / 86400);
    let hours = Math.floor((totalSeconds / 3600) % 24);
    let mins = Math.floor((totalSeconds / 60) % 60);
    var cpu = process.cpuUsage().system / 1024 / 1024;
    var cpu_usage = Math.round(cpu * 100) / 100;

    let info = new Discord.RichEmbed()
    		.setThumbnail(client.user.displayAvatarURL)
        .setColor('RANDOM')
        .setAuthor("MioAkiyama Statistic")
        .addField('Total Servers', `**${client.guilds.size}** guilds.`, true)
        .addField('Total Channels', `**${client.channels.size}** channels.`, true)
        .addField('Total Users', `**${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** users.`, true)
        .addField('Memory usage', `${Math.round(used * 100) / 100}MB`, true) 
        .addField('Operating System', `${os.platform} ${arch}`, true) 
        .addField('CPU usage', `${cpu_usage}% Used`, true) 
        .addField('Uptime', `${days} Days, ${hours} Hours, ${mins} Mins, ${realTotalSecs} Secs`, true)
        .addField('Ping', `${client.ping.toFixed(2)}ms`, true) 
        .setFooter(`Beta v0.1.1 | ${client.shard.count} Shard`, message.author.displayAvatarURL)

message.channel.send(info);
} 
