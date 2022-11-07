const got = require('got');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({
    partials: [
        'MESSAGE', 'CHANNEL', 'REACTION'
    ],
    intents: [Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING]
})
const mongoose = require("mongoose");
const config = require("./jsons/config.json")
const {save_URL} = require("./database/save_url/save");
const {Validate} = require("./database/validate/validate");

mongoose.connect(config.mongo_url, {
    config: {
        autoIndex: true
    }
})
    .then(() => {
        console.log("DB connected");
    })
    .catch((e) => {
        console.log(e);
    });

client.on('ready', async() => {
    var filter_url = [];
    let original_channel = client.channels.cache.get(config.channel_to_copy);
    // var history = JSON.parse(fs.readFileSync('./jsons/history.json'));
    let check = async(cid, link) => {
        if (link === null) {
            console.log("link is null")
        }
        if (typeof link !== undefined && link) {

    const history = await Validate(link);
    //console.log(history)
    if (history===false) {

        const saved = await save_URL(link);
        if (saved) {

            sendecchi(cid, link);
            return true;
        }}

    
        return false;
        }
    }

    let sendecchi = async(chann, address) => {
    let channel = client.channels.cache.get(chann)
        if (typeof address !== undefined && address) {
        try {
                    
        
                if(!filter_url.includes(address)){
                    channel.send(address);
                    filter_url.push(address)
                }
        } catch (error) {
            console.log(error)
        }
    

        }

    };

    original_channel.send("Sending")
    var sub = fs.readFileSync('./jsons/subreddits.json');
    var subb = JSON.parse(sub);

    subb.map(async(a) => {
        
        got(`https://www.reddit.com/r/${a}/top/.json`).then(async(response) => {

            var content = response.body;
            try {
                let url_overridden_by_dest = content.match(/"url_overridden_by_dest": "https?:\/\/[i?.+redd.it]*[gfyvat.com]*[imgur.com]*[redgifs.com]*\/\w+.?[\w]*[^.]/gmisd);
                
                var data = fs.readFileSync('./jsons/channels.json');
                var json = JSON.parse(data);
                if (!JSON.stringify(json).includes(a)) {

                    try {
                        await original_channel.clone({name: a}).then(async(clonedChannel) => {
                                let originalPosition = original_channel.position;

                                var data = fs.readFileSync('./jsons/channels.json');
                                var json = JSON.parse(data);

                                let created_channel = {
                                    [a]: clonedChannel.id
                                }
                                json.push(created_channel);

                                fs.writeFileSync('./jsons/channels.json', JSON.stringify(json), function writeJSON(err) {
                                    if (err) {
                                        console.log(`File writing error -> ${err}`)
                                    }

                                })
                                clonedChannel.setPosition(originalPosition);
                                url_overridden_by_dest.map(aa => {
                                    aa = aa.replace(/"url_overridden_by_dest": "/ig, "");
                                    aa = aa.replace(/"/ig, "");
                                
                                    setTimeout(async function () {
                                    await check(clonedChannel.id, aa);
                                    }, 4000);

                                })
                            });

                    } catch (e) {
                        console.log(e)
                    }

                }
                if (JSON.stringify(json).includes(a)) {
                    json.map(c => {

                        Object.keys(c).find(async key => {

                                if (key === a) {

                                    let channelid = JSON.stringify(c).match(/[0-9]+/);

                                    const result_channel = channelid[0]

                                    url_overridden_by_dest?.map(async(aa) => {
                                            aa = aa.replace(/"url_overridden_by_dest": "/ig, "");
                                            aa = aa.replace(/"/ig, "");
                                            setTimeout(async function () {
                                            await check(result_channel, aa);
                                            }, 4000);
                                        })

                                }
                            });

                    });

                }
            } catch (e) {
                console.log(e)
            }
        })

    })


    setTimeout(async function () {
        process.exit()
    }, 300000);

})

client.login(config.token)