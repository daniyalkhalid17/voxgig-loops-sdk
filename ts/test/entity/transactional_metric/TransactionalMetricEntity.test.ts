

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


describe('TransactionalMetricEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.TransactionalMetric()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.TransactionalMetric().load({"transactional_email_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'transactional_metric.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"deliveries":{"a":true,"h":"Deliveries","n":"deliveries","r":true,"sh":"Number of sends delivered.","t":"`$INTEGER`","key$":"deliveries","index$":0},"hardBounces":{"a":true,"h":"Hard Bounces","n":"hardBounces","r":true,"sh":"Number of sends that hard bounced.","t":"`$INTEGER`","key$":"hardBounces","index$":1},"sends":{"a":true,"h":"Sends","n":"sends","r":true,"sh":"Number of sends.","t":"`$INTEGER`","key$":"sends","index$":2},"softBounces":{"a":true,"h":"Soft Bounces","n":"softBounces","r":true,"sh":"Number of sends that soft bounced.","t":"`$INTEGER`","key$":"softBounces","index$":3},"spamReports":{"a":true,"h":"Spam Reports","n":"spamReports","r":true,"sh":"Number of sends reported as spam.","t":"`$INTEGER`","key$":"spamReports","index$":4}},"name":"transactional_metric","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/transactional-emails/{transactionalId}/metrics","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"transactional_email_id","or":"transactionalId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/transactional-emails/{transactionalId}/metrics","q":{"exist":["transactional_email_id"]},"r":{"param":{"transactionalId":"transactional_email_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"transactional-emails"},{"var":"transactional_email_id"},{"lit":"metrics"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"transactional_metric","name__orig":"transactional_metric","Name":"TransactionalMetric","name_":"transactional_metric","name-":"transactional-metric","NAME":"TRANSACTIONAL_METRIC","index$":28}, {"active":true,"entity":"transactional_metric","key$":"BasicTransactionalMetricFlow","kind":"basic","name":"BasicTransactionalMetricFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"transactional_metric_ref01","srcdatavar":"transactional_metric_ref01_data","suffix":"_dt0"},"m":{"id":"transactional_metric01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-transactional_metric_ref01"}}],"unreachable":true}]}, 'TransactionalMetric', {"GET /v1/transactional-emails/{transactionalId}/metrics":{"protocol":"http","parameters":[{"name":"transactionalId","in":"path","required":true,"description":"The ID of the transactional email.","schema":{"type":"string","examples":["cll42l54f20i1la0lfooe3z12"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let transactional_metric_ref01_data = Object.values(setup.data.existing.transactional_metric)[0] as any

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
      '../../../../.sdk/test/entity/transactional_metric/TransactionalMetricTestData.json')

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
    ['transactional_metric01','transactional_metric02','transactional_metric03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_TRANSACTIONAL_METRIC_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_TRANSACTIONAL_METRIC_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_TRANSACTIONAL_METRIC_ENTID']
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
  
