import { validateABILikeEncoding, buildVerificationRequest, hashString, hashEncodedBytes, worldIDHash } from 'utils'
import crypto from 'crypto'

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

describe('worldIDHash', () => {
  it('properly identifies an address as bytes', () => {
    const hashed = worldIDHash('0xaaad5A58AB11bc7eE9668f6b7fF52BDde0C64774')
    expect(hashed.digest).toEqual('0x0036434bc85c8a3564d1b3a2945690c43175fce6d0af9453c091ddec1f818fe5')
    expect(hashed.hash).toEqual(BigInt(hashed.digest))
  })
  it('properly identifies a number as bytes', () => {
    const hashed = worldIDHash('0x0000000000000000000000000000000000000000000000000000000000000001')
    expect(hashed.digest).toEqual('0x00b10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0c')
    expect(hashed.hash).toEqual(BigInt(hashed.digest))
  })
  it('properly identifies a string as string', () => {
    const hashed = worldIDHash('wid_staging_1')
    expect(hashed.digest).toEqual('0x00287d53b28fff709bfe583d997b7ec96e89e2f621db8519cd0ffc2dfdce68e3')
    expect(hashed.hash).toEqual(BigInt(hashed.digest))
  })
})

describe('hashString', () => {
  it('pads hash output correctly', () => {
    const randString = crypto.randomBytes(24).toString('utf-8')
    const hashed = hashString(randString)
    expect(hashed.digest.length).toEqual(64 + 2) // 64 bytes + `0x`
    expect(hashed.hash).toEqual(BigInt(hashed.digest))
  })
  it('hashes string correctly', () => {
    const hashed = hashString('iAmMario')
    expect(hashed.digest).toEqual('0x0039bc875c711af9786d4ea1eab987d4a602c26eca0af14ce6639fa254b06c47')
    expect(hashed.hash).toEqual(BigInt(hashed.digest))
  })
})

describe('hashEncodedBytes', () => {
  it('hashes an address correctly', () => {
    const hashed = hashEncodedBytes('0xaaad5A58AB11bc7eE9668f6b7fF52BDde0C64774')
    expect(hashed.digest).toEqual('0x0036434bc85c8a3564d1b3a2945690c43175fce6d0af9453c091ddec1f818fe5')
    expect(hashed.hash).toEqual(BigInt(hashed.digest))
  })

  it('pads hash output from bytes correctly', () => {
    const randBytes = crypto.randomBytes(24)
    const hashed = hashEncodedBytes(randBytes)
    expect(hashed.digest.length).toEqual(64 + 2) // 64 bytes + `0x`
    expect(hashed.hash).toEqual(BigInt(hashed.digest))
  })
})

describe('buildVerificationRequest', () => {
  it('encodes signal & action ID correctly', () => {
    const output = buildVerificationRequest({
      action_id: 'my_action',
      signal: 'my_signal',
      on_error: () => null,
      on_success: () => null,
    })
    expect(output).toEqual(
      expect.objectContaining({
        jsonrpc: '2.0',
        method: 'wld_worldIDVerification',
        params: [
          {
            signal: '0x001578ed0de47522ad0b38e87031739c6a65caecc39ce3410bf3799e756a220f',
            action_id: '0x00613f81942f9596647024684e3e509c865678e13898086695dcf0cac0293b9c',
          },
        ],
      })
    )
  })
  it('passes signal raw if appropriate', () => {
    const output = buildVerificationRequest({
      action_id: 'my_action',
      signal: '0x001578ed0de47522ad0b38e87031739c6a65caecc39ce3410bf3799e756a220f',
      advanced_use_raw_signal: true,
      on_error: () => null,
      on_success: () => null,
    })
    expect(output).toEqual(
      expect.objectContaining({
        jsonrpc: '2.0',
        method: 'wld_worldIDVerification',
        params: [
          {
            signal: '0x001578ed0de47522ad0b38e87031739c6a65caecc39ce3410bf3799e756a220f',
            action_id: '0x00613f81942f9596647024684e3e509c865678e13898086695dcf0cac0293b9c',
          },
        ],
      })
    )
  })
  it('passes action ID raw if appropriate', () => {
    const output = buildVerificationRequest({
      action_id: '0x00613f81942f9596647024684e3e509c865678e13898086695dcf0cac0293b9c',
      signal: 'my_signal',
      advanced_use_raw_action_id: true,
      on_error: () => null,
      on_success: () => null,
    })
    expect(output).toEqual(
      expect.objectContaining({
        jsonrpc: '2.0',
        method: 'wld_worldIDVerification',
        params: [
          {
            signal: '0x001578ed0de47522ad0b38e87031739c6a65caecc39ce3410bf3799e756a220f',
            action_id: '0x00613f81942f9596647024684e3e509c865678e13898086695dcf0cac0293b9c',
          },
        ],
      })
    )
  })
})
