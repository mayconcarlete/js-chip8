import { CHAR_SET } from "./constants/charSetConstants"
import { LOAD_PROGRAM_ADDRESS, MEMORY_SIZE } from "./constants/memoryConstants"
import { TIMER_60_HZ } from "./constants/registersConstants"
import { Disassembler } from "./Disassembler"
import { Display } from "./Display"
import { Keyboard } from "./Keyboard"
import { Memory } from "./Memory"
import { Registers } from "./Registers"
import { SoundCard } from "./SoundCard"

export class Chip8 {
  constructor(romBuffer){
    console.log("Hello fa new chip-8")
    this.memory = new Memory()
    this.registers = new Registers()
    this.loadCharSet()
    this.loadRom(romBuffer)
    this.keyboard = new Keyboard()
    this.soundCard = new SoundCard()
    this.disassembler = new Disassembler()
    this.display = new Display(this.memory)
  }
  sleep(ms = TIMER_60_HZ){
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  loadCharSet(){
    this.memory.memory.set(CHAR_SET, CHAR_SET)
  }
  loadRom(romBuffer){
    console.assert((romBuffer.length + LOAD_PROGRAM_ADDRESS) <= MEMORY_SIZE, 'This rom is too large.')
    this.memory.memory.set(romBuffer, LOAD_PROGRAM_ADDRESS)
    this.registers.PC = LOAD_PROGRAM_ADDRESS
  }
  execute(opcode){
    const {instruction, args} = this.disassembler.disassemble(opcode)
    const {id} = instruction
    console.log('i: ', instruction)
    console.log('a: ', args)
    console.log("id: ", id)
    switch(id){

      case 'CLS':
        this.display.reset()
        break;

        case 'RET':
          this.registers.PC = this.registers.stackPop()
          break

        case 'JP_ADDR':
          this.registers.PC = args[0]
          break

        case 'CALL_ADDR':
          this.registers.stackPush(this.registers.PC)
          this.registers.PC = args[0]
          break

        case "SE_VX_KK":
          if(this.registers.V[args[0]] === args[1]){
            this.registers.PC += 2
          }
          break

        case 'SNE_VX_KK':
          if(this.registers.V[args[0]] !== args[1]){
            this.registers.PC += 2
          }
          break

        case 'SE_VX_VY':
          if(this.registers.V[args[0]] === this.registers.V[args[1]]){
            this.registers.PC += 2
          }
          break

        case 'LD_VX_KK':
          this.registers.V[args[0]] = args[1]
          break

        case 'ADD_VX_KK':
          this.registers.V[args[0]] += args[1]
          break

        case 'LD_VX_VY':
          this.registers.V[args[0]] = this.registers.V[args[1]]
          break

        case 'OR_VX_VY':
          this.registers.V[args[0]] |= this.registers.V[args[1]]
          break

        case 'AND_VX_VY':
          this.registers.V[args[0]] &= this.registers.V[args[1]]
          break

        case "XOR_VX_VY":
          this.registers.V[args[0]] ^= this.registers.V[args[1]]
          break


        case "ADD_VX_VY":
          this.registers.V[0x0f] = (this.registers.V[args[0]] + this.registers.V[args[1]] > 0xff)
          this.registers.V[args[0]] += this.registers.V[args[1]]
          break

        case "SUB_VX_VY":
          this.registers.V[0x0f] = (this.registers.V[args[0]] > this.registers.V[args[1]])
          this.registers.V[args[0]] -= this.registers.V[args[1]]
          break

        case "SHR_VX_VY":
          this.registers.V[0x0f] = this.registers.V[args[0]] & 0x01
          this.registers.V[args[0]] >>= 1
          break


        case "SUBN_VX_VY":
          this.registers.V[0x0f] = this.registers.V[args[1]] > this.registers.V[args[0]]
          this.registers.V[args[0]] = this.registers.V[args[1]] - this.registers.V[args[0]]
          break

        case "SHL_VX_VY":
          this.registers.V[0x0f] = Boolean(this.registers.V[args[0]] & 0x80) // 0b100000000
          this.registers.V[args[0]] <<= 1
          break

        case "SNE_VX_VY":
          if(this.registers.V[args[0]] !== this.registers.V[args[1]]){
            this.registers.PC += 2
          }
          break
        case "LD_I_ADDR":
          this.registers.I = args[0]
          break
        case "JP_V0_ADD":
          this.registers.PC = this.registers.V[0] + args[0]
          break
      default:
        console.error(`Instruction with id ${id} not found.`, instruction, args)
    }
  }
}