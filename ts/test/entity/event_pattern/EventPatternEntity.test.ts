

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


describe('EventPatternEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.EventPattern()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('event_pattern hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LoopsSDK.test(offline).EventPattern().stream('list')) { }
    }, /offline/)

    for await (const _item of LoopsSDK.test(offline).EventPattern()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LoopsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.EventPattern().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LoopsSDK.test().EventPattern().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LoopsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.EventPattern().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.EventPattern().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.EventPattern().list({"cursor":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'event_pattern.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"eventName":{"a":true,"h":"Event Name","n":"eventName","r":true,"sh":"The name of the event pattern.","t":"`$STRING`","key$":"eventName","index$":0},"eventProperties":{"a":true,"h":"Event Properties","n":"eventProperties","r":true,"sh":"The properties of the event pattern, which can be used in emails.","t":"`$ARRAY`","key$":"eventProperties","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the event pattern.","t":"`$STRING`","key$":"id","index$":2},"incomingWebhookPlatform":{"a":true,"h":"Incoming Webhook Platform","n":"incomingWebhookPlatform","r":true,"sh":"The platform that sent this event pattern, if the event pattern is from an incoming webhook.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"incomingWebhookPlatform","index$":3}},"id":{"field":"id","name":"id"},"name":"event_pattern","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/event-patterns","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"per_page","or":"perPage","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/event-patterns","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"event-patterns"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/event-patterns/by-name/{eventName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"event_name","or":"eventName","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/event-patterns/by-name/{eventName}","q":{"exist":["event_name"]},"r":{"param":{"eventName":"event_name"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"event-patterns"},{"lit":"by-name"},{"var":"event_name"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /v1/event-patterns/{eventPatternId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"eventPatternId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/event-patterns/{eventPatternId}","q":{"exist":["id"]},"r":{"param":{"eventPatternId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"event-patterns"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"event_pattern","name__orig":"event_pattern","Name":"EventPattern","name_":"event_pattern","name-":"event-pattern","NAME":"EVENT_PATTERN","index$":20}, {"active":true,"entity":"event_pattern","key$":"BasicEventPatternFlow","kind":"basic","name":"BasicEventPatternFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"event_pattern_ref01"}}]},{"a":true,"d":{},"i":{"ref":"event_pattern_ref01","srcdatavar":"event_pattern_ref01_data","suffix":"_dt0"},"m":{"id":"event_pattern01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-event_pattern_ref01"}}]}]}, 'EventPattern', {"GET /v1/event-patterns":{"protocol":"http","parameters":[{"name":"perPage","in":"query","required":false,"description":"How many results to return in each request. Must be between 10 and 50. Default is 20.","schema":{"type":"string"},"index$":0},{"name":"cursor","in":"query","required":false,"description":"A cursor to return a specific page of results. Cursors can be found from the `pagination.nextCursor` value in each response.","schema":{"type":"string"},"index$":1}]},"GET /v1/event-patterns/by-name/{eventName}":{"protocol":"http","parameters":[{"name":"eventName","in":"path","required":true,"description":"The exact event name. Event names are case-sensitive and should be URL-encoded if they contain special characters.","schema":{"type":"string"},"index$":0}]},"GET /v1/event-patterns/{eventPatternId}":{"protocol":"http","parameters":[{"name":"eventPatternId","in":"path","required":true,"description":"The ID of the event pattern.","schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let event_pattern_ref01_data = Object.values(setup.data.existing.event_pattern)[0] as any

    // LIST
    const event_pattern_ref01_ent = client.EventPattern()
    const event_pattern_ref01_match: any = {}

    const event_pattern_ref01_list = (await event_pattern_ref01_ent.list(event_pattern_ref01_match)).map((e: any) => e.data())


    // LOAD
    const event_pattern_ref01_match_dt0: any = {}
    event_pattern_ref01_match_dt0.id = event_pattern_ref01_data.id
    const event_pattern_ref01_data_dt0 = (await event_pattern_ref01_ent.load(event_pattern_ref01_match_dt0)).data()
    assert(event_pattern_ref01_data_dt0.id === event_pattern_ref01_data.id)


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
      '../../../../.sdk/test/entity/event_pattern/EventPatternTestData.json')

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
    ['event_pattern01','event_pattern02','event_pattern03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_EVENT_PATTERN_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_EVENT_PATTERN_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_EVENT_PATTERN_ENTID']
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
  
