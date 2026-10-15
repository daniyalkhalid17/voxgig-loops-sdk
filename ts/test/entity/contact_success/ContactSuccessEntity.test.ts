

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


describe('ContactSuccessEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.ContactSuccess()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ContactSuccess().create({"email":1,"id":"x","success":true} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'contact_success.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"h":"Email","n":"email","op":{"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The contact's email address.","t":"`$STRING`","key$":"email","index$":0},"firstName":{"a":true,"h":"First Name","n":"firstName","r":false,"sh":"The contact's first name.","t":"`$STRING`","key$":"firstName","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":2},"lastName":{"a":true,"h":"Last Name","n":"lastName","r":false,"sh":"The contact's last name.","t":"`$STRING`","key$":"lastName","index$":3},"mailingLists":{"a":true,"h":"Mailing Lists","n":"mailingLists","r":false,"sh":"Manage mailing list subscriptions.","t":"`$OBJECT`","key$":"mailingLists","index$":4},"source":{"a":true,"h":"Source","n":"source","r":false,"sh":"A custom source value to replace the default “API”.","t":"`$STRING`","key$":"source","index$":5},"subscribed":{"a":true,"h":"Subscribed","n":"subscribed","r":false,"sh":"Whether the contact will receive campaign and workflow emails.","t":"`$BOOLEAN`","key$":"subscribed","index$":6},"success":{"a":true,"h":"Success","n":"success","r":true,"t":"`$BOOLEAN`","key$":"success","index$":7},"userGroup":{"a":true,"h":"User Group","n":"userGroup","r":false,"sh":"The contact's user group.","t":"`$STRING`","key$":"userGroup","index$":8},"userId":{"a":true,"h":"User Id","n":"userId","r":false,"sh":"A unique user ID (for example, from an external application).","t":"`$STRING`","key$":"userId","index$":9}},"id":{"field":"id","name":"id"},"name":"contact_success","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["email","firstName","lastName","mailingLists","source","subscribed","userGroup","userId"],"co":{"id":"POST /v1/contacts/create","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/contacts/create","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"contacts"},{"lit":"create"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["email","firstName","lastName","mailingLists","source","subscribed","userGroup","userId"],"co":{"id":"PUT /v1/contacts/update","source":"openapi3","version":2},"g":{},"k":"http","m":"PUT","o":"/v1/contacts/update","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"contacts"},{"lit":"update"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"contact_success","name__orig":"contact_success","Name":"ContactSuccess","name_":"contact_success","name-":"contact-success","NAME":"CONTACT_SUCCESS","index$":11}, {"active":true,"entity":"contact_success","key$":"BasicContactSuccessFlow","kind":"basic","name":"BasicContactSuccessFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"contact_success_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{"ref":"contact_success_ref01","srcdatavar":"contact_success_ref01_data","suffix":"_up0","textfield":"email"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-contact_success_ref01"}}],"v":[]}]}, 'ContactSuccess', {"POST /v1/contacts/create":{"protocol":"http","requestBody":{"description":"You can add custom contact properties as keys in this request (of type `string`, `number`, `boolean` or `date`. [See available date formats](https://loops.so/docs/contacts/properties#dates)). Make sure to create the properties in Loops before using them in API calls.","content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"email":{"type":"string","examples":["alex@company.com"],"description":"The contact's email address.","key$":"email"},"firstName":{"type":"string","description":"The contact's first name.","examples":["Alex"],"key$":"firstName"},"lastName":{"type":"string","description":"The contact's last name.","examples":["Rivera"],"key$":"lastName"},"source":{"type":"string","description":"A custom source value to replace the default “API”.","examples":["API"],"key$":"source"},"subscribed":{"type":"boolean","description":"Whether the contact will receive campaign and workflow emails. All new contacts are subscribed by default.","key$":"subscribed"},"userGroup":{"type":"string","description":"The contact's user group.","examples":["customers"],"key$":"userGroup"},"userId":{"type":"string","description":"A unique user ID (for example, from an external application).","examples":["usr_7f8e9d0c1b2a"],"key$":"userId"},"mailingLists":{"type":"object","description":"Manage mailing list subscriptions.\n\nInclude key-value pairs of mailing list IDs and a `boolean` denoting if the contact should be added (`true`) or removed (`false`) from the list.","examples":[{}],"x-ref":"#/components/schemas/MailingListSubscriptions","key$":"mailingLists"}},"additionalProperties":{"oneOf":[{"title":"String","type":"string"},{"title":"Number","type":"number"},{"title":"Boolean","type":"boolean"}]},"examples":[{"email":"alex@company.com","firstName":"Alex","lastName":"Rivera","subscribed":true,"userGroup":"customers","userId":"usr_7f8e9d0c1b2a","mailingLists":{"clm2k8j4h6g0f8d6s4a2b0z8":true},"favoriteColor":"blue"}],"x-ref":"#/components/schemas/ContactFields"},{"type":"object","required":["email"]}],"x-ref":"#/components/schemas/ContactRequest","index$":1}}},"required":true},"parameters":[]},"PUT /v1/contacts/update":{"protocol":"http","requestBody":{"description":"You can add custom contact properties as keys in this request (of type `string`, `number`, `boolean` or `date`. [See available date formats](https://loops.so/docs/contacts/properties#dates)). Make sure to create the properties in Loops before using them in API calls.","content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"email":{"type":"string","examples":["alex@company.com"],"description":"The contact's email address.","key$":"email"},"firstName":{"type":"string","description":"The contact's first name.","examples":["Alex"],"key$":"firstName"},"lastName":{"type":"string","description":"The contact's last name.","examples":["Rivera"],"key$":"lastName"},"source":{"type":"string","description":"A custom source value to replace the default “API”.","examples":["API"],"key$":"source"},"subscribed":{"type":"boolean","description":"Whether the contact will receive campaign and workflow emails. All new contacts are subscribed by default.","key$":"subscribed"},"userGroup":{"type":"string","description":"The contact's user group.","examples":["customers"],"key$":"userGroup"},"userId":{"type":"string","description":"A unique user ID (for example, from an external application).","examples":["usr_7f8e9d0c1b2a"],"key$":"userId"},"mailingLists":{"type":"object","description":"Manage mailing list subscriptions.\n\nInclude key-value pairs of mailing list IDs and a `boolean` denoting if the contact should be added (`true`) or removed (`false`) from the list.","examples":[{}],"x-ref":"#/components/schemas/MailingListSubscriptions","key$":"mailingLists"}},"additionalProperties":{"oneOf":[{"title":"String","type":"string"},{"title":"Number","type":"number"},{"title":"Boolean","type":"boolean"}]},"examples":[{"email":"alex@company.com","firstName":"Alex","lastName":"Rivera","subscribed":true,"userGroup":"customers","userId":"usr_7f8e9d0c1b2a","mailingLists":{"clm2k8j4h6g0f8d6s4a2b0z8":true},"favoriteColor":"blue"}],"x-ref":"#/components/schemas/ContactFields"},{"type":"object","properties":{"email":{"type":"string","description":"The contact's email address. **Required if `userId` is not provided.**","key$":"email"},"subscribed":{"type":"boolean","description":"Whether the contact will receive campaign and workflow emails. We recommend leaving this field out of your update requests unless you specifically want to unsubscribe (`false`) or re-subscribe (`true`) a contact. All new contacts are subscribed by default.","key$":"subscribed"},"userId":{"type":"string","description":"The contact's unique user ID. **Required if `email` is not provided.**","key$":"userId"}},"anyOf":[{"title":"Identify by email","required":["email"]},{"title":"Identify by user ID","required":["userId"]}]}],"additionalProperties":{"oneOf":[{"title":"String","type":"string"},{"title":"Number","type":"number"},{"title":"Boolean","type":"boolean"}]},"examples":[{"email":"alex@company.com","firstName":"Alex","lastName":"Rivera","subscribed":true,"userGroup":"customers","userId":"usr_7f8e9d0c1b2a","mailingLists":{"clm2k8j4h6g0f8d6s4a2b0z8":true},"favoriteColor":"blue"}],"x-ref":"#/components/schemas/ContactUpdateRequest","index$":1}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const contact_success_ref01_ent = client.ContactSuccess()
    let contact_success_ref01_data = setup.data.new.contact_success['contact_success_ref01']

    contact_success_ref01_data = (await contact_success_ref01_ent.create(contact_success_ref01_data)).data()
    assert(null != contact_success_ref01_data.id)


    // UPDATE
    const contact_success_ref01_data_up0: any = {}
    contact_success_ref01_data_up0.id = contact_success_ref01_data.id

    const contact_success_ref01_markdef_up0 = { name: 'email', value: 'Mark01-contact_success_ref01_' + setup.now }
    ;(contact_success_ref01_data_up0 as any)[contact_success_ref01_markdef_up0.name] = contact_success_ref01_markdef_up0.value

    const contact_success_ref01_resdata_up0 = (await contact_success_ref01_ent.update(contact_success_ref01_data_up0)).data()
    assert(contact_success_ref01_resdata_up0.id === contact_success_ref01_data_up0.id)

    assert((contact_success_ref01_resdata_up0 as any)[contact_success_ref01_markdef_up0.name] === contact_success_ref01_markdef_up0.value)


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
      '../../../../.sdk/test/entity/contact_success/ContactSuccessTestData.json')

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
    ['contact_success01','contact_success02','contact_success03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_CONTACT_SUCCESS_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_CONTACT_SUCCESS_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_CONTACT_SUCCESS_ENTID']
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
  
