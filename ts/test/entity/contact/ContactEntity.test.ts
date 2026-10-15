

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LoopsSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ContactEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.Contact()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('contact hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LoopsSDK.test(offline).Contact().stream('list')) { }
    }, /offline/)

    for await (const _item of LoopsSDK.test(offline).Contact()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LoopsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Contact().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LoopsSDK.test().Contact().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LoopsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Contact().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Contact().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Contact().list({"email":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'contact.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"h":"Email","n":"email","r":false,"sh":"The contact's email address.","t":"`$STRING`","key$":"email","index$":0},"firstName":{"a":true,"h":"First Name","n":"firstName","r":false,"sh":"The contact's first name.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"firstName","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The contact's Loops ID.","t":"`$STRING`","key$":"id","index$":2},"lastName":{"a":true,"h":"Last Name","n":"lastName","r":false,"sh":"The contact's last name.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"lastName","index$":3},"mailingLists":{"a":true,"h":"Mailing Lists","n":"mailingLists","r":false,"sh":"Mailing lists the contact is subscribed to, represented by key-value pairs of mailing list IDs and `true`.","t":"`$OBJECT`","key$":"mailingLists","index$":4},"optInStatus":{"a":true,"h":"Opt In Status","n":"optInStatus","r":false,"sh":"Double opt-in status.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"optInStatus","index$":5},"source":{"a":true,"h":"Source","n":"source","r":false,"sh":"The source the contact was created from.","t":"`$STRING`","key$":"source","index$":6},"subscribed":{"a":true,"h":"Subscribed","n":"subscribed","r":false,"sh":"Whether the contact will receive campaign and workflow emails.","t":"`$BOOLEAN`","key$":"subscribed","index$":7},"userGroup":{"a":true,"h":"User Group","n":"userGroup","r":false,"sh":"The contact's user group.","t":"`$STRING`","key$":"userGroup","index$":8},"userId":{"a":true,"h":"User Id","n":"userId","r":false,"sh":"The contact's unique user ID.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"userId","index$":9}},"id":{"field":"id","name":"id"},"name":"contact","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/contacts/find","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"email","or":"email","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"user_id","or":"userId","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/contacts/find","q":{"$action":"find"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"contacts"},{"lit":"find"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"contact","name__orig":"contact","Name":"Contact","name_":"contact","name-":"contact","NAME":"CONTACT","index$":7}, {"active":true,"entity":"contact","key$":"BasicContactFlow","kind":"basic","name":"BasicContactFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"contact_ref01"}}]}]}, 'Contact', {"GET /v1/contacts/find":{"protocol":"http","parameters":[{"name":"email","in":"query","required":false,"description":"Email address (URI-encoded)","schema":{"type":"string"},"index$":0},{"name":"userId","in":"query","required":false,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let contact_ref01_data = Object.values(setup.data.existing.contact)[0] as any

    // LIST
    const contact_ref01_ent = client.Contact()
    const contact_ref01_match: any = {}

    const contact_ref01_list = (await contact_ref01_ent.list(contact_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/contact/ContactTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = LoopsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['contact01','contact02','contact03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_CONTACT_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_CONTACT_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_CONTACT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new LoopsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.LOOPS_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.LOOPS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
