

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


describe('SimplifiedWorkflowEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.SimplifiedWorkflow()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('simplified_workflow hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LoopsSDK.test(offline).SimplifiedWorkflow().stream('list')) { }
    }, /offline/)

    for await (const _item of LoopsSDK.test(offline).SimplifiedWorkflow()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LoopsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.SimplifiedWorkflow().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LoopsSDK.test().SimplifiedWorkflow().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LoopsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.SimplifiedWorkflow().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.SimplifiedWorkflow().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SimplifiedWorkflow().list({"cursor":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'simplified_workflow.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":true,"sh":"ISO 8601 timestamp for when the workflow was created.","t":"`$STRING`","key$":"createdAt","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"The description of the workflow.","t":"`$STRING`","key$":"description","index$":1},"expectedRevisionId":{"a":true,"h":"Expected Revision Id","n":"expectedRevisionId","r":true,"sh":"The workflow revision token returned by the latest workflow read or mutation.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"expectedRevisionId","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the workflow.","t":"`$STRING`","key$":"id","index$":3},"mailingListId":{"a":true,"h":"Mailing List Id","n":"mailingListId","op":{"create":{"req":false,"type":["`$ONE`",["`$STRING`","`$NULL`"]]}},"r":true,"sh":"The ID of the mailing list the workflow sends to.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"mailingListId","index$":4},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":true,"type":"`$STRING`"},"list":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The name of the workflow.","t":"`$STRING`","key$":"name","index$":5},"nodes":{"a":true,"h":"Nodes","n":"nodes","r":true,"sh":"A map of node IDs to simplified node objects.","t":"`$OBJECT`","union":{"branches":3,"count":1,"depth":11},"key$":"nodes","index$":6},"rootNodeId":{"a":true,"h":"Root Node Id","n":"rootNodeId","r":true,"sh":"The ID of the root node in the workflow graph.","t":"`$STRING`","key$":"rootNodeId","index$":7},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":8},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":true,"sh":"ISO 8601 timestamp for when the workflow was last updated.","t":"`$STRING`","key$":"updatedAt","index$":9},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"sh":"The URL of the workflow in the Loops app.","t":"`$STRING`","key$":"url","index$":10},"workflowRevisionId":{"a":true,"h":"Workflow Revision Id","n":"workflowRevisionId","r":true,"sh":"The current workflow revision token.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"workflowRevisionId","index$":11}},"id":{"field":"id","name":"id"},"name":"simplified_workflow","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["description","expectedRevisionId","name"],"co":{"id":"POST /v1/workflows/{workflowId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"workflowId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/workflows/{workflowId}","q":{"exist":["id"]},"r":{"param":{"workflowId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflows"},{"var":"id"}],"t":{"req":{"description":"`reqdata.description`","expectedRevisionId":"`reqdata.expected_revision_id`","name":"`reqdata.name`"},"res":"`body`"},"index$":0},{"a":true,"bf":["description","mailingListId","name"],"co":{"id":"POST /v1/workflows","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/workflows","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflows"}],"t":{"req":{"description":"`reqdata.description`","mailingListId":"`reqdata.mailing_list_id`","name":"`reqdata.name`"},"res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/workflows","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"per_page","or":"perPage","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/workflows","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflows"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/workflows/{workflowId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"workflowId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/workflows/{workflowId}","q":{"exist":["id"]},"r":{"param":{"workflowId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflows"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"simplified_workflow","name__orig":"simplified_workflow","Name":"SimplifiedWorkflow","name_":"simplified_workflow","name-":"simplified-workflow","NAME":"SIMPLIFIED_WORKFLOW","index$":24}, {"active":true,"entity":"simplified_workflow","key$":"BasicSimplifiedWorkflowFlow","kind":"basic","name":"BasicSimplifiedWorkflowFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"simplified_workflow_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"simplified_workflow_ref01"}}]},{"a":true,"d":{},"i":{"ref":"simplified_workflow_ref01","srcdatavar":"simplified_workflow_ref01_data","suffix":"_dt0"},"m":{"id":"simplified_workflow01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-simplified_workflow_ref01"}}]}]}, 'SimplifiedWorkflow', {"POST /v1/workflows/{workflowId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"At least one property must be provided.","properties":{"expectedRevisionId":{"type":["string","null"],"description":"The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.","x-ref":"#/components/schemas/WorkflowExpectedRevisionId","key$":"expectedRevisionId"},"name":{"type":"string","description":"The updated workflow name.","key$":"name"},"description":{"type":"string","description":"The updated workflow description.","key$":"description"}},"required":["expectedRevisionId"],"anyOf":[{"title":"Name","required":["name"]},{"title":"Description","required":["description"]}],"additionalProperties":false,"x-ref":"#/components/schemas/UpdateWorkflowPropertiesRequest","index$":1}}}},"parameters":[{"name":"workflowId","in":"path","required":true,"description":"The ID of the workflow.","schema":{"type":"string","examples":["clw1a3b5c7d9e1f3g5h7i9j1"]},"index$":0}]},"POST /v1/workflows":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The name of the workflow.","key$":"name"},"description":{"type":"string","description":"The description of the workflow.","key$":"description"},"mailingListId":{"type":["string","null"],"description":"The ID of a mailing list the workflow sends to. After creation, the mailing list can be changed with the `/v1/workflows/{workflowId}/mailing-list` endpoint.","key$":"mailingListId"}},"required":["name"],"additionalProperties":false,"x-ref":"#/components/schemas/CreateWorkflowRequest","index$":1}}}},"parameters":[]},"GET /v1/workflows":{"protocol":"http","parameters":[{"name":"perPage","in":"query","required":false,"description":"How many results to return in each request. Must be between 10 and 50. Default is 20.","schema":{"type":"string"},"index$":0},{"name":"cursor","in":"query","required":false,"description":"A cursor to return a specific page of results. Cursors can be found from the `pagination.nextCursor` value in each response.","schema":{"type":"string"},"index$":1}]},"GET /v1/workflows/{workflowId}":{"protocol":"http","parameters":[{"name":"workflowId","in":"path","required":true,"description":"The ID of the workflow.","schema":{"type":"string","examples":["clw1a3b5c7d9e1f3g5h7i9j1"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const simplified_workflow_ref01_ent = client.SimplifiedWorkflow()
    let simplified_workflow_ref01_data = setup.data.new.simplified_workflow['simplified_workflow_ref01']

    simplified_workflow_ref01_data = (await simplified_workflow_ref01_ent.create(simplified_workflow_ref01_data)).data()
    assert(null != simplified_workflow_ref01_data.id)


    // LIST
    const simplified_workflow_ref01_match: any = {}

    const simplified_workflow_ref01_list = (await simplified_workflow_ref01_ent.list(simplified_workflow_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(simplified_workflow_ref01_list, { id: simplified_workflow_ref01_data.id })))


    // LOAD
    const simplified_workflow_ref01_match_dt0: any = {}
    simplified_workflow_ref01_match_dt0.id = simplified_workflow_ref01_data.id
    const simplified_workflow_ref01_data_dt0 = (await simplified_workflow_ref01_ent.load(simplified_workflow_ref01_match_dt0)).data()
    assert(simplified_workflow_ref01_data_dt0.id === simplified_workflow_ref01_data.id)


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
      '../../../../.sdk/test/entity/simplified_workflow/SimplifiedWorkflowTestData.json')

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
    ['simplified_workflow01','simplified_workflow02','simplified_workflow03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_SIMPLIFIED_WORKFLOW_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_SIMPLIFIED_WORKFLOW_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_SIMPLIFIED_WORKFLOW_ENTID']
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
  
