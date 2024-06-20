import PogObject from "../../PogData";
import settings from "../newSetting.js";
import { HUD } from "./core.js"


// const effectHUD = new PogObject("SlayerMod", {
//     smoldering: 0,
//     wisp: 0,
//     toggle: false,
//     x: undefined,
//     y: undefined

// }, "config/effects.json");

if (HUD.firstLoadEffectHUD === undefined) {
    HUD.smoldering = 0,
    HUD.wisp = 0,
    HUD.toggleEffectHUD = false,
    HUD.xEffectHUD =  undefined,
    HUD.yEffectHUD = undefined
    HUD.firstLoadEffectHUD = true
    HUD.save()
}



function minuteSecondFormat(time) {
    if (time <= 1 ) return '&cINACTIVE'
    const minutes = `${Math.floor(time / 60)}`.padStart(2, "0");
    const seconds = `${time - minutes * 60}`.padStart(2, "0");
    return `${minutes}:${seconds}`;
}

function inDungeons() {
    try {
        return TabList?.getNames()?.some(a => a.removeFormatting() == 'Dungeon: Catacombs')
    } catch (e) {
        console.log(e) 
    }
}


const smolderingDisplay = new Display().setBackgroundColor(Renderer.color(0, 0, 0, 100)).setBackground("FULL");
smolderingDisplay.setLine(0,` &aPolarization&r: ${minuteSecondFormat(HUD.smoldering)}  `)
smolderingDisplay.setLine(1,` &fWisp&r: ${minuteSecondFormat(HUD.wisp)} `)
if (HUD.xEffectHUD === undefined || HUD.yEffectHUD === undefined) {
    smolderingDisplay.setRenderLoc(Renderer.screen.getWidth()-100, Renderer.screen.getHeight()/2 - 140)
} else {
    smolderingDisplay.setRenderLoc(HUD.xEffectHUD, HUD.yEffectHUD)
}
if (!HUD.toggleEffectHUD) {
    smolderingDisplay.hide()
}


register('chat', () => {
    HUD.smoldering = 3600
}).setCriteria('&r&aYou ate a &r&aRe-heated Gummy Polar Bear&r&a!&r')
register('chat', () => {
    if (TabList.getNames().some( a => a.removeFormatting().includes("Parrot"))) HUD.wisp = 2400
    else HUD.wisp = 1800
}).setCriteria("&a&lBUFF! &fYou splashed yourself with &r&bWisp's Ice-Flavored Water I&r&f! Press TAB or type /effects to view your active effects!&r")


register('step', () => {
    
    if (HUD.smoldering <= 0 && HUD.wisp <= 0) return
    if (!Scoreboard.getTitle().removeFormatting().includes("SKYBLOCK") || inDungeons() ) return
    if (HUD.smoldering >= 0) HUD.smoldering--
    if (HUD.wisp >= 0) HUD.wisp--
    
    smolderingDisplay.setLine(0,` &aPolarization&r: ${minuteSecondFormat(HUD.smoldering)}  `)
    smolderingDisplay.setLine(1,` &fWisp&r: ${minuteSecondFormat(HUD.wisp)} `)
}).setFps(1)

register('gameunload', () => {
    HUD.save() 
})


function updateEffectHud() {
    if (!settings().displayEffectHud) {
        smolderingDisplay.show()
        HUD.toggleEffectHUD = true
        HUD.save()
    } else if (settings().displayEffectHud) {
        smolderingDisplay.hide()
        HUD.toggleEffectHUD = false
        effectHUD.save()
    }
}


register("command", (...args) => {
    if (args[0] === undefined) {
        ChatLib.chat('&f/effect hud: \n toggle - show/hide the HUD \n move - set location')
        return
    }
    switch(args[0].toLowerCase()) {
        case "toggle":
            if (!HUD.toggleEffectHUD) {
                smolderingDisplay.show()
                HUD.toggleEffectHUD = true
                HUD.save()
                ChatLib.chat('&5&l[SlayerTracker]:&fEffect Hud has been toggled: &aON')
            } else {
                smolderingDisplay.hide()
                HUD.toggleEffectHUD = false
                HUD.save()
                ChatLib.chat('&5&l[SlayerTracker]:&fEffect Hud has been toggled: &cOFF')
            }
            break
        case "move":
            smolderingDisplay.setRenderLoc(args[1], args[2])
            HUD.xEffectHUD = args[1]
            HUD.yEffectHUD = args[2]
            HUD.save()
            break
        case "update":
            if (!settings().displayEffectHud) {
                smolderingDisplay.show()
                HUD.toggleEffectHUD = true
                HUD.save()
            } else if (settings().displayEffectHud) {
                smolderingDisplay.hide()
                HUD.toggleEffectHUD = false
                HUD.save()
            }
            break
        case "changegui":
            let moveEffectHUD = new Gui()
            moveEffectHUD.open()
            moveEffectHUD.registerDraw((mouseX,mouseY) => {
                smolderingDisplay.setRenderLoc(mouseX,mouseY)
            })
            moveEffectHUD.registerClosed(() => {
                HUD.xEffectHUD = smolderingDisplay.getRenderX()
                HUD.yEffectHUD = smolderingDisplay.getRenderY()
                HUD.save()
            })
            break
        default: ChatLib.chat(`/smeffecthud ${...args} does not exist`)  
    }       
}).setName("smeffecthud")
