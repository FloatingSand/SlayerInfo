import PogObject from "../../PogData";
import settings from "../newSetting.js"
import { HUD } from "./core.js";


if (HUD.firstLoadArrowHUD === undefined) {
    HUD.toggleArrowHUD = false,
    HUD.xArrowHUD =  undefined,
    HUD.yArrowHUD = undefined
    HUD.firstLoadArrowHUD = true
    HUD.save()
}

let arrowCount = undefined
let toxicTotal = 0
let twilightTotal = 0


const arrowHud = new Display().setBackgroundColor(Renderer.color(0, 0, 0, 100)).setBackground("FULL");
arrowHud.setLine(0,`&6Arrow: &f??? &6| &dTwilight: &c${twilightTotal} &6| &aToxic: &f${toxicTotal}`)
if (HUD.xArrowHUD === undefined || HUD.yArrowHUD === undefined) arrowHud.setRenderLoc(300,400)
else arrowHud.setRenderLoc(HUD.xArrowHUD,HUD.yArrowHUD)
if (HUD.toggleArrowHUD) arrowHud.show()
else arrowHud.hide()



register('step',() => {
    if(Player.getHeldItem()?.getID() == "261" && HUD.toggleArrowHUD) {
        let twilightTotalCountThisSession = 0
        let toxicTotalCountThisSession = 0
        let totalFlintsInInventory = 0

        let arrowInInventory = false
        let flintsInInventory = 0

        let inventory =  Player.getInventory()
        let quiverSlot = inventory.getStackInSlot(8).getLore()

        inventory.getItems().forEach(item => {
            if (item == null) return
        
            if(item.getName().removeFormatting() == "Twilight Arrow Poison") {
                twilightTotalCountThisSession += item.getStackSize()
            }
            if(item.getName().removeFormatting() == "Toxic Arrow Poison") {
                toxicTotalCountThisSession += item.getStackSize()
            }
            if (item.getName().removeFormatting() == "Flint Arrow") {
                flintsInInventory += item.getStackSize()
                arrowInInventory = true
            }
            
        })
        if (!arrowInInventory) {
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
        }

        totalFlintsInInventory = flintsInInventory
        twilightTotal = twilightTotalCountThisSession
        toxicTotal = toxicTotalCountThisSession
        if (!arrowInInventory) arrowHud.setLine(0,`&6Arrow: &f${arrowCount} &6| &dTwilight: &f${twilightTotal} &6| &aToxic: &f${toxicTotal}`)
        else arrowHud.setLine(0,`&6Flints: &f${totalFlintsInInventory} &6| &dTwilight: &f${twilightTotal} &6| &aToxic: &f${toxicTotal}`)
    }
}).setDelay(2)






register("command", (...args) => {
    if (args[0] === undefined) {
        ChatLib.chat('&f/arrow hud: \n toggle - show/hide the HUD \n move - set location')
        return
    }
    switch(args[0].toLowerCase()) {
        case "toggle":
            if (!HUD.toggleArrowHUD) {
                arrowHud.show()
                HUD.toggleArrowHUD = true
                HUD.save()
                ChatLib.chat('&5&l[SlayerTracker]:&fArrow Hud has been toggled: &aON')
            } else if (HUD.toggleArrowHUD) {
                arrowHud.hide()
                HUD.toggleArrowHUD = false
                HUD.save()
                ChatLib.chat('&5&l[SlayerTracker]:&ffArrow Hud has been toggled: &cOFF')
            }
            break
        case "move":
            arrowHud.setRenderLoc(args[1], args[2])
            HUD.xArrowHUD = args[1]
            HUD.yArrowHUD = args[2]
            HUD.save()
            break
        case "update":
            if (!settings().displayArrowHud) {
                arrowHud.show()
                HUD.toggleArrowHUD = true
                HUD.save()
            } else if (settings().displayArrowHud) {
                arrowHud.hide()
                HUD.toggleArrowHUD = false
                HUD.save()
            }
            break
        case "changegui":
            let moveArrowHUD = new Gui()
            moveArrowHUD.open()
            moveArrowHUD.registerDraw((mouseX,mouseY) => {
                arrowHud.setRenderLoc(mouseX,mouseY)
            })
            moveArrowHUD.registerClosed(() => {
                HUD.xArrowHUD = arrowHud.getRenderX()
                HUD.yArrowHUD = arrowHud.getRenderY()
                HUD.save()
            })
        break
        default:  ChatLib.chat(`/effecthud ${...args} does not exist`)  
    }
        
}).setName("smarrowhud")