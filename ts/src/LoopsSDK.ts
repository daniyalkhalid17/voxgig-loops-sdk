// Loops Ts SDK

import { ApiKeyEntity } from './entity/ApiKeyEntity'
import { AudienceSegmentEntity } from './entity/AudienceSegmentEntity'
import { CampaignEntity } from './entity/CampaignEntity'
import { ChangeWorkflowMailingListEntity } from './entity/ChangeWorkflowMailingListEntity'
import { CompleteEntity } from './entity/CompleteEntity'
import { ComponentEntity } from './entity/ComponentEntity'
import { ConfigurationEntity } from './entity/ConfigurationEntity'
import { ContactEntity } from './entity/ContactEntity'
import { ContactDeleteEntity } from './entity/ContactDeleteEntity'
import { ContactPropertyEntity } from './entity/ContactPropertyEntity'
import { ContactPropertySuccessEntity } from './entity/ContactPropertySuccessEntity'
import { ContactSuccessEntity } from './entity/ContactSuccessEntity'
import { ContactSuppressionRemoveEntity } from './entity/ContactSuppressionRemoveEntity'
import { ContactSuppressionStatusEntity } from './entity/ContactSuppressionStatusEntity'
import { CreateUploadEntity } from './entity/CreateUploadEntity'
import { CreateWorkflowNodeEntity } from './entity/CreateWorkflowNodeEntity'
import { EmailMessageEntity } from './entity/EmailMessageEntity'
import { EmailMessageGuardianEntity } from './entity/EmailMessageGuardianEntity'
import { EmailMessagePreviewEntity } from './entity/EmailMessagePreviewEntity'
import { EmailMetricEntity } from './entity/EmailMetricEntity'
import { EventPatternEntity } from './entity/EventPatternEntity'
import { EventSuccessEntity } from './entity/EventSuccessEntity'
import { GroupEntity } from './entity/GroupEntity'
import { MailingListEntity } from './entity/MailingListEntity'
import { SimplifiedWorkflowEntity } from './entity/SimplifiedWorkflowEntity'
import { ThemeEntity } from './entity/ThemeEntity'
import { TransactionalEntity } from './entity/TransactionalEntity'
import { TransactionalDraftEntity } from './entity/TransactionalDraftEntity'
import { TransactionalMetricEntity } from './entity/TransactionalMetricEntity'
import { TransactionalResourceEntity } from './entity/TransactionalResourceEntity'
import { UpdateComponentEntity } from './entity/UpdateComponentEntity'
import { UpdateThemeEntity } from './entity/UpdateThemeEntity'
import { UpdateWorkflowNodeEntity } from './entity/UpdateWorkflowNodeEntity'
import { WorkflowEntity } from './entity/WorkflowEntity'
import { WorkflowNodeEntity } from './entity/WorkflowNodeEntity'
import { WorkflowNodeWithRevisionEntity } from './entity/WorkflowNodeWithRevisionEntity'

export type * from './LoopsTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { LoopsEntityBase } from './LoopsEntityBase'
import { Utility } from './utility/Utility'
import { unreadableBody } from './utility/ResultBodyUtility'
import { abortError } from './utility/MakeRequestUtility'
import { allowed } from './utility/PrepareMethodUtility'


import { BaseFeature } from './feature/base/BaseFeature'



const stdutil = new Utility()


// A request's outcome: ok is false alone on an error with no response, so a
// caller narrowing on it reaches the status and the data.
type DirectResult =
  | { ok: false, err: any, status?: undefined, headers?: undefined, data?: undefined }
  | { ok: boolean, status: number, headers: any, data: any, err?: any }


class LoopsSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context
  

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    for (const key of ['_options', '_rootctx', '_features']) {
      Object.defineProperty(this, key, {
        value: (this as any)[key], enumerable: false, writable: true, configurable: true
      })
    }

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }

  


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options
    const method = String(fetchargs.method || 'GET').toUpperCase()

    if (!allowed(options.allow.method, method)) {
      return ctx.error('spec_method_allow', 'Method "' + method +
        '" not allowed by SDK option allow.method value: "' + options.allow.method + '"')
    }

    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method,
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    

    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any): Promise<DirectResult> {
    if (!allowed(this._options.allow.op, 'direct')) {
      return {
        ok: false,
        err: new Error('LoopsSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any): Promise<DirectResult> {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return { ok: false, err: utility.clean(this._rootctx, fetchdef) }
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      if (true === fetchdef.signal?.aborted) {
        throw fetchdef.signal.reason
      }

      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: utility.clean(ctx, abortError(ctx, fetched)) }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      let err: any = undefined
      if (!noBody) {
        let text: any = undefined
        try {
          const raw: any = fetched
          if ('function' === typeof raw.text) {
            text = await raw.text()
            json = '' === text.trim() ? undefined : JSON.parse(text)
          }
          else {
            json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
          }
        }
        catch (parseErr: any) {
          if ('SyntaxError' !== parseErr?.name) {
            throw parseErr
          }
          err = unreadableBody(ctx, {
            status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
            failed: 200 <= status && status < 300 ? undefined :
              ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
          })
        }
      }

      return {
        ok: null == err && status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
        ...(null == err ? {} : { err: utility.clean(ctx, err) }),
      }
    }
    catch (err: any) {
      return { ok: false, err: utility.clean(ctx, abortError(ctx, err)) }
    }
  }



  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!allowed(options.allow.op, 'graphql')) {
      return {
        ok: false,
        err: new Error('LoopsSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('LoopsSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.ApiKey().list()` / `client.ApiKey().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ApiKey(entopts?: Record<string, any>) {
    const self = this
    return new ApiKeyEntity(self, entopts)
  }


  // Entity access: `client.AudienceSegment().list()` / `client.AudienceSegment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AudienceSegment(entopts?: Record<string, any>) {
    const self = this
    return new AudienceSegmentEntity(self, entopts)
  }


  // Entity access: `client.Campaign().list()` / `client.Campaign().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Campaign(entopts?: Record<string, any>) {
    const self = this
    return new CampaignEntity(self, entopts)
  }


  // Entity access: `client.ChangeWorkflowMailingList().list()` / `client.ChangeWorkflowMailingList().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ChangeWorkflowMailingList(entopts?: Record<string, any>) {
    const self = this
    return new ChangeWorkflowMailingListEntity(self, entopts)
  }


  // Entity access: `client.Complete().list()` / `client.Complete().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Complete(entopts?: Record<string, any>) {
    const self = this
    return new CompleteEntity(self, entopts)
  }


  // Entity access: `client.Component().list()` / `client.Component().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Component(entopts?: Record<string, any>) {
    const self = this
    return new ComponentEntity(self, entopts)
  }


  // Entity access: `client.Configuration().list()` / `client.Configuration().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Configuration(entopts?: Record<string, any>) {
    const self = this
    return new ConfigurationEntity(self, entopts)
  }


  // Entity access: `client.Contact().list()` / `client.Contact().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Contact(entopts?: Record<string, any>) {
    const self = this
    return new ContactEntity(self, entopts)
  }


  // Entity access: `client.ContactDelete().list()` / `client.ContactDelete().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ContactDelete(entopts?: Record<string, any>) {
    const self = this
    return new ContactDeleteEntity(self, entopts)
  }


  // Entity access: `client.ContactProperty().list()` / `client.ContactProperty().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ContactProperty(entopts?: Record<string, any>) {
    const self = this
    return new ContactPropertyEntity(self, entopts)
  }


  // Entity access: `client.ContactPropertySuccess().list()` / `client.ContactPropertySuccess().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ContactPropertySuccess(entopts?: Record<string, any>) {
    const self = this
    return new ContactPropertySuccessEntity(self, entopts)
  }


  // Entity access: `client.ContactSuccess().list()` / `client.ContactSuccess().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ContactSuccess(entopts?: Record<string, any>) {
    const self = this
    return new ContactSuccessEntity(self, entopts)
  }


  // Entity access: `client.ContactSuppressionRemove().list()` / `client.ContactSuppressionRemove().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ContactSuppressionRemove(entopts?: Record<string, any>) {
    const self = this
    return new ContactSuppressionRemoveEntity(self, entopts)
  }


  // Entity access: `client.ContactSuppressionStatus().list()` / `client.ContactSuppressionStatus().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ContactSuppressionStatus(entopts?: Record<string, any>) {
    const self = this
    return new ContactSuppressionStatusEntity(self, entopts)
  }


  // Entity access: `client.CreateUpload().list()` / `client.CreateUpload().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CreateUpload(entopts?: Record<string, any>) {
    const self = this
    return new CreateUploadEntity(self, entopts)
  }


  // Entity access: `client.CreateWorkflowNode().list()` / `client.CreateWorkflowNode().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CreateWorkflowNode(entopts?: Record<string, any>) {
    const self = this
    return new CreateWorkflowNodeEntity(self, entopts)
  }


  // Entity access: `client.EmailMessage().list()` / `client.EmailMessage().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EmailMessage(entopts?: Record<string, any>) {
    const self = this
    return new EmailMessageEntity(self, entopts)
  }


  // Entity access: `client.EmailMessageGuardian().list()` / `client.EmailMessageGuardian().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EmailMessageGuardian(entopts?: Record<string, any>) {
    const self = this
    return new EmailMessageGuardianEntity(self, entopts)
  }


  // Entity access: `client.EmailMessagePreview().list()` / `client.EmailMessagePreview().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EmailMessagePreview(entopts?: Record<string, any>) {
    const self = this
    return new EmailMessagePreviewEntity(self, entopts)
  }


  // Entity access: `client.EmailMetric().list()` / `client.EmailMetric().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EmailMetric(entopts?: Record<string, any>) {
    const self = this
    return new EmailMetricEntity(self, entopts)
  }


  // Entity access: `client.EventPattern().list()` / `client.EventPattern().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EventPattern(entopts?: Record<string, any>) {
    const self = this
    return new EventPatternEntity(self, entopts)
  }


  // Entity access: `client.EventSuccess().list()` / `client.EventSuccess().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EventSuccess(entopts?: Record<string, any>) {
    const self = this
    return new EventSuccessEntity(self, entopts)
  }


  // Entity access: `client.Group().list()` / `client.Group().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Group(entopts?: Record<string, any>) {
    const self = this
    return new GroupEntity(self, entopts)
  }


  // Entity access: `client.MailingList().list()` / `client.MailingList().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MailingList(entopts?: Record<string, any>) {
    const self = this
    return new MailingListEntity(self, entopts)
  }


  // Entity access: `client.SimplifiedWorkflow().list()` / `client.SimplifiedWorkflow().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SimplifiedWorkflow(entopts?: Record<string, any>) {
    const self = this
    return new SimplifiedWorkflowEntity(self, entopts)
  }


  // Entity access: `client.Theme().list()` / `client.Theme().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Theme(entopts?: Record<string, any>) {
    const self = this
    return new ThemeEntity(self, entopts)
  }


  // Entity access: `client.Transactional().list()` / `client.Transactional().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Transactional(entopts?: Record<string, any>) {
    const self = this
    return new TransactionalEntity(self, entopts)
  }


  // Entity access: `client.TransactionalDraft().list()` / `client.TransactionalDraft().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  TransactionalDraft(entopts?: Record<string, any>) {
    const self = this
    return new TransactionalDraftEntity(self, entopts)
  }


  // Entity access: `client.TransactionalMetric().list()` / `client.TransactionalMetric().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  TransactionalMetric(entopts?: Record<string, any>) {
    const self = this
    return new TransactionalMetricEntity(self, entopts)
  }


  // Entity access: `client.TransactionalResource().list()` / `client.TransactionalResource().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  TransactionalResource(entopts?: Record<string, any>) {
    const self = this
    return new TransactionalResourceEntity(self, entopts)
  }


  // Entity access: `client.UpdateComponent().list()` / `client.UpdateComponent().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UpdateComponent(entopts?: Record<string, any>) {
    const self = this
    return new UpdateComponentEntity(self, entopts)
  }


  // Entity access: `client.UpdateTheme().list()` / `client.UpdateTheme().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UpdateTheme(entopts?: Record<string, any>) {
    const self = this
    return new UpdateThemeEntity(self, entopts)
  }


  // Entity access: `client.UpdateWorkflowNode().list()` / `client.UpdateWorkflowNode().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UpdateWorkflowNode(entopts?: Record<string, any>) {
    const self = this
    return new UpdateWorkflowNodeEntity(self, entopts)
  }


  // Entity access: `client.Workflow().list()` / `client.Workflow().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Workflow(entopts?: Record<string, any>) {
    const self = this
    return new WorkflowEntity(self, entopts)
  }


  // Entity access: `client.WorkflowNode().list()` / `client.WorkflowNode().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WorkflowNode(entopts?: Record<string, any>) {
    const self = this
    return new WorkflowNodeEntity(self, entopts)
  }


  // Entity access: `client.WorkflowNodeWithRevision().list()` / `client.WorkflowNodeWithRevision().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WorkflowNodeWithRevision(entopts?: Record<string, any>) {
    const self = this
    return new WorkflowNodeWithRevisionEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new LoopsSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return LoopsSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Loops' }
  }

  toString() {
    return 'Loops ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = LoopsSDK


export {
  stdutil,
  config,
  

  BaseFeature,
  LoopsEntityBase,

  LoopsSDK,
  SDK,
}


export type { DirectResult }
