import request from "../../requestV2/index.js";
import Settings from "../Settings.js";

let apiKey = Settings.apiInput
let apiKeyWorks = false
let isAatrox 


let typeOfSlayer 
let slayerTier
let name
let startDate 
let slayerSpawnDate
let endDate
let spawned = false
let questActivated = false

const xp = {
    blazes: undefined,
    endermen: undefined,
    spiders: undefined,
    zombies: undefined,
    wolves: undefined,
    vampires: undefined,
}

const kills = {
    blazes: {
        I: undefined,
        II: undefined,
        III: undefined,
        IV: undefined,
    },
    endermen: {
        I: undefined,
        II: undefined,
        III: undefined,
        IV: undefined,
    },
    spiders: {
        I: undefined,
        II: undefined,
        III: undefined,
        IV: undefined,
    },
    zombies: {
        I: undefined,
        II: undefined,
        III: undefined,
        IV: undefined,
        V: undefined,
    },
    wolves: {
        I: undefined,
        II: undefined,
        III: undefined,
        IV: undefined,
    },  
    vampires: {
        I: undefined,
        II: undefined,
        III: undefined,
        IV: undefined,
        V: undefined,
    },
}

const xpGained = {
    I: 5,
    II: 25,
    III: 100,
    IV: 500,
    V: 1500,
}
const xpGainedVampires = {
    I : 10,
    II : 25,
    III : 60,
    IV : 120,
    V: 150 
}
const coolerSoundingNames = {
    blazes: 'Inferno Demonlord',
    endermen: 'Voidgloom Seraph',
    spiders: 'Tarantula BroodFather',
    zombies: 'Revenant Horror',
    wolves:  'Sven Packmaster',
    vampires: 'Riftstalker Bloodfiend',
}

function getSlayerXP() {
    apiKey = Settings.apiInput
    let uuid = Player.getUUID().split('-').join("")
    let selectedProfile
    request({
        url: `https://api.hypixel.net/skyblock/profiles?key=${apiKey}&uuid=${uuid}`,
        json: true,
    }).then(data => {
        // finds the current profile selected
        data.profiles.forEach((element,i) => {
            if (element.selected) selectedProfile = i
        })

        // retrieve the user's slayer xp and kills
        const slayerSection = data.profiles[selectedProfile].members[uuid].slayer_bosses
        xp.blazes = slayerSection.blaze.xp
        xp.endermen = slayerSection.enderman.xp
        xp.spiders = slayerSection.spider.xp
        xp.wolves = slayerSection.wolf.xp
        xp.zombies = slayerSection.zombie.xp
        xp.vampires = slayerSection.vampire.xp

        kills.blazes["I"] = slayerSection.blaze.boss_kills_tier_0
        kills.blazes["II"] = slayerSection.blaze.boss_kills_tier_1
        kills.blazes["III"] = slayerSection.blaze.boss_kills_tier_2
        kills.blazes["IV"] = slayerSection.blaze.boss_kills_tier_3

        kills.endermen["I"] = slayerSection.enderman.boss_kills_tier_0
        kills.endermen["II"] = slayerSection.enderman.boss_kills_tier_1
        kills.endermen["III"] = slayerSection.enderman.boss_kills_tier_2
        kills.endermen["IV"] = slayerSection.enderman.boss_kills_tier_3

        kills.wolves["I"] = slayerSection.wolf.boss_kills_tier_0
        kills.wolves["II"] = slayerSection.wolf.boss_kills_tier_1
        kills.wolves["III"] = slayerSection.wolf.boss_kills_tier_2
        kills.wolves["IV"] = slayerSection.wolf.boss_kills_tier_3

        kills.spiders["I"] = slayerSection.spider.boss_kills_tier_0
        kills.spiders["II"] = slayerSection.spider.boss_kills_tier_1
        kills.spiders["III"] = slayerSection.spider.boss_kills_tier_2
        kills.spiders["IV"] = slayerSection.spider.boss_kills_tier_3

        kills.zombies["I"] = slayerSection.zombie.boss_kills_tier_0
        kills.zombies["II"] = slayerSection.zombie.boss_kills_tier_1
        kills.zombies["III"] = slayerSection.zombie.boss_kills_tier_2
        kills.zombies["IV"] = slayerSection.zombie.boss_kills_tier_3
        kills.zombies["V"] = slayerSection.zombie.boss_kills_tier_4
        
        kills.vampires["I"] = slayerSection.vampire.boss_kills_tier_0
        kills.vampires["II"] = slayerSection.vampire.boss_kills_tier_1
        kills.vampires["III"] = slayerSection.vampire.boss_kills_tier_2
        kills.vampires["IV"] = slayerSection.vampire.boss_kills_tier_3
        kills.vampires["V"] = slayerSection.vampire.boss_kills_tier_4

        ChatLib.chat("&5&l[SlayerTracker]:&r&a API reloaded!&r")
        apiKeyWorks = true

    }).catch(e => {
        ChatLib.chat('&5&l[SlayerTracker]:&r&4 Unable to load data from API &r \n run &4/slayertracker reload or check API key&r')
        ChatLib.chat(e)
    }); 
}

function checkMayor() {
    request({
        url: `https://api.hypixel.net/v2/resources/skyblock/election`,
        json: true,
    }).then(data => {
        // finds if Aatrox has the 25% more XP perk
        const perks = data.mayor.perks
        perks.forEach(element => {
            if (element.name == "Slayer XP Buff") isAatrox = true
        })
        if (isAatrox) {
            if (xpGained.IV !== 625) {
                for (x in xpGained) {
                    xpGained[x] *= 1.25
                }
            }
            ChatLib.chat("&5&l[SlayerTracker]:&r&a 25% XP Buff is Active")
        }
        else {
            ChatLib.chat("&5&l[SlayerTracker]:&r&4 No 25% XP Buff")
            isAatrox = false
        }
    }).catch(e => {
        setTimeout(() => {
            ChatLib.chat('&5&l[SlayerTracker]:&r&4Failed to find out the mayor &r \n run &4/slayertracker reload or check API key&r')
        }, 4000);
        ChatLib.chat(e)
    }); 
}

register('serverConnect', () => {
    if (Settings.apiInput == '') {
        setTimeout(() => {
            ChatLib.chat('&5&l[SlayerTracker]:&r&4 run /slayertracker to set API key')
        }, 3000);
    } else {
        getSlayerXP() 
        checkMayor()
    }  
})

register("command", (...args) => {
    if (!args || args[0] === undefined) {
        Settings.openGUI()
        return
    }
    else if (args[0].toLocaleLowerCase() === "reload") {
        getSlayerXP()
        checkMayor()
    }


}).setName("slayertracker")


function slayerType(name) {
    let words = name.split(" ")
    slayerTier = words[2]
    switch(words[0].toLowerCase()) {
        case 'inferno': return "blazes"
        case 'voidgloom' : return "endermen"
        case 'tarantula': return "spiders"
        case 'sven': return "wolves"
        case 'revenant': return "zombies"
        case 'riftstalker': return "vampires"
        default: break
    }
}


const slayerNames = ["Inferno", "Voidgloom", "Tarantula", "Sven", "Revenant", "Riftstalker"]
register('step', () => {
    if (spawned && questActivated) return
    let currentScoreboard = Scoreboard.getLines()
    currentScoreboard.forEach((line, i) => {
        let thisLine = ChatLib.removeFormatting(line)
        if (thisLine.includes("Slay the boss!") && !spawned) {
            slayerSpawnDate = Date.now()
            spawned = true
        } 
        if (thisLine.includes("Slayer Quest") && !questActivated) {
            questActivated = true
            slayerNames.forEach(element => {
                if (ChatLib.removeFormatting(currentScoreboard[i-1]).toString().includes(element)) {
                    typeOfSlayer = slayerType(ChatLib.removeFormatting(currentScoreboard[i-1]).toString())
                }
            });
            name = coolerSoundingNames[typeOfSlayer]
            startDate = Date.now()
        }  
    });
}).setFps(1)

// detect if slayer restarted
register("chat", (xp,slayerType) => {
    questActivated = false
    spawned = false
}).setCriteria("&r   &5&l» &7Slay &c${xp} Combat XP &7worth of ${slayerType}&7.&r")

// checks if boss is killed and adds the xp to the total depending on the mayors
register("chat", () => {
    endDate = Date.now()
    spawned = false
    questActivated = false

    if (!isAatrox && slayerType == "vampires") {
        xp[typeOfSlayer] += xpGainedVampires[slayerTier]
    } else {
        xp[typeOfSlayer] += xpGained[slayerTier]
    }
    kills[typeOfSlayer][slayerTier]++

    let bossSpawnedAndKilled = Math.round((endDate - startDate) / 1000)
    let spawnTime = Math.round((slayerSpawnDate - startDate) / 1000)
    let bossKilled = ((endDate - slayerSpawnDate) / 1000).toFixed(2)
    if (name !== undefined) {
        setTimeout(() => {
            if (apiKeyWorks) {
                ChatLib.chat(`&5&l[${name} ${slayerTier}]: &a${xp[typeOfSlayer].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}&r &dXP | &a${kills[typeOfSlayer][slayerTier].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} &dKills&r`)
            } else {
                ChatLib.chat("&5&l[SlayerTracker]:&r&4 Unable to fetch slayer data from API")
                xp[typeOfSlayer] += xpGained
                kills[typeOfSlayer][slayerTier]++
            }
                // ChatLib.chat(`&d Slayer took &r&a${bossSpawnedAndKilled}&d seconds to spawn and kill&r`)
                // ChatLib.chat(`&d Slayer took &r&a${bossKilled}&d seconds to kill&r`)
                ChatLib.chat(`&5>&d Total: &a${bossSpawnedAndKilled}&d seconds | Spawn: &a${spawnTime}&d seconds | Kill: &a${bossKilled}&d seconds`)   
        }, 1000);
    }
}).setCriteria("&r  &r&a&lSLAYER QUEST COMPLETE!&r")

// rng meter
register('chat', (amount,event) => {
    cancel(event)
    let tabLines = TabList.getNames()
    let rngMeter 
    for (let i=0;i<tabLines.length;i++) {
        if (tabLines[i].removeFormatting().includes("RNG Meter:")) {
            let unupdatedMeter = tabLines[i+2].removeFormatting().split("/")
            unupdatedMeter[0] = amount
            rngMeter = `&5&l[RNG Meter]:&r${tabLines[i+1]} - &d${unupdatedMeter.join('/')}`
            break
        }
    }
    setTimeout(() => {
        ChatLib.chat(rngMeter)
    }, 1000);

}).setCriteria("   &dRNG Meter &f- &d${amount} Stored XP&r")






