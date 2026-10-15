
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LoopsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = LoopsSDK.test()
    equal(testsdk instanceof LoopsSDK, true,
      'LoopsSDK.test() must return a client synchronously')
  })

})
