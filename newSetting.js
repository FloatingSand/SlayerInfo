// Getting the necessary imports for this [ConfigGui] to work
import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"

const CREDITS = FileLib.read("SlayerMod", "markdown/credits.md")

const schemes = ["data/ColorScheme.json", "data/scheme-vigil.json", "data/scheme-nwjn.json"]


const defaultConf = new DefaultConfig("SlayerMod", "config/Amaterasusettings.json")

defaultConf

    .addButton({
        category: "Setup", 
        configName: "apiKeyButton", 
        title: "Get API key", 
        description: "I'll get a permament dev key some day. But for now, you need  your own temp key", 
       
        
        onClick(setting) {
            java.awt.Desktop.getDesktop().browse(new java.net.URL('https://developer.hypixel.net/dashboard').toURI());
        }
    })
    .addButton({
        category: "Setup", 
        configName: "apiKey", 
        title: "Paste API key", 
        description: "Copy API key to clipboard and press the PASTE button", 
        onClick(apiPaste) {
           let copied = Java.type("net.minecraft.client.gui.GuiScreen").func_146277_j()
           ChatLib.command(`smapi setapi ${copied}`,true)
           ChatLib.chat(`&5&l[SlayerTracker]:&a API key set to &f${copied}!`)
        }
    })
    

    .addSwitch({
        category: "Slayer",
        configName: "InfoAfterBoss",
        title: "Displays INFO about boss",
        description: "Displays total kills and xp",
        value: false,
        subcategory: "Info"
    })
    .addSwitch({
        category: "Slayer",
        configName: "trackTimes",
        title: "Track slayer kill times",
        description: "Tells you how long it took you to complete the quest as well as spawn and kill times",
        value: false,
        subcategory: "Info"
    })
    .addSwitch({
        category: "Slayer",
        configName: "rngMeter",
        title: "Somewhat better RNG meter",
        description: "Replaces RNG meter with one that shows the item selected and the progress",
        value: false,
        subcategory: "Info"
    })

    .addSwitch({
        category: "Displays",
        configName: "displayEffectHud",
        title: "Display Blaze Slayer Effects",
        description: "Renders a HUD for Smoldering Polarization and Wisp's Ice-flavored potion duration",
        value: false,
        subcategory: "Effect Hud",
        registerListener(previousvalue, newvalue) {
            ChatLib.command("smeffecthud update",true)
            
        }
    })
    .addButton({
        category: "Displays", 
        configName: "displayEffectHudMoveButton", 
        title: "Move Effect HUD", 
        description: "Click to move", 
        subcategory: "Effect Hud",
        onClick(setting) {
            ChatLib.command("smeffecthud changegui", true)
        }
    })

    .addSwitch({
        category: "Displays",
        configName: "displayArrowHud",
        title: "Display Arrow Hud",
        description: "Renders a HUD that displays current arrows in quiver or in Inventory as well as the two types of poisons",
        value: false,
        subcategory: "Arrow HUD",
        registerListener(previousvalue, newvalue) {
            ChatLib.command("smarrowhud update",true)
            
        }
    })
    .addButton({
        category: "Displays", 
        configName: "displayArrowHudMoveButton", 
        title: "Move Arrow HUD", 
        description: "Click to move", 
        subcategory: "Arrow HUD",
        onClick(setting) {
            ChatLib.command("smarrowhud changegui",true)
        }
    })

    








// Here we create our [Settings] instance.
// passing through our [ModuleName], [DefaultConfig] and [ColorSchemePath]
const SlayerModSettings = new Settings("SlayerMod", defaultConf, "config/ColorScheme.json")

    // Here we define a command with aliases to open this [ConfigGui]
    .setCommand("slayermod",["sm"])

    // This is how we add our markdowns so the [ConfigGui] knows
    // that we want these to be handled and displayed to the player
    // first param should be the [Category]
    // second one should be the markdown itself
    .addMarkdown("Credits", CREDITS)

    
// Change the scheme path depending on the value of the [Selector] config
// const currentScheme = schemes[SlayerModSettings.settings.scheme]
// const scheme = JSON.parse(FileLib.read("Amaterasu", currentScheme))
// Setting the alpha
// scheme.Amaterasu.background.color = config.settings.bgColor

// Now we save the [currentScheme] with the [alpha] set in the [Slider]
// FileLib.write("Amaterasu", currentScheme, JSON.stringify(scheme, null, 4))

// Now we set the new position, size and colorScheme for our [ConfigGui]
SlayerModSettings
    .setPos(SlayerModSettings.settings.x, SlayerModSettings.settings.y)
    .setSize(SlayerModSettings.settings.width, SlayerModSettings.settings.height)
    .setScheme(currentScheme)
    .apply()

// Now we export the [config.settings] as a default function
export default () => SlayerModSettings.settings


