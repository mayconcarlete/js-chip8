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
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _constants_registersConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _Disassembler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _Memory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var _SoundCard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);










class Chip8 {
  constructor(romBuffer){
    console.log("Hello fa new chip-8")
    this.memory = new _Memory__WEBPACK_IMPORTED_MODULE_6__.Memory()
    this.registers = new _Registers__WEBPACK_IMPORTED_MODULE_7__.Registers()
    this.loadCharSet()
    this.loadRom(romBuffer)
    this.keyboard = new _Keyboard__WEBPACK_IMPORTED_MODULE_5__.Keyboard()
    this.soundCard = new _SoundCard__WEBPACK_IMPORTED_MODULE_8__.SoundCard()
    this.disassembler = new _Disassembler__WEBPACK_IMPORTED_MODULE_3__.Disassembler()
    this.display = new _Display__WEBPACK_IMPORTED_MODULE_4__.Display(this.memory)
  }
  sleep(ms = _constants_registersConstants__WEBPACK_IMPORTED_MODULE_2__.TIMER_60_HZ){
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  loadCharSet(){
    this.memory.memory.set(_constants_charSetConstants__WEBPACK_IMPORTED_MODULE_0__.CHAR_SET, _constants_charSetConstants__WEBPACK_IMPORTED_MODULE_0__.CHAR_SET)
  }
  loadRom(romBuffer){
    console.assert((romBuffer.length + _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_1__.LOAD_PROGRAM_ADDRESS) <= _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_1__.MEMORY_SIZE, 'This rom is too large.')
    this.memory.memory.set(romBuffer, _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_1__.LOAD_PROGRAM_ADDRESS)
    this.registers.PC = _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_1__.LOAD_PROGRAM_ADDRESS
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
/* harmony export */   "CHAR_SET_ADDRESS": () => (/* binding */ CHAR_SET_ADDRESS),
/* harmony export */   "LOAD_PROGRAM_ADDRESS": () => (/* binding */ LOAD_PROGRAM_ADDRESS),
/* harmony export */   "MEMORY_SIZE": () => (/* binding */ MEMORY_SIZE)
/* harmony export */ });
const MEMORY_SIZE = 4095
const LOAD_PROGRAM_ADDRESS = 0x200
const CHAR_SET_ADDRESS = 0x000;

/***/ }),
/* 4 */
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
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Disassembler": () => (/* binding */ Disassembler)
/* harmony export */ });
/* harmony import */ var _constants_instructionSet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


class Disassembler {
  disassemble(opcode){
    const instruction = _constants_instructionSet__WEBPACK_IMPORTED_MODULE_0__.INSTRUCTION_SET.find(instruction => (opcode & instruction.mask) === instruction.pattern)
    const args = instruction.arguments.map( arg => (opcode & arg.mask) >> arg.shift)
    // console.log('instruction: ', instruction)
    // console.log(args)
   return {
    instruction,
     args
   }
  }
}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INSTRUCTION_SET": () => (/* binding */ INSTRUCTION_SET),
/* harmony export */   "MASK_HIGHEST_AND_LOWEST_BYTE": () => (/* binding */ MASK_HIGHEST_AND_LOWEST_BYTE),
/* harmony export */   "MASK_HIGHEST_BYTE": () => (/* binding */ MASK_HIGHEST_BYTE),
/* harmony export */   "MASK_KK": () => (/* binding */ MASK_KK),
/* harmony export */   "MASK_N": () => (/* binding */ MASK_N),
/* harmony export */   "MASK_NNN": () => (/* binding */ MASK_NNN),
/* harmony export */   "MASK_X": () => (/* binding */ MASK_X),
/* harmony export */   "MASK_Y": () => (/* binding */ MASK_Y)
/* harmony export */ });
const MASK_HIGHEST_BYTE = 0xf000
const MASK_X = {mask: 0x0f00, shift:8}
const MASK_Y = {mask: 0x00f0, shift: 4}
const MASK_N = {mask: 0x000f}
const MASK_KK = {mask: 0x00ff}
const MASK_NNN = {mask: 0x0fff}
const MASK_HIGHEST_AND_LOWEST_BYTE = 0xf00f
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
    mask: MASK_HIGHEST_BYTE,
    pattern: 0x1000,
    arguments: [MASK_NNN]
  },
  {
    key: 5,
    id: 'CALL_ADDR',
    name: 'CALL',
    mask: MASK_HIGHEST_BYTE,
    pattern: 0x2000,
    arguments: [MASK_NNN]
  },
  {
    key: 6,
    id: 'SE_VX_KK',
    name: 'SE',
    mask: MASK_HIGHEST_BYTE,
    pattern: 0x3000,
    arguments: [MASK_X, MASK_KK]
  },
  {
    key: 7,
    id: 'SNE_VX_KK',
    name: 'SNE',
    mask: MASK_HIGHEST_BYTE,
    pattern: 0x4000,
    arguments: [MASK_X, MASK_KK]
  },
  {
    key: 8,
    id: 'SE_VX_VY',
    name: 'SE',
    mask: MASK_HIGHEST_AND_LOWEST_BYTE,
    pattern: 0x5000,
    arguments: [MASK_X,MASK_Y]
  },
  {
    key: 9,
    id: 'LD_VX_KK',
    name: 'SE',
    mask: MASK_HIGHEST_BYTE,
    pattern: 0x6000,
    arguments: [MASK_X,MASK_KK]
  },
  {
    key: 10,
    id: 'ADD_VX_KK',
    name: 'ADD',
    mask: MASK_HIGHEST_BYTE,
    pattern: 0x7000,
    arguments: [MASK_X,MASK_KK]
  },
  {
    key: 11,
    id: 'LD_VX_VY',
    name: 'LD',
    mask: MASK_HIGHEST_AND_LOWEST_BYTE,
    pattern: 0x8000,
    arguments: [MASK_X,MASK_Y]
  },
  {
    key: 12,
    id: 'OR_VX_VY',
    name: 'OR',
    mask: MASK_HIGHEST_AND_LOWEST_BYTE,
    pattern: 0x8001,
    arguments: [MASK_X,MASK_Y]
  },
  {
    key: 13,
    id: 'AND_VX_VY',
    name: 'AND',
    mask: MASK_HIGHEST_AND_LOWEST_BYTE,
    pattern: 0x8002,
    arguments: [MASK_X,MASK_Y]
  },
  {
    key: 14,
    id: 'XOR_VX_VY',
    name: 'XOR',
    mask: MASK_HIGHEST_AND_LOWEST_BYTE,
    pattern: 0x8003,
    arguments: [MASK_X,MASK_Y]
  },
  {
    key: 15,
    id: 'ADD_VX_VY',
    name: 'ADD',
    mask: MASK_HIGHEST_AND_LOWEST_BYTE,
    pattern: 0x8004,
    arguments: [MASK_X,MASK_Y]
  },
  {
    key: 16,
    id: 'SUB_VX_VY',
    name: 'SUB',
    mask: MASK_HIGHEST_AND_LOWEST_BYTE,
    pattern: 0x8005,
    arguments: [MASK_X,MASK_Y]
  },
  {
    key: 17,
    id: 'SHR_VX_VY',
    name: 'SHR',
    mask: MASK_HIGHEST_AND_LOWEST_BYTE,
    pattern: 0x8006,
    arguments: [MASK_X,MASK_Y]
  },
  {
    key: 18,
    id: 'SUBN_VX_VY',
    name: 'SUBN',
    mask: MASK_HIGHEST_AND_LOWEST_BYTE,
    pattern: 0x8007,
    arguments: [MASK_X,MASK_Y]
  },
  {
    key: 19,
    id: 'SHL_VX_VY',
    name: 'SHL',
    mask: MASK_HIGHEST_AND_LOWEST_BYTE,
    pattern: 0x800E,
    arguments: [MASK_X,MASK_Y]
  },
  {
    key: 20,
    id: 'SNE_VX_VY',
    name: 'SNE',
    mask: MASK_HIGHEST_AND_LOWEST_BYTE,
    pattern: 0x9000,
    arguments: [MASK_X,MASK_Y]
  },
  {
    key: 21,
    id: 'LD_I_ADDR',
    name: 'LD',
    mask: MASK_HIGHEST_BYTE,
    pattern: 0xA000,
    arguments: [MASK_NNN]
  },
  {
    key: 22,
    id: 'JP_V0_ADD',
    name: 'JP',
    mask: MASK_HIGHEST_BYTE,
    pattern: 0xB000,
    arguments: [MASK_NNN]
  },
  {
    key: 23,
    id: 'RND_VX',
    name: 'RND',
    mask: MASK_HIGHEST_BYTE,
    pattern: 0xC000,
    arguments: [MASK_X, MASK_KK]
  },
  {
    key: 24,
    id: 'DRW_VX_VY_N',
    name: 'DRW',
    mask: MASK_HIGHEST_BYTE,
    pattern: 0xD000,
    arguments: [MASK_X, MASK_Y, MASK_N]
  },
  {
    key: 25,
    id: 'SKP_VX',
    name: 'SKP',
    mask: 0xf0ff,
    pattern: 0xE09E,
    arguments: [MASK_X]
  },
  {
    key: 26,
    id: 'SKNP_VX',
    name: 'SKNP',
    mask: 0xf0ff,
    pattern: 0xE0A1,
    arguments: [MASK_X]
  },
  {
    key: 27,
    id: 'LD_VX_DT',
    name: 'LD',
    mask: 0xf0ff,
    pattern: 0xF007,
    arguments: [MASK_X]
  },
  {
    key: 28,
    id: 'LD_VX_K',
    name: 'LD',
    mask: 0xf0ff,
    pattern: 0xF00A,
    arguments: [MASK_X]
  },
  {
    key: 29,
    id: 'LD_DT_DX',
    name: 'LD',
    mask: 0xf0ff,
    pattern: 0xF015,
    arguments: [MASK_X]
  },
  {
    key: 30,
    id: 'LD_ST_VX',
    name: 'LD',
    mask: 0xf0ff,
    pattern: 0xF018,
    arguments: [MASK_X]
  },
  {
    key: 31,
    id: 'ADD_I_VX',
    name: 'ADD',
    mask: 0xf0ff,
    pattern: 0xF01E,
    arguments: [MASK_X]
  },
  {
    key: 32,
    id: 'LD_F_VX',
    name: 'LD',
    mask: 0xf0ff,
    pattern: 0xF029,
    arguments: [MASK_X]
  },
  {
    key: 33,
    id: 'LD_B_VX',
    name: 'LD',
    mask: 0xf0ff,
    pattern: 0xF033,
    arguments: [MASK_X]
  },
  {
    key: 34,
    id: 'LD_I_VX',
    name: 'LD',
    mask: 0xf0ff,
    pattern: 0xF055,
    arguments: [MASK_X]
  },
  {
    key: 35,
    id: 'LD_VX_I',
    name: 'LD',
    mask: 0xf0ff,
    pattern: 0xF065,
    arguments: [MASK_X]
  },
]


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Display": () => (/* binding */ Display)
/* harmony export */ });
/* harmony import */ var _constants_displayConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
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
/* 8 */
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
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Keyboard": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var _constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


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
/* 10 */
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
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Memory": () => (/* binding */ Memory)
/* harmony export */ });
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

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
  getOpCode(index){
    const highByte = this.getMemory(index)
    const lowByte = this.getMemory(index +1)
    return (highByte << 8 ) | lowByte
  }
  assertMemory(index){
    console.assert(index >= 0 && index < _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.MEMORY_SIZE, `Error: trying to access memmory at index: ${index}`)
  }
}

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Registers": () => (/* binding */ Registers)
/* harmony export */ });
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);



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

(
async() => {
  const path = "./roms/test_opcode"
  const rom = await fetch('./roms/test_opcode');
  const arrayBuffer = await rom.arrayBuffer();
  const romBuffer = new Uint8Array(arrayBuffer);
  const chip8 = new _Chip8__WEBPACK_IMPORTED_MODULE_0__.Chip8(romBuffer)
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

})();

/******/ })()
;