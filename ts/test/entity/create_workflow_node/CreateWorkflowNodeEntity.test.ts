

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


describe('CreateWorkflowNodeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.CreateWorkflowNode()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CreateWorkflowNode().create({"workflow_id":1,"node":"x","workflow":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'create_workflow_node.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"node":{"a":true,"h":"Node","n":"node","r":true,"t":"`$ANY`","union":{"branches":3,"count":2,"depth":15},"key$":"node","index$":0},"workflow":{"a":true,"h":"Workflow","n":"workflow","r":true,"t":"`$OBJECT`","union":{"branches":3,"count":1,"depth":13},"key$":"workflow","index$":1}},"name":"create_workflow_node","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["beforeNodeId","expectedRevisionId","fromNodeId","insertMode","nodeTypeName","toNodeId"],"co":{"id":"POST /v1/workflows/{workflowId}/nodes","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"workflow_id","or":"workflowId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/workflows/{workflowId}/nodes","q":{"exist":["workflow_id"]},"r":{"param":{"workflowId":"workflow_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflows"},{"var":"workflow_id"},{"lit":"nodes"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.workflow"]]},"key$":"create_workflow_node","name__orig":"create_workflow_node","Name":"CreateWorkflowNode","name_":"create_workflow_node","name-":"create-workflow-node","NAME":"CREATE_WORKFLOW_NODE","index$":15}, {"active":true,"entity":"create_workflow_node","key$":"BasicCreateWorkflowNodeFlow","kind":"basic","name":"BasicCreateWorkflowNodeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"create_workflow_node_ref01"},"m":{"workflow_id":"workflow01"},"o":"create","s":[],"v":[]}]}, 'CreateWorkflowNode', {"POST /v1/workflows/{workflowId}/nodes":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"oneOf":[{"title":"Between nodes","type":"object","description":"Insert a new node between two existing nodes, `fromNodeId` and `toNodeId`. When `fromNodeId` is an `ExperimentBranchNode`, `nodeTypeName` must be `VariantNode`, and `toNodeId` cannot already be a `VariantNode`; use add-branch to add sibling variants. Branch paths can be edited with create-node, but a workflow cannot be started unless each direct `BranchNode` child is an `AudienceFilter`.","properties":{"expectedRevisionId":{"type":["string","null"],"description":"The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.","x-ref":"#/components/schemas/WorkflowExpectedRevisionId"},"insertMode":{"type":"string","enum":["between"]},"nodeTypeName":{"type":"string","enum":["AudienceFilter","BranchNode","ExperimentBranchNode","TimerAction","SendEmailAction","VariantNode"],"description":"Node types that can be created with the API. `*Trigger` nodes and `ExitAction` nodes cannot be created.","x-ref":"#/components/schemas/CreateWorkflowNodeTypeName"},"fromNodeId":{"type":"string","description":"The node to insert after. This node must currently point to `toNodeId`. If this is an `ExperimentBranchNode`, `nodeTypeName` must be `VariantNode` and `toNodeId` cannot already be a `VariantNode`."},"toNodeId":{"type":"string","description":"The node to insert before."}},"required":["expectedRevisionId","insertMode","nodeTypeName","fromNodeId","toNodeId"],"additionalProperties":false,"x-ref":"#/components/schemas/CreateWorkflowNodeBetweenRequest"},{"title":"Before a node","type":"object","description":"Insert a new node before `toNodeId`. `VariantNode` cannot use `insertMode: \"before\"`; to restore a missing variant path, use `insertMode: \"between\"` with the experiment branch as `fromNodeId`.","properties":{"expectedRevisionId":{"type":["string","null"],"description":"The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.","x-ref":"#/components/schemas/WorkflowExpectedRevisionId"},"insertMode":{"type":"string","enum":["before"]},"nodeTypeName":{"type":"string","enum":["AudienceFilter","BranchNode","ExperimentBranchNode","TimerAction","SendEmailAction","VariantNode"],"description":"Node types that can be created with the API. `*Trigger` nodes and `ExitAction` nodes cannot be created.","x-ref":"#/components/schemas/CreateWorkflowNodeTypeName"},"toNodeId":{"type":"string","description":"The node to insert before. The target must have at least one incoming parent and cannot be a trigger node."},"beforeNodeId":{"type":"string","description":"Deprecated. Use `toNodeId` instead.","deprecated":true}},"required":["expectedRevisionId","insertMode","nodeTypeName"],"oneOf":[{"title":"Target node","properties":{"toNodeId":{}},"required":["toNodeId"]},{"title":"Target node (deprecated)","properties":{"beforeNodeId":{}},"required":["beforeNodeId"]}],"additionalProperties":false,"x-ref":"#/components/schemas/CreateWorkflowNodeBeforeRequest"},{"title":"After a node","type":"object","description":"Insert a new node after `fromNodeId`. This is valid only when `fromNodeId` has exactly one outgoing node. It is invalid when `fromNodeId` has no outgoing nodes, multiple outgoing nodes, or is an exit node. When the source has multiple outgoing nodes, use `between` with the exact `toNodeId` instead.","properties":{"expectedRevisionId":{"type":["string","null"],"description":"The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.","x-ref":"#/components/schemas/WorkflowExpectedRevisionId"},"insertMode":{"type":"string","enum":["after"]},"nodeTypeName":{"type":"string","enum":["AudienceFilter","BranchNode","ExperimentBranchNode","TimerAction","SendEmailAction","VariantNode"],"description":"Node types that can be created with the API. `*Trigger` nodes and `ExitAction` nodes cannot be created.","x-ref":"#/components/schemas/CreateWorkflowNodeTypeName"},"fromNodeId":{"type":"string","description":"The node to insert after. This node must currently have exactly one outgoing node."}},"required":["expectedRevisionId","insertMode","nodeTypeName","fromNodeId"],"additionalProperties":false,"x-ref":"#/components/schemas/CreateWorkflowNodeAfterRequest"}],"description":"Create a new workflow node with an explicit `insertMode`. To configure the node after creation, use the `POST /v1/workflows/{workflowId}/nodes/{nodeId}` endpoint.","discriminator":{"propertyName":"insertMode","mapping":{"between":"#/components/schemas/CreateWorkflowNodeBetweenRequest","before":"#/components/schemas/CreateWorkflowNodeBeforeRequest","after":"#/components/schemas/CreateWorkflowNodeAfterRequest"}},"x-ref":"#/components/schemas/CreateWorkflowNodeRequest","index$":1}}}},"parameters":[{"name":"workflowId","in":"path","required":true,"description":"The ID of the workflow.","schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const create_workflow_node_ref01_ent = client.CreateWorkflowNode()
    let create_workflow_node_ref01_data = setup.data.new.create_workflow_node['create_workflow_node_ref01']
    create_workflow_node_ref01_data['workflow_id'] = setup.idmap['workflow01']

    create_workflow_node_ref01_data = (await create_workflow_node_ref01_ent.create(create_workflow_node_ref01_data)).data()
    assert(null != create_workflow_node_ref01_data)


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
      '../../../../.sdk/test/entity/create_workflow_node/CreateWorkflowNodeTestData.json')

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
    ['create_workflow_node01','create_workflow_node02','create_workflow_node03','workflow01','workflow02','workflow03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_CREATE_WORKFLOW_NODE_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_CREATE_WORKFLOW_NODE_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_CREATE_WORKFLOW_NODE_ENTID']
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
  
