

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


describe('EmailMessagePreviewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.EmailMessagePreview()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.EmailMessagePreview().create({"id":1,"emails":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email_message_preview.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"contactProperties":{"a":true,"h":"Contact Properties","n":"contactProperties","r":false,"sh":"Contact property values to render.","t":"`$OBJECT`","key$":"contactProperties","index$":0},"dataVariables":{"a":true,"h":"Data Variables","n":"dataVariables","r":false,"sh":"Transactional data variables to render.","t":"`$OBJECT`","key$":"dataVariables","index$":1},"emails":{"a":true,"h":"Emails","n":"emails","r":true,"sh":"One or more addresses to send the preview to.","t":"`$ARRAY`","key$":"emails","index$":2},"eventProperties":{"a":true,"h":"Event Properties","n":"eventProperties","r":false,"sh":"Event property values to render.","t":"`$OBJECT`","key$":"eventProperties","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the email message the preview was sent for.","t":"`$STRING`","key$":"id","index$":4}},"id":{"field":"id","name":"id"},"name":"email_message_preview","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["contactProperties","dataVariables","emails","eventProperties"],"co":{"id":"POST /v1/email-messages/{emailMessageId}/preview","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"emailMessageId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/email-messages/{emailMessageId}/preview","q":{"exist":["id"]},"r":{"param":{"emailMessageId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"email-messages"},{"var":"id"},{"lit":"preview"}],"t":{"req":{"contactProperties":"`reqdata.contact_property`","dataVariables":"`reqdata.data_variable`","emails":"`reqdata.email`","eventProperties":"`reqdata.event_property`"},"res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"email_message_preview","name__orig":"email_message_preview","Name":"EmailMessagePreview","name_":"email_message_preview","name-":"email-message-preview","NAME":"EMAIL_MESSAGE_PREVIEW","index$":18}, {"active":true,"entity":"email_message_preview","key$":"BasicEmailMessagePreviewFlow","kind":"basic","name":"BasicEmailMessagePreviewFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"email_message_preview_ref01"},"m":{"email_message_id":"email_message01"},"o":"create","s":[],"v":[],"unreachable":true}]}, 'EmailMessagePreview', {"POST /v1/email-messages/{emailMessageId}/preview":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"emails":{"type":"array","minItems":1,"items":{"type":"string"},"description":"One or more addresses to send the preview to.","key$":"emails"},"contactProperties":{"type":"object","additionalProperties":{"type":"string"},"description":"Contact property values to render. Accepted for campaign and workflow previews.","example":{"firstName":"Alex"},"key$":"contactProperties"},"eventProperties":{"type":"object","additionalProperties":{"type":"string"},"description":"Event property values to render. Accepted for workflow previews only.","example":{"planName":"Pro"},"key$":"eventProperties"},"dataVariables":{"type":"object","additionalProperties":{"type":"string"},"description":"Transactional data variables to render. Accepted for transactional previews only.","example":{"loginUrl":"https://app.company.com/login"},"key$":"dataVariables"}},"required":["emails"],"additionalProperties":false,"examples":[{"emails":["alex@company.com"],"contactProperties":{"firstName":"Alex"},"eventProperties":{"planName":"Pro"},"dataVariables":{"loginUrl":"https://app.company.com/login"}}],"x-ref":"#/components/schemas/EmailMessagePreviewRequest","index$":1}}}},"parameters":[{"name":"emailMessageId","in":"path","required":true,"description":"The ID of the email message.","schema":{"type":"string","examples":["cle5f7g9h1i3j5k7l9m1n3p5"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let email_message_preview_ref01_data = Object.values(setup.data.existing.email_message_preview)[0] as any

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
      '../../../../.sdk/test/entity/email_message_preview/EmailMessagePreviewTestData.json')

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
    ['email_message_preview01','email_message_preview02','email_message_preview03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_EMAIL_MESSAGE_PREVIEW_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_EMAIL_MESSAGE_PREVIEW_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_EMAIL_MESSAGE_PREVIEW_ENTID']
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
  
