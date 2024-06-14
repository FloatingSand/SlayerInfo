import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color } from '../Vigilance';

@Vigilant("Slayer Tracker Settings")
class Settings {
    @TextProperty({
        name: "API key",
        description: "Example of text input that does not wrap the text",
        category: "General",
        subcategory: "Category",
        placeholder: "Empty... :("
    })
    apiInput = "";

    @ButtonProperty({
        name: "Get API key",
        description: "goes to https://developer.hypixel.net/dashboard",
        category: "General",
        subcategory: "Category",
        placeholder: "Open"
    })
    myButtonAction() {
        java.awt.Desktop.getDesktop().browse(new java.net.URL('https://developer.hypixel.net/dashboard').toURI());
    }

    @SwitchProperty({
        name: "Extreme Focus timer (coming soon)",
        description: "Shows info such as total xp, kills, spawn times and time to kill.",
        category: "General",
        subcategory: "Category",
    })
    endstoneSword = true;

    constructor() {
        this.initialize(this);
        // this.registerListener("text", newText => {
        //     console.log(`Text changed to ${newText}`);
        // });
        this.setCategoryDescription("Basic slayer stuff")
        this.setSubcategoryDescription("General", "General Category", "API and other stuff")
    }
}

export default new Settings();