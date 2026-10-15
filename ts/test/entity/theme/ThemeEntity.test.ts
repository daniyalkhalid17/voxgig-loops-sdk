

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


describe('ThemeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.Theme()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('theme hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LoopsSDK.test(offline).Theme().stream('list')) { }
    }, /offline/)

    for await (const _item of LoopsSDK.test(offline).Theme()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LoopsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Theme().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LoopsSDK.test().Theme().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LoopsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Theme().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Theme().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Theme().list({"cursor":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'theme.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"h":"Created At","n":"createdAt","r":true,"sh":"ISO 8601 timestamp for when the theme was created.","t":"`$STRING`","key$":"createdAt","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the theme.","t":"`$STRING`","key$":"id","index$":1},"isDefault":{"a":true,"h":"Is Default","n":"isDefault","r":true,"sh":"Whether this theme is the team's default.","t":"`$BOOLEAN`","key$":"isDefault","index$":2},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the theme.","t":"`$STRING`","key$":"name","index$":3},"styles":{"a":true,"h":"Styles","n":"styles","op":{"create":{"req":false,"type":"`$OBJECT`"}},"r":true,"sh":"Flat map of style attributes, matching the attribute names accepted by the LMX `<Style />` tag.","t":"`$OBJECT`","key$":"styles","index$":4},"updatedAt":{"a":true,"h":"Updated At","n":"updatedAt","r":true,"sh":"ISO 8601 timestamp for when the theme was last updated.","t":"`$STRING`","key$":"updatedAt","index$":5}},"id":{"field":"id","name":"id"},"name":"theme","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["name","styles"],"co":{"id":"POST /v1/themes","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/themes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"themes"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/themes","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"per_page","or":"perPage","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/themes","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"themes"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/themes/{themeId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"themeId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/themes/{themeId}","q":{"exist":["id"]},"r":{"param":{"themeId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"themes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"theme","name__orig":"theme","Name":"Theme","name_":"theme","name-":"theme","NAME":"THEME","index$":25}, {"active":true,"entity":"theme","key$":"BasicThemeFlow","kind":"basic","name":"BasicThemeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"theme_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"theme_ref01"}}]},{"a":true,"d":{},"i":{"ref":"theme_ref01","srcdatavar":"theme_ref01_data","suffix":"_dt0"},"m":{"id":"theme01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-theme_ref01"}}]}]}, 'Theme', {"POST /v1/themes":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The theme name.","examples":["Dark mode"],"key$":"name"},"styles":{"type":"object","description":"Style attributes for the theme. Attributes use the same names as the LMX [`<Style />`](/creating-emails/lmx#document-styles) tag attributes.","properties":{"backgroundColor":{"type":"string"},"backgroundXPadding":{"type":"number"},"backgroundYPadding":{"type":"number"},"bodyColor":{"type":"string"},"bodyXPadding":{"type":"number"},"bodyYPadding":{"type":"number"},"bodyFontFamily":{"type":"string"},"bodyFontCategory":{"type":"string"},"borderColor":{"type":"string"},"borderWidth":{"type":"number"},"borderRadius":{"type":"number"},"buttonBodyColor":{"type":"string"},"buttonBodyXPadding":{"type":"number"},"buttonBodyYPadding":{"type":"number"},"buttonBorderColor":{"type":"string"},"buttonBorderWidth":{"type":"number"},"buttonBorderRadius":{"type":"number"},"buttonTextColor":{"type":"string"},"buttonTextFormat":{"type":"number"},"buttonTextFontSize":{"type":"number"},"dividerColor":{"type":"string"},"dividerBorderWidth":{"type":"number"},"textBaseColor":{"type":"string"},"textBaseFontSize":{"type":"number"},"textBaseLineHeight":{"type":"number"},"textBaseLetterSpacing":{"type":"number"},"textLinkColor":{"type":"string"},"heading1Color":{"type":"string"},"heading1FontSize":{"type":"number"},"heading1LineHeight":{"type":"number"},"heading1LetterSpacing":{"type":"number"},"heading2Color":{"type":"string"},"heading2FontSize":{"type":"number"},"heading2LineHeight":{"type":"number"},"heading2LetterSpacing":{"type":"number"},"heading3Color":{"type":"string"},"heading3FontSize":{"type":"number"},"heading3LineHeight":{"type":"number"},"heading3LetterSpacing":{"type":"number"}},"x-ref":"#/components/schemas/ThemeStyles","key$":"styles"}},"required":["name"],"examples":[{"name":"Dark mode","styles":{"backgroundColor":"#111827","bodyColor":"#1f2937"}}],"x-ref":"#/components/schemas/CreateThemeBody","index$":1}}}},"parameters":[]},"GET /v1/themes":{"protocol":"http","parameters":[{"name":"perPage","in":"query","required":false,"description":"How many results to return in each request. Must be between 10 and 50. Default is 20.","schema":{"type":"string"},"index$":0},{"name":"cursor","in":"query","required":false,"description":"A cursor to return a specific page of results. Cursors can be found from the `pagination.nextCursor` value in each response.","schema":{"type":"string"},"index$":1}]},"GET /v1/themes/{themeId}":{"protocol":"http","parameters":[{"name":"themeId","in":"path","required":true,"description":"The ID of the theme.","schema":{"type":"string","examples":["clt3u5v7w9x1y3z5a7b9c1d3"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const theme_ref01_ent = client.Theme()
    let theme_ref01_data = setup.data.new.theme['theme_ref01']

    theme_ref01_data = (await theme_ref01_ent.create(theme_ref01_data)).data()
    assert(null != theme_ref01_data.id)


    // LIST
    const theme_ref01_match: any = {}

    const theme_ref01_list = (await theme_ref01_ent.list(theme_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(theme_ref01_list, { id: theme_ref01_data.id })))


    // LOAD
    const theme_ref01_match_dt0: any = {}
    theme_ref01_match_dt0.id = theme_ref01_data.id
    const theme_ref01_data_dt0 = (await theme_ref01_ent.load(theme_ref01_match_dt0)).data()
    assert(theme_ref01_data_dt0.id === theme_ref01_data.id)


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
      '../../../../.sdk/test/entity/theme/ThemeTestData.json')

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
    ['theme01','theme02','theme03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_THEME_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_THEME_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_THEME_ENTID']
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
  
