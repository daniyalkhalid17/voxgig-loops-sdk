

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


describe('WorkflowNodeWithRevisionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.WorkflowNodeWithRevision()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.WorkflowNodeWithRevision().load({"node_id":1,"workflow_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'workflow_node_with_revision.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"workflowRevisionId":{"a":true,"h":"Workflow Revision Id","n":"workflowRevisionId","r":true,"sh":"The current workflow revision token.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"workflowRevisionId","index$":0}},"name":"workflow_node_with_revision","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["expectedRevisionId"],"co":{"id":"POST /v1/workflows/{workflowId}/nodes/{nodeId}/add-branch","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"node_id","or":"nodeId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"workflow_id","or":"workflowId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v1/workflows/{workflowId}/nodes/{nodeId}/add-branch","q":{"$action":"add_branch","exist":["node_id","workflow_id"]},"r":{"param":{"nodeId":"node_id","workflowId":"workflow_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflows"},{"var":"workflow_id"},{"lit":"nodes"},{"var":"node_id"},{"lit":"add-branch"}],"t":{"req":{"expectedRevisionId":"`reqdata.expected_revision_id`"},"res":"`body`"},"index$":0},{"a":true,"bf":["expectedRevisionId","newTargetNodeId"],"co":{"id":"POST /v1/workflows/{workflowId}/nodes/{nodeId}/reroute","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"node_id","or":"nodeId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"workflow_id","or":"workflowId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v1/workflows/{workflowId}/nodes/{nodeId}/reroute","q":{"$action":"reroute","exist":["node_id","workflow_id"]},"r":{"param":{"nodeId":"node_id","workflowId":"workflow_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflows"},{"var":"workflow_id"},{"lit":"nodes"},{"var":"node_id"},{"lit":"reroute"}],"t":{"req":{"expectedRevisionId":"`reqdata.expected_revision_id`","newTargetNodeId":"`reqdata.new_target_node_id`"},"res":"`body.workflow`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/workflows/{workflowId}/nodes/{nodeId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"node_id","or":"nodeId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"workflow_id","or":"workflowId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/workflows/{workflowId}/nodes/{nodeId}","q":{"exist":["node_id","workflow_id"]},"r":{"param":{"nodeId":"node_id","workflowId":"workflow_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflows"},{"var":"workflow_id"},{"lit":"nodes"},{"var":"node_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.workflow"]]},"key$":"workflow_node_with_revision","name__orig":"workflow_node_with_revision","Name":"WorkflowNodeWithRevision","name_":"workflow_node_with_revision","name-":"workflow-node-with-revision","NAME":"WORKFLOW_NODE_WITH_REVISION","index$":35}, {"active":true,"entity":"workflow_node_with_revision","key$":"BasicWorkflowNodeWithRevisionFlow","kind":"basic","name":"BasicWorkflowNodeWithRevisionFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"workflow_node_with_revision_ref01"},"m":{"node_id":"node01","workflow_id":"workflow01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"workflow_node_with_revision_ref01","srcdatavar":"workflow_node_with_revision_ref01_data","suffix":"_dt0"},"m":{"id":"workflow_node_with_revision01","workflow_id":"workflow01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-workflow_node_with_revision_ref01"}}],"unreachable":true}]}, 'WorkflowNodeWithRevision', {"POST /v1/workflows/{workflowId}/nodes/{nodeId}/add-branch":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"expectedRevisionId":{"type":["string","null"],"description":"The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.","x-ref":"#/components/schemas/WorkflowExpectedRevisionId"}},"required":["expectedRevisionId"],"additionalProperties":false,"x-ref":"#/components/schemas/AddWorkflowBranchRequest"}}}},"parameters":[{"name":"workflowId","in":"path","required":true,"description":"The ID of the workflow.","schema":{"type":"string"},"index$":0},{"name":"nodeId","in":"path","required":true,"description":"The ID of the BranchNode or ExperimentBranchNode that should receive one new child.","schema":{"type":"string"},"index$":1}]},"POST /v1/workflows/{workflowId}/nodes/{nodeId}/reroute":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Reroute the source node's only outgoing connection to `newTargetNodeId`.","properties":{"expectedRevisionId":{"type":["string","null"],"description":"The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.","x-ref":"#/components/schemas/WorkflowExpectedRevisionId"},"newTargetNodeId":{"type":"string","description":"The valid workflow node that should receive the connection from the source node.","examples":["cln3c5d7e9f1g3h5i7j9k1l3"]}},"required":["expectedRevisionId","newTargetNodeId"],"additionalProperties":false,"examples":[{"expectedRevisionId":"clx7a3b5c7d9e1f3g5h7i9j1","newTargetNodeId":"cln3c5d7e9f1g3h5i7j9k1l3"}],"x-ref":"#/components/schemas/RerouteNodeConnectionRequest"}}}},"parameters":[{"name":"workflowId","in":"path","required":true,"description":"The ID of the workflow.","schema":{"type":"string","examples":["clw1a3b5c7d9e1f3g5h7i9j1"]},"index$":0},{"name":"nodeId","in":"path","required":true,"description":"The ID of the source workflow node whose outgoing connection should be moved.","schema":{"type":"string","examples":["cln1a3b5c7d9e1f3g5h7i9j1"]},"index$":1}]},"GET /v1/workflows/{workflowId}/nodes/{nodeId}":{"protocol":"http","parameters":[{"name":"workflowId","in":"path","required":true,"description":"The ID of the workflow.","schema":{"type":"string","examples":["clw1a3b5c7d9e1f3g5h7i9j1"]},"index$":0},{"name":"nodeId","in":"path","required":true,"description":"The ID of the workflow node.","schema":{"type":"string","examples":["cln8p0q2r4s6t8u0v2w4x6z8"]},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let workflow_node_with_revision_ref01_data = Object.values(setup.data.existing.workflow_node_with_revision)[0] as any

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
      '../../../../.sdk/test/entity/workflow_node_with_revision/WorkflowNodeWithRevisionTestData.json')

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
    ['workflow_node_with_revision01','workflow_node_with_revision02','workflow_node_with_revision03','workflow01','workflow02','workflow03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_WORKFLOW_NODE_WITH_REVISION_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_WORKFLOW_NODE_WITH_REVISION_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_WORKFLOW_NODE_WITH_REVISION_ENTID']
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
  
