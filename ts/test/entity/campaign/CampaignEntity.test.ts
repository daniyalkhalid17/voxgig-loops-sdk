

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


describe('CampaignEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.Campaign()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('campaign hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LoopsSDK.test(offline).Campaign().stream('list')) { }
    }, /offline/)

    for await (const _item of LoopsSDK.test(offline).Campaign()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LoopsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Campaign().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LoopsSDK.test().Campaign().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LoopsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Campaign().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Campaign().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Campaign().list({"cursor":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'campaign.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"audienceFilter":{"a":true,"h":"Audience Filter","n":"audienceFilter","r":true,"sh":"The filter rules that define the audience for this campaign, if set.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"union":{"branches":3,"count":1,"depth":7},"key$":"audienceFilter","index$":0},"audienceSegmentId":{"a":true,"h":"Audience Segment Id","n":"audienceSegmentId","op":{"create":{"req":false,"type":["`$ONE`",["`$STRING`","`$NULL`"]]}},"r":true,"sh":"The ID of the audience segment this campaign targets, if set.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"audienceSegmentId","index$":1},"campaignGroupId":{"a":true,"h":"Campaign Group Id","n":"campaignGroupId","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The ID of the campaign group this campaign belongs to.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"campaignGroupId","index$":2},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":true,"sh":"ISO 8601 timestamp for when the campaign was created.","t":"`$STRING`","key$":"createdAt","index$":3},"emailMessageId":{"a":true,"h":"Email Message Id","n":"emailMessageId","r":true,"sh":"The associated email message ID.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"emailMessageId","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the campaign.","t":"`$STRING`","key$":"id","index$":5},"mailingListId":{"a":true,"h":"Mailing List Id","n":"mailingListId","op":{"create":{"req":false,"type":["`$ONE`",["`$STRING`","`$NULL`"]]}},"r":true,"sh":"The ID of the mailing list this campaign sends to, if set.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"mailingListId","index$":6},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The name of the campaign.","t":"`$STRING`","key$":"name","index$":7},"scheduling":{"a":true,"h":"Scheduling","n":"scheduling","r":true,"sh":"When the campaign is scheduled to send.","t":"`$OBJECT`","key$":"scheduling","index$":8},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"The status of the campaign.","t":"`$STRING`","key$":"status","index$":9},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":true,"sh":"ISO 8601 timestamp for when the campaign was last updated.","t":"`$STRING`","key$":"updatedAt","index$":10},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"sh":"The URL of the campaign in the Loops app.","t":"`$STRING`","key$":"url","index$":11}},"id":{"field":"id","name":"id"},"name":"campaign","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["audienceFilter","audienceSegmentId","campaignGroupId","mailingListId","name","scheduling"],"co":{"id":"POST /v1/campaigns/{campaignId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"campaignId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/campaigns/{campaignId}","q":{"exist":["id"]},"r":{"param":{"campaignId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"campaigns"},{"var":"id"}],"t":{"req":{"audienceFilter":"`reqdata.audience_filter`","audienceSegmentId":"`reqdata.audience_segment_id`","campaignGroupId":"`reqdata.campaign_group_id`","mailingListId":"`reqdata.mailing_list_id`","name":"`reqdata.name`","scheduling":"`reqdata.scheduling`"},"res":"`body`"},"index$":0},{"a":true,"bf":["audienceFilter","audienceSegmentId","campaignGroupId","mailingListId","name","scheduling"],"co":{"id":"POST /v1/campaigns","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/campaigns","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"campaigns"}],"t":{"req":{"audienceFilter":"`reqdata.audience_filter`","audienceSegmentId":"`reqdata.audience_segment_id`","campaignGroupId":"`reqdata.campaign_group_id`","mailingListId":"`reqdata.mailing_list_id`","name":"`reqdata.name`","scheduling":"`reqdata.scheduling`"},"res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/campaigns","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"per_page","or":"perPage","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/campaigns","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"campaigns"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/campaigns/{campaignId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"campaignId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/campaigns/{campaignId}","q":{"exist":["id"]},"r":{"param":{"campaignId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"campaigns"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"campaign","name__orig":"campaign","Name":"Campaign","name_":"campaign","name-":"campaign","NAME":"CAMPAIGN","index$":2}, {"active":true,"entity":"campaign","key$":"BasicCampaignFlow","kind":"basic","name":"BasicCampaignFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"campaign_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"campaign_ref01"}}]},{"a":true,"d":{},"i":{"ref":"campaign_ref01","srcdatavar":"campaign_ref01_data","suffix":"_dt0"},"m":{"id":"campaign01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-campaign_ref01"}}]}]}, 'Campaign', {"POST /v1/campaigns/{campaignId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"At least one field must be provided.","properties":{"name":{"type":"string","description":"The updated campaign name.","examples":["Spring announcement"],"key$":"name"},"campaignGroupId":{"type":"string","description":"The ID of the group to move this campaign to.","examples":["clg7n5p3q1r9s7t5u3v1w9y7"],"key$":"campaignGroupId"},"mailingListId":{"type":["string","null"],"description":"The ID of the mailing list to send to.","examples":["clm2k8j4h6g0f8d6s4a2b0z8"],"key$":"mailingListId"},"audienceSegmentId":{"type":["string","null"],"description":"The ID of an audience segment. Setting this without also providing `audienceFilter` clears any existing `audienceFilter`. If both are provided, the filter is applied on top of the segment's filter.","examples":["cls6e8g0i2k4m6o8q0s2u4w6"],"key$":"audienceSegmentId"},"audienceFilter":{"type":["object","null"],"description":"A tree of audience conditions combined with `match`. Setting this without also providing `audienceSegmentId` clears any existing `audienceSegmentId`. When both are provided, this filter is applied on top of the segment's filter.","properties":{"match":{"type":"string","enum":["all","any"]},"conditions":{"type":"array","minItems":1,"items":{"oneOf":[],"discriminator":{},"x-ref":"#/components/schemas/AudienceFilterCondition"}}},"required":["match","conditions"],"additionalProperties":false,"x-ref":"#/components/schemas/AudienceFilterInRequest","key$":"audienceFilter"},"scheduling":{"type":"object","description":"When the campaign should send. `timestamp` is required and must be in the future when `method` is `schedule`, and must be omitted when `method` is `now`.","properties":{"method":{"type":"string","enum":["now","schedule"]},"timestamp":{"type":"string","format":"date-time"}},"required":["method"],"additionalProperties":false,"examples":[{"method":"schedule","timestamp":"2025-07-15T14:00:00.000Z"}],"x-ref":"#/components/schemas/CampaignSchedulingRequest","key$":"scheduling"}},"additionalProperties":false,"x-ref":"#/components/schemas/UpdateCampaignRequest","index$":1}}}},"parameters":[{"name":"campaignId","in":"path","required":true,"description":"The ID of the campaign.","schema":{"type":"string","examples":["clc4m6n8p0q2r4s6t8u0v2x4"]},"index$":0}]},"POST /v1/campaigns":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The campaign name.","examples":["Spring announcement"],"key$":"name"},"campaignGroupId":{"type":"string","description":"The ID of the group to add this campaign to. Defaults to the team's Unsorted group when omitted.","examples":["clg7n5p3q1r9s7t5u3v1w9y7"],"key$":"campaignGroupId"},"mailingListId":{"type":["string","null"],"description":"The ID of the mailing list to send to.","examples":["clm2k8j4h6g0f8d6s4a2b0z8"],"key$":"mailingListId"},"audienceSegmentId":{"type":["string","null"],"description":"The ID of an audience segment. Setting this without also providing `audienceFilter` clears any existing `audienceFilter`. If both are provided, the filter is applied on top of the segment's filter.","examples":["cls6e8g0i2k4m6o8q0s2u4w6"],"key$":"audienceSegmentId"},"audienceFilter":{"type":["object","null"],"description":"A tree of audience conditions combined with `match`. Setting this without also providing `audienceSegmentId` clears any existing `audienceSegmentId`. When both are provided, this filter is applied on top of the segment's filter.","properties":{"match":{"type":"string","enum":["all","any"]},"conditions":{"type":"array","minItems":1,"items":{"oneOf":[],"discriminator":{},"x-ref":"#/components/schemas/AudienceFilterCondition"}}},"required":["match","conditions"],"additionalProperties":false,"x-ref":"#/components/schemas/AudienceFilterInRequest","key$":"audienceFilter"},"scheduling":{"type":"object","description":"When the campaign should send. `timestamp` is required and must be in the future when `method` is `schedule`, and must be omitted when `method` is `now`.","properties":{"method":{"type":"string","enum":["now","schedule"]},"timestamp":{"type":"string","format":"date-time"}},"required":["method"],"additionalProperties":false,"examples":[{"method":"schedule","timestamp":"2025-07-15T14:00:00.000Z"}],"x-ref":"#/components/schemas/CampaignSchedulingRequest","key$":"scheduling"}},"required":["name"],"additionalProperties":false,"x-ref":"#/components/schemas/CreateCampaignRequest","index$":1}}}},"parameters":[]},"GET /v1/campaigns":{"protocol":"http","parameters":[{"name":"perPage","in":"query","required":false,"description":"How many results to return in each request. Must be between 10 and 50. Default is 20.","schema":{"type":"string"},"index$":0},{"name":"cursor","in":"query","required":false,"description":"A cursor to return a specific page of results. Cursors can be found from the `pagination.nextCursor` value in each response.","schema":{"type":"string"},"index$":1}]},"GET /v1/campaigns/{campaignId}":{"protocol":"http","parameters":[{"name":"campaignId","in":"path","required":true,"description":"The ID of the campaign.","schema":{"type":"string","examples":["clc4m6n8p0q2r4s6t8u0v2x4"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const campaign_ref01_ent = client.Campaign()
    let campaign_ref01_data = setup.data.new.campaign['campaign_ref01']

    campaign_ref01_data = (await campaign_ref01_ent.create(campaign_ref01_data)).data()
    assert(null != campaign_ref01_data.id)


    // LIST
    const campaign_ref01_match: any = {}

    const campaign_ref01_list = (await campaign_ref01_ent.list(campaign_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(campaign_ref01_list, { id: campaign_ref01_data.id })))


    // LOAD
    const campaign_ref01_match_dt0: any = {}
    campaign_ref01_match_dt0.id = campaign_ref01_data.id
    const campaign_ref01_data_dt0 = (await campaign_ref01_ent.load(campaign_ref01_match_dt0)).data()
    assert(campaign_ref01_data_dt0.id === campaign_ref01_data.id)


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
      '../../../../.sdk/test/entity/campaign/CampaignTestData.json')

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
    ['campaign01','campaign02','campaign03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_CAMPAIGN_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_CAMPAIGN_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_CAMPAIGN_ENTID']
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
  
