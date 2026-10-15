

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


describe('TransactionalEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.Transactional()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('transactional hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LoopsSDK.test(offline).Transactional().stream('list')) { }
    }, /offline/)

    for await (const _item of LoopsSDK.test(offline).Transactional()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LoopsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Transactional().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LoopsSDK.test().Transactional().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LoopsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Transactional().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Transactional().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Transactional().list({"cursor":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'transactional.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"addToAudience":{"a":true,"h":"Add To Audience","n":"addToAudience","r":false,"sh":"If `true`, a contact will be created in your audience using the `email` value (if a matching contact doesn't already exist).","t":"`$BOOLEAN`","key$":"addToAudience","index$":0},"attachments":{"a":true,"h":"Attachments","n":"attachments","r":false,"sh":"A list containing file objects to be sent along with an email message.","t":"`$ARRAY`","key$":"attachments","index$":1},"dataVariables":{"a":true,"h":"Data Variables","n":"dataVariables","op":{"list":{"req":true,"type":"`$ARRAY`"}},"r":false,"sh":"An object containing data as defined by the data variables added to the transactional email template.","t":"`$OBJECT`","key$":"dataVariables","index$":2},"email":{"a":true,"h":"Email","n":"email","r":true,"sh":"The recipient's email address.","t":"`$STRING`","key$":"email","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the transactional email.","t":"`$STRING`","key$":"id","index$":4},"lastUpdated":{"a":true,"h":"Last Updated","n":"lastUpdated","r":true,"sh":"The date and time the transactional email was last updated in ISO 8601 format.","t":"`$STRING`","key$":"lastUpdated","index$":5},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the transactional email.","t":"`$STRING`","key$":"name","index$":6},"success":{"a":true,"h":"Success","n":"success","r":true,"t":"`$BOOLEAN`","key$":"success","index$":7},"transactionalId":{"a":true,"h":"Transactional Id","n":"transactionalId","r":true,"sh":"The ID of the transactional email to send.","t":"`$STRING`","key$":"transactionalId","index$":8}},"id":{"field":"id","name":"id"},"name":"transactional","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["addToAudience","attachments","dataVariables","email","transactionalId"],"co":{"id":"POST /v1/transactional","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/transactional","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"transactional"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/transactional","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"per_page","or":"perPage","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/transactional","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"transactional"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"transactional","name__orig":"transactional","Name":"Transactional","name_":"transactional","name-":"transactional","NAME":"TRANSACTIONAL","index$":26}, {"active":true,"entity":"transactional","key$":"BasicTransactionalFlow","kind":"basic","name":"BasicTransactionalFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"transactional_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"transactional_ref01"}}]}]}, 'Transactional', {"POST /v1/transactional":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","required":["email","transactionalId"],"properties":{"email":{"type":"string","examples":["alex@company.com"],"description":"The recipient's email address.","key$":"email"},"transactionalId":{"type":"string","description":"The ID of the transactional email to send.","examples":["cll42l54f20i1la0lfooe3z12"],"key$":"transactionalId"},"addToAudience":{"type":"boolean","description":"If `true`, a contact will be created in your audience using the `email` value (if a matching contact doesn't already exist).","examples":[true],"key$":"addToAudience"},"dataVariables":{"type":"object","description":"An object containing data as defined by the data variables added to the transactional email template. Values can be of type string or number.\n\nIf you have added optional data variables to your email, you can exclude them from the dataVariables object or set the value to \"\".\n\nIf you have added an array data variable to your email, make sure to include an array matching the data variables you added to your array block.","examples":[{"name":"Chris","passwordResetLink":"https://example.com/reset-password"}],"key$":"dataVariables"},"attachments":{"type":"array","description":"A list containing file objects to be sent along with an email message. Attachments must be enabled by Loops support before they can be used with the API.","items":{"type":"object","required":["filename","contentType","data"],"properties":{"filename":{"type":"string","description":"The name of the file, shown in email clients."},"contentType":{"type":"string","description":"The MIME type of the file."},"data":{"type":"string","description":"The base64-encoded content of the file."}}},"key$":"attachments"}},"examples":[{"email":"alex@company.com","transactionalId":"cll42l54f20i1la0lfooe3z12","addToAudience":true,"dataVariables":{"name":"Alex","passwordResetLink":"https://app.company.com/reset/abc123"}}],"x-ref":"#/components/schemas/TransactionalRequest","index$":1}}},"required":true},"parameters":[{"in":"header","name":"Idempotency-Key","description":"Include a unique ID for this request (maximum 100 characters) to avoid duplicate emails.\n\nThe value should be a string of up to 100 characters and should be unique for each request. We recommend using V4 UUIDs or some other method with enough guaranteed entropy to avoid collisions during a 24 hour window.\n\nThis endpoint will return a `409 Conflict` response if the idempotency key has been used in the previous 24 hours.","schema":{"type":"string","maxLength":100},"index$":0}]},"GET /v1/transactional":{"protocol":"http","parameters":[{"name":"perPage","in":"query","required":false,"description":"How many results to return in each request. Must be between 10 and 50. Default is 20.","schema":{"type":"string"},"index$":0},{"name":"cursor","in":"query","required":false,"description":"A cursor, to return a specific page of results. Cursors can be found from the `pagination.nextCursor` value in each response.","schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const transactional_ref01_ent = client.Transactional()
    let transactional_ref01_data = setup.data.new.transactional['transactional_ref01']

    transactional_ref01_data = (await transactional_ref01_ent.create(transactional_ref01_data)).data()
    assert(null != transactional_ref01_data.id)


    // LIST
    const transactional_ref01_match: any = {}

    const transactional_ref01_list = (await transactional_ref01_ent.list(transactional_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(transactional_ref01_list, { id: transactional_ref01_data.id })))


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
      '../../../../.sdk/test/entity/transactional/TransactionalTestData.json')

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
    ['transactional01','transactional02','transactional03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_TRANSACTIONAL_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_TRANSACTIONAL_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_TRANSACTIONAL_ENTID']
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
  
