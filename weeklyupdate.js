require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()

console.log("opened weekly")

function weeklyUpdate() {
    client.login(process.env.BOT_TOKEN).then(() =>{
        console.log("running scheduled function");
        var guild = client.guilds.get("608597595526529054")
        if (guild && guild.channels.get("609599707253047296")) {
            console.log("posting now")
            guild.channels.get("609599707253047296").send("test post").then(() => client.destroy())
        } else {
            console.log("no post")
        }
        client.destroy()
    })
}