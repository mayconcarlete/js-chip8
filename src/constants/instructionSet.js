export const MASK_NN = {mask: 0x0fff}
export const MASK_X = {mask: 0x0f00, shift:8}
export const MASK_KK = {mask: 0x00ff}
export const MASK_Y = {mask: 0x00f0, shift: 4}
export const INSTRUCTION_SET = [
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
