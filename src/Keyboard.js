import { keyMap } from "./constants/keyboardConstants"

export class Keyboard {
  constructor(){
    document.addEventListener("keydown", this.keydown)
  }
  keydown({key}){
    const keyIndex = keyMap.findIndex((mapKey) => mapKey === key.toLowerCase())
    if(keyIndex > -1){
      console.log(keyIndex)
    }
  }
}