import { Chip8 } from "./Chip8"

;
(
async() => {
  const path = "./roms/BLINKY"
  const rom = await fetch(path);
  const arrayBuffer = await rom.arrayBuffer();
  const romBuffer = new Uint8Array(arrayBuffer);
  const chip8 = new Chip8(romBuffer)
  console.log(chip8.memory.memory)
  // while(1){
  //   await chip8.sleep(200)
  //   if(chip8.registers.DT > 0){
  //     await chip8.sleep()
  //     chip8.registers.DT--
  //   }

  //   if(chip8.registers.ST > 0){
  //     chip8.soundCard.enabledSound()
  //     await chip8.sleep()
  //     chip8.registers.ST--
  //   }

  //   if(chip8.registers.ST === 0){
  //     chip8.soundCard.disableSound()
  //   }
  //   const address = chip8.registers.PC
  //   const opCode = chip8.memory.getOpCode(address)
  //   await chip8.execute(opCode)
  //   chip8.registers.PC += 2
  //   console.log(opCode.toString(16))
  // }
}
)()
