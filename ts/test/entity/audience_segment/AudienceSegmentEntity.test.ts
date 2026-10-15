

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


describe('AudienceSegmentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.AudienceSegment()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('audience_segment hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LoopsSDK.test(offline).AudienceSegment().stream('list')) { }
    }, /offline/)

    for await (const _item of LoopsSDK.test(offline).AudienceSegment()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LoopsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.AudienceSegment().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LoopsSDK.test().AudienceSegment().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LoopsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.AudienceSegment().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.AudienceSegment().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AudienceSegment().list({"cursor":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'audience_segment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"h":"Created At","n":"createdAt","r":true,"sh":"ISO 8601 timestamp for when the audience segment was created.","t":"`$STRING`","key$":"createdAt","index$":0},"description":{"a":true,"h":"Description","n":"description","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"An optional description of the audience segment.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"description","index$":1},"filter":{"a":true,"h":"Filter","n":"filter","r":true,"sh":"A tree of audience conditions combined with `match`.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"union":{"branches":3,"count":1,"depth":7},"key$":"filter","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the audience segment.","t":"`$STRING`","key$":"id","index$":3},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the audience segment.","t":"`$STRING`","key$":"name","index$":4},"updatedAt":{"a":true,"h":"Updated At","n":"updatedAt","r":true,"sh":"ISO 8601 timestamp for when the audience segment was last updated.","t":"`$STRING`","key$":"updatedAt","index$":5}},"id":{"field":"id","name":"id"},"name":"audience_segment","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["description","filter","name"],"co":{"id":"POST /v1/audience-segments","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/audience-segments","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"audience-segments"}],"t":{"req":{"description":"`reqdata.description`","filter":"`reqdata.filter`","name":"`reqdata.name`"},"res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/audience-segments","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"per_page","or":"perPage","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/audience-segments","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"audience-segments"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/audience-segments/{audienceSegmentId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"audienceSegmentId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/audience-segments/{audienceSegmentId}","q":{"exist":["id"]},"r":{"param":{"audienceSegmentId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"audience-segments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"audience_segment","name__orig":"audience_segment","Name":"AudienceSegment","name_":"audience_segment","name-":"audience-segment","NAME":"AUDIENCE_SEGMENT","index$":1}, {"active":true,"entity":"audience_segment","key$":"BasicAudienceSegmentFlow","kind":"basic","name":"BasicAudienceSegmentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"audience_segment_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"audience_segment_ref01"}}]},{"a":true,"d":{},"i":{"ref":"audience_segment_ref01","srcdatavar":"audience_segment_ref01_data","suffix":"_dt0"},"m":{"id":"audience_segment01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-audience_segment_ref01"}}]}]}, 'AudienceSegment', {"POST /v1/audience-segments":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","maxLength":255,"description":"The name of the audience segment. Must be unique within the team.","examples":["Active users"],"key$":"name"},"description":{"type":"string","maxLength":1000,"description":"An optional description of the audience segment.","key$":"description"},"filter":{"type":"object","description":"A tree of audience conditions combined with `match`.","properties":{"match":{"type":"string","enum":["all","any"]},"conditions":{"type":"array","minItems":1,"items":{"oneOf":[],"discriminator":{},"x-ref":"#/components/schemas/AudienceFilterCondition"}}},"required":["match","conditions"],"additionalProperties":false,"key$":"filter"}},"required":["name","filter"],"additionalProperties":false,"x-ref":"#/components/schemas/CreateAudienceSegmentRequest","index$":1}}}},"parameters":[]},"GET /v1/audience-segments":{"protocol":"http","parameters":[{"name":"perPage","in":"query","required":false,"description":"How many results to return in each request. Must be between 10 and 50. Default is 20.","schema":{"type":"string"},"index$":0},{"name":"cursor","in":"query","required":false,"description":"A cursor to return a specific page of results. Cursors can be found from the `pagination.nextCursor` value in each response.","schema":{"type":"string"},"index$":1}]},"GET /v1/audience-segments/{audienceSegmentId}":{"protocol":"http","parameters":[{"name":"audienceSegmentId","in":"path","required":true,"description":"The ID of the audience segment.","schema":{"type":"string","examples":["cls6e8g0i2k4m6o8q0s2u4w6"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const audience_segment_ref01_ent = client.AudienceSegment()
    let audience_segment_ref01_data = setup.data.new.audience_segment['audience_segment_ref01']

    audience_segment_ref01_data = (await audience_segment_ref01_ent.create(audience_segment_ref01_data)).data()
    assert(null != audience_segment_ref01_data.id)


    // LIST
    const audience_segment_ref01_match: any = {}

    const audience_segment_ref01_list = (await audience_segment_ref01_ent.list(audience_segment_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(audience_segment_ref01_list, { id: audience_segment_ref01_data.id })))


    // LOAD
    const audience_segment_ref01_match_dt0: any = {}
    audience_segment_ref01_match_dt0.id = audience_segment_ref01_data.id
    const audience_segment_ref01_data_dt0 = (await audience_segment_ref01_ent.load(audience_segment_ref01_match_dt0)).data()
    assert(audience_segment_ref01_data_dt0.id === audience_segment_ref01_data.id)


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
      '../../../../.sdk/test/entity/audience_segment/AudienceSegmentTestData.json')

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
    ['audience_segment01','audience_segment02','audience_segment03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_AUDIENCE_SEGMENT_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_AUDIENCE_SEGMENT_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_AUDIENCE_SEGMENT_ENTID']
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
  
