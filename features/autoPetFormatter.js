import Settings from "../Settings"

register("chat", (level,pet,event) =>{
    if (Settings.autoPetFormatter) {
        cancel(event)
        ChatLib.chat(`&3Autopet &f> &a[Lvl ${level}] ${pet}`)
    }
}).setCriteria("&cAutopet &eequipped your &7[Lvl ${level}] ${pet}&e! &a&lVIEW RULE&r")

