import Settings from "../Settings"


register("chat", (pet,event) =>{
    if (Settings.autoPetFormatter) {
        cancel(event)
        ChatLib.chat(`&3Autopet &9>&r ${pet}`)
    }
}).setCriteria("&cAutopet &eequipped your ${pet}&e! &a&lVIEW RULE&r")

