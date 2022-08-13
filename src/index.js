import { Chip8 } from "./Chip8"
const chip8 = new Chip8()
// chip8.memory.setMemory(0x05, 0x1a)
// console.log(chip8.memory.getMemory(0x05))

chip8.registers.stackPush(1)
chip8.registers.stackPush(2)
chip8.registers.stackPush(3)

let result = chip8.registers.stackPop()
console.log(result)
result = chip8.registers.stackPop()
console.log(result)
result = chip8.registers.stackPop()
console.log(result)