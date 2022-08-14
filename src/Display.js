import { BACKGROUND_COLOR, COLOR, DISPLAY_HEIGHT, DISPLAY_MULTIPLAY, DISPLAY_WIDTH } from "./constants/displayConstants";
import {CHAR_SET_WIDTH} from "./constants/charSetConstants"
export class Display {
  constructor(memory){
    this.memory = memory
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
        this.frameBuffer[height].push(0)
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

  drawSprite(height, width, spriteAddress, number){
    for(let lHeight = 0 ; lHeight < number; lHeight++){
      const line = this.memory.memory[spriteAddress+lHeight]
      for(let lWidth=0; lWidth < CHAR_SET_WIDTH; lWidth++){
        const bitToCheck = (0b10000000 >> lWidth)
        const value = line & bitToCheck
        this.drawPixel(height+lHeight, width+lWidth, value)
        // Alternative solution
        // console.log(line.toString(2)[0] === 1)
        // if(line.toString(2)[lWidth]==="1"){
        //   console.log("entrei")
        //   this.drawPixel(height+lHeight, width+lWidth, true)
        // }
      }
    }
  }
}