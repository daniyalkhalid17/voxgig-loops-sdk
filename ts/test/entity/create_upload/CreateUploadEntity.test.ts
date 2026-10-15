

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


describe('CreateUploadEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.CreateUpload()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CreateUpload().create({"contentLength":"x","contentType":"x","emailAssetId":"x","presignedUrl":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'create_upload.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"contentLength":{"a":true,"h":"Content Length","n":"contentLength","r":true,"sh":"The size of the file in bytes.","t":"`$INTEGER`","key$":"contentLength","index$":0},"contentType":{"a":true,"h":"Content Type","n":"contentType","r":true,"sh":"The MIME type of the file to upload.","t":"`$STRING`","key$":"contentType","index$":1},"emailAssetId":{"a":true,"h":"Email Asset Id","n":"emailAssetId","r":true,"sh":"The ID of the created asset.","t":"`$STRING`","key$":"emailAssetId","index$":2},"presignedUrl":{"a":true,"h":"Presigned Url","n":"presignedUrl","r":true,"sh":"The pre-signed URL to upload the file to with an HTTP `PUT` request.","t":"`$STRING`","key$":"presignedUrl","index$":3}},"name":"create_upload","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["contentLength","contentType"],"co":{"id":"POST /v1/uploads","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/uploads","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"uploads"}],"t":{"req":{"contentLength":"`reqdata.content_length`","contentType":"`reqdata.content_type`"},"res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"create_upload","name__orig":"create_upload","Name":"CreateUpload","name_":"create_upload","name-":"create-upload","NAME":"CREATE_UPLOAD","index$":14}, {"active":true,"entity":"create_upload","key$":"BasicCreateUploadFlow","kind":"basic","name":"BasicCreateUploadFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"create_upload_ref01"},"m":{},"o":"create","s":[],"v":[]}]}, 'CreateUpload', {"POST /v1/uploads":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"contentType":{"type":"string","description":"The MIME type of the file to upload. Supported types are `image/jpeg`, `image/png`, `image/gif` and `image/webp`.","examples":["image/png"],"key$":"contentType"},"contentLength":{"type":"integer","description":"The size of the file in bytes. Must be a positive integer no greater than 4,000,000 bytes.","examples":[102400],"key$":"contentLength"}},"required":["contentType","contentLength"],"additionalProperties":false,"x-ref":"#/components/schemas/CreateUploadRequest","index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const create_upload_ref01_ent = client.CreateUpload()
    let create_upload_ref01_data = setup.data.new.create_upload['create_upload_ref01']

    create_upload_ref01_data = (await create_upload_ref01_ent.create(create_upload_ref01_data)).data()
    assert(null != create_upload_ref01_data)


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
      '../../../../.sdk/test/entity/create_upload/CreateUploadTestData.json')

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
    ['create_upload01','create_upload02','create_upload03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_CREATE_UPLOAD_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_CREATE_UPLOAD_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_CREATE_UPLOAD_ENTID']
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
  
