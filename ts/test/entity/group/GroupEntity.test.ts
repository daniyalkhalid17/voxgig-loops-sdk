

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


describe('GroupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.Group()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('group hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LoopsSDK.test(offline).Group().stream('list')) { }
    }, /offline/)

    for await (const _item of LoopsSDK.test(offline).Group()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LoopsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Group().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LoopsSDK.test().Group().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LoopsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Group().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Group().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Group().list({"cursor":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'group.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":true,"sh":"ISO 8601 timestamp for when the group was created.","t":"`$STRING`","key$":"createdAt","index$":0},"description":{"a":true,"h":"Description","n":"description","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The description of the group.","t":"`$STRING`","key$":"description","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the group.","t":"`$STRING`","key$":"id","index$":2},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The name of the group.","t":"`$STRING`","key$":"name","index$":3},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":true,"sh":"ISO 8601 timestamp for when the group was last updated.","t":"`$STRING`","key$":"updatedAt","index$":4}},"id":{"field":"id","name":"id"},"name":"group","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["description","name"],"co":{"id":"POST /v1/campaign-groups/{campaignGroupId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"campaign_group_id","or":"campaignGroupId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/campaign-groups/{campaignGroupId}","q":{"exist":["campaign_group_id"]},"r":{"param":{"campaignGroupId":"campaign_group_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"campaign-groups"},{"var":"campaign_group_id"}],"t":{"req":{"description":"`reqdata.description`","name":"`reqdata.name`"},"res":"`body`"},"index$":0},{"a":true,"bf":["description","name"],"co":{"id":"POST /v1/transactional-groups/{transactionalGroupId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"transactional_group_id","or":"transactionalGroupId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/transactional-groups/{transactionalGroupId}","q":{"exist":["transactional_group_id"]},"r":{"param":{"transactionalGroupId":"transactional_group_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"transactional-groups"},{"var":"transactional_group_id"}],"t":{"req":{"description":"`reqdata.description`","name":"`reqdata.name`"},"res":"`body`"},"index$":1},{"a":true,"bf":["description","name"],"co":{"id":"POST /v1/workflow-groups/{workflowGroupId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"workflow_group_id","or":"workflowGroupId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/workflow-groups/{workflowGroupId}","q":{"exist":["workflow_group_id"]},"r":{"param":{"workflowGroupId":"workflow_group_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflow-groups"},{"var":"workflow_group_id"}],"t":{"req":{"description":"`reqdata.description`","name":"`reqdata.name`"},"res":"`body`"},"index$":2},{"a":true,"bf":["description","name"],"co":{"id":"POST /v1/campaign-groups","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/campaign-groups","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"campaign-groups"}],"t":{"req":{"description":"`reqdata.description`","name":"`reqdata.name`"},"res":"`body`"},"index$":3},{"a":true,"bf":["description","name"],"co":{"id":"POST /v1/transactional-groups","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/transactional-groups","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"transactional-groups"}],"t":{"req":{"description":"`reqdata.description`","name":"`reqdata.name`"},"res":"`body`"},"index$":4},{"a":true,"bf":["description","name"],"co":{"id":"POST /v1/workflow-groups","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/workflow-groups","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflow-groups"}],"t":{"req":{"description":"`reqdata.description`","name":"`reqdata.name`"},"res":"`body`"},"index$":5}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/campaign-groups","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"per_page","or":"perPage","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/campaign-groups","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"campaign-groups"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /v1/transactional-groups","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"per_page","or":"perPage","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/transactional-groups","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"transactional-groups"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1},{"a":true,"co":{"id":"GET /v1/workflow-groups","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"per_page","or":"perPage","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/workflow-groups","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflow-groups"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":2}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/campaign-groups/{campaignGroupId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"campaign_group_id","or":"campaignGroupId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/campaign-groups/{campaignGroupId}","q":{"exist":["campaign_group_id"]},"r":{"param":{"campaignGroupId":"campaign_group_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"campaign-groups"},{"var":"campaign_group_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /v1/transactional-groups/{transactionalGroupId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"transactional_group_id","or":"transactionalGroupId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/transactional-groups/{transactionalGroupId}","q":{"exist":["transactional_group_id"]},"r":{"param":{"transactionalGroupId":"transactional_group_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"transactional-groups"},{"var":"transactional_group_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /v1/workflow-groups/{workflowGroupId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"workflow_group_id","or":"workflowGroupId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/workflow-groups/{workflowGroupId}","q":{"exist":["workflow_group_id"]},"r":{"param":{"workflowGroupId":"workflow_group_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflow-groups"},{"var":"workflow_group_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"group","name__orig":"group","Name":"Group","name_":"group","name-":"group","NAME":"GROUP","index$":22}, {"active":true,"entity":"group","key$":"BasicGroupFlow","kind":"basic","name":"BasicGroupFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"group_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"group_ref01"}}]},{"a":false,"d":{},"i":{"ref":"group_ref01","srcdatavar":"group_ref01_data","suffix":"_dt0"},"m":{"id":"group01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-group_ref01"}}],"unreachable":true}]}, 'Group', {"POST /v1/campaign-groups/{campaignGroupId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"At least one field must be provided.","properties":{"name":{"type":"string","description":"The group name. Cannot be the reserved name \"Unsorted\".","key$":"name"},"description":{"type":"string","description":"A description for the group.","key$":"description"}},"additionalProperties":false,"x-ref":"#/components/schemas/UpdateGroupRequest","index$":1}}}},"parameters":[{"name":"campaignGroupId","in":"path","required":true,"description":"The ID of the campaign group.","schema":{"type":"string","examples":["clg7n5p3q1r9s7t5u3v1w9y7"]},"index$":0}]},"POST /v1/transactional-groups/{transactionalGroupId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"At least one field must be provided.","properties":{"name":{"type":"string","description":"The group name. Cannot be the reserved name \"Unsorted\".","key$":"name"},"description":{"type":"string","description":"A description for the group.","key$":"description"}},"additionalProperties":false,"x-ref":"#/components/schemas/UpdateGroupRequest","index$":1}}}},"parameters":[{"name":"transactionalGroupId","in":"path","required":true,"description":"The ID of the transactional group.","schema":{"type":"string","examples":["clg7n5p3q1r9s7t5u3v1w9y7"]},"index$":0}]},"POST /v1/workflow-groups/{workflowGroupId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"At least one field must be provided.","properties":{"name":{"type":"string","description":"The group name. Cannot be the reserved name \"Unsorted\".","key$":"name"},"description":{"type":"string","description":"A description for the group.","key$":"description"}},"additionalProperties":false,"x-ref":"#/components/schemas/UpdateGroupRequest","index$":1}}}},"parameters":[{"name":"workflowGroupId","in":"path","required":true,"description":"The ID of the workflow group.","schema":{"type":"string","examples":["clg7n5p3q1r9s7t5u3v1w9y7"]},"index$":0}]},"POST /v1/campaign-groups":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The group name. Cannot be the reserved name \"Unsorted\".","examples":["Newsletters"],"key$":"name"},"description":{"type":"string","description":"An optional description for the group.","examples":["Monthly newsletter campaigns"],"key$":"description"}},"required":["name"],"additionalProperties":false,"examples":[{"name":"Newsletters","description":"Monthly newsletter campaigns"}],"x-ref":"#/components/schemas/CreateGroupRequest","index$":1}}}},"parameters":[]},"POST /v1/transactional-groups":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The group name. Cannot be the reserved name \"Unsorted\".","examples":["Newsletters"],"key$":"name"},"description":{"type":"string","description":"An optional description for the group.","examples":["Monthly newsletter campaigns"],"key$":"description"}},"required":["name"],"additionalProperties":false,"examples":[{"name":"Newsletters","description":"Monthly newsletter campaigns"}],"x-ref":"#/components/schemas/CreateGroupRequest","index$":1}}}},"parameters":[]},"POST /v1/workflow-groups":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The group name. Cannot be the reserved name \"Unsorted\".","examples":["Newsletters"],"key$":"name"},"description":{"type":"string","description":"An optional description for the group.","examples":["Monthly newsletter campaigns"],"key$":"description"}},"required":["name"],"additionalProperties":false,"examples":[{"name":"Newsletters","description":"Monthly newsletter campaigns"}],"x-ref":"#/components/schemas/CreateGroupRequest","index$":1}}}},"parameters":[]},"GET /v1/campaign-groups":{"protocol":"http","parameters":[{"name":"perPage","in":"query","required":false,"description":"How many results to return in each request. Must be between 10 and 50. Default is 20.","schema":{"type":"string"},"index$":0},{"name":"cursor","in":"query","required":false,"description":"A cursor to return a specific page of results. Cursors can be found from the `pagination.nextCursor` value in each response.","schema":{"type":"string"},"index$":1}]},"GET /v1/transactional-groups":{"protocol":"http","parameters":[{"name":"perPage","in":"query","required":false,"description":"How many results to return in each request. Must be between 10 and 50. Default is 20.","schema":{"type":"string"},"index$":0},{"name":"cursor","in":"query","required":false,"description":"A cursor to return a specific page of results. Cursors can be found from the `pagination.nextCursor` value in each response.","schema":{"type":"string"},"index$":1}]},"GET /v1/workflow-groups":{"protocol":"http","parameters":[{"name":"perPage","in":"query","required":false,"description":"How many results to return in each request. Must be between 10 and 50. Default is 20.","schema":{"type":"string"},"index$":0},{"name":"cursor","in":"query","required":false,"description":"A cursor to return a specific page of results. Cursors can be found from the `pagination.nextCursor` value in each response.","schema":{"type":"string"},"index$":1}]},"GET /v1/campaign-groups/{campaignGroupId}":{"protocol":"http","parameters":[{"name":"campaignGroupId","in":"path","required":true,"description":"The ID of the campaign group.","schema":{"type":"string","examples":["clg7n5p3q1r9s7t5u3v1w9y7"]},"index$":0}]},"GET /v1/transactional-groups/{transactionalGroupId}":{"protocol":"http","parameters":[{"name":"transactionalGroupId","in":"path","required":true,"description":"The ID of the transactional group.","schema":{"type":"string","examples":["clg7n5p3q1r9s7t5u3v1w9y7"]},"index$":0}]},"GET /v1/workflow-groups/{workflowGroupId}":{"protocol":"http","parameters":[{"name":"workflowGroupId","in":"path","required":true,"description":"The ID of the workflow group.","schema":{"type":"string","examples":["clg7n5p3q1r9s7t5u3v1w9y7"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const group_ref01_ent = client.Group()
    let group_ref01_data = setup.data.new.group['group_ref01']

    group_ref01_data = (await group_ref01_ent.create(group_ref01_data)).data()
    assert(null != group_ref01_data.id)


    // LIST
    const group_ref01_match: any = {}

    const group_ref01_list = (await group_ref01_ent.list(group_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(group_ref01_list, { id: group_ref01_data.id })))


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
      '../../../../.sdk/test/entity/group/GroupTestData.json')

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
    ['group01','group02','group03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_GROUP_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_GROUP_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_GROUP_ENTID']
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
  
