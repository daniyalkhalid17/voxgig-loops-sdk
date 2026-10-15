

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


describe('ContactDeleteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.ContactDelete()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ContactDelete().create({"email":1,"message":"x","success":true} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'contact_delete.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"h":"Email","n":"email","r":false,"sh":"The contact's email address.","t":"`$STRING`","key$":"email","index$":0},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":1},"success":{"a":true,"h":"Success","n":"success","r":true,"t":"`$BOOLEAN`","key$":"success","index$":2},"userId":{"a":true,"h":"User Id","n":"userId","r":false,"sh":"The contact's unique user ID.","t":"`$STRING`","key$":"userId","index$":3}},"name":"contact_delete","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["email","userId"],"co":{"id":"POST /v1/contacts/delete","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/contacts/delete","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"contacts"},{"lit":"delete"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"contact_delete","name__orig":"contact_delete","Name":"ContactDelete","name_":"contact_delete","name-":"contact-delete","NAME":"CONTACT_DELETE","index$":8}, {"active":true,"entity":"contact_delete","key$":"BasicContactDeleteFlow","kind":"basic","name":"BasicContactDeleteFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"contact_delete_ref01"},"m":{},"o":"create","s":[],"v":[]}]}, 'ContactDelete', {"POST /v1/contacts/delete":{"protocol":"http","requestBody":{"description":"Include only one of `email` or `userId`.","content":{"application/json":{"schema":{"type":"object","properties":{"email":{"type":"string","description":"The contact's email address. Provide this or `userId`, not both.","examples":["alex@company.com"],"key$":"email"},"userId":{"type":"string","description":"The contact's unique user ID. Provide this or `email`, not both.","examples":["usr_7f8e9d0c1b2a"],"key$":"userId"}},"oneOf":[{"title":"Identify by email","required":["email"]},{"title":"Identify by user ID","required":["userId"]}],"examples":[{"email":"alex@company.com"},{"userId":"usr_7f8e9d0c1b2a"}],"x-ref":"#/components/schemas/ContactDeleteRequest","index$":1}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const contact_delete_ref01_ent = client.ContactDelete()
    let contact_delete_ref01_data = setup.data.new.contact_delete['contact_delete_ref01']

    contact_delete_ref01_data = (await contact_delete_ref01_ent.create(contact_delete_ref01_data)).data()
    assert(null != contact_delete_ref01_data)


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
      '../../../../.sdk/test/entity/contact_delete/ContactDeleteTestData.json')

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
    ['contact_delete01','contact_delete02','contact_delete03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_CONTACT_DELETE_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_CONTACT_DELETE_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_CONTACT_DELETE_ENTID']
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
  
