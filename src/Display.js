import { BACKGROUND_COLOR, COLOR, DISPLAY_HEIGHT, DISPLAY_MULTIPLAY, DISPLAY_WIDTH } from "./constants/displayConstants";

export class Display {
  constructor(){
    console.log("creating a new display")
    this.screen = document.querySelector('canvas');
    this.screen.width = DISPLAY_WIDTH * DISPLAY_MULTIPLAY
    this.screen.height = DISPLAY_HEIGHT * DISPLAY_MULTIPLAY
    this.context = this.screen.getContext("2d")
    this.context.fillStyle = BACKGROUND_COLOR
    this.frameBuffer = []
    this.reset()
  }
  reset(){
    for(let height=0; height<DISPLAY_HEIGHT; height++){
      this.frameBuffer.push([])
      for(let width=0; width<DISPLAY_WIDTH; width++){
        this.frameBuffer[height].push(1)
      }
    }
    this.context.fillRect(0,0,this.screen.width, this.screen.height)
    this.drawBuffer()
  }
  drawBuffer(){
    for(let height=0; height<DISPLAY_HEIGHT; height++){
      this.frameBuffer.push([])
      for(let width=0; width<DISPLAY_WIDTH; width++){
        this.drawPixel(height, width, this.frameBuffer[height][width])
      }
    }
  }

  drawPixel(height, width, value){
    if(value){
      this.context.fillStyle = COLOR
    } else{
      this.context.fillStyle = BACKGROUND_COLOR
    }
    this.context.fillRect(width * DISPLAY_MULTIPLAY, height * DISPLAY_MULTIPLAY, DISPLAY_MULTIPLAY, DISPLAY_MULTIPLAY)
  }
}