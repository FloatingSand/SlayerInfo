import PogObject from "../../PogData";

const arrowHUDCONFIG = new PogObject("SlayerMod", {
    toggle: false,
    x: undefined,
    y: undefined
}, "config/arrowHud.json");

let arrowCount = undefined
let toxicTotal = 0
let twilightTotal = 0

const arrowHud = new Display().setBackgroundColor(Renderer.color(0, 0, 0, 100)).setBackground("FULL");
arrowHud.setLine(0,`&6Arrow: &f${arrowCount} &6| &dTwilight: &f${twilightTotal} &6| &aToxic: &f${toxicTotal}`)
if (arrowHUDCONFIG.x === undefined || arrowHUDCONFIG.y === undefined) arrowHud.setRenderLoc(300,400)
else arrowHud.setRenderLoc(arrowHUDCONFIG.x,arrowHUDCONFIG.y)
if (arrowHUDCONFIG.toggle) arrowHud.show()
else arrowHud.hide()



register('step',() => {
    if(Player.getHeldItem()?.getID() == "261" && arrowHUDCONFIG.toggle) {
        let twilightTotalCountThisSession = 0
        let toxicTotalCountThisSession = 0
        let inventory =  Player.getInventory()
        let quiverSlot = inventory.getStackInSlot(8).getLore()
        for (let i=0;i<quiverSlot.length;i++) {
            let currentLoreLine = quiverSlot[i].removeFormatting()
            if (currentLoreLine.includes("Active Arrow:")) {
                let arrows = currentLoreLine.match(/\((\d+)\)/);
                if (arrows) {
                    arrowCount = arrows[1];
                    break
                }
            }
        }

        inventory.getItems().forEach(item => {
            if (item == null) return
        
            if(item.getName().removeFormatting() == "Twilight Arrow Poison") {
                twilightTotalCountThisSession += item.getStackSize()
            }
            if(item.getName().removeFormatting() == "Toxic Arrow Poison") {
                toxicTotalCountThisSession = 0 += item.getStackSize()
            }
        })
        twilightTotal = twilightTotalCountThisSession
        toxicTotal = toxicTotalCountThisSession
        arrowHud.setLine(0,`&6Arrow: &f${arrowCount} &6| &dTwilight: &f${twilightTotal} &6| &aToxic: &f${toxicTotal}`)
    }
}).setDelay(2)




register("command", (...args) => {
    if (!args || args[0] === undefined) {
        ChatLib.chat('&f/arrow hud: \n toggle - show/hide the HUD \n move - set location')
        return
    } else if (args[0].toLocaleLowerCase() === "toggle") {
        if (!arrowHUDCONFIG.toggle) {
            arrowHud.show()
            arrowHUDCONFIG.toggle = true
            arrowHUDCONFIG.save()
            ChatLib.chat('&5&l[SlayerTracker]:&fArrow Hud has been toggled: &aON')
        } else if (arrowHUDCONFIG.toggle) {
            arrowHud.hide()
            arrowHUDCONFIG.toggle = false
            arrowHUDCONFIG.save()
            ChatLib.chat('&5&l[SlayerTracker]:&ffArrow Hud has been toggled: &cOFF')
        }
    } else if (args[0].toLowerCase() === "move") {
        arrowHud.setRenderLoc(args[1], args[2])
        arrowHUDCONFIG.x = args[1]
        arrowHUDCONFIG.y = args[2]
        arrowHUDCONFIG.save()
    }
    
    else ChatLib.chat(`/effecthud ${...args} does not exist`)  
        
}).setName("arrowhud")

