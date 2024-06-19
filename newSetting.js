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
           ChatLib.command(`sm setapi ${copied}`,true)
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
        subcategory: "Effect Hud"
    })
    .addButton({
        category: "Displays", 
        configName: "displayEffectHudMoveButton", 
        title: "Move Effect HUD", 
        description: "Click to move", 
        subcategory: "Effect Hud",
        onClick(setting) {
          // todo
        }
    })

    .addSwitch({
        category: "Displays",
        configName: "displayArrowHud",
        title: "Display Arrow Hud",
        description: "Renders a HUD that displays current arrows in quiver or in Inventory as well as the two types of poisons",
        value: false,
        subcategory: "Arrow HUD"
    })
    .addButton({
        category: "Displays", 
        configName: "displayArrowHudMoveButton", 
        title: "Move Arrow HUD", 
        description: "Click to move", 
        subcategory: "Arrow HUD",
        onClick(setting) {
          // todo
        }
    })

    








/* 
=======================================================================================================================================================================
Default gui configs provided by Amaterasu
=======================================================================================================================================================================
*/
    .addTextParagraph({
        category: "GUI",
        configName: "textParagraph",
        title: "Some things might not work",
        description: "This section came from the Amaterasu example, I left it here in case anyone cared enough to change how their GUI looks. Some stuff might not work.",
        centered: true 
        })
    .addSelection({
        category: "GUI",
        configName: "scheme",
        title: "Change My Scheme!",
        description: "Select which scheme you want from these presets (needs apply after)",
        options: ["Default", "Vigil", "nwjn"]
    })
    .addButton({
        category: "GUI",
        configName: "apply",
        title: "Apply Changes",
        description: "Need to click this for window to reload with selected changes",
        
        onClick(config) {
            const currentScheme = schemes[config.settings.scheme]
            const scheme = JSON.parse(FileLib.read("Amaterasu", currentScheme))

            scheme.Amaterasu.background.color = config.settings.bgColor

            FileLib.write("Amaterasu", currentScheme, JSON.stringify(scheme, null, 4))
            config
                .setPos(config.settings.x, config.settings.y)
                .setSize(config.settings.width, config.settings.height)
                .setScheme(currentScheme)
                .apply()
        }
    })
    .addColorPicker({
        category: "GUI",
        configName: "bgColor",
        title: "Change Background Color",
        description: "Changes the color and alpha of the background",
        value: [0, 0, 0, 80] 
    })
    .addSlider({
        category: "GUI",
        configName: "x",
        title: "Change X",
        description: "Changes the starting X coordinate of the GUI (in percent)",
        options: [0, 75],
        value: 20
    })
    .addSlider({
        category: "GUI",
        configName: "y",
        title: "Change Y",
        description: "Changes the starting Y coordinate of the GUI (in percent)",
        options: [0, 75],
        value: 20
    })
    .addSlider({
        category: "GUI",
        configName: "width",
        title: "Change Width",
        description: "Changes the width of the GUI (in percent)",
        options: [25, 100],
        value: 60
    })
    .addSlider({
        category: "GUI",
        configName: "height",
        title: "Change Height",
        description: "Changes the height of the GUI (in percent)",
        options: [25, 100],
        value: 60
    })







// Here we create our [Settings] instance.
// passing through our [ModuleName], [DefaultConfig] and [ColorSchemePath]
const SlayerModSettings = new Settings("SlayerMod", defaultConf, "config/ColorScheme.json")

    // Here we define a command with aliases to open this [ConfigGui]
    .setCommand("smopengui")

    // This is how we add our markdowns so the [ConfigGui] knows
    // that we want these to be handled and displayed to the player
    // first param should be the [Category]
    // second one should be the markdown itself
    .addMarkdown("Credits", CREDITS)

    
// Change the scheme path depending on the value of the [Selector] config
const currentScheme = schemes[SlayerModSettings.settings.scheme]
const scheme = JSON.parse(FileLib.read("Amaterasu", currentScheme))
// Setting the alpha
// scheme.Amaterasu.background.color = config.settings.bgColor

// Now we save the [currentScheme] with the [alpha] set in the [Slider]
FileLib.write("Amaterasu", currentScheme, JSON.stringify(scheme, null, 4))

// Now we set the new position, size and colorScheme for our [ConfigGui]
SlayerModSettings
    .setPos(SlayerModSettings.settings.x, SlayerModSettings.settings.y)
    .setSize(SlayerModSettings.settings.width, SlayerModSettings.settings.height)
    .setScheme(currentScheme)
    .apply()

// Now we export the [config.settings] as a default function
export default () => SlayerModSettings.settings


