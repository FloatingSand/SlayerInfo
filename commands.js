import PogObject from "../PogData"


register("command", (...args) => {
    if (args[0] === undefined) {
        ChatLib.command("smopengui",true)
        return
    }
    switch(args[0].toLocaleLowerCase()) {
        case "reload":
            ChatLib.command("smapi reload",true)
            break
        case "setapi":
            ChatLib.command(`smapi setapi${args[1]}`,true)
    }
        
}).setName("slayermod").setAliases("sm")