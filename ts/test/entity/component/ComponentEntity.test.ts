

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


describe('ComponentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.Component()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('component hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LoopsSDK.test(offline).Component().stream('list')) { }
    }, /offline/)

    for await (const _item of LoopsSDK.test(offline).Component()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LoopsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Component().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LoopsSDK.test().Component().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LoopsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Component().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Component().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Component().list({"cursor":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'component.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the component.","t":"`$STRING`","key$":"id","index$":0},"lmx":{"a":true,"h":"Lmx","n":"lmx","r":true,"sh":"The component body serialized as LMX.","t":"`$STRING`","key$":"lmx","index$":1},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the component.","t":"`$STRING`","key$":"name","index$":2}},"id":{"field":"id","name":"id"},"name":"component","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["lmx","name"],"co":{"id":"POST /v1/components","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/components","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"components"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/components","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"per_page","or":"perPage","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/components","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"components"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/components/{componentId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"componentId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/components/{componentId}","q":{"exist":["id"]},"r":{"param":{"componentId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"components"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"component","name__orig":"component","Name":"Component","name_":"component","name-":"component","NAME":"COMPONENT","index$":5}, {"active":true,"entity":"component","key$":"BasicComponentFlow","kind":"basic","name":"BasicComponentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"component_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"component_ref01"}}]},{"a":true,"d":{},"i":{"ref":"component_ref01","srcdatavar":"component_ref01_data","suffix":"_dt0"},"m":{"id":"component01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-component_ref01"}}]}]}, 'Component', {"POST /v1/components":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The component name.","key$":"name"},"lmx":{"type":"string","description":"The component body as an LMX string.","key$":"lmx"}},"required":["name","lmx"],"examples":[{"name":"Header","lmx":"<Paragraph>Welcome to Acme</Paragraph>"}],"x-ref":"#/components/schemas/CreateComponentBody","index$":1}}}},"parameters":[]},"GET /v1/components":{"protocol":"http","parameters":[{"name":"perPage","in":"query","required":false,"description":"How many results to return in each request. Must be between 10 and 50. Default is 20.","schema":{"type":"string"},"index$":0},{"name":"cursor","in":"query","required":false,"description":"A cursor to return a specific page of results. Cursors can be found from the `pagination.nextCursor` value in each response.","schema":{"type":"string"},"index$":1}]},"GET /v1/components/{componentId}":{"protocol":"http","parameters":[{"name":"componentId","in":"path","required":true,"description":"The ID of the component.","schema":{"type":"string","examples":["clp2o4i6u8y0t5r3e1w7q9s1"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const component_ref01_ent = client.Component()
    let component_ref01_data = setup.data.new.component['component_ref01']

    component_ref01_data = (await component_ref01_ent.create(component_ref01_data)).data()
    assert(null != component_ref01_data.id)


    // LIST
    const component_ref01_match: any = {}

    const component_ref01_list = (await component_ref01_ent.list(component_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(component_ref01_list, { id: component_ref01_data.id })))


    // LOAD
    const component_ref01_match_dt0: any = {}
    component_ref01_match_dt0.id = component_ref01_data.id
    const component_ref01_data_dt0 = (await component_ref01_ent.load(component_ref01_match_dt0)).data()
    assert(component_ref01_data_dt0.id === component_ref01_data.id)


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
      '../../../../.sdk/test/entity/component/ComponentTestData.json')

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
    ['component01','component02','component03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_COMPONENT_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_COMPONENT_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_COMPONENT_ENTID']
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
  
