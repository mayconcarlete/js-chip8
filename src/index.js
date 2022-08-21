import { Chip8 } from "./Chip8"

;
(
async() => {
  const path = "./roms/test_opcode"
  const rom = await fetch('./roms/test_opcode');
  const arrayBuffer = await rom.arrayBuffer();
  const romBuffer = new Uint8Array(arrayBuffer);
  const chip8 = new Chip8(romBuffer)
  console.log('pc: ', chip8.registers.PC)
  console.log('SP: ', chip8.registers.SP)
  chip8.registers.PC = 0x0010
  chip8.registers.V[0] = 0x04
  chip8.registers.V[5] = 0x01
  chip8.registers.V[6] = 0x01
  chip8.execute(0xb003)
  console.log("#############")
  console.log("V5: ",chip8.registers.V[5].toString(16))
  console.log("V6: ",chip8.registers.V[6].toString(16))
  console.log("VF: ",chip8.registers.V[0x0f].toString(16))
  console.log('pc: ', chip8.registers.PC)
  console.log("I: ", chip8.registers.I.toString(16))


  // chip8.execute(0x00ee)
  // console.log('Pc',chip8.registers.PC.toString(16))
  // console.log('sp: ', chip8.registers.SP)
  // console.log("stack: ", chip8.registers.stack)
  // chip8.execute(0x310f)

}
)()
