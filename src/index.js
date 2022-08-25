import { Chip8 } from "./Chip8"

;
(
async() => {
  const path = "./roms/test_opcode"
  const rom = await fetch('./roms/test_opcode');
  const arrayBuffer = await rom.arrayBuffer();
  const romBuffer = new Uint8Array(arrayBuffer);
  const chip8 = new Chip8(romBuffer)
  // chip8.registers.PC = 0x010
  // chip8.registers.I = 0xF
  chip8.registers.V[0] = 0x1
  chip8.registers.V[5] = 0x010
  chip8.registers.V[8] = 0x010
  // chip8.registers.DT = 0x0
  // chip8.registers.ST = 0x0
  // chip8.registers.I = 0x03


  await chip8.execute(0xF029)
  await chip8.execute(0xD585)

  console.log("V0: ", chip8.registers.V[0].toString(16))
  console.log("DT: ", chip8.registers.DT.toString(16))
  console.log("ST: ", chip8.registers.ST.toString(16))
  console.log("I: ", chip8.registers.I.toString(16))



  // chip8.execute(0x00ee)
  // console.log('Pc',chip8.registers.PC.toString(16))
  // console.log('sp: ', chip8.registers.SP)
  // console.log("stack: ", chip8.registers.stack)
  // chip8.execute(0x310f)

}
)()
