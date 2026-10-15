

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


describe('ContactPropertySuccessEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.ContactPropertySuccess()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ContactPropertySuccess().create({"name":1,"success":true,"type":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'contact_property_success.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the property.","t":"`$STRING`","key$":"name","index$":0},"success":{"a":true,"h":"Success","n":"success","r":true,"t":"`$BOOLEAN`","key$":"success","index$":1},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"The type of property.","t":"`$STRING`","key$":"type","index$":2}},"name":"contact_property_success","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["name","type"],"co":{"id":"POST /v1/contacts/properties","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/contacts/properties","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"contacts"},{"lit":"properties"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"contact_property_success","name__orig":"contact_property_success","Name":"ContactPropertySuccess","name_":"contact_property_success","name-":"contact-property-success","NAME":"CONTACT_PROPERTY_SUCCESS","index$":10}, {"active":true,"entity":"contact_property_success","key$":"BasicContactPropertySuccessFlow","kind":"basic","name":"BasicContactPropertySuccessFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"contact_property_success_ref01"},"m":{},"o":"create","s":[],"v":[]}]}, 'ContactPropertySuccess', {"POST /v1/contacts/properties":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","required":["name","type"],"description":"There are a few [reserved names](https://loops.so/docs/contacts/properties#reserved-names) that you cannot use for contact properties.","properties":{"name":{"type":"string","examples":["favoriteColor"],"description":"The name of the property. This should be in camelCase, like `planName` or `importDate`.","key$":"name"},"type":{"type":"string","examples":["string"],"description":"The type of property.","enum":["string","number","boolean","date"],"key$":"type"}},"examples":[{"name":"favoriteColor","type":"string"}],"x-ref":"#/components/schemas/ContactPropertyCreateRequest","index$":1}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const contact_property_success_ref01_ent = client.ContactPropertySuccess()
    let contact_property_success_ref01_data = setup.data.new.contact_property_success['contact_property_success_ref01']

    contact_property_success_ref01_data = (await contact_property_success_ref01_ent.create(contact_property_success_ref01_data)).data()
    assert(null != contact_property_success_ref01_data)


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
      '../../../../.sdk/test/entity/contact_property_success/ContactPropertySuccessTestData.json')

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
    ['contact_property_success01','contact_property_success02','contact_property_success03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_CONTACT_PROPERTY_SUCCESS_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_CONTACT_PROPERTY_SUCCESS_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_CONTACT_PROPERTY_SUCCESS_ENTID']
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
  
