import { LOAD_PROGRAM_ADDRESS } from "./constants/memoryConstants";
import { NUMBER_OF_REGISTERS, STACK_DEEP } from "./constants/registersConstants";

export class Registers {
  constructor(){
    this.V = new Uint8Array(NUMBER_OF_REGISTERS); // registers
    this.I = 0; // address register
    this.DT = 0; // delay timer register
    this.ST = 0; // sound time register
    this.PC = LOAD_PROGRAM_ADDRESS; // program counter
    this.SP = -1 // stack pointer
    this.stack = new Uint16Array(STACK_DEEP)
    this.reset()
  }
  reset(){
    this.V.fill(0)
    this.I=0
    this.DT = 0
    this.ST = 0
    this.PC = LOAD_PROGRAM_ADDRESS
    this.SP = -1
    this.stack.fill(0)
  }

  stackPush(value){
    this.SP++
    this.assertStackOverflow()
    this.stack[this.SP] = value
  }
  stackPop(){
    const value = this.stack[this.SP]
    this.SP--
    this.assertStackUnderflow()
    return value
  }
  assertStackUnderflow(){
    console.assert(this.SP >= -1, 'Error: stack underflow')
  }
  assertStackOverflow(){
    console.assert(this.SP < STACK_DEEP, 'Error: stack Overflow')
  }
}