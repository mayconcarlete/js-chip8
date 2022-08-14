import { CHAR_SET } from "./constants/charSetConstants"
import { Display } from "./Display"
import { Keyboard } from "./Keyboard"
import { Memory } from "./Memory"
import { Registers } from "./Registers"

export class Chip8 {
  constructor(){
    console.log("Hello from web pack")
    this.memory = new Memory()
    this.loadCharSet()

    this.registers = new Registers()
    this.keyboard = new Keyboard()
    this.display = new Display(this.memory)
  }
  sleep(ms = 1000){
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  loadCharSet(){
    this.memory.memory.set(CHAR_SET, CHAR_SET)
  }
}