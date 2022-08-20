/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Chip8": () => (/* binding */ Chip8)
/* harmony export */ });
/* harmony import */ var _constants_charSetConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _Disassembler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _Memory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);
/* harmony import */ var _SoundCard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);









class Chip8 {
  constructor(){
    console.log("Hello from web pack")
    this.memory = new _Memory__WEBPACK_IMPORTED_MODULE_5__.Memory()
    this.loadCharSet()

    this.registers = new _Registers__WEBPACK_IMPORTED_MODULE_6__.Registers()
    this.keyboard = new _Keyboard__WEBPACK_IMPORTED_MODULE_4__.Keyboard()
    this.soundCard = new _SoundCard__WEBPACK_IMPORTED_MODULE_7__.SoundCard()
    this.disassembler = new _Disassembler__WEBPACK_IMPORTED_MODULE_2__.Disassembler()
    this.display = new _Display__WEBPACK_IMPORTED_MODULE_3__.Display(this.memory)
  }
  sleep(ms = _constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__.TIMER_60_HZ){
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  loadCharSet(){
    this.memory.memory.set(_constants_charSetConstants__WEBPACK_IMPORTED_MODULE_0__.CHAR_SET, _constants_charSetConstants__WEBPACK_IMPORTED_MODULE_0__.CHAR_SET)
  }
}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHAR_SET": () => (/* binding */ CHAR_SET),
/* harmony export */   "CHAR_SET_WIDTH": () => (/* binding */ CHAR_SET_WIDTH)
/* harmony export */ });
const CHAR_SET_WIDTH = 8
const CHAR_SET = [
0xF0,
0x90,
0x90,
0x90,
0xF0,
0x20,
0x60,
0x20,
0x20,
0x70,
0xF0,
0x10,
0xF0,
0x80,
0xF0,
0xF0,
0x10,
0xF0,
0x10,
0xF0,
0x90,
0x90,
0xF0,
0x10,
0x10,
0xF0,
0x80,
0xF0,
0x10,
0xF0,
0xF0,
0x80,
0xF0,
0x90,
0xF0,
0xF0,
0x10,
0x20,
0x40,
0x40,
0xF0,
0x90,
0xF0,
0x90,
0xF0,
0xF0,
0x90,
0xF0,
0x10,
0xF0,
0xF0,
0x90,
0xF0,
0x90,
0x90,
0xE0,
0x90,
0xE0,
0x90,
0xE0,
0xF0,
0x80,
0x80,
0x80,
0xF0,
0xE0,
0x90,
0x90,
0x90,
0xE0,
0xF0,
0x80,
0xF0,
0x80,
0xF0,
0xF0,
0x80,
0xF0,
0x80,
0x80,
]

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NUMBER_OF_REGISTERS": () => (/* binding */ NUMBER_OF_REGISTERS),
/* harmony export */   "STACK_DEEP": () => (/* binding */ STACK_DEEP),
/* harmony export */   "TIMER_60_HZ": () => (/* binding */ TIMER_60_HZ)
/* harmony export */ });
const NUMBER_OF_REGISTERS = 16
const STACK_DEEP = 16

const TIMER_60_HZ = 1000/60


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Disassembler": () => (/* binding */ Disassembler)
/* harmony export */ });
/* harmony import */ var _constants_instructionSet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


class Disassembler {
  disassemble(opcode){
    const instruction = _constants_instructionSet__WEBPACK_IMPORTED_MODULE_0__.INSTRUCTION_SET.find(instruction => (opcode & instruction.mask) === instruction.pattern)
    const args = instruction.arguments.map( arg => (opcode & arg.mask) >> arg.shift)
    console.log('instruction: ', instruction)
    console.log(args)
    args.forEach((arg) => console.log(arg.toString(16)))
  }
}

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INSTRUCTION_SET": () => (/* binding */ INSTRUCTION_SET),
/* harmony export */   "MASK_KK": () => (/* binding */ MASK_KK),
/* harmony export */   "MASK_NN": () => (/* binding */ MASK_NN),
/* harmony export */   "MASK_X": () => (/* binding */ MASK_X),
/* harmony export */   "MASK_Y": () => (/* binding */ MASK_Y)
/* harmony export */ });
const MASK_NN = {mask: 0x0fff}
const MASK_X = {mask: 0x0f00, shift:8}
const MASK_KK = {mask: 0x00ff}
const MASK_Y = {mask: 0x00f0, shift: 4}
const INSTRUCTION_SET = [
  {
    key: 2,
    id: 'CLS',
    name: 'CLS',
    mask: 0xffff,
    pattern: 0x00e0,
    arguments: []

  },
  {
    key: 3,
    id: 'RET',
    name: 'RET',
    mask: 0xffff,
    pattern: 0x00ee,
    arguments: []
  },
  {
    key: 4,
    id: 'JP_ADDR',
    name: 'JP',
    mask: 0xf000,
    pattern: 0x1000,
    arguments: [MASK_NN]
  },
  {
    key: 5,
    id: 'CALL_ADDR',
    name: 'CALL',
    mask: 0xf000,
    pattern: 0x2000,
    arguments: [MASK_NN]
  },
  {
    key: 6,
    id: 'SE_VX_NN',
    name: 'SE',
    mask: 0xf000,
    pattern: 0x3000,
    arguments: [MASK_X, MASK_KK]
  },
  {
    key: 7,
    id: 'SNE_VX_NN',
    name: 'SNE',
    mask: 0xf000,
    pattern: 0x4000,
    arguments: [MASK_X, MASK_KK]
  },
  {
    key: 8,
    id: 'SE_VX_VY',
    name: 'SE',
    mask: 0xf00f,
    pattern: 0x5000,
    arguments: [MASK_X,MASK_Y]
  },
  {
    key: 9,
    id: 'LD_VX_KK',
    name: 'SE',
    mask: 0xf000,
    pattern: 0x6000,
    arguments: [MASK_X,MASK_KK]
  },
  {
    key: 10,
    id: 'ADD_VX_KK',
    name: 'ADD',
    mask: 0xf000,
    pattern: 0x7000,
    arguments: [MASK_X,MASK_KK]
  },
  {
    key: 11,
    id: 'LD_VX_VY',
    name: 'LD',
    mask: 0xf000,
    pattern: 0x8000,
    arguments: [MASK_X,MASK_Y]
  },
]


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Display": () => (/* binding */ Display)
/* harmony export */ });
/* harmony import */ var _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _constants_charSetConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


class Display {
  constructor(memory){
    this.memory = memory
    this.screen = document.querySelector('canvas');
    this.screen.width = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_MULTIPLAY
    this.screen.height = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_MULTIPLAY
    this.context = this.screen.getContext("2d")
    this.context.fillStyle = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.BACKGROUND_COLOR
    this.frameBuffer = []
    this.reset()
  }
  reset(){
    for(let height=0; height<_constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT; height++){
      this.frameBuffer.push([])
      for(let width=0; width<_constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH; width++){
        this.frameBuffer[height].push(0)
      }
    }
    this.context.fillRect(0,0,this.screen.width, this.screen.height)
    this.drawBuffer()
  }
  drawBuffer(){
    for(let height=0; height<_constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_HEIGHT; height++){
      this.frameBuffer.push([])
      for(let width=0; width<_constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_WIDTH; width++){
        this.drawPixel(height, width, this.frameBuffer[height][width])
      }
    }
  }

  drawPixel(height, width, value){
    if(value){
      this.context.fillStyle = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.COLOR
    } else{
      this.context.fillStyle = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.BACKGROUND_COLOR
    }
    this.context.fillRect(width * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_MULTIPLAY, height * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_MULTIPLAY, _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_MULTIPLAY, _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__.DISPLAY_MULTIPLAY)
  }

  drawSprite(height, width, spriteAddress, number){
    for(let lHeight = 0 ; lHeight < number; lHeight++){
      const line = this.memory.memory[spriteAddress+lHeight]
      for(let lWidth=0; lWidth < _constants_charSetConstants__WEBPACK_IMPORTED_MODULE_1__.CHAR_SET_WIDTH; lWidth++){
        const bitToCheck = (0b10000000 >> lWidth)
        const value = line & bitToCheck
        this.drawPixel(height+lHeight, width+lWidth, value)
        // Alternative solution
        // console.log(line.toString(2)[0] === 1)
        // if(line.toString(2)[lWidth]==="1"){
        //   console.log("entrei")
        //   this.drawPixel(height+lHeight, width+lWidth, true)
        // }
      }
    }
  }
}

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BACKGROUND_COLOR": () => (/* binding */ BACKGROUND_COLOR),
/* harmony export */   "COLOR": () => (/* binding */ COLOR),
/* harmony export */   "DISPLAY_HEIGHT": () => (/* binding */ DISPLAY_HEIGHT),
/* harmony export */   "DISPLAY_MULTIPLAY": () => (/* binding */ DISPLAY_MULTIPLAY),
/* harmony export */   "DISPLAY_WIDTH": () => (/* binding */ DISPLAY_WIDTH)
/* harmony export */ });
const DISPLAY_WIDTH = 64;
const DISPLAY_HEIGHT = 32;
const DISPLAY_MULTIPLAY = 10;
const BACKGROUND_COLOR = "black";
const COLOR = "#3f6";

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Keyboard": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var _constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);


class Keyboard {
  constructor(){
    this.keys = new Array(_constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__.NUMBER_OF_KEYS).fill(false)
    document.addEventListener("keydown", (event) => this.keydown(event.key))
    document.addEventListener("keyup", (event) => this.keyup(event.key))

  }
  keydown(key){
    const keyIndex = _constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__.keyMap.findIndex((mapKey) => mapKey === key.toLowerCase())
    if(keyIndex > -1){
      this.keys[keyIndex] = true
    }
    console.log(this.keys)
  }
  keyup(key){
    const keyIndex = _constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__.keyMap.findIndex((mapKey) => mapKey === key.toLowerCase())
    if(keyIndex > -1){
      this.keys[keyIndex] = false
    }
  }
  isKeydown(keyIndex){
    return this.keys[keyIndex]
  }
  hasKeydown(){
    return this.keys.findIndex(key => key) != -1
  }
}

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NUMBER_OF_KEYS": () => (/* binding */ NUMBER_OF_KEYS),
/* harmony export */   "keyMap": () => (/* binding */ keyMap)
/* harmony export */ });
const NUMBER_OF_KEYS = 16

const keyMap = [
  "1", "2", "3",
  "q", "w", "e",
  "a", "s", "d",
  "x", "z", "c",
  "4", "r", "f", "v"
]

/**
 *
 * chip 8 keyboard
 *
 * 1 2 3 C
 * 4 5 6 D
 * 7 8 9 E
 * A 0 B F
 *
 */


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Memory": () => (/* binding */ Memory)
/* harmony export */ });
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);

class Memory {
  constructor(){
    this.memory = new Uint8Array(_constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.MEMORY_SIZE)
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
  assertMemory(index){
    console.assert(index >= 0 && index < _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.MEMORY_SIZE, `Error: trying to access memmory at index: ${index}`)
  }
}

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHAR_SET_ADDRESS": () => (/* binding */ CHAR_SET_ADDRESS),
/* harmony export */   "LOAD_PROGRAM_ADDRESS": () => (/* binding */ LOAD_PROGRAM_ADDRESS),
/* harmony export */   "MEMORY_SIZE": () => (/* binding */ MEMORY_SIZE)
/* harmony export */ });
const MEMORY_SIZE = 4095
const LOAD_PROGRAM_ADDRESS = 0x200
const CHAR_SET_ADDRESS = 0x000;

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Registers": () => (/* binding */ Registers)
/* harmony export */ });
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



class Registers {
  constructor(){
    this.V = new Uint8Array(_constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__.NUMBER_OF_REGISTERS); // registers
    this.I = 0; // address register
    this.DT = 0; // delay timer register
    this.ST = 0; // sound time register
    this.PC = _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.LOAD_PROGRAM_ADDRESS; // program counter
    this.SP = -1 // stack pointer
    this.stack = new Uint16Array(_constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__.STACK_DEEP)
    this.reset()
  }
  reset(){
    this.V.fill(0)
    this.I=0
    this.DT = 0
    this.ST = 0
    this.PC = _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.LOAD_PROGRAM_ADDRESS
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
    console.assert(this.SP < _constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__.STACK_DEEP, 'Error: stack Overflow')
  }
}

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SoundCard": () => (/* binding */ SoundCard)
/* harmony export */ });
/* harmony import */ var _constants_soundCardConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);


class SoundCard {
  constructor(){
    this.soundIsEnable = false
    if("AudioContext" in window || "webkitAudioContext" in window){
      const audioContext = new (AudioContext || webkitAudioContext)()
      const masterGain = new GainNode(audioContext)
      masterGain.gain.value = _constants_soundCardConstants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_VOLUME
      masterGain.connect(audioContext.destination)
      let soundEnabled = false
      let oscillator
      Object.defineProperties(this, {
        soundEnabled:{
          get: function(){
            return soundEnabled
          },
          set: function(value){
            if(value === soundEnabled){
              return
            }
            soundEnabled = value
            if(soundEnabled){
              oscillator = new OscillatorNode(audioContext, {
                type: "square"
              })
              oscillator.connect(masterGain)
              oscillator.start()
            } else {
               oscillator.stop()
            }
          }
        }
      })
    }
  }
  enabledSound(){
    this.soundEnabled = true
  }
  disableSound(){
    this.soundEnabled = false
  }
}

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INITIAL_VOLUME": () => (/* binding */ INITIAL_VOLUME)
/* harmony export */ });
const INITIAL_VOLUME = 0.3

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Chip8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

const chip8 = new _Chip8__WEBPACK_IMPORTED_MODULE_0__.Chip8()
// chip8.memory.setMemory(0x05, 0x1a)
// console.log(chip8.memory.getMemory(0x05))

// chip8.registers.stackPush(1)
// chip8.registers.stackPush(2)
// chip8.registers.stackPush(3)

// let result = chip8.registers.stackPop()
// console.log(result)
// result = chip8.registers.stackPop()
// console.log(result)
// result = chip8.registers.stackPop()
// console.log(result)
;
(
async() => {
  // while(1){
  //   const hasKeydown = chip8.keyboard.hasKeydown()
  //   const isKeydown = chip8.keyboard.isKeydown(1)
  //   console.log("hasKeyDown: ", hasKeydown)
  //   console.log("isKeyDown: ", isKeydown)
  //   await chip8.sleep()
  // }
  // console.log(chip8.memory.getMemory(0).toString(16))
  // console.log(chip8.memory.getMemory(1).toString(16))
  // console.log(chip8.memory.getMemory(2).toString(16))
  // console.log(chip8.memory.getMemory(3).toString(16))
  // console.log(chip8.memory.getMemory(4).toString(16))
  // chip8.display.drawSprite(4,1,0,5)
  // chip8.registers.ST = 3
  // while(1){
    // await chip8.sleep(200)
    // if(chip8.registers.DT > 0){
    //   await chip8.sleep()
    //   chip8.registers.DT--;
    // }
    // if(chip8.registers.ST > 0){
    //   chip8.soundCard.enabledSound()
    //   await chip8.sleep()
    //   chip8.registers.ST--;
    // }
    // if(chip8.registers.ST === 0){
    //   chip8.soundCard.disableSound()
    // }
  // }
  // chip8.disassembler.disassemble(0x00e0)
  // chip8.disassembler.disassemble(0x00ee)
  // chip8.disassembler.disassemble(0x1234)
  // chip8.disassembler.disassemble(0x2432)

  chip8.disassembler.disassemble(0x3101)
  chip8.disassembler.disassemble(0x1009)
  chip8.disassembler.disassemble(0x4209)
  chip8.disassembler.disassemble(0x5230)
  chip8.disassembler.disassemble(0x7a09)

}
)()

})();

/******/ })()
;