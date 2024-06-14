import Settings from "../Settings"


let displaying = []
let getRidOf = false

class Timer {
    constructor(x,y,duration) {
        this.x = x
        this.y = y
        this.duration = duration
        this.display = new Display()
    }
    countdown() {     
        this.display.setLine(0,`&5&l${this.duration}&r`)
        this.display.setRenderLoc(this.x,this.y)

        if (this.duration <= 0) {
            this.display.hide()
            return
        } else {
            setTimeout(() => {
                this.display.show()
                this.duration -= 1
                this.display.setLine(0,`&5&l${this.duration}&r`)
                this.countdown()
            }, 1000);
            
        }
    }
}
register("chat", () =>{
    if (Settings.endstoneSword) {
        displaying = []
        displaying.push(new Timer(Renderer.screen.getWidth()/2 - 2, Renderer.screen.getHeight()/2 + 7,5))
        displaying.forEach( a => a.countdown())
    }
}).setCriteria("&r&aYou now have &r&${amount}&r&a Damage Resistance for 5 seconds and &r&6+${damageGained}&r&a damage on your next hit within 5 seconds!&r")



    



