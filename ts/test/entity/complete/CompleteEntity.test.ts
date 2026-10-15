

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


describe('CompleteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.Complete()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Complete().create({"upload_id":1,"emailAssetId":"x","finalUrl":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'complete.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"emailAssetId":{"a":true,"h":"Email Asset Id","n":"emailAssetId","r":true,"sh":"The ID of the created asset.","t":"`$STRING`","key$":"emailAssetId","index$":0},"finalUrl":{"a":true,"h":"Final Url","n":"finalUrl","r":true,"sh":"The public URL of the uploaded asset.","t":"`$STRING`","key$":"finalUrl","index$":1}},"name":"complete","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/uploads/{emailAssetId}/complete","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"upload_id","or":"emailAssetId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/uploads/{emailAssetId}/complete","q":{"exist":["upload_id"]},"r":{"param":{"emailAssetId":"upload_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"uploads"},{"var":"upload_id"},{"lit":"complete"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"complete","name__orig":"complete","Name":"Complete","name_":"complete","name-":"complete","NAME":"COMPLETE","index$":4}, {"active":true,"entity":"complete","key$":"BasicCompleteFlow","kind":"basic","name":"BasicCompleteFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"complete_ref01"},"m":{"upload_id":"upload01"},"o":"create","s":[],"v":[]}]}, 'Complete', {"POST /v1/uploads/{emailAssetId}/complete":{"protocol":"http","parameters":[{"name":"emailAssetId","in":"path","required":true,"description":"The `emailAssetId` returned when the upload was created via `POST /v1/uploads`.","schema":{"type":"string","examples":["cla3s5s7e9t1i3d5f7g9h1j3"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const complete_ref01_ent = client.Complete()
    let complete_ref01_data = setup.data.new.complete['complete_ref01']
    complete_ref01_data['upload_id'] = setup.idmap['upload01']

    complete_ref01_data = (await complete_ref01_ent.create(complete_ref01_data)).data()
    assert(null != complete_ref01_data)


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
      '../../../../.sdk/test/entity/complete/CompleteTestData.json')

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
    ['complete01','complete02','complete03','upload01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_COMPLETE_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_COMPLETE_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_COMPLETE_ENTID']
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
  
