

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


describe('ContactSuppressionStatusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.ContactSuppressionStatus()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ContactSuppressionStatus().load({"email":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'contact_suppression_status.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"contact":{"a":true,"h":"Contact","n":"contact","r":true,"t":"`$OBJECT`","key$":"contact","index$":0},"isSuppressed":{"a":true,"h":"Is Suppressed","n":"isSuppressed","r":true,"sh":"Whether the contact is suppressed.","t":"`$BOOLEAN`","key$":"isSuppressed","index$":1},"removalQuota":{"a":true,"h":"Removal Quota","n":"removalQuota","r":true,"sh":"The removal quota for the contact.","t":"`$OBJECT`","key$":"removalQuota","index$":2}},"name":"contact_suppression_status","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/contacts/suppression","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"email","or":"email","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"user_id","or":"userId","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/contacts/suppression","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"contacts"},{"lit":"suppression"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"contact_suppression_status","name__orig":"contact_suppression_status","Name":"ContactSuppressionStatus","name_":"contact_suppression_status","name-":"contact-suppression-status","NAME":"CONTACT_SUPPRESSION_STATUS","index$":13}, {"active":true,"entity":"contact_suppression_status","key$":"BasicContactSuppressionStatusFlow","kind":"basic","name":"BasicContactSuppressionStatusFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"contact_suppression_status_ref01","srcdatavar":"contact_suppression_status_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-contact_suppression_status_ref01"}}]}]}, 'ContactSuppressionStatus', {"GET /v1/contacts/suppression":{"protocol":"http","parameters":[{"name":"email","in":"query","required":false,"description":"Email address (URI-encoded)","schema":{"type":"string"},"index$":0},{"name":"userId","in":"query","required":false,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let contact_suppression_status_ref01_data = Object.values(setup.data.existing.contact_suppression_status)[0] as any

    // LOAD
    const contact_suppression_status_ref01_ent = client.ContactSuppressionStatus()
    const contact_suppression_status_ref01_match_dt0: any = {}
    const contact_suppression_status_ref01_data_dt0 = (await contact_suppression_status_ref01_ent.load(contact_suppression_status_ref01_match_dt0)).data()
    assert(null != contact_suppression_status_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/contact_suppression_status/ContactSuppressionStatusTestData.json')

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
    ['contact_suppression_status01','contact_suppression_status02','contact_suppression_status03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_CONTACT_SUPPRESSION_STATUS_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_CONTACT_SUPPRESSION_STATUS_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_CONTACT_SUPPRESSION_STATUS_ENTID']
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
  
