

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


describe('EmailMetricEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.EmailMetric()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.EmailMetric().load({"campaign_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email_metric.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"clicks":{"a":true,"h":"Clicks","n":"clicks","r":true,"sh":"Number of sends where at least one link was clicked.","t":"`$INTEGER`","key$":"clicks","index$":0},"hardBounces":{"a":true,"h":"Hard Bounces","n":"hardBounces","r":true,"sh":"Number of sends that hard bounced.","t":"`$INTEGER`","key$":"hardBounces","index$":1},"opens":{"a":true,"h":"Opens","n":"opens","r":true,"sh":"Number of sends that were opened at least once.","t":"`$INTEGER`","key$":"opens","index$":2},"sends":{"a":true,"h":"Sends","n":"sends","r":true,"sh":"Number of sends.","t":"`$INTEGER`","key$":"sends","index$":3},"softBounces":{"a":true,"h":"Soft Bounces","n":"softBounces","r":true,"sh":"Number of sends that soft bounced.","t":"`$INTEGER`","key$":"softBounces","index$":4},"spamReports":{"a":true,"h":"Spam Reports","n":"spamReports","r":true,"sh":"Number of sends reported as spam.","t":"`$INTEGER`","key$":"spamReports","index$":5},"unsubscribes":{"a":true,"h":"Unsubscribes","n":"unsubscribes","r":true,"sh":"Number of unsubscribes.","t":"`$INTEGER`","key$":"unsubscribes","index$":6}},"name":"email_metric","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/workflows/{workflowId}/nodes/{nodeId}/metrics","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"node_id","or":"nodeId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"workflow_id","or":"workflowId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/workflows/{workflowId}/nodes/{nodeId}/metrics","q":{"exist":["node_id","workflow_id"]},"r":{"param":{"nodeId":"node_id","workflowId":"workflow_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"workflows"},{"var":"workflow_id"},{"lit":"nodes"},{"var":"node_id"},{"lit":"metrics"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /v1/campaigns/{campaignId}/metrics","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"campaign_id","or":"campaignId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/campaigns/{campaignId}/metrics","q":{"exist":["campaign_id"]},"r":{"param":{"campaignId":"campaign_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"campaigns"},{"var":"campaign_id"},{"lit":"metrics"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.campaign"],["$.main.kit.entity.workflow"]]},"key$":"email_metric","name__orig":"email_metric","Name":"EmailMetric","name_":"email_metric","name-":"email-metric","NAME":"EMAIL_METRIC","index$":19}, {"active":true,"entity":"email_metric","key$":"BasicEmailMetricFlow","kind":"basic","name":"BasicEmailMetricFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"email_metric_ref01","srcdatavar":"email_metric_ref01_data","suffix":"_dt0"},"m":{"id":"email_metric01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-email_metric_ref01"}}],"unreachable":true}]}, 'EmailMetric', {"GET /v1/workflows/{workflowId}/nodes/{nodeId}/metrics":{"protocol":"http","parameters":[{"name":"workflowId","in":"path","required":true,"description":"The ID of the workflow.","schema":{"type":"string","examples":["clw1a3b5c7d9e1f3g5h7i9j1"]},"index$":0},{"name":"nodeId","in":"path","required":true,"description":"The ID of the `SendEmailAction` node.","schema":{"type":"string","examples":["cln1a3b5c7d9e1f3g5h7i9j1"]},"index$":1}]},"GET /v1/campaigns/{campaignId}/metrics":{"protocol":"http","parameters":[{"name":"campaignId","in":"path","required":true,"description":"The ID of the campaign.","schema":{"type":"string","examples":["clc4m6n8p0q2r4s6t8u0v2x4"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let email_metric_ref01_data = Object.values(setup.data.existing.email_metric)[0] as any

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
      '../../../../.sdk/test/entity/email_metric/EmailMetricTestData.json')

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
    ['email_metric01','email_metric02','email_metric03','campaign01','campaign02','campaign03','workflow01','workflow02','workflow03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_EMAIL_METRIC_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_EMAIL_METRIC_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_EMAIL_METRIC_ENTID']
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
  
