import { @Vigilant, 
        @TextProperty, 
        @ColorProperty, 
        @ButtonProperty, 
        @SwitchProperty,
        @CheckboxProperty, 
        Color 
    } from '../Vigilance';


@Vigilant("SlayerMod/config")

class Settings {
    @TextProperty({
        name: "API key",
        description: "Input Api key",
        category: "General",
        subcategory: "API",
        placeholder: "Empty... :("
    })
    apiInput = "";

    @ButtonProperty({
        name: "Get API key",
        description: "goes to https://developer.hypixel.net/dashboard",
        category: "General",
        subcategory: "API",
        placeholder: "Open"
    })
    myButtonAction() {
        java.awt.Desktop.getDesktop().browse(new java.net.URL('https://developer.hypixel.net/dashboard').toURI());
    }


    constructor() {
        this.initialize(this);
        
    }
}

export default new Settings();