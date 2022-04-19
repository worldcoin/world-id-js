import { validateABILikeEncoding } from 'utils'

describe('validateABILikeEncoding', () => {
  it('validates correct cases', () => {
    expect(validateABILikeEncoding('0x0000000000000000000000000000000000000000000000000000000000000000')).toBeTruthy() // uint8
    expect(validateABILikeEncoding('0x0000000000000000000000000000000000000000000000000000000000000001')).toBeTruthy() // bool
    expect(
      validateABILikeEncoding(
        '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a68656c6c6f576f726c6400000000000000000000000000000000000000000000'
      )
    ).toBeTruthy() // string
    expect(validateABILikeEncoding('0x0000000000000000000000004976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41')).toBeTruthy() // address
    expect(
      validateABILikeEncoding(
        '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000013100000000000000000000000000000000000000000000000000000000000000'
      )
    ).toBeTruthy() // another string
  })

  it('rejects invalid cases', () => {
    expect(validateABILikeEncoding('0x123')).toBeFalsy() // too short
    expect(validateABILikeEncoding('????')).toBeFalsy() // invalid format
    expect(validateABILikeEncoding('0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41')).toBeFalsy() // improperly padded
    expect(validateABILikeEncoding('1')).toBeFalsy()
    expect(validateABILikeEncoding('🪙🪙🪙')).toBeFalsy() // invalid chars
    expect(validateABILikeEncoding('0x00000000000000000000000000000000000000@0000000000000000000000000')).toBeFalsy() // invalid chars
    expect(validateABILikeEncoding('0x000000000000000000000000000000000000000000000000000000000000000z')).toBeFalsy() // invalid chars
  })
})
