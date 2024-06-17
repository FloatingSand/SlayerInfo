import PogObject from "../../PogData"


const effectHUD = new PogObject("SlayerMod", {
    smoldering: 0,
    wisp: 0,
    toggle: false,
    x: undefined,
    y: undefined

}, "config/effects.json");

function minuteSecondFormat(time) {
    if (time <= 0 ) return '&cINACTIVE'
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
let smolderingPolarization = effectHUD.smoldering
let wispIceFlavoredWater = effectHUD.wisp

const smolderingDisplay = new Display().setBackgroundColor(Renderer.color(0, 0, 0, 100)).setBackground("FULL");
smolderingDisplay.setLine(0,` &aPolarization&r: ${minuteSecondFormat(effectHUD.smoldering)}  `)
smolderingDisplay.setLine(1,` &fWisp&r: ${minuteSecondFormat(effectHUD.wisp)} `)
if (effectHUD.x === undefined || effectHUD.y === undefined) {
    smolderingDisplay.setRenderLoc(Renderer.screen.getWidth()-100, Renderer.screen.getHeight()/2 - 140)
} else {
    smolderingDisplay.setRenderLoc(effectHUD.x, effectHUD.y)
}
if (!effectHUD.toggle) {
    smolderingDisplay.hide()
}


register("command", (...args) => {
    if (!args || args[0] === undefined) {
        ChatLib.chat('&f/effect hud: \n toggle - show/hide the HUD \n move - set location')
        return
    } else if (args[0].toLocaleLowerCase() === "toggle") {
        if (!effectHUD.toggle) {
            smolderingDisplay.show()
            effectHUD.toggle = true
            effectHUD.save()
            ChatLib.chat('&5&l[SlayerTracker]:&fEffect Hud has been toggled: &aON')
        } else {
            smolderingDisplay.hide()
            effectHUD.toggle = false
            effectHUD.save()
            ChatLib.chat('&5&l[SlayerTracker]:&fEffect Hud has been toggled: &cOFF')
        }
    } else if (args[0].toLowerCase() === "move") {
        smolderingDisplay.setRenderLoc(Renderer.screen.getWidth()-100, Renderer.screen.getHeight()/2 - 140)
        effectHUD.x = Renderer.screen.getWidth()-100
        effectHUD.y = Renderer.screen.getHeight()/2 - 140
        effectHUD.save()
    }
    
    else ChatLib.chat(`/effecthud ${...args} does not exist`)  
        
}).setName("effecthud")


register('chat', () => {
    effectHUD.smoldering = 3600
}).setCriteria('&r&aYou ate a &r&aRe-heated Gummy Polar Bear&r&a!&r')

register('gameunload', () => {
    effectHUD.save() 
})

register('step', () => {
    if (!Scoreboard.getTitle().removeFormatting().includes("SKYBLOCK") || inDungeons() ) return
    if (smolderingPolarization >= 0) effectHUD.smoldering--
    if (wispIceFlavoredWater >= 0) effectHUD.wisp--
    
    smolderingDisplay.setLine(0,` &aPolarization&r: ${minuteSecondFormat(effectHUD.smoldering)}  `)
    smolderingDisplay.setLine(1,` &fWisp&r: ${minuteSecondFormat(effectHUD.wisp)} `)
}).setFps(1)
