

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


describe('WorkflowNodeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.WorkflowNode()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.WorkflowNode().remove({"id":1,"workflow_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'workflow_node.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"workflow_node","op":{"remove":{"input":"data","name":"remove","points":[{"a":true,"bf":["dryRun","expectedRevisionId","queuedContactPolicy"],"co":{"id":"DELETE /v1/workflows/{workflowId}/nodes/{nodeId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"nodeId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"workflow_id","or":"workflowId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/v1/workflows/{workflowId}/nodes/{nodeId}","q":{"exist":["id","workflow_id"]},"r":{"param":{"nodeId":"id","workflowId":"workflow_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflows"},{"var":"workflow_id"},{"lit":"nodes"},{"var":"id"}],"t":{"req":{"dryRun":"`reqdata.dry_run`","expectedRevisionId":"`reqdata.expected_revision_id`","queuedContactPolicy":"`reqdata.queued_contact_policy`"},"res":"`body`"},"index$":0},{"a":true,"bf":["dryRun","expectedRevisionId","queuedContactPolicy"],"co":{"id":"DELETE /v1/workflows/{workflowId}/nodes/{nodeId}/recursive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"node_id","or":"nodeId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"workflow_id","or":"workflowId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/v1/workflows/{workflowId}/nodes/{nodeId}/recursive","q":{"exist":["node_id","workflow_id"]},"r":{"param":{"nodeId":"node_id","workflowId":"workflow_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflows"},{"var":"workflow_id"},{"lit":"nodes"},{"var":"node_id"},{"lit":"recursive"}],"t":{"req":{"dryRun":"`reqdata.dry_run`","expectedRevisionId":"`reqdata.expected_revision_id`","queuedContactPolicy":"`reqdata.queued_contact_policy`"},"res":"`body`"},"index$":1}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.workflow"],["$.main.kit.entity.workflow"]]},"key$":"workflow_node","name__orig":"workflow_node","Name":"WorkflowNode","name_":"workflow_node","name-":"workflow-node","NAME":"WORKFLOW_NODE","index$":34}, {"active":true,"entity":"workflow_node","key$":"BasicWorkflowNodeFlow","kind":"basic","name":"BasicWorkflowNodeFlow","param":{},"step":[]}, 'WorkflowNode', {"DELETE /v1/workflows/{workflowId}/nodes/{nodeId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"expectedRevisionId":{"type":["string","null"],"description":"The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.","x-ref":"#/components/schemas/WorkflowExpectedRevisionId"},"dryRun":{"type":"boolean","description":"If `true`, the request will be validated but the workflow will not be modified."},"queuedContactPolicy":{"type":"string","enum":["fail","discard"],"default":"fail","description":"`fail` returns queued-contact impact instead of mutating. `discard` confirms that matching queued contacts should be discarded. Defaults to `fail` when omitted.","x-ref":"#/components/schemas/WorkflowQueuedContactPolicy"}},"required":["expectedRevisionId"],"additionalProperties":false,"x-ref":"#/components/schemas/DeleteWorkflowNodeRequest"}}}},"parameters":[{"name":"workflowId","in":"path","required":true,"description":"The ID of the workflow.","schema":{"type":"string","examples":["clw1a3b5c7d9e1f3g5h7i9j1"]},"index$":0},{"name":"nodeId","in":"path","required":true,"description":"The ID of the workflow node.","schema":{"type":"string","examples":["cln8p0q2r4s6t8u0v2w4x6z8"]},"index$":1}]},"DELETE /v1/workflows/{workflowId}/nodes/{nodeId}/recursive":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"expectedRevisionId":{"type":["string","null"],"description":"The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.","x-ref":"#/components/schemas/WorkflowExpectedRevisionId"},"dryRun":{"type":"boolean","description":"If `true`, the request will be validated but the workflow will not be modified."},"queuedContactPolicy":{"type":"string","enum":["fail","discard"],"default":"fail","description":"`fail` returns queued-contact impact instead of mutating. `discard` confirms that matching queued contacts should be discarded. Defaults to `fail` when omitted.","x-ref":"#/components/schemas/WorkflowQueuedContactPolicy"}},"required":["expectedRevisionId"],"additionalProperties":false,"x-ref":"#/components/schemas/DeleteWorkflowNodeRequest"}}}},"parameters":[{"name":"workflowId","in":"path","required":true,"description":"The ID of the workflow.","schema":{"type":"string"},"index$":0},{"name":"nodeId","in":"path","required":true,"description":"The root node ID of the subtree to delete.","schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let workflow_node_ref01_data = Object.values(setup.data.existing.workflow_node)[0] as any

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
      '../../../../.sdk/test/entity/workflow_node/WorkflowNodeTestData.json')

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
    ['workflow_node01','workflow_node02','workflow_node03','workflow01','workflow02','workflow03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_WORKFLOW_NODE_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_WORKFLOW_NODE_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_WORKFLOW_NODE_ENTID']
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
  
