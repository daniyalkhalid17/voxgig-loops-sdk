

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


describe('UpdateThemeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.UpdateTheme()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LoopsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.UpdateTheme().create({"id":1,"affectedEmailCount":1,"createdAt":"x","isDefault":true,"name":"x","styles":"x","updatedAt":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'update_theme.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"affectedEmailCount":{"a":true,"h":"Affected Email Count","n":"affectedEmailCount","r":true,"sh":"The number of emails using this theme that are affected by the style change.","t":"`$NUMBER`","key$":"affectedEmailCount","index$":0},"createdAt":{"a":true,"h":"Created At","n":"createdAt","r":true,"sh":"ISO 8601 timestamp for when the theme was created.","t":"`$STRING`","key$":"createdAt","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the theme.","t":"`$STRING`","key$":"id","index$":2},"isDefault":{"a":true,"h":"Is Default","n":"isDefault","r":true,"sh":"Whether this theme is the team's default.","t":"`$BOOLEAN`","key$":"isDefault","index$":3},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The name of the theme.","t":"`$STRING`","key$":"name","index$":4},"styles":{"a":true,"h":"Styles","n":"styles","op":{"create":{"req":false,"type":"`$OBJECT`"}},"r":true,"sh":"Flat map of style attributes, matching the attribute names accepted by the LMX `<Style />` tag.","t":"`$OBJECT`","key$":"styles","index$":5},"updatedAt":{"a":true,"h":"Updated At","n":"updatedAt","r":true,"sh":"ISO 8601 timestamp for when the theme was last updated.","t":"`$STRING`","key$":"updatedAt","index$":6}},"id":{"field":"id","name":"id"},"name":"update_theme","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["name","styles"],"co":{"id":"POST /v1/themes/{themeId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"themeId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/themes/{themeId}","q":{"exist":["id"]},"r":{"param":{"themeId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"themes"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"update_theme","name__orig":"update_theme","Name":"UpdateTheme","name_":"update_theme","name-":"update-theme","NAME":"UPDATE_THEME","index$":31}, {"active":true,"entity":"update_theme","key$":"BasicUpdateThemeFlow","kind":"basic","name":"BasicUpdateThemeFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"update_theme_ref01"},"m":{"theme_id":"theme01"},"o":"create","s":[],"v":[],"unreachable":true}]}, 'UpdateTheme', {"POST /v1/themes/{themeId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"At least one of `name` or `styles` must be provided.","properties":{"name":{"type":"string","key$":"name"},"styles":{"type":"object","description":"Flat map of style attributes, matching the attribute names accepted by the LMX `<Style />` tag.","properties":{"backgroundColor":{"type":"string"},"backgroundXPadding":{"type":"number"},"backgroundYPadding":{"type":"number"},"bodyColor":{"type":"string"},"bodyXPadding":{"type":"number"},"bodyYPadding":{"type":"number"},"bodyFontFamily":{"type":"string"},"bodyFontCategory":{"type":"string"},"borderColor":{"type":"string"},"borderWidth":{"type":"number"},"borderRadius":{"type":"number"},"buttonBodyColor":{"type":"string"},"buttonBodyXPadding":{"type":"number"},"buttonBodyYPadding":{"type":"number"},"buttonBorderColor":{"type":"string"},"buttonBorderWidth":{"type":"number"},"buttonBorderRadius":{"type":"number"},"buttonTextColor":{"type":"string"},"buttonTextFormat":{"type":"number"},"buttonTextFontSize":{"type":"number"},"dividerColor":{"type":"string"},"dividerBorderWidth":{"type":"number"},"textBaseColor":{"type":"string"},"textBaseFontSize":{"type":"number"},"textBaseLineHeight":{"type":"number"},"textBaseLetterSpacing":{"type":"number"},"textLinkColor":{"type":"string"},"heading1Color":{"type":"string"},"heading1FontSize":{"type":"number"},"heading1LineHeight":{"type":"number"},"heading1LetterSpacing":{"type":"number"},"heading2Color":{"type":"string"},"heading2FontSize":{"type":"number"},"heading2LineHeight":{"type":"number"},"heading2LetterSpacing":{"type":"number"},"heading3Color":{"type":"string"},"heading3FontSize":{"type":"number"},"heading3LineHeight":{"type":"number"},"heading3LetterSpacing":{"type":"number"}},"x-ref":"#/components/schemas/ThemeStyles","key$":"styles"}},"x-ref":"#/components/schemas/UpdateThemeBody","index$":1}}}},"parameters":[{"name":"themeId","in":"path","required":true,"description":"The ID of the theme.","schema":{"type":"string","examples":["clt3u5v7w9x1y3z5a7b9c1d3"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let update_theme_ref01_data = Object.values(setup.data.existing.update_theme)[0] as any

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
      '../../../../.sdk/test/entity/update_theme/UpdateThemeTestData.json')

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
    ['update_theme01','update_theme02','update_theme03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_UPDATE_THEME_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_UPDATE_THEME_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_UPDATE_THEME_ENTID']
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
  
