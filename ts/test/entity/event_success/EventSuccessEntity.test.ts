

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


describe('EventSuccessEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.EventSuccess()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.EventSuccess().create({"email":1,"eventName":"x","success":true} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'event_success.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"h":"Email","n":"email","r":false,"sh":"The contact's email address.","t":"`$STRING`","key$":"email","index$":0},"eventName":{"a":true,"h":"Event Name","n":"eventName","r":true,"sh":"The name of the event.","t":"`$STRING`","key$":"eventName","index$":1},"eventProperties":{"a":true,"h":"Event Properties","n":"eventProperties","r":false,"sh":"An object containing event property data for the event, available in emails sent by the event.","t":"`$OBJECT`","key$":"eventProperties","index$":2},"mailingLists":{"a":true,"h":"Mailing Lists","n":"mailingLists","r":false,"sh":"Manage mailing list subscriptions.","t":"`$OBJECT`","key$":"mailingLists","index$":3},"success":{"a":true,"h":"Success","n":"success","r":true,"t":"`$BOOLEAN`","key$":"success","index$":4},"userId":{"a":true,"h":"User Id","n":"userId","r":false,"sh":"The contact's unique user ID.","t":"`$STRING`","key$":"userId","index$":5}},"name":"event_success","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["email","eventName","eventProperties","mailingLists","userId"],"co":{"id":"POST /v1/events/send","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/events/send","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"events"},{"lit":"send"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"event_success","name__orig":"event_success","Name":"EventSuccess","name_":"event_success","name-":"event-success","NAME":"EVENT_SUCCESS","index$":21}, {"active":true,"entity":"event_success","key$":"BasicEventSuccessFlow","kind":"basic","name":"BasicEventSuccessFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"event_success_ref01"},"m":{},"o":"create","s":[],"v":[]}]}, 'EventSuccess', {"POST /v1/events/send":{"protocol":"http","requestBody":{"description":"Provide either `email` or `userId` to identify the contact ([read more](https://loops.so/docs/api-reference/send-event#body)).<br>Event properties will be available in emails sent by this event. Values of properties can be of type `string`, `number`, `boolean` or `date` ([see allowed date formats](https://loops.so/docs/events/properties#important-information-about-event-properties)).<br>Make sure to create the properties in Loops before using them in API calls.<br>You can add update the contact by adding contact properties as keys in this request (of type `string`, `number`, `boolean` or `date` ([see available date formats](https://loops.so/docs/contacts/properties#dates))).","content":{"application/json":{"schema":{"type":"object","required":["eventName"],"anyOf":[{"title":"Identify by email","required":["email"]},{"title":"Identify by user ID","required":["userId"]}],"properties":{"email":{"type":"string","description":"The contact's email address. **Required if `userId` is not provided.**","examples":["alex@company.com"],"key$":"email"},"userId":{"type":"string","description":"The contact's unique user ID. **Required if `email` is not provided.**","examples":["usr_7f8e9d0c1b2a"],"key$":"userId"},"eventName":{"type":"string","description":"The name of the event.","examples":["signup"],"key$":"eventName"},"eventProperties":{"type":"object","description":"An object containing event property data for the event, available in emails sent by the event.","examples":[{"planName":"Pro","importDate":"2021-01-01"}],"key$":"eventProperties"},"mailingLists":{"type":"object","description":"Manage mailing list subscriptions.\n\nInclude key-value pairs of mailing list IDs and a `boolean` denoting if the contact should be added (`true`) or removed (`false`) from the list.","examples":[{"cm06f5v0e45nf0ml5754o9cix":true,"cm16k73gq014h0mmj5b6jdi9r":false}],"x-ref":"#/components/schemas/MailingListSubscriptions","key$":"mailingLists"}},"additionalProperties":{"oneOf":[{"title":"String","type":"string"},{"title":"Number","type":"number"},{"title":"Boolean","type":"boolean"}]},"examples":[{"email":"alex@company.com","userId":"usr_7f8e9d0c1b2a","eventName":"signup","eventProperties":{"plan":"pro"},"mailingLists":{"clm2k8j4h6g0f8d6s4a2b0z8":true},"favoriteColor":"blue","planName":"Pro"}],"x-ref":"#/components/schemas/EventRequest","index$":1}}},"required":true},"parameters":[{"in":"header","name":"Idempotency-Key","description":"Include a unique ID for this request (maximum 100 characters) to avoid duplicate emails.\n\nThe value should be a string of up to 100 characters and should be unique for each request. We recommend using V4 UUIDs or some other method with enough guaranteed entropy to avoid collisions during a 24 hour window.\n\nThis endpoint will return a `409 Conflict` response if the idempotency key has been used in the previous 24 hours.","schema":{"type":"string","maxLength":100},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const event_success_ref01_ent = client.EventSuccess()
    let event_success_ref01_data = setup.data.new.event_success['event_success_ref01']

    event_success_ref01_data = (await event_success_ref01_ent.create(event_success_ref01_data)).data()
    assert(null != event_success_ref01_data)


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
      '../../../../.sdk/test/entity/event_success/EventSuccessTestData.json')

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
    ['event_success01','event_success02','event_success03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_EVENT_SUCCESS_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_EVENT_SUCCESS_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_EVENT_SUCCESS_ENTID']
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
  
