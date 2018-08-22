const Discord = require("discord.js");
const superagent = require("superagent");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const opus = require("opusscript");
 
const PREFIX = 'am!';
var commandcooldown = new Set();
var queue = new Map();
 
var bot = new Discord.Client({
    disableEveryone: false
})
var client = bot;
var youtube = new YouTube(process.env.GAK);

const DBL = require('dblapi.js')
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3Nzk1Mzc0MDQwNjc4NDAwMCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTM0MzY0MTUyfQ.k-nd1OK6IiCT90xGQqnDMyNR365U_rUutb54CfOP3Mk', bot);

bot.on("ready", () => {
    function randomStatus() {
        let status = [`on ${bot.guilds.size} guilds.`, `with ${bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users.`, "am!help | Music."]
          let rstatus = Math.floor(Math.random() * status.length);
        bot.user.setActivity(status[rstatus], {type: 'PLAYING'});
	}; setInterval(randomStatus, 10000)
	
	dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})
	
});

bot.on("ready", async () => {
    console.log(`${bot.user.tag} Berhasil dinyalakan`)
})

bot.on("guildCreate", guild => {
  console.log(`${bot.user.tag} Has Been Invited To ${guild.name}!`)
});

bot.on("guildCreate", guild => {
  
    var guildjoinembed = new Discord.RichEmbed()
    .setAuthor("📥 | Im Just Joined To The New Guild!")
    .setDescription(`• Name: **${guild.name}**\n• ID: **${guild.id}**\n• Member: **${guild.memberCount}**\n• Owner: **${guild.owner.user.tag}**`)
    .setThumbnail(guild.iconURL)
    .setColor('#00FF00');
    bot.channels.get("473701613698285569").send(guildjoinembed)
});

bot.on("guildDelete", guild => {
  console.log(`${bot.user.tag} Has Been Kicked From ${guild.name}, RIP.`)
});

bot.on("guildDelete", guild => {
  
    var guildleftembed = new Discord.RichEmbed()
    .setAuthor("📤 | Im Just Kicked From The Guild.")
    .setDescription(`• Name: **${guild.name}**\n• ID: **${guild.id}**\n• Member: **${guild.memberCount}**\n• Owner: **${guild.owner.user.tag}**`)
    .setThumbnail(guild.iconURL)
    .setColor('#FF0000');
    bot.channels.get("473701613698285569").send(guildleftembed)
});

bot.on("ready", async () => {
    console.log(`${bot.user.tag} Was Booted UP!`)
})
 
bot.on('message', async msg => { // eslint-disable-line
    var message = msg;
 
    if (message.author.bot) return;
 
    if (message.channel.type === 'dm') return;
 
    var DEFAULTPREFIX = 'am!'
 
    var PREFIX = DEFAULTPREFIX;
 
    if (commandcooldown.has(message.author.id)) {
        return;
    }
    commandcooldown.add(message.author.id);
    setTimeout(() => {
        commandcooldown.delete(message.author.id);
    }, 2000);
 
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(PREFIX)) return undefined;
 
  var randomhexcolor = Math.floor(Math.random() * 16777214) + 1
 
  var serverQueue = queue.get(message.guild.id);
 
  var args = message.content.substring(PREFIX.length).split(" ")
 
  var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
 
    let command = msg.content.toLowerCase().split(' ')[0];
    command = command.slice(PREFIX.length)
 
 if (command === 'stats') {
 	
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
        .setFooter(`Beta v0.1.1`, message.author.displayAvatarURL)

message.channel.send(info);
 	
 } 
 
 if (command === 'invite') {
 	
 	    let embed = new Discord.RichEmbed()
    .setAuthor("Invite me...", client.user.displayAvatarURL)
    .addField("Invite MioAkiyama", "[Click Here](https://discordapp.com/oauth2/authorize?client_id=477953740406784000&scope=bot&permissions=36760832)")
    .addField("DiscordBotList", "[Click Here](https://discordbots.org/bot/477953740406784000)")
    .setFooter(`Requested by: ${message.author.tag} | Beta v0.1.1`, message.author.displayAvatarURL)
    .setColor("AQUA");
	    
	   message.channel.send(embed);
 	
 }
 
 if (command === 'help') {
 	
 	    let embed = new Discord.RichEmbed()
    .setThumbnail(bot.user.displayAvatarURL)
    .setAuthor("Hi, Im Mio Akiyama.")
    .setDescription("Below are commands that i can run. My prefix is **am!**")
    .addField("General", "**`help`, `ping`, `invite`, `stats`**")
    .addField("Music", "**`play`, `search`, `skip`, `stop`, `resume`, `pause`, `queue`, `volume`, `np`**")
    .setFooter(`Requested by: ${message.author.tag} | Beta v0.1.1`, message.author.displayAvatarURL)
    .setColor("AQUA")
    
    return message.channel.send(embed);
 	
 }
 
    if (command === 'ping') {
   
       let start = Date.now(); message.channel.send('Ping Pong!').then(message => { 
    let diff = (Date.now() - start); 
    let API = (bot.ping).toFixed(2)
        
        let embed = new Discord.RichEmbed()
        .setTitle(`🔔 Pong!`)
        .setColor(0xff2f2f)
        .addField("📶 Latency", `${diff}ms`, true)
        .addField("💻 API", `${API}ms`, true)
        message.edit(embed);
      
    });
   
   }

    if (command === 'musicstats') {
     bot.shard.fetchClientValues('guilds.size')
  .then(results => {
      message.channel.send(`Shard Running: **${bot.shard.count}** Shard | API Ping: **${bot.ping.toFixed(2)}**ms | Server Count: **${results.reduce((prev, val) => prev + val, 0)}** Servers`)
    
    console.log(`${results.reduce((prev, val) => prev + val, 0)} total guilds`);
  })
  .catch(console.error);
     }
 
	if (command === 'mev') {
    if (msg.author.id !== '304377187057008645') return;
    try {
        let codein = args.slice(1).join(' ');
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setAuthor('Evaluate')
        .setColor('RANDOM')
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
        msg.channel.send(embed)
    } catch(e) {
        msg.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
};
 
 
    if (command === 'play' || command === 'p') {
        var searchString = args.slice(1).join(" ");
        if(!searchString) return msg.channel.send({embed: {
          color: randomhexcolor,
          description: `❌ | Correct Usage Is: **${PREFIX}play [Song Name]/[Video URL]/[Playlist URL]**`
        }})
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `❌ | You're Not In The **Voice Channel**, Go Join Some!`
            }
        })
        const permissions = voiceChannel.permissionsFor(bot.user);
        if (!permissions.has('CONNECT')) {
              msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: "❌ | OOPS..! I Lack The `Connect` Permissions On Those Channel!"
            }
        })
    }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: "❌ | OOPS..! I Lack The `Speak` Permissions On Those Channel!"
            }
        })
    }
 
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `⏺ | *${playlist.title}* Has Been Added To **Queue** !`
            }
        })
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    var selection = await msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `**🎶 | Search Results**\n
${videos.map(video2 => `**${++index} •** ${video2.title}`).join('\n')}
`
            }
        })
 
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 15000,
                            errors: ['time']
                        });
                                                selection.delete();
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `⌛ | Time's Up, Song Selection Has Been **Closed**.`
            }
        })
                        selection.delete();
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err)
                    return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `❌ | No Results Found With That Query!`
            }
        })
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }
    } else if (command === 'skip') {
        if (!msg.member.voiceChannel) return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `❌ | You're Not In The **Voice Channel**, Go Join Some!`
            }
        })
        if (!serverQueue) return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `❌ | Unable To **Skip**, The Song Queue Is Empty.`
            }
        })
        serverQueue.connection.dispatcher.end('Skip Command Has Been Used!');
        return msg.channel.send({embed: {
          color: randomhexcolor,
          description: `⏭ | Current Playing Song Has Been **Skipped**.`,
        }});
    } else if (command === 'stop') {
       let member = msg.member;
        if (!msg.member.voiceChannel) return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `❌ | You're Not In The **Voice Channel**, Go Join Some!`,
            }
        })
        if (!serverQueue) return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `❌ | Unable To **Stop**, The Song Queue Is Empty.`
            }
        })
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('Stop Commands Has Been Used!');
        return msg.channel.send({embed: {
          color: randomhexcolor,
          description: `⏹ | Current Playing Song Has Been **Stopped**, All Song Queues Has Been **Cleared**!.`,
        }});
      } else if (command === 'volume') {
          if (!msg.member.voiceChannel) return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `❌ | You're Not In The **Voice Channel**, Go Join Some!`
            }
        });
        if (!serverQueue) return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `❌ | Unable To Set The **Volume**, The Song Queue Is Empty.`
            }
        })
        if (!args[1]) return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `🔊 | Current Server **Volume** Is: _*${serverQueue.volume}%*_`
            }
        });
        serverQueue.volume = args[1];
    if (args[1] > 100) return msg.channel.send({
      embed: {
        color: randomhexcolor,
        description: `❌ | I Don't Want To Hurt Yourself, So The **Volume** Limit Is: _*100%*_!`
      }
    });
     serverQueue.volume = args[1];
     if (args[1] > 100) return !serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100) +
       msg.channel.send({
      embed: {
        color: randomhexcolor,
        description: `❌ | I Don't Want To Hurt Yourself, So The **Volume** Limit Is: _*100%*_!`
      }
    });
     if (args[1] < 101) return serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100) +
          msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `🔊 | I Set The Server **Volume** To: _*${args[1]}%*_`
            }
        });
      } else if (command === 'np') {
        if (!serverQueue) return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `❌ | Song Queue Is Empty.`
            }
        })
        return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `▶ | Now Playing: **${serverQueue.songs[0].title}**`
            }
        })
    } else if (command === 'queue' || command === 'q') {
        if (!serverQueue) return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `❌ | Song Queue Is Empty.`
            }
        })
        return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `🎶 | **Song Queue List**
 
${serverQueue.songs.map(song => `**•** ${song.title}`).join('\n')}`
            }
        });
    } else if (command === 'pause') {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `⏸ | Music Has Been **Paused**.`
            }
        })
        }
        return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `❌ | You're Not In The **Voice Channel**, Go Join Some.`
            }
        })
    } else if (command === 'resume') {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `⏯ | Music Has Been **Resumed**.`
            }
        })
        }
        return msg.channel.send({
            embed: {
                color: randomhexcolor,
                description: `❌ | Song Queue Is Empty.`
            }
        })
    }
 
    return undefined;
});
 
async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
  const song = {
        id: video.id,
        title: Discord.Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
        uploadedby: video.channel.title,
        channelurl: `https://www.youtube.com/channel/${video.channel.id}`,
        durationh: video.duration.hours,
        durationm: video.duration.minutes,
        durations: video.duration.seconds,
        request: msg.author,
        channels: voiceChannel.name,
    }
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 100,
            playing: true
        };
        queue.set(msg.guild.id, queueConstruct);
 
        queueConstruct.songs.push(song);
 
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`❌ | Error When Joining The **Voice Channel** Because: *${error}*`);
            queue.delete(msg.guild.id);
            return msg.channel.send({
            embed: {
                color: Math.floor(Math.random() * 16777214) + 1,
                description: `❌ | Error When Joining The **Voice Channel** Because: *${error}*.`
            }
        });
        }
    } else {
      var index = 1;
      var queueembed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`| Added To Queue!`, `https://images-ext-1.discordapp.net/external/YwuJ9J-4k1AUUv7bj8OMqVQNz1XrJncu4j8q-o7Cw5M/http/icons.iconarchive.com/icons/dakirby309/simply-styled/256/YouTube-icon.png`)
      .addBlankField()
      .addField("Title", `[${song.title}](${song.url})`, true)
      .addField("Video Uploader", `[${song.uploadedby}](${song.channelurl})`, true)
      .addField("Duration", `${song.durationm}min ${song.durations}sec`, true)
      .addField("Video ID", `${song.id}`, true)
      .addField("Played By", `${song.request}`, true)
      .addBlankField()
      .setTimestamp()
      .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
      .setFooter(`• Messages For: ${msg.author.tag}`);
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else return msg.channel.send(queueembed);
    }
    return undefined;
}
 
function play(guild, song) {
    const serverQueue = queue.get(guild.id);
 
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
}
    console.log(serverQueue.songs);
 
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === '📶 | Ping Of The Bot Is Too Low,') console.log('Song Ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
 
  let startembed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`| Start Playing`, `https://images-ext-1.discordapp.net/external/YwuJ9J-4k1AUUv7bj8OMqVQNz1XrJncu4j8q-o7Cw5M/http/icons.iconarchive.com/icons/dakirby309/simply-styled/256/YouTube-icon.png`)
  .addBlankField()
  .addField("Title", `[${song.title}](${song.url})`, true)
  .addField("Video Uploader", `[${song.uploadedby}](${song.channelurl})`, true)
  .addField("Duration", `${song.durationm} Minute ${song.durations} Second`, true)
  .addField("Video ID", `${song.id}`, true)
  .addField("Played By", `${song.request}`, true)
  .addField("Voice Room", `At: ${song.channels}`, true)
  .addField("Volume", `Current: ${serverQueue.volume}%`, true)
  .addBlankField()
  .setTimestamp()
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .setFooter("If you can't hear the music, please reconect. If you still don't hear it, maybe the bot is restarting!");
 
    serverQueue.textChannel.send(startembed);
};

bot.login(process.env.TOKEN)
