import { MEMORY_SIZE } from "./constants/memoryConstants"
export class Memory {
  constructor(){
    this.memory = new Uint8Array(MEMORY_SIZE)
    this.reset()
  }
  reset(){
    this.memory.fill(0)
  }

  setMemory(index, value){
    this.assertMemory(index)
    this.memory[index] = value
  }
  getMemory(index){
    this.assertMemory(index)
    return this.memory[index]
  }
  getOpCode(index){
    const highByte = this.getMemory(index)
    const lowByte = this.getMemory(index +1)
    return (highByte << 8 ) | lowByte
  }
  assertMemory(index){
    console.assert(index >= 0 && index < MEMORY_SIZE, `Error: trying to access memmory at index: ${index}`)
  }
}