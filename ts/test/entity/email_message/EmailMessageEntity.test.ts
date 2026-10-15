

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


describe('EmailMessageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.EmailMessage()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.EmailMessage().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email_message.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bccEmail":{"a":true,"h":"Bcc Email","n":"bccEmail","r":false,"sh":"The email BCC address.","t":"`$STRING`","key$":"bccEmail","index$":0},"campaignId":{"a":true,"h":"Campaign Id","n":"campaignId","r":false,"sh":"The campaign this email message belongs to.","t":"`$STRING`","key$":"campaignId","index$":1},"ccEmail":{"a":true,"h":"Cc Email","n":"ccEmail","r":false,"sh":"The email CC address.","t":"`$STRING`","key$":"ccEmail","index$":2},"contactPropertiesFallbacks":{"a":true,"h":"Contact Properties Fallbacks","n":"contactPropertiesFallbacks","r":false,"sh":"Fallback values for contact properties.","t":"`$OBJECT`","key$":"contactPropertiesFallbacks","index$":3},"contentRevisionId":{"a":true,"h":"Content Revision Id","n":"contentRevisionId","r":true,"sh":"The current content revision.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"contentRevisionId","index$":4},"dataVariablesFallbacks":{"a":true,"h":"Data Variables Fallbacks","n":"dataVariablesFallbacks","r":false,"sh":"Fallback values for data variables.","t":"`$OBJECT`","key$":"dataVariablesFallbacks","index$":5},"emailFormat":{"a":true,"h":"Email Format","n":"emailFormat","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The rendering format of the email.","t":"`$STRING`","key$":"emailFormat","index$":6},"eventPropertiesFallbacks":{"a":true,"h":"Event Properties Fallbacks","n":"eventPropertiesFallbacks","r":false,"sh":"Fallback values for event properties.","t":"`$OBJECT`","key$":"eventPropertiesFallbacks","index$":7},"expectedRevisionId":{"a":true,"h":"Expected Revision Id","n":"expectedRevisionId","r":false,"sh":"The `contentRevisionId` you last fetched, or the `emailMessageContentRevisionId` you received when creating the campaign.","t":"`$STRING`","key$":"expectedRevisionId","index$":8},"fromEmail":{"a":true,"h":"From Email","n":"fromEmail","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The email sender email address, without the team's sending domain.","t":"`$STRING`","key$":"fromEmail","index$":9},"fromName":{"a":true,"h":"From Name","n":"fromName","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The email sender name.","t":"`$STRING`","key$":"fromName","index$":10},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the email message.","t":"`$STRING`","key$":"id","index$":11},"languageCode":{"a":true,"h":"Language Code","n":"languageCode","r":false,"sh":"ISO 639-1 language code for the email, e.g.","t":"`$STRING`","key$":"languageCode","index$":12},"lmx":{"a":true,"h":"Lmx","n":"lmx","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The email body serialized as LMX.","t":"`$STRING`","key$":"lmx","index$":13},"previewText":{"a":true,"h":"Preview Text","n":"previewText","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The email preview text.","t":"`$STRING`","key$":"previewText","index$":14},"replyToEmail":{"a":true,"h":"Reply To Email","n":"replyToEmail","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The email reply-to address.","t":"`$STRING`","key$":"replyToEmail","index$":15},"subject":{"a":true,"h":"Subject","n":"subject","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The email subject.","t":"`$STRING`","key$":"subject","index$":16},"transactionalId":{"a":true,"h":"Transactional Id","n":"transactionalId","r":false,"sh":"The transactional email this email message belongs to.","t":"`$STRING`","key$":"transactionalId","index$":17},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":true,"t":"`$STRING`","key$":"updatedAt","index$":18},"warnings":{"a":true,"h":"Warnings","n":"warnings","r":false,"sh":"Non-fatal issues raised while compiling the submitted LMX.","t":"`$ARRAY`","key$":"warnings","index$":19}},"id":{"field":"id","name":"id"},"name":"email_message","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["bccEmail","ccEmail","contactPropertiesFallbacks","dataVariablesFallbacks","emailFormat","eventPropertiesFallbacks","expectedRevisionId","fromEmail","fromName","languageCode","lmx","previewText","replyToEmail","subject"],"co":{"id":"POST /v1/email-messages/{emailMessageId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"emailMessageId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/email-messages/{emailMessageId}","q":{"exist":["id"]},"r":{"param":{"emailMessageId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"email-messages"},{"var":"id"}],"t":{"req":{"bccEmail":"`reqdata.bcc_email`","ccEmail":"`reqdata.cc_email`","contactPropertiesFallbacks":"`reqdata.contact_properties_fallback`","dataVariablesFallbacks":"`reqdata.data_variables_fallback`","emailFormat":"`reqdata.email_format`","eventPropertiesFallbacks":"`reqdata.event_properties_fallback`","expectedRevisionId":"`reqdata.expected_revision_id`","fromEmail":"`reqdata.from_email`","fromName":"`reqdata.from_name`","languageCode":"`reqdata.language_code`","lmx":"`reqdata.lmx`","previewText":"`reqdata.preview_text`","replyToEmail":"`reqdata.reply_to_email`","subject":"`reqdata.subject`"},"res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/email-messages/{emailMessageId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"emailMessageId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/email-messages/{emailMessageId}","q":{"exist":["id"]},"r":{"param":{"emailMessageId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"email-messages"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"email_message","name__orig":"email_message","Name":"EmailMessage","name_":"email_message","name-":"email-message","NAME":"EMAIL_MESSAGE","index$":16}, {"active":true,"entity":"email_message","key$":"BasicEmailMessageFlow","kind":"basic","name":"BasicEmailMessageFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"email_message_ref01"},"m":{"email_message_id":"email_message01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"ref":"email_message_ref01","srcdatavar":"email_message_ref01_data","suffix":"_dt0"},"m":{"id":"email_message01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-email_message_ref01"}}]}]}, 'EmailMessage', {"POST /v1/email-messages/{emailMessageId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"expectedRevisionId":{"type":"string","description":"The `contentRevisionId` you last fetched, or the `emailMessageContentRevisionId` you received when creating the campaign.","key$":"expectedRevisionId"},"subject":{"type":"string","key$":"subject"},"previewText":{"type":"string","key$":"previewText"},"fromName":{"type":"string","key$":"fromName"},"fromEmail":{"type":"string","description":"The email sender email address, without the team's sending domain.","examples":["hello"],"key$":"fromEmail"},"replyToEmail":{"type":"string","description":"Reply-to email. Must be empty or a valid email address.","key$":"replyToEmail"},"ccEmail":{"type":"string","description":"CC email address. Requires the team to have CC/BCC enabled. Not supported for campaign emails.","key$":"ccEmail"},"bccEmail":{"type":"string","description":"BCC email address. Requires the team to have CC/BCC enabled. Not supported for campaign emails.","key$":"bccEmail"},"languageCode":{"type":"string","description":"ISO 639-1 language code for the email, e.g. `en` or `fr`.","key$":"languageCode"},"emailFormat":{"type":"string","enum":["styled","plain"],"description":"The rendering format of the email.","key$":"emailFormat"},"lmx":{"type":"string","description":"The email body serialized as LMX. Styles must be embedded in the LMX `<Style />` tag.","key$":"lmx"},"contactPropertiesFallbacks":{"type":"object","description":"Fallback values for contact properties, keyed by property name. Per-key merge: a string value sets the fallback, a null value deletes it, and keys omitted from the map are left unchanged.","additionalProperties":{"type":["string","null"]},"key$":"contactPropertiesFallbacks"},"eventPropertiesFallbacks":{"type":"object","description":"Fallback values for event properties, keyed by property name. Per-key merge: a string value sets the fallback, a null value deletes it, and keys omitted from the map are left unchanged.","additionalProperties":{"type":["string","null"]},"key$":"eventPropertiesFallbacks"},"dataVariablesFallbacks":{"type":"object","description":"Fallback values for data variables, keyed by variable name. Per-key merge: a string value sets the fallback, a null value deletes it, and keys omitted from the map are left unchanged.","additionalProperties":{"type":["string","null"]},"key$":"dataVariablesFallbacks"}},"additionalProperties":false,"examples":[{"expectedRevisionId":"clrev1s10n2i3d4e5f6g7h8","subject":"Spring product updates","previewText":"See what's new this season","fromName":"Acme Team","fromEmail":"hello","replyToEmail":"support@company.com","emailFormat":"styled","lmx":"<Paragraph>Hello, {firstName}!</Paragraph>","contactPropertiesFallbacks":{"firstName":"there"}}],"x-ref":"#/components/schemas/UpdateEmailMessageRequest","index$":1}}}},"parameters":[{"name":"emailMessageId","in":"path","required":true,"description":"The ID of the email message.","schema":{"type":"string","examples":["cle5f7g9h1i3j5k7l9m1n3p5"]},"index$":0}]},"GET /v1/email-messages/{emailMessageId}":{"protocol":"http","parameters":[{"name":"emailMessageId","in":"path","required":true,"description":"The ID of the email message.","schema":{"type":"string","examples":["cle5f7g9h1i3j5k7l9m1n3p5"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let email_message_ref01_data = Object.values(setup.data.existing.email_message)[0] as any

    // LOAD
    const email_message_ref01_ent = client.EmailMessage()
    const email_message_ref01_match_dt0: any = {}
    email_message_ref01_match_dt0.id = email_message_ref01_data.id
    const email_message_ref01_data_dt0 = (await email_message_ref01_ent.load(email_message_ref01_match_dt0)).data()
    assert(email_message_ref01_data_dt0.id === email_message_ref01_data.id)


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
      '../../../../.sdk/test/entity/email_message/EmailMessageTestData.json')

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
    ['email_message01','email_message02','email_message03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_EMAIL_MESSAGE_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_EMAIL_MESSAGE_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_EMAIL_MESSAGE_ENTID']
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
  
