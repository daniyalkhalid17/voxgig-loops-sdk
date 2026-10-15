

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


describe('ChangeWorkflowMailingListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.ChangeWorkflowMailingList()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ChangeWorkflowMailingList().create({"workflow_id":1,"expectedRevisionId":"x","mailingListId":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'change_workflow_mailing_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"dryRun":{"a":true,"h":"Dry Run","n":"dryRun","r":false,"sh":"If `true`, the request will be validated but the workflow will not be modified.","t":"`$BOOLEAN`","key$":"dryRun","index$":0},"expectedRevisionId":{"a":true,"h":"Expected Revision Id","n":"expectedRevisionId","r":true,"sh":"The workflow revision token returned by the latest workflow read or mutation.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"expectedRevisionId","index$":1},"mailingListId":{"a":true,"h":"Mailing List Id","n":"mailingListId","r":true,"sh":"The mailing list to use for the workflow.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"mailingListId","index$":2},"queuedContactPolicy":{"a":true,"h":"Queued Contact Policy","n":"queuedContactPolicy","r":false,"sh":"`fail` returns queued-contact impact instead of mutating.","t":"`$STRING`","key$":"queuedContactPolicy","index$":3}},"name":"change_workflow_mailing_list","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["dryRun","expectedRevisionId","mailingListId","queuedContactPolicy"],"co":{"id":"POST /v1/workflows/{workflowId}/mailing-list","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"workflow_id","or":"workflowId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/workflows/{workflowId}/mailing-list","q":{"exist":["workflow_id"]},"r":{"param":{"workflowId":"workflow_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflows"},{"var":"workflow_id"},{"lit":"mailing-list"}],"t":{"req":{"dryRun":"`reqdata.dry_run`","expectedRevisionId":"`reqdata.expected_revision_id`","mailingListId":"`reqdata.mailing_list_id`","queuedContactPolicy":"`reqdata.queued_contact_policy`"},"res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.workflow"]]},"key$":"change_workflow_mailing_list","name__orig":"change_workflow_mailing_list","Name":"ChangeWorkflowMailingList","name_":"change_workflow_mailing_list","name-":"change-workflow-mailing-list","NAME":"CHANGE_WORKFLOW_MAILING_LIST","index$":3}, {"active":true,"entity":"change_workflow_mailing_list","key$":"BasicChangeWorkflowMailingListFlow","kind":"basic","name":"BasicChangeWorkflowMailingListFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"change_workflow_mailing_list_ref01"},"m":{"workflow_id":"workflow01"},"o":"create","s":[],"v":[]}]}, 'ChangeWorkflowMailingList', {"POST /v1/workflows/{workflowId}/mailing-list":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"expectedRevisionId":{"type":["string","null"],"description":"The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.","x-ref":"#/components/schemas/WorkflowExpectedRevisionId","key$":"expectedRevisionId"},"mailingListId":{"type":["string","null"],"description":"The mailing list to use for the workflow. When assigning a mailing list, queued contacts excluded by the new list can return `queuedContactsFound`; retry with `queuedContactPolicy: \"discard\"` to apply the change and discard those contacts. Use `null` to clear the workflow mailing list; clearing does not discard queued contacts.","key$":"mailingListId"},"dryRun":{"type":"boolean","description":"If `true`, the request will be validated but the workflow will not be modified.","key$":"dryRun"},"queuedContactPolicy":{"type":"string","enum":["fail","discard"],"default":"fail","description":"`fail` returns queued-contact impact instead of mutating. `discard` confirms that matching queued contacts should be discarded. Defaults to `fail` when omitted.","x-ref":"#/components/schemas/WorkflowQueuedContactPolicy","key$":"queuedContactPolicy"}},"required":["expectedRevisionId","mailingListId"],"additionalProperties":false,"x-ref":"#/components/schemas/ChangeWorkflowMailingListRequest","index$":1}}}},"parameters":[{"name":"workflowId","in":"path","required":true,"description":"The ID of the workflow.","schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const change_workflow_mailing_list_ref01_ent = client.ChangeWorkflowMailingList()
    let change_workflow_mailing_list_ref01_data = setup.data.new.change_workflow_mailing_list['change_workflow_mailing_list_ref01']
    change_workflow_mailing_list_ref01_data['workflow_id'] = setup.idmap['workflow01']

    change_workflow_mailing_list_ref01_data = (await change_workflow_mailing_list_ref01_ent.create(change_workflow_mailing_list_ref01_data)).data()
    assert(null != change_workflow_mailing_list_ref01_data)


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
      '../../../../.sdk/test/entity/change_workflow_mailing_list/ChangeWorkflowMailingListTestData.json')

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
    ['change_workflow_mailing_list01','change_workflow_mailing_list02','change_workflow_mailing_list03','workflow01','workflow02','workflow03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_CHANGE_WORKFLOW_MAILING_LIST_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_CHANGE_WORKFLOW_MAILING_LIST_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_CHANGE_WORKFLOW_MAILING_LIST_ENTID']
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
  
