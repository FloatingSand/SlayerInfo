import PogObject from "../../PogData";

const effectHUD = new PogObject("SlayerMod", {
    toggleArrowHud: false,
    arrowX: undefined,
    arrowY: undefined
}, "config/HUD.json");

let arrowCount
let toxicTotal = 0
let twilightTotal = 0
register('step',() => {
    if(Player.getHeldItem()?.getID() == "261" && arrowHud) {
        let inventory =  Player.getInventory()


        let quiverSlot = inventory.getStackInSlot(8).getLore()
        for (let i=0;i<quiverSlot.length;i++) {
            let currentLoreLine = quiverSlot[i].removeFormatting()
            if (currentLoreLine.includes("Active Arrow:")) {
                console.log(typeof currentLoreLine)
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
                twilightTotal += item.getStackSize()
            }
            if(item.getName().removeFormatting() == "Toxic Arrow Poison") {
                toxicTotal += item.getStackSize()
            }
        })

    }
}).setDelay(2)


const arrowHud = new Display().setBackgroundColor(Renderer.color(0, 0, 0, 100)).setBackground("FULL");
arrowHud.setLine(0,`$6Arrow: &f${arrowCount} | &dTwilight: &f${twilightTotal} | &aToxic: &f${toxicTotal}`)
if (arrowHud.arrowX === undefined || arrowHud.arrowY === undefined) arrowHud.setRenderLoc(300,400)
else arrowHud.setRenderLoc(arrowHud.arrowX,arrowHud.arrowY)
arrowHud.hide()

register("command", (...args) => {
    if (!args || args[0] === undefined) {
        ChatLib.chat('&f/arrow hud: \n toggle - show/hide the HUD \n move - set location')
        return
    } else if (args[0].toLocaleLowerCase() === "toggle") {
        if (!arrowHud.toggleArrowHud) {
            arrowHud.show()
            arrowHud.toggleArrowHud = true
            arrowHud.save()
            ChatLib.chat('&5&l[SlayerTracker]:&fArrow Hud has been toggled: &aON')
        } else {
            arrowHud.hide()
            arrowHud.toggleArrowHud = false
            arrowHud.save()
            ChatLib.chat('&5&l[SlayerTracker]:&ffArrow Hud has been toggled: &cOFF')
        }
    } else if (args[0].toLowerCase() === "move") {
        smolderingDisplay.setRenderLoc(args[1], args[2])
        effectHUD.arrowX = args[1]
        effectHUD.arrowY = args[2]
        effectHUD.save()
    }
    
    else ChatLib.chat(`/effecthud ${...args} does not exist`)  
        
}).setName("arrowhud")

