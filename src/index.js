import { Chip8 } from "./Chip8"
const chip8 = new Chip8()
// chip8.memory.setMemory(0x05, 0x1a)
// console.log(chip8.memory.getMemory(0x05))

// chip8.registers.stackPush(1)
// chip8.registers.stackPush(2)
// chip8.registers.stackPush(3)

// let result = chip8.registers.stackPop()
// console.log(result)
// result = chip8.registers.stackPop()
// console.log(result)
// result = chip8.registers.stackPop()
// console.log(result)
;
(
async() => {
  // while(1){
  //   const hasKeydown = chip8.keyboard.hasKeydown()
  //   const isKeydown = chip8.keyboard.isKeydown(1)
  //   console.log("hasKeyDown: ", hasKeydown)
  //   console.log("isKeyDown: ", isKeydown)
  //   await chip8.sleep()
  // }
  // console.log(chip8.memory.getMemory(0).toString(16))
  // console.log(chip8.memory.getMemory(1).toString(16))
  // console.log(chip8.memory.getMemory(2).toString(16))
  // console.log(chip8.memory.getMemory(3).toString(16))
  // console.log(chip8.memory.getMemory(4).toString(16))
  chip8.display.drawSprite(4,1,0,5)
}
)()
