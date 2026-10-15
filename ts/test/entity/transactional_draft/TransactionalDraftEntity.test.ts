

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


describe('TransactionalDraftEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.TransactionalDraft()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.TransactionalDraft().create({"transactional_email_id":1,"createdAt":"x","dataVariables":"x","draftEmailMessageContentRevisionId":"x","draftEmailMessageId":"x","id":"x","name":"x","publishedEmailMessageId":"x","updatedAt":"x","url":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'transactional_draft.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":true,"sh":"ISO 8601 timestamp for when the transactional email was created.","t":"`$STRING`","key$":"createdAt","index$":0},"dataVariables":{"a":true,"h":"Data Variables","n":"dataVariables","r":true,"sh":"Data variable names used by the published email.","t":"`$ARRAY`","key$":"dataVariables","index$":1},"draftEmailMessageContentRevisionId":{"a":true,"h":"Draft Email Message Content Revision Id","n":"draftEmailMessageContentRevisionId","r":true,"sh":"The `contentRevisionId` of the draft email message.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"draftEmailMessageContentRevisionId","index$":2},"draftEmailMessageId":{"a":true,"h":"Draft Email Message Id","n":"draftEmailMessageId","r":true,"sh":"The ID of the draft email message.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"draftEmailMessageId","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the transactional email.","t":"`$STRING`","key$":"id","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the transactional email.","t":"`$STRING`","key$":"name","index$":5},"publishedEmailMessageId":{"a":true,"h":"Published Email Message Id","n":"publishedEmailMessageId","r":true,"sh":"The ID of the published email message.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"publishedEmailMessageId","index$":6},"transactionalGroupId":{"a":true,"h":"Transactional Group Id","n":"transactionalGroupId","r":false,"sh":"The ID of the group this transactional email belongs to.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"transactionalGroupId","index$":7},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":true,"sh":"ISO 8601 timestamp for when the transactional email was last updated.","t":"`$STRING`","key$":"updatedAt","index$":8},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"sh":"The URL of the transactional email in the Loops app.","t":"`$STRING`","key$":"url","index$":9}},"id":{"field":"id","name":"id"},"name":"transactional_draft","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/transactional-emails/{transactionalId}/draft","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"transactional_email_id","or":"transactionalId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/transactional-emails/{transactionalId}/draft","q":{"exist":["transactional_email_id"]},"r":{"param":{"transactionalId":"transactional_email_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"transactional-emails"},{"var":"transactional_email_id"},{"lit":"draft"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"transactional_draft","name__orig":"transactional_draft","Name":"TransactionalDraft","name_":"transactional_draft","name-":"transactional-draft","NAME":"TRANSACTIONAL_DRAFT","index$":27}, {"active":true,"entity":"transactional_draft","key$":"BasicTransactionalDraftFlow","kind":"basic","name":"BasicTransactionalDraftFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"transactional_draft_ref01"},"m":{"transactional_email_id":"transactional_email01"},"o":"create","s":[],"v":[]}]}, 'TransactionalDraft', {"POST /v1/transactional-emails/{transactionalId}/draft":{"protocol":"http","parameters":[{"name":"transactionalId","in":"path","required":true,"description":"The ID of the transactional email.","schema":{"type":"string","examples":["cll42l54f20i1la0lfooe3z12"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const transactional_draft_ref01_ent = client.TransactionalDraft()
    let transactional_draft_ref01_data = setup.data.new.transactional_draft['transactional_draft_ref01']
    transactional_draft_ref01_data['transactional_email_id'] = setup.idmap['transactional_email01']

    transactional_draft_ref01_data = (await transactional_draft_ref01_ent.create(transactional_draft_ref01_data)).data()
    assert(null != transactional_draft_ref01_data.id)


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
      '../../../../.sdk/test/entity/transactional_draft/TransactionalDraftTestData.json')

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
    ['transactional_draft01','transactional_draft02','transactional_draft03','transactional_email01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_TRANSACTIONAL_DRAFT_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_TRANSACTIONAL_DRAFT_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_TRANSACTIONAL_DRAFT_ENTID']
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
  
