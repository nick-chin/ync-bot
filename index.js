require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://studentlife.yale-nus.edu.sg/dining-experience/daily-dining-menu/';
var he = require('he');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('guildMemberAdd', member => {
    if (member.bot) return;
    member.guild.channels.get('608605275741618183').send(
        "Welcome to the server, " + "<@" + member.id + ">! Please bring pizza the next time you come. " +
        "But for now, please change your username to your IRL name by right clicking your profile on the right " +
        "and going to `change nickname` so everyone can identify you easily. This will not affect your other servers. " +
        "Have fun! To get started, checkout the <#608615874487910431> for more information."
    );
})

let prefix = "bird";

client.on('message', async msg => {
    var words = msg.content.split(' ').map(x => x.toLowerCase())
    if (words[0] != prefix || msg.author.bot || words.length < 2) return;

    if (words[0] == prefix && words[1] == 'ping') {
        const m = await msg.channel.send("Ping?");
        m.edit(`Pong! Latency is \`${m.createdTimestamp - msg.createdTimestamp}ms\`.`);
    }

    if (words[0] == prefix && words[1] == 'calls') {
        msg.channel.send(msg.author + " here is a list of commands:\n\n" +
            "`addevent` - allows you to post on the announcements page through our standardized format\n" +
            "`buttery` - lists the buttery timings\n" +
            "`dininghall` - lists the dining hall operating hours\n" +
            "`emergency` - lists emergency contact info\n" +
            "`firstaid` - list of first aid locations and list of those who are certified to give first aid\n" +
            "`gym` - lists the gym operating hours\n" +
            "`map` - attaches the campus map\n" +
            "`menu <meal>` - posts the dining hall menu of the meal you selected, e.g. breakfast, dinner\n" +
            "`where <place>` – prints out a rough location of the specified place in YNC (e.g. classroom locations)\n")
    }

    if (words[0] == prefix && words[1] == 'dininghall') {
        msg.channel.send("__**Dining Hall regular operating hours**__:\n\n" +
            "\t__Monday – Friday__:\n" +
            "\t\tBreakfast: 7:30 AM – 9:30 AM\n" +
            "\t\tLunch: 11:30 AM – 1:30 PM\n" +
            "\t\tDinner: 6:00 PM – 8:30 PM\n\n" +
            "\t__Saturday – Sunday and Public Holidays__:\n" +
            "\t\tBrunch: 10:00 AM – 1:00 PM\n" +
            "\t\tDinner: 6:00 PM – 8:30 PM");
    }

    if (words[0] == prefix && words[1] == 'agora') {
        msg.channel.send("__**Cafe Agora regular operating hours**__:\n\n" +
            "\t__Monday – Friday__:\n" +
            "\t\t8:30 AM – 7:00 PM\n\n" +
            "\t__Saturday – Sunday and Public Holidays__:\n" +
            "\t\tClosed")
    }

    if (words[0] == prefix && words[1] == 'gym') {
        msg.channel.send("__**Gym regular operating hours**__: 6:00 AM – 2:00 AM")
    }

    if (words[0] == prefix && words[1] == 'emergency') {
        msg.channel.send("__***Emergency Info***__\n\n" +
            "__**In an Emergency**__\n" +
            "Call Yale-NUS Campus Security at **[omitted for archive]**\n" +
            "Call this hotline in the event there is a physical or psychological threat on campus.\n\n" +

            "__**Counselling and Psychological Services**__\n" +
            "Call NUS Lifeline 24-hour service hotline at **[omitted for archive]** (Centre for Effective Living) " +
            "in the event of life-threatening physical and/or psychological emergencies. " +
            "Call University Counselling Services (UCS) at **[omitted for archive]** if students require same-day" +
            " intervention following psychological emergencies. They can walk-in to meet" +
            " with on-call counselor or psychologist during office hours (Mon -Fri: 9am – 5pm).\n\n" +

            "__**Medical**__\n" +
            "Call NUH 24-hour service hotline on **[omitted for archive]** for medical support in the event of medical emergencies." +
            "Call **995** for Singapore Civil Defense Force (SCDF) Ambulance in event of major physical or psychological injuries.\n\n")
    }

    if (words[0] == prefix && words[1] == 'firstaid') {
        msg.channel.send(
            "__**First Aid Locations**__:\n\n" +
            "\t__RC1 – Saga__:\n" +
            "\t\tRector’s office\n" +
            "\t\tCommon Lounge\n" +
            "\t\tButtery\n" +
            "\t\tDining Hall\n" +
            "\t\tDF’s Suite #1\n" +
            "\t\tDF’s Suite #2\n\n" +

            "\t__RC2 – Elm__:\n" +
            "\t\tRector’s office\n" +
            "\t\tCommon Lounge\n" +
            "\t\tButtery\n" +
            "\t\tDining Hall\n" +
            "\t\tDF’s Suite #1\n" +
            "\t\tDF’s Suite #2\n\n" +

            "\t__RC3 – Cendana__:\n" +
            "\t\tRector’s office\n" +
            "\t\tCommon Lounge\n" +
            "\t\tButtery\n" +
            "\t\tDining Hall\n" +
            "\t\tDF’s Suite #1\n" +
            "\t\tDF’s Suite #2\n\n" +

            "\t__East Core__:\n" +
            "\t\tFitness Center\n" +
            "\t\tMPH #1\n" +
            "\t\tMPH #2\n" +
            "\t\tDoS Office\n" +
            "\t\tAdmissions Office, Admin Block\n" +
            "\t\tLibrary\n" +
            "\t\tScience Laboratory 2\n" +
            "\t\tScience Honours Wing\n\n" +

            "\t__West Core__:\n" +
            "\t\tERT Arts Office\n" +
            "\t\tStudio 4\n" +
            "\t\tStudio 5\n" +
            "\t\tBlack Box Stage\n" +
            "\t\tBlack Box Control Room\n" +
            "\t\tPH Back Stage\n" +
            "\t\tPH Control Room\n" +
            "\t\tOutdoor Portable 1\n\n" +

            "__**Certified First Aiders**__:\n" +
            "\t__Staff__\n" +
            "\t\t[omitted for archive]\n" +
            "\t\t[omitted for archive]\n\n" +

            "\t__Students__\n" +
            "\t\t[omitted for archive]\n" +
            "\t\t[omitted for archive]\n" +
            "\t\t[omitted for archive]\n" +
            "\t\t[omitted for archive]")
    }

    if (words[0] == prefix && words[1] == 'map') {
        msg.channel.send(msg.author, { files: ["lib/campus-map.png"] })
    }

    if (words[0] == prefix && words[1] == 'where') {
        switch (words[2]) {
            case "cr1": msg.channel.send(msg.author + " CR1 is at: saga ground level next to the laundry room.")
                break;
            case "cr2": msg.channel.send(msg.author + " CR2 is at: saga level 1 under the dining hall.")
                break;
            case "cr3": msg.channel.send(msg.author + " CR3 is at: saga level 1 come out of tower A lift turn right.")
                break;
            case "cr4": msg.channel.send(msg.author + " CR4 is at: saga level 1 between Tower A and B.")
                break;
            case "cr5": msg.channel.send(msg.author + " CR5 is at: saga level 1 come out of tower B left turn left.")
                break;
            case "cr6": msg.channel.send(msg.author + " CR6 is at: saga level 2 come out tower A lift turn right.")
                break;
            case "cr7": msg.channel.send(msg.author + " CR7 is at: saga level 2 come out tower A/B lift go straight.")
                break;
            case "cr8": msg.channel.send(msg.author + " CR8 is at: saga level 2 come out tower A/B lift go straight.")
                break;
            case "cr9": msg.channel.send(msg.author + " CR9 is at: oculus there next to TCT.")
                break;
            case "cr10": msg.channel.send(msg.author + " CR10/KCR is at: left of elm buttery.")
                break;
            case "kcr": msg.channel.send(msg.author + " CR10/KCR is at: left of elm buttery.")
                break;
            case "cr11": msg.channel.send(msg.author + " CR11 is at: elm level 2 somewhere above elm buttery.")
                break;
            case "cr12": msg.channel.send(msg.author + " CR12 is at: elm level 2 somewhere above elm buttery.")
                break;
            case "cr13": msg.channel.send(msg.author + " CR13 is at: elm level 2 somewhere above elm buttery.")
                break;
            case "cr14": msg.channel.send(msg.author + " CR14 is at: elm level 2 next to writers center.")
                break;
            case "cr15": msg.channel.send(msg.author + " CR15 is at: level 1 in the library.")
                break;
            case "cr16": msg.channel.send(msg.author + " CR16 is at: level 1 in the library.")
                break;
            case "cr17": msg.channel.send(msg.author + " CR17 is at: level 1 walk past the gym to opposite cendana gate (it’s a sneaky one).")
                break;
            case "cr18": msg.channel.send(msg.author + " CR18 is at: cendana level 1 come out of tower b lift walk straight its on your left.")
                break;
            case "cr19": msg.channel.send(msg.author + " CR19 is at: cendana level 1 under dining hall.")
                break;
            case "cr20": msg.channel.send(msg.author + " CR20 is at: cendana level 1 come out of tower A lift turn left.")
                break;
            case "cr21": msg.channel.send(msg.author + " CR21 is at: cendana level 2 come out of tower A lift turn left.")
                break;
            case "cr22": msg.channel.send(msg.author + " C22 is at: cendana level 2 somewhere inside the offices.")
                break;
            case "cr23": msg.channel.send(msg.author + " CR23 is at: cendana level 2 somewhere inside the offices.")
                break;
            case "glr": msg.channel.send(msg.author + " Global learning rooms are at: basement level of the library by the elevator.")
                break;
            case "sagaa": msg.channel.send(msg.author + " Saga Tower A is the taller one.")
                break;
            case "sagab": msg.channel.send(msg.author + " Saga Tower B is the taller one.")
                break;
            case "cendanaa": msg.channel.send(msg.author + " Cendana Tower A is the taller one.")
                break;
            case "cendanab": msg.channel.send(msg.author + " Cendana Tower B is the taller one.")
                break;
            case "dh": msg.channel.send(msg.author + " if you dunno where this is then what have u been doing.")
                break;
            case "lt1": msg.channel.send(msg.author + " LT1: from the saga office walk down and turn right near the gate.")
                break;
            case "tct": msg.channel.send(msg.author + " TCT: from oculus walk towards saga it’s on your left before you hit the stairs.")
                break;
            case "pr": msg.channel.send(msg.author + " Practice Rooms: above the perf hall bro.")
                break;
            case "fablab": msg.channel.send(msg.author + " Fabrication Lab: above the black box.")
                break;
            case "artsoffice": msg.channel.send(msg.author + " Arts Office: beside blackbox on the right in the corner.")
                break;
            case "ert": msg.channel.send(msg.author + " ERT: walk down stairs inside library and turn left.")
                break;
            case "dos": msg.channel.send(msg.author + " Dean of Students Office: go agora then climb the stairs opposite agora.")
                break;
            case "admissions": msg.channel.send(msg.author + " Admissions: ground floor by the oculus.")
                break;
            case "registry": msg.channel.send(msg.author + " Registry: Mezzanine (M) floor by the oculus.")
                break;
            case "finance": msg.channel.send(msg.author + " Finance: Mezzanine (M) floor by the oculus.")
                break;
            default: msg.channel.send("Please specify a valid location. e.g. `bird where CR17`\n\n" +
                "__**Locations**__:\n" +
                "`CR1-23 (e.g. CR1, CR17)`, `KCR`, `lab1-3`, `GLR`,\n" +
                "`sagaA`, `sagaB`, `cendanaA`, `cendanaB`, `DH`,\n" +
                "`LT1`, `TCT`, `PR`, `studio1-6`\n" +
                "`fablab`, `artsoffice`, `ERT`, `DOS`,\n" +
                "`admissions`, `registry`, `finance`,\n")
        }
    }

    if (words[0] == prefix && words[1] == 'buttery') {
        msg.channel.send("__**Buttery Timings**__:\n\n" +
            "__Shiok Shack (Saga Buttery)__:\n" +
            "\tTuesday – Thursday: 10:00 PM – 11:30 PM\n\n" +
            "__Shiner's Diner (Elm Buttery)__:\n" +
            "\tMonday – Tuesday, Thursday – Friday: 10:00 PM – 11:30 PM\n\n" +
            "__The Nest (Cendana Buttery)__:\n" +
            "\tSunday – Monday: 10:00 PM – 12:00 MN")
    }

    if (words[0] == prefix && words[1] == 'addevent') {
        msg.channel.send("You have just requested to create an event. Please check your DMs to see how to create one");

        msg.author.send("You have requested to make an event. Please note that these events will be posted immediately and a reminder post " +
            "will be sent to everyone in the weekly updates channel. These posts will can be seen by everyone in the server so be mindful " +
            "of what you post. If we notice that you have been spamming posts, we will revoke your right to make announcments through the bot. " +
            "The bot will ask you a series of questions for your post. The format of the questions are below:\n\n" +
            "1) Upload an image if you have one\n2) Enter a start/due date\n3) Provide some more/contact info\n4) Provide a short description\n5) Preview and confrimation of post\n\n" +
            "You will have some time to upload/type everything but the bot will timeout if you take too long so please be prepared.\n\nTo begin, type `bird post` here.")
    }

    if (words[0] == prefix && words[1] == 'menu') {
        function inner(index) {
            rp(url)
                .then(function (html) {

                    s = '';

                    function capitalizeFirstLetter(string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    }

                    today = $('.active', html).attr('rel')

                    if (index == 2)
                        table = $('.tab_content#' + today, html).find('.col-12').last();
                    else
                        table = $('.tab_content#' + today, html).find('.col-12').eq(index);
                    meal = table.find('h4').text();
                    sections = table.find('b').map(function () {
                        return $(this).text().trim();
                    }).toArray();
                    table.find('h4').remove();

                    // used for proper formatting
                    food = table.text().split('\n').map(s => s.trim()).filter(x => x.replace(/\s+/, '') != '');

                    // for old formatting
                    // used food = table.html().split('<p>')
                    //     .map(x => x.replace(/<[^>].*>?/g, '').replace(/\s+/, ''))
                    //     .map(x => he.decode(x))
                    //     .filter(x => x != '' && x != '\n');

                    console.log(meal);
                    console.log(sections);
                    console.log(food);

                    s += '__***' + capitalizeFirstLetter(meal) + '***__\n\n';
                    for (i = 0; i < sections.length; i++) {
                        s += "__**" + sections[i] + "**__\n";
                        j = food.indexOf(sections[i]) + 1;
                        while (!sections.includes(food[j]) && j < food.length) {
                            s += food[j] + '\n';
                            j++;
                        }
                        s += '\n';
                    }

                    // for old formatting
                    // for (i = 0; i < food.length; i++)
                    //     s += food[i] + '\n'

                    console.log(s)
                    msg.channel.send(msg.author + "\n\n" + s)
                        .catch(function (err) {
                            console.log(err);
                            msg.channel.send("It seems that the menu is too large to be posted on discord. Please see the menu at https://studentlife.yale-nus.edu.sg/dining-experience/daily-dining-menu/." +
                                " This offten occurs when it is Green Tuesday/Thursday (Vegetarian/Vegan day).")
                        });
                })
                .catch(function (err) {
                    console.log(err);
                    msg.channel.send(msg.author + ", I failed to retrieve the menu. Please see the menu here https://studentlife.yale-nus.edu.sg/dining-experience/daily-dining-menu/.")
                });
        }

        switch (words[2]) {
            case 'breakfast':
                inner(0);
                break;
            case 'lunch':
                inner(1);
                break;
            case 'dinner':
                inner(2)
                break;
            case 'brunch':
                inner(0);
                break;
            default:
                msg.channel.send(msg.author + " please provide a meal timing (`breakfast`, `brunch`, `lunch`, `dinner`).")

        }
    }
})


client.on("message", msg => {
    years = ["2018", "2019", "2020", "2021", "2022", "2023"]
    rcs = ["cendana", "elm", "saga"]
    var words = msg.content.split(' ').map(x => x.toLowerCase())
    if (msg.channel.id !== "608713723426635777" || msg.author.bot || words.length != 2) return;

    if (rcs.indexOf(words[0]) == -1) {
        msg.channel.send("Please make sure your RC is valid.");
        return;
    }

    if (years.indexOf(words[1]) == -1) {
        msg.channel.send("Please make sure graduating year is valid.");
        return;
    }

    var rcYear = "";

    msg.member.removeRole("608656549589811220");
    msg.member.removeRole("608656725981003788");
    msg.member.removeRole("608656755894910978");
    msg.member.removeRole("608656782377877505");
    msg.member.removeRole("608656206302806026");
    msg.member.removeRole("608656053759901706");
    msg.member.removeRole("608656137029419008");
    msg.member.removeRole("697712041628008449");
    msg.member.removeRole("697711990751363115");

    switch (words[0]) {
        case "cendana": msg.member.addRole("608656206302806026").catch(console.error); rcYear += "Cendana ";
            break;
        case "saga": msg.member.addRole("608656053759901706").catch(console.error); rcYear += "Saga ";
            break;
        case "elm": msg.member.addRole("608656137029419008").catch(console.error); rcYear += "Elm ";
            break;
        default: return;
    }

    switch (words[1]) {
        case "2018": msg.member.addRole("697712041628008449").catch(console.error); rcYear += "Class of 2018.";
            break;
        case "2019": msg.member.addRole("697711990751363115").catch(console.error); rcYear += "Class of 2019.";
            break;
        case "2020": msg.member.addRole("608656549589811220").catch(console.error); rcYear += "Class of 2020.";
            break;
        case "2021": msg.member.addRole("608656725981003788").catch(console.error); rcYear += "Class of 2021.";
            break;
        case "2022": msg.member.addRole("608656755894910978").catch(console.error); rcYear += "Class of 2022.";
            break;
        case "2023": msg.member.addRole("608656782377877505").catch(console.error); rcYear += "Class of 2023.";
            break;
        default: return;
    }

    msg.channel.send("<@" + msg.author.id + "> you are now part of " + rcYear);
})

function getMenu(index) {
    rp(url)
        .then(function (html) {

            s = '';

            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            today = $('.active', html).attr('rel')

            if (index == 2)
                table = $('.tab_content#' + today, html).find('.col-12').last();
            else
                table = $('.tab_content#' + today, html).find('.col-12').eq(index);
            sections = table.find('b').map(function () {
                return $(this).text().trim();
            }).toArray();
            meal = table.find('h4').text();
            table.find('h4').remove();

            // used for proper formatting
            food = table.text().split('\n').map(s => s.trim()).filter(x => x.replace(/\s+/, '') != '');

            // for old formatting
            // used food = table.html().split('<p>')
            //     .map(x => x.replace(/<[^>].*>?/g, '').replace(/\s+/, ''))
            //     .map(x => he.decode(x))
            //     .filter(x => x != '' && x != '\n');

            console.log(meal);
            console.log(sections);
            console.log(food);

            s += '__***' + capitalizeFirstLetter(meal) + '***__\n\n';
            for (i = 0; i < sections.length; i++) {
                s += "__**" + sections[i] + "**__\n";
                j = food.indexOf(sections[i]) + 1;
                while (!sections.includes(food[j]) && j < food.length) {
                    s += food[j] + '\n';
                    j++;
                }
                s += '\n';
            }

            // for old formating
            // for (i = 0; i < food.length; i++)
            //     s += food[i] + '\n'


            console.log(s)
            client.channels.get("613027048491057165").send("Here is the dining hall menu for the upcoming meal.\n\n" + s)
                .catch(function (err) {
                    console.log(err);
                    client.channels.get("613027048491057165").send("It seems that the menu is too large to be posted on discord. Please see the menu at https://studentlife.yale-nus.edu.sg/dining-experience/daily-dining-menu/." +
                        " This offten occurs when it is Green Tuesday/Thursday (Vegetarian/Vegan day).")
                });
        })
        .catch(function (err) {
            console.log(err);
            client.channels.get("613027048491057165").send("I failed to retrieve the menu. Please see the menu here https://studentlife.yale-nus.edu.sg/dining-experience/daily-dining-menu/.")
        });
}

var CronJob = require('cron').CronJob
new CronJob("0 0 22 * * 0", function () {
    console.log("entered")
    client.channels.get("609632445092069386").fetchMessages({ limit: 100 })
        .then(messages => {
            var current = new Date;
            var first = current.getDate();
            var last = first + 7;
            var firstDay = new Date(current.setDate(first));
            var lastDay = new Date(current.setDate(last));
            console.log(firstDay.toDateString())
            console.log(lastDay.toDateString())

            var regex = /\d+\/\d+\/\d+/
            const datedMessages = messages.filter(msg => {
                var date = msg.embeds[0].fields[0].value
                if (regex.test(date)) {
                    var split = date.split("/");

                    var year = parseInt(split[2]);
                    var month = parseInt(split[1]);
                    var day = parseInt(split[0]);

                    var occurDate = new Date(year, month - 1, day);
                    console.log(occurDate.toDateString());

                    return occurDate > firstDay && occurDate < lastDay
                }
                else return false
            }).array()
            console.log(datedMessages.length)
            if (datedMessages.length == 0) {
                client.channels.get("609599707253047296").send("Looks like there are no events posted for this week 😢. Anyone can use `bird addevent` if they want to advertise their events here!")
            } else {
                client.channels.get("609599707253047296").send("@everyone, here are the upcoming events for the week!")
                for (i = 0; i < datedMessages.length; i++) {
                    msg = datedMessages[i].embeds[0]
                    embed = new Discord.RichEmbed()
                        .setAuthor(msg.author.name, msg.author.iconURL)
                        .setTitle("Announcement")
                        .setDescription(msg.description)
                        .addField("Date of Occurrence", msg.fields[0].value)
                    if (msg.fields[1] !== undefined) embed.addField("More/Contact Info", msg.fields[1].value)
                    if (msg.image != null) embed.setImage(msg.image.url)
                    client.channels.get("609599707253047296").send({ embed })
                }
            }
        })
        .catch(e => {
            console.log(e)
        })
}, null, true, 'Asia/Singapore')



new CronJob("0 10 7 * * 1-5", function () {
    getMenu(0);
}, null, true, 'Asia/Singapore')

new CronJob("0 10 11 * * 1-5", function () {
    getMenu(1);
}, null, true, 'Asia/Singapore')

new CronJob("0 40 17 * * 1-5", function () {
    getMenu(2);
}, null, true, 'Asia/Singapore')

new CronJob("0 40 9 * * 0,6", function () {
    getMenu(0);
}, null, true, 'Asia/Singapore')

new CronJob("0 40 17 * * 0,6", function () {
    getMenu(1);
}, null, true, 'Asia/Singapore')


// adds alumni role to new alumni for that year
new CronJob("0 0 12 11 4 *", function () {
    console.log("adding new alumni")
    currentYear = new Date().getFullYear().toString();
    console.log("current year = " + currentYear)
    let roleID = client.guilds.get("608597595526529054").roles.find(r => r.name === "Class of " + currentYear).id;
    console.log("role = " + roleID)
    let membersWithRole = client.guilds.get("608597595526529054").roles.get(roleID).members;
    console.log(membersWithRole)
    for (let [id, member] of membersWithRole) {
        member.addRole("608657114126221341");
    }

}, null, true, 'Asia/Singapore')

// adds for all past years 
new CronJob("0 0 12 * * 5", function () {
    console.log("checking for new alumi years")
    currentYear = new Date().getFullYear();
    let pastYears = [];
    for (i = 2018; i < currentYear; i++) {
        pastYears.push(i.toString());
    }


    for (year of pastYears) {
        console.log("current year = " + year)
        let roleID = client.guilds.get("608597595526529054").roles.find(r => r.name === "Class of " + year).id;
        console.log("role = " + roleID)
        let membersWithRole = client.guilds.get("608597595526529054").roles.get(roleID).members;
        console.log(membersWithRole)
        for (let [id, member] of membersWithRole) {
            member.addRole("608657114126221341");
        }
    }


}, null, true, 'Asia/Singapore')

client.on("message", msg => {
    var words = msg.content.split(' ').map(x => x.toLowerCase());
    if (msg.author.bot || msg.guild !== null || words[1] !== 'post' || words[0] !== prefix) return;
    const filter = m => m.author.id === msg.author.id;

    img = ""
    date = ""
    contact = ""
    description = ""

    const embed = new Discord.RichEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setColor('#0099ff')
        .setTitle('Announcement')

    msg.author.send("First, upload an image if you have one. If not, just reply `skip`.")
        .then(() => {
            msg.channel.awaitMessages(filter, {
                max: 1,
                time: 120000
            })
                .then((collected) => {
                    console.log(collected.first().content)
                    if (collected.first().attachments.size === 1) {
                        img = collected.first().attachments.first().url;
                        msg.author.send("Image successfully uploaded.");
                        console.log(img)
                        imgDone = true
                        embed.setImage(img)
                    } else {
                        msg.author.send("No image uploaded.");
                        console.log(img)
                        imgDone = true
                    }
                    msg.author.send("Next, please input a start/due date in `dd/mm/yyyy` format. Any incorrect format will fail to have a reminder post (initial post will still be made).")
                        .then(() => {
                            msg.channel.awaitMessages(filter, {
                                max: 1,
                                time: 60000,
                                errors: ['time'],
                            })
                                .then((collected) => {
                                    date = collected.first().content
                                    embed.addField("Date of Occurrence:", date)
                                    msg.author.send("Date has been entered.");
                                    msg.author.send("Now, please input a contact point or a url for more info. If you don't want to enter any, type `skip`.")
                                        .then(() => {
                                            msg.channel.awaitMessages(filter, {
                                                max: 1,
                                                time: 60000,
                                                errors: ['time'],
                                            })
                                                .then((collected) => {
                                                    if (collected.first().content.toLowerCase() == 'skip') {
                                                        msg.author.send("Contact info has been skipped")
                                                    } else {
                                                        contact = collected.first().content
                                                        embed.addField("More/Contact Info:", contact)
                                                        msg.author.send("Contact info has been entered.")
                                                    }
                                                    console.log(contact)
                                                    msg.author.send("Finally, please provide a short description of your event/announcement. " +
                                                        "You will have 5 minutes to input your description. If you don't want to enter any description, type `skip`")
                                                        .then(() => {
                                                            msg.channel.awaitMessages(filter, {
                                                                max: 1,
                                                                time: 300000,
                                                                errors: ['time'],
                                                            })
                                                                .then((collected) => {
                                                                    if (collected.first().content.toLowerCase() == 'skip') {
                                                                        msg.author.send("Description has been skipped.")
                                                                    } else {
                                                                        description = collected.first().content
                                                                        embed.setDescription(description)
                                                                        msg.author.send("Description has been entered.")
                                                                    }
                                                                    console.log(description)
                                                                    msg.author.send("You have successfully uploaded your announcment. Here is a preview of it.")
                                                                    msg.author.send({ embed })
                                                                    msg.author.send("Are you happy with the results? `yes`/`no`. Typing yes will immediately post the announcement." +
                                                                        " Typing no or doing nothing will abandon the process.")
                                                                        .then(() => {
                                                                            msg.channel.awaitMessages(filter, {
                                                                                max: 1,
                                                                                time: 60000
                                                                            })
                                                                                .then((collected) => {
                                                                                    confirmation = collected.first().content.toLowerCase();
                                                                                    if (confirmation == 'y' || confirmation == 'yes') {
                                                                                        msg.author.send("Thank you for your announcement. It has been posted to the announcements channel.")
                                                                                        client.guilds.get("608597595526529054").channels.get("609632445092069386").send("@everyone", { embed })
                                                                                    } else {
                                                                                        msg.author.send("You have confrimed not to post the announcement. Please start again if you wish to do so.")
                                                                                    }
                                                                                })
                                                                                .catch((e) => {
                                                                                    console.log(e)
                                                                                    msg.author.send("Announcement was not made due to timeout.")
                                                                                })
                                                                        })

                                                                })
                                                                .catch(() => {
                                                                    msg.author.send("No description was entered due to timeout.");
                                                                });
                                                        });
                                                })
                                                .catch(() => {
                                                    msg.author.send("No contact info was entered due to timeout.");
                                                });
                                        });
                                })
                                .catch(() => {
                                    msg.author.send("No date was entered due to timeout.");
                                });
                        });
                })
                .catch(() => {
                    msg.author.send("No image uploaded due to timeout.");
                });

        })


})


client.login(process.env.BOT_TOKEN)