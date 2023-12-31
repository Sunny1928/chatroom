class Overworld {
    constructor(config){
        this.element = config.element
        this.canvas = this.element.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d")
        this.map = null
    }

    startGameLoop(){
        const step = () =>{

            // clear off the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            // establish the camare
            const camara = this.map.gameObjects.me

            // update all game objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction
                })
            });

            // draw background
            this.map.drawBackgroundImage(this.ctx, camara)

            // draw gameobjects
            Object.values(this.map.gameObjects).forEach(object => {
                object.sprite.draw(this.ctx, camara)
            });


            requestAnimationFrame(()=>{
                step()
            })
        }

        step()
    }

    init(){
        this.map = new OverworldMap(window.OverworldMap.DemoRoom)

        this.directionInput = new DirectionInput()
        this.directionInput.init()

        this.startGameLoop()
    }
}

