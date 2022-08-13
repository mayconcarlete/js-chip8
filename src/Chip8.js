import { Display } from "./Display"
import { Keyboard } from "./Keyboard"
import { Memory } from "./Memory"
import { Registers } from "./Registers"

export class Chip8 {
  constructor(){
    console.log("Hello from web pack")
    this.display = new Display()
    this.memory = new Memory()
    this.registers = new Registers()
    this.keyboard = new Keyboard()
  }
}