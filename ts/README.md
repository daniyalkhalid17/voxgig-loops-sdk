# Loops TypeScript SDK



The TypeScript SDK for the Loops API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.ApiKey()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/daniyalkhalid17/voxgig-loops-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/daniyalkhalid17/voxgig-loops-sdk
npm install ./loops-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { LoopsSDK } from '@voxgig-sdk/loops-sdk'

const client = new LoopsSDK({
  apikey: process.env.LOOPS_APIKEY,
})
```

### 3. Load an emailmetric

EmailMetric is nested under campaign, so provide the `campaign_id`.
`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const emailmetric = await client.EmailMetric().load({
    campaign_id: 'example_campaign_id',
  })
  console.log(emailmetric.data())
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const eventpatterns = await client.EventPattern().list()
  console.log(eventpatterns.map((item) => item.data()))
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = LoopsSDK.test()

const eventpatterns = await client.EventPattern().list()
// eventpatterns is an array of EventPattern entities, one per mock record
console.log(eventpatterns.map((eventpattern) => eventpattern.data()))
```

You can also use the instance method:

```ts
const client = new LoopsSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.EventPattern()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new LoopsSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LOOPS_TEST_LIVE=TRUE
LOOPS_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### LoopsSDK

#### Constructor

```ts
new LoopsSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `ApiKey(data?)` | `ApiKeyEntity` | Create an ApiKey entity instance. |
| `AudienceSegment(data?)` | `AudienceSegmentEntity` | Create an AudienceSegment entity instance. |
| `Campaign(data?)` | `CampaignEntity` | Create a Campaign entity instance. |
| `ChangeWorkflowMailingList(data?)` | `ChangeWorkflowMailingListEntity` | Create a ChangeWorkflowMailingList entity instance. |
| `Complete(data?)` | `CompleteEntity` | Create a Complete entity instance. |
| `Component(data?)` | `ComponentEntity` | Create a Component entity instance. |
| `Configuration(data?)` | `ConfigurationEntity` | Create a Configuration entity instance. |
| `Contact(data?)` | `ContactEntity` | Create a Contact entity instance. |
| `ContactDelete(data?)` | `ContactDeleteEntity` | Create a ContactDelete entity instance. |
| `ContactProperty(data?)` | `ContactPropertyEntity` | Create a ContactProperty entity instance. |
| `ContactPropertySuccess(data?)` | `ContactPropertySuccessEntity` | Create a ContactPropertySuccess entity instance. |
| `ContactSuccess(data?)` | `ContactSuccessEntity` | Create a ContactSuccess entity instance. |
| `ContactSuppressionRemove(data?)` | `ContactSuppressionRemoveEntity` | Create a ContactSuppressionRemove entity instance. |
| `ContactSuppressionStatus(data?)` | `ContactSuppressionStatusEntity` | Create a ContactSuppressionStatus entity instance. |
| `CreateUpload(data?)` | `CreateUploadEntity` | Create a CreateUpload entity instance. |
| `CreateWorkflowNode(data?)` | `CreateWorkflowNodeEntity` | Create a CreateWorkflowNode entity instance. |
| `EmailMessage(data?)` | `EmailMessageEntity` | Create an EmailMessage entity instance. |
| `EmailMessageGuardian(data?)` | `EmailMessageGuardianEntity` | Create an EmailMessageGuardian entity instance. |
| `EmailMessagePreview(data?)` | `EmailMessagePreviewEntity` | Create an EmailMessagePreview entity instance. |
| `EmailMetric(data?)` | `EmailMetricEntity` | Create an EmailMetric entity instance. |
| `EventPattern(data?)` | `EventPatternEntity` | Create an EventPattern entity instance. |
| `EventSuccess(data?)` | `EventSuccessEntity` | Create an EventSuccess entity instance. |
| `Group(data?)` | `GroupEntity` | Create a Group entity instance. |
| `MailingList(data?)` | `MailingListEntity` | Create a MailingList entity instance. |
| `SimplifiedWorkflow(data?)` | `SimplifiedWorkflowEntity` | Create a SimplifiedWorkflow entity instance. |
| `Theme(data?)` | `ThemeEntity` | Create a Theme entity instance. |
| `Transactional(data?)` | `TransactionalEntity` | Create a Transactional entity instance. |
| `TransactionalDraft(data?)` | `TransactionalDraftEntity` | Create a TransactionalDraft entity instance. |
| `TransactionalMetric(data?)` | `TransactionalMetricEntity` | Create a TransactionalMetric entity instance. |
| `TransactionalResource(data?)` | `TransactionalResourceEntity` | Create a TransactionalResource entity instance. |
| `UpdateComponent(data?)` | `UpdateComponentEntity` | Create an UpdateComponent entity instance. |
| `UpdateTheme(data?)` | `UpdateThemeEntity` | Create an UpdateTheme entity instance. |
| `UpdateWorkflowNode(data?)` | `UpdateWorkflowNodeEntity` | Create an UpdateWorkflowNode entity instance. |
| `Workflow(data?)` | `WorkflowEntity` | Create a Workflow entity instance. |
| `WorkflowNode(data?)` | `WorkflowNodeEntity` | Create a WorkflowNode entity instance. |
| `WorkflowNodeWithRevision(data?)` | `WorkflowNodeWithRevisionEntity` | Create a WorkflowNodeWithRevision entity instance. |
| `tester(testopts?, sdkopts?)` | `LoopsSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `LoopsSDK.test(testopts?, sdkopts?)` | `LoopsSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity, and return it. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Entity>` | Remove an entity, and return it marked as deleted. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): LoopsSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to the entity, marked as deleted.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### ApiKey

| Field | Description |
| --- | --- |
| `success` |  |
| `teamName` | The name of the team the API key belongs to. |

Operations: load.

API path: `/v1/api-key`

#### AudienceSegment

| Field | Description |
| --- | --- |
| `createdAt` | ISO 8601 timestamp for when the audience segment was created. |
| `description` | An optional description of the audience segment. |
| `filter` | A tree of audience conditions combined with `match`. |
| `id` | The ID of the audience segment. |
| `name` | The name of the audience segment. |
| `updatedAt` | ISO 8601 timestamp for when the audience segment was last updated. |

Operations: create, list, load.

API path: `/v1/audience-segments`

#### Campaign

| Field | Description |
| --- | --- |
| `audienceFilter` | The filter rules that define the audience for this campaign, if set. |
| `audienceSegmentId` | The ID of the audience segment this campaign targets, if set. |
| `campaignGroupId` | The ID of the campaign group this campaign belongs to. |
| `createdAt` | ISO 8601 timestamp for when the campaign was created. |
| `emailMessageId` | The associated email message ID. |
| `id` | The ID of the campaign. |
| `mailingListId` | The ID of the mailing list this campaign sends to, if set. |
| `name` | The name of the campaign. |
| `scheduling` | When the campaign is scheduled to send. |
| `status` | The status of the campaign. |
| `updatedAt` | ISO 8601 timestamp for when the campaign was last updated. |
| `url` | The URL of the campaign in the Loops app. |

Operations: create, list, load.

API path: `/v1/campaigns/{campaignId}`

#### ChangeWorkflowMailingList

| Field | Description |
| --- | --- |
| `dryRun` | If `true`, the request will be validated but the workflow will not be modified. |
| `expectedRevisionId` | The workflow revision token returned by the latest workflow read or mutation. |
| `mailingListId` | The mailing list to use for the workflow. |
| `queuedContactPolicy` | `fail` returns queued-contact impact instead of mutating. |

Operations: create.

API path: `/v1/workflows/{workflowId}/mailing-list`

#### Complete

| Field | Description |
| --- | --- |
| `emailAssetId` | The ID of the created asset. |
| `finalUrl` | The public URL of the uploaded asset. |

Operations: create.

API path: `/v1/uploads/{emailAssetId}/complete`

#### Component

| Field | Description |
| --- | --- |
| `id` | The ID of the component. |
| `lmx` | The component body serialized as LMX. |
| `name` | The name of the component. |

Operations: create, list, load.

API path: `/v1/components`

#### Configuration

| Field | Description |
| --- | --- |

Operations: list.

API path: `/v1/dedicated-sending-ips`

#### Contact

| Field | Description |
| --- | --- |
| `email` | The contact's email address. |
| `firstName` | The contact's first name. |
| `id` | The contact's Loops ID. |
| `lastName` | The contact's last name. |
| `mailingLists` | Mailing lists the contact is subscribed to, represented by key-value pairs of mailing list IDs and `true`. |
| `optInStatus` | Double opt-in status. |
| `source` | The source the contact was created from. |
| `subscribed` | Whether the contact will receive campaign and workflow emails. |
| `userGroup` | The contact's user group. |
| `userId` | The contact's unique user ID. |

Operations: list.

API path: `/v1/contacts/find`

#### ContactDelete

| Field | Description |
| --- | --- |
| `email` | The contact's email address. |
| `message` |  |
| `success` |  |
| `userId` | The contact's unique user ID. |

Operations: create.

API path: `/v1/contacts/delete`

#### ContactProperty

| Field | Description |
| --- | --- |
| `key` | The key of the contact property. |
| `label` | The human-friendly label for this property. |
| `type` | The type of property. |

Operations: list.

API path: `/v1/contacts/properties`

#### ContactPropertySuccess

| Field | Description |
| --- | --- |
| `name` | The name of the property. |
| `success` |  |
| `type` | The type of property. |

Operations: create.

API path: `/v1/contacts/properties`

#### ContactSuccess

| Field | Description |
| --- | --- |
| `email` | The contact's email address. |
| `firstName` | The contact's first name. |
| `id` |  |
| `lastName` | The contact's last name. |
| `mailingLists` | Manage mailing list subscriptions. |
| `source` | A custom source value to replace the default “API”. |
| `subscribed` | Whether the contact will receive campaign and workflow emails. |
| `success` |  |
| `userGroup` | The contact's user group. |
| `userId` | A unique user ID (for example, from an external application). |

Operations: create, update.

API path: `/v1/contacts/create`

#### ContactSuppressionRemove

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/v1/contacts/suppression`

#### ContactSuppressionStatus

| Field | Description |
| --- | --- |
| `contact` |  |
| `isSuppressed` | Whether the contact is suppressed. |
| `removalQuota` | The removal quota for the contact. |

Operations: load.

API path: `/v1/contacts/suppression`

#### CreateUpload

| Field | Description |
| --- | --- |
| `contentLength` | The size of the file in bytes. |
| `contentType` | The MIME type of the file to upload. |
| `emailAssetId` | The ID of the created asset. |
| `presignedUrl` | The pre-signed URL to upload the file to with an HTTP `PUT` request. |

Operations: create.

API path: `/v1/uploads`

#### CreateWorkflowNode

| Field | Description |
| --- | --- |
| `node` |  |
| `workflow` |  |

Operations: create.

API path: `/v1/workflows/{workflowId}/nodes`

#### EmailMessage

| Field | Description |
| --- | --- |
| `bccEmail` | The email BCC address. |
| `campaignId` | The campaign this email message belongs to. |
| `ccEmail` | The email CC address. |
| `contactPropertiesFallbacks` | Fallback values for contact properties. |
| `contentRevisionId` | The current content revision. |
| `dataVariablesFallbacks` | Fallback values for data variables. |
| `emailFormat` | The rendering format of the email. |
| `eventPropertiesFallbacks` | Fallback values for event properties. |
| `expectedRevisionId` | The `contentRevisionId` you last fetched, or the `emailMessageContentRevisionId` you received when creating the campaign. |
| `fromEmail` | The email sender email address, without the team's sending domain. |
| `fromName` | The email sender name. |
| `id` | The ID of the email message. |
| `languageCode` | ISO 639-1 language code for the email, e.g. |
| `lmx` | The email body serialized as LMX. |
| `previewText` | The email preview text. |
| `replyToEmail` | The email reply-to address. |
| `subject` | The email subject. |
| `transactionalId` | The transactional email this email message belongs to. |
| `updatedAt` |  |
| `warnings` | Non-fatal issues raised while compiling the submitted LMX. |

Operations: create, load.

API path: `/v1/email-messages/{emailMessageId}`

#### EmailMessageGuardian

| Field | Description |
| --- | --- |
| `errors` | Validation errors. |
| `id` |  |
| `warnings` | Validation warnings. |

Operations: list.

API path: `/v1/email-messages/{emailMessageId}/guardian`

#### EmailMessagePreview

| Field | Description |
| --- | --- |
| `contactProperties` | Contact property values to render. |
| `dataVariables` | Transactional data variables to render. |
| `emails` | One or more addresses to send the preview to. |
| `eventProperties` | Event property values to render. |
| `id` | The ID of the email message the preview was sent for. |

Operations: create.

API path: `/v1/email-messages/{emailMessageId}/preview`

#### EmailMetric

| Field | Description |
| --- | --- |
| `clicks` | Number of sends where at least one link was clicked. |
| `hardBounces` | Number of sends that hard bounced. |
| `opens` | Number of sends that were opened at least once. |
| `sends` | Number of sends. |
| `softBounces` | Number of sends that soft bounced. |
| `spamReports` | Number of sends reported as spam. |
| `unsubscribes` | Number of unsubscribes. |

Operations: load.

API path: `/v1/workflows/{workflowId}/nodes/{nodeId}/metrics`

#### EventPattern

| Field | Description |
| --- | --- |
| `eventName` | The name of the event pattern. |
| `eventProperties` | The properties of the event pattern, which can be used in emails. |
| `id` | The ID of the event pattern. |
| `incomingWebhookPlatform` | The platform that sent this event pattern, if the event pattern is from an incoming webhook. |

Operations: list, load.

API path: `/v1/event-patterns`

#### EventSuccess

| Field | Description |
| --- | --- |
| `email` | The contact's email address. |
| `eventName` | The name of the event. |
| `eventProperties` | An object containing event property data for the event, available in emails sent by the event. |
| `mailingLists` | Manage mailing list subscriptions. |
| `success` |  |
| `userId` | The contact's unique user ID. |

Operations: create.

API path: `/v1/events/send`

#### Group

| Field | Description |
| --- | --- |
| `createdAt` | ISO 8601 timestamp for when the group was created. |
| `description` | The description of the group. |
| `id` | The ID of the group. |
| `name` | The name of the group. |
| `updatedAt` | ISO 8601 timestamp for when the group was last updated. |

Operations: create, list, load.

API path: `/v1/campaign-groups/{campaignGroupId}`

#### MailingList

| Field | Description |
| --- | --- |
| `description` | The description of the mailing list. |
| `id` | The ID of the mailing list. |
| `isPublic` | Whether the mailing list is public (`true`) or private (`false`). |
| `name` | The name of the mailing list. |

Operations: list.

API path: `/v1/lists`

#### SimplifiedWorkflow

| Field | Description |
| --- | --- |
| `createdAt` | ISO 8601 timestamp for when the workflow was created. |
| `description` | The description of the workflow. |
| `expectedRevisionId` | The workflow revision token returned by the latest workflow read or mutation. |
| `id` | The ID of the workflow. |
| `mailingListId` | The ID of the mailing list the workflow sends to. |
| `name` | The name of the workflow. |
| `nodes` | A map of node IDs to simplified node objects. |
| `rootNodeId` | The ID of the root node in the workflow graph. |
| `status` |  |
| `updatedAt` | ISO 8601 timestamp for when the workflow was last updated. |
| `url` | The URL of the workflow in the Loops app. |
| `workflowRevisionId` | The current workflow revision token. |

Operations: create, list, load.

API path: `/v1/workflows/{workflowId}`

#### Theme

| Field | Description |
| --- | --- |
| `createdAt` | ISO 8601 timestamp for when the theme was created. |
| `id` | The ID of the theme. |
| `isDefault` | Whether this theme is the team's default. |
| `name` | The name of the theme. |
| `styles` | Flat map of style attributes, matching the attribute names accepted by the LMX `<Style />` tag. |
| `updatedAt` | ISO 8601 timestamp for when the theme was last updated. |

Operations: create, list, load.

API path: `/v1/themes`

#### Transactional

| Field | Description |
| --- | --- |
| `addToAudience` | If `true`, a contact will be created in your audience using the `email` value (if a matching contact doesn't already exist). |
| `attachments` | A list containing file objects to be sent along with an email message. |
| `dataVariables` | An object containing data as defined by the data variables added to the transactional email template. |
| `email` | The recipient's email address. |
| `id` | The ID of the transactional email. |
| `lastUpdated` | The date and time the transactional email was last updated in ISO 8601 format. |
| `name` | The name of the transactional email. |
| `success` |  |
| `transactionalId` | The ID of the transactional email to send. |

Operations: create, list.

API path: `/v1/transactional`

#### TransactionalDraft

| Field | Description |
| --- | --- |
| `createdAt` | ISO 8601 timestamp for when the transactional email was created. |
| `dataVariables` | Data variable names used by the published email. |
| `draftEmailMessageContentRevisionId` | The `contentRevisionId` of the draft email message. |
| `draftEmailMessageId` | The ID of the draft email message. |
| `id` | The ID of the transactional email. |
| `name` | The name of the transactional email. |
| `publishedEmailMessageId` | The ID of the published email message. |
| `transactionalGroupId` | The ID of the group this transactional email belongs to. |
| `updatedAt` | ISO 8601 timestamp for when the transactional email was last updated. |
| `url` | The URL of the transactional email in the Loops app. |

Operations: create.

API path: `/v1/transactional-emails/{transactionalId}/draft`

#### TransactionalMetric

| Field | Description |
| --- | --- |
| `deliveries` | Number of sends delivered. |
| `hardBounces` | Number of sends that hard bounced. |
| `sends` | Number of sends. |
| `softBounces` | Number of sends that soft bounced. |
| `spamReports` | Number of sends reported as spam. |

Operations: load.

API path: `/v1/transactional-emails/{transactionalId}/metrics`

#### TransactionalResource

| Field | Description |
| --- | --- |
| `createdAt` | ISO 8601 timestamp for when the transactional email was created. |
| `dataVariables` | Data variable names used by the published email. |
| `draftEmailMessageId` | The ID of the draft email message. |
| `id` | The ID of the transactional email. |
| `name` | The name of the transactional email. |
| `publishedEmailMessageId` | The ID of the published email message. |
| `transactionalGroupId` | The ID of the group this transactional email belongs to. |
| `updatedAt` | ISO 8601 timestamp for when the transactional email was last updated. |
| `url` | The URL of the transactional email in the Loops app. |

Operations: create, list, load.

API path: `/v1/transactional-emails/{transactionalId}`

#### UpdateComponent

| Field | Description |
| --- | --- |
| `affectedEmailCount` | The number of emails using this component that were updated by the body change. |
| `id` | The ID of the component. |
| `lmx` | The component body serialized as LMX. |
| `name` | The name of the component. |

Operations: create.

API path: `/v1/components/{componentId}`

#### UpdateTheme

| Field | Description |
| --- | --- |
| `affectedEmailCount` | The number of emails using this theme that are affected by the style change. |
| `createdAt` | ISO 8601 timestamp for when the theme was created. |
| `id` | The ID of the theme. |
| `isDefault` | Whether this theme is the team's default. |
| `name` | The name of the theme. |
| `styles` | Flat map of style attributes, matching the attribute names accepted by the LMX `<Style />` tag. |
| `updatedAt` | ISO 8601 timestamp for when the theme was last updated. |

Operations: create.

API path: `/v1/themes/{themeId}`

#### UpdateWorkflowNode

| Field | Description |
| --- | --- |
| `description` | The description of the workflow. |
| `expectedRevisionId` | The workflow revision token returned by the latest workflow read or mutation. |
| `id` | The ID of the workflow. |
| `mailingListId` | The ID of the mailing list the workflow sends to. |
| `name` | The name of the workflow. |
| `nodes` | A map of node IDs to simplified node objects. |
| `payload` | Node-type-specific fields to update. |
| `rootNodeId` | The ID of the root node in the workflow graph. |
| `status` |  |
| `url` | The URL of the workflow in the Loops app. |
| `workflowRevisionId` | The current workflow revision token. |

Operations: create.

API path: `/v1/workflows/{workflowId}/nodes/{nodeId}`

#### Workflow

| Field | Description |
| --- | --- |
| `id` |  |

Operations: remove.

API path: `/v1/workflows/{workflowId}`

#### WorkflowNode

| Field | Description |
| --- | --- |
| `id` |  |

Operations: remove.

API path: `/v1/workflows/{workflowId}/nodes/{nodeId}`

#### WorkflowNodeWithRevision

| Field | Description |
| --- | --- |
| `workflowRevisionId` | The current workflow revision token. |

Operations: create, load.

API path: `/v1/workflows/{workflowId}/nodes/{nodeId}/add-branch`



## Entities


### ApiKey

Create an instance: `const api_key = client.ApiKey()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `success` | `boolean` |  |
| `teamName` | `string` | The name of the team the API key belongs to. |

#### Example: Load

```ts
const api_key = await client.ApiKey().load()
```


### AudienceSegment

Create an instance: `const audience_segment = client.AudienceSegment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | ISO 8601 timestamp for when the audience segment was created. |
| `description` | `string | null` | An optional description of the audience segment. |
| `filter` | `Record<string, any> | null` | A tree of audience conditions combined with `match`. |
| `id` | `string` | The ID of the audience segment. |
| `name` | `string` | The name of the audience segment. |
| `updatedAt` | `string` | ISO 8601 timestamp for when the audience segment was last updated. |

#### Example: Load

```ts
const audience_segment = await client.AudienceSegment().load({ id: 'audience_segment_id' })
```

#### Example: List

```ts
const audience_segments = await client.AudienceSegment().list()
```

#### Example: Create

```ts
const audience_segment = await client.AudienceSegment().create({
  createdAt: 'example_createdAt',
  description: 'example_description',
  filter: {},
  id: 'example_id',
  name: 'example_name',
  updatedAt: 'example_updatedAt',
})
```


### Campaign

Create an instance: `const campaign = client.Campaign()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `audienceFilter` | `Record<string, any> | null` | The filter rules that define the audience for this campaign, if set. |
| `audienceSegmentId` | `string | null` | The ID of the audience segment this campaign targets, if set. |
| `campaignGroupId` | `string | null` | The ID of the campaign group this campaign belongs to. |
| `createdAt` | `string` | ISO 8601 timestamp for when the campaign was created. |
| `emailMessageId` | `string | null` | The associated email message ID. |
| `id` | `string` | The ID of the campaign. |
| `mailingListId` | `string | null` | The ID of the mailing list this campaign sends to, if set. |
| `name` | `string` | The name of the campaign. |
| `scheduling` | `Record<string, any>` | When the campaign is scheduled to send. |
| `status` | `string` | The status of the campaign. |
| `updatedAt` | `string` | ISO 8601 timestamp for when the campaign was last updated. |
| `url` | `string` | The URL of the campaign in the Loops app. |

#### Example: Load

```ts
const campaign = await client.Campaign().load({ id: 'campaign_id' })
```

#### Example: List

```ts
const campaigns = await client.Campaign().list()
```

#### Example: Create

```ts
const campaign = await client.Campaign().create({
  id: 'example_id',
  audienceFilter: {},
  audienceSegmentId: 'example_audienceSegmentId',
  campaignGroupId: 'example_campaignGroupId',
  createdAt: 'example_createdAt',
  emailMessageId: 'example_emailMessageId',
  mailingListId: 'example_mailingListId',
  name: 'example_name',
  scheduling: {},
  status: 'example_status',
  updatedAt: 'example_updatedAt',
  url: 'example_url',
})
```


### ChangeWorkflowMailingList

Create an instance: `const change_workflow_mailing_list = client.ChangeWorkflowMailingList()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dryRun` | `boolean` | If `true`, the request will be validated but the workflow will not be modified. |
| `expectedRevisionId` | `string | null` | The workflow revision token returned by the latest workflow read or mutation. |
| `mailingListId` | `string | null` | The mailing list to use for the workflow. |
| `queuedContactPolicy` | `string` | `fail` returns queued-contact impact instead of mutating. |

#### Example: Create

```ts
const change_workflow_mailing_list = await client.ChangeWorkflowMailingList().create({
  workflow_id: 'example_workflow_id',
  expectedRevisionId: 'example_expectedRevisionId',
  mailingListId: 'example_mailingListId',
})
```


### Complete

Create an instance: `const complete = client.Complete()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `emailAssetId` | `string` | The ID of the created asset. |
| `finalUrl` | `string` | The public URL of the uploaded asset. |

#### Example: Create

```ts
const complete = await client.Complete().create({
  upload_id: 'example_upload_id',
  emailAssetId: 'example_emailAssetId',
  finalUrl: 'example_finalUrl',
})
```


### Component

Create an instance: `const component = client.Component()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | The ID of the component. |
| `lmx` | `string` | The component body serialized as LMX. |
| `name` | `string` | The name of the component. |

#### Example: Load

```ts
const component = await client.Component().load({ id: 'component_id' })
```

#### Example: List

```ts
const components = await client.Component().list()
```

#### Example: Create

```ts
const component = await client.Component().create({
  id: 'example_id',
  lmx: 'example_lmx',
  name: 'example_name',
})
```


### Configuration

Create an instance: `const configuration = client.Configuration()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const configurations = await client.Configuration().list()
```


### Contact

Create an instance: `const contact = client.Contact()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | The contact's email address. |
| `firstName` | `string | null` | The contact's first name. |
| `id` | `string` | The contact's Loops ID. |
| `lastName` | `string | null` | The contact's last name. |
| `mailingLists` | `Record<string, any>` | Mailing lists the contact is subscribed to, represented by key-value pairs of mailing list IDs and `true`. |
| `optInStatus` | `string | null` | Double opt-in status. |
| `source` | `string` | The source the contact was created from. |
| `subscribed` | `boolean` | Whether the contact will receive campaign and workflow emails. |
| `userGroup` | `string` | The contact's user group. |
| `userId` | `string | null` | The contact's unique user ID. |

#### Example: List

```ts
const contacts = await client.Contact().list()
```


### ContactDelete

Create an instance: `const contact_delete = client.ContactDelete()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | The contact's email address. |
| `message` | `string` |  |
| `success` | `boolean` |  |
| `userId` | `string` | The contact's unique user ID. |

#### Example: Create

```ts
const contact_delete = await client.ContactDelete().create({
  message: 'example_message',
  success: true,
})
```


### ContactProperty

Create an instance: `const contact_property = client.ContactProperty()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `key` | `string` | The key of the contact property. |
| `label` | `string` | The human-friendly label for this property. |
| `type` | `string` | The type of property. |

#### Example: List

```ts
const contact_propertys = await client.ContactProperty().list()
```


### ContactPropertySuccess

Create an instance: `const contact_property_success = client.ContactPropertySuccess()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | The name of the property. |
| `success` | `boolean` |  |
| `type` | `string` | The type of property. |

#### Example: Create

```ts
const contact_property_success = await client.ContactPropertySuccess().create({
  name: 'example_name',
  success: true,
  type: 'example_type',
})
```


### ContactSuccess

Create an instance: `const contact_success = client.ContactSuccess()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | The contact's email address. |
| `firstName` | `string` | The contact's first name. |
| `id` | `string` |  |
| `lastName` | `string` | The contact's last name. |
| `mailingLists` | `Record<string, any>` | Manage mailing list subscriptions. |
| `source` | `string` | A custom source value to replace the default “API”. |
| `subscribed` | `boolean` | Whether the contact will receive campaign and workflow emails. |
| `success` | `boolean` |  |
| `userGroup` | `string` | The contact's user group. |
| `userId` | `string` | A unique user ID (for example, from an external application). |

#### Example: Create

```ts
const contact_success = await client.ContactSuccess().create({
  email: 'example_email',
  id: 'example_id',
  success: true,
})
```


### ContactSuppressionRemove

Create an instance: `const contact_suppression_remove = client.ContactSuppressionRemove()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### ContactSuppressionStatus

Create an instance: `const contact_suppression_status = client.ContactSuppressionStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contact` | `Record<string, any>` |  |
| `isSuppressed` | `boolean` | Whether the contact is suppressed. |
| `removalQuota` | `Record<string, any>` | The removal quota for the contact. |

#### Example: Load

```ts
const contact_suppression_status = await client.ContactSuppressionStatus().load()
```


### CreateUpload

Create an instance: `const create_upload = client.CreateUpload()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contentLength` | `number` | The size of the file in bytes. |
| `contentType` | `string` | The MIME type of the file to upload. |
| `emailAssetId` | `string` | The ID of the created asset. |
| `presignedUrl` | `string` | The pre-signed URL to upload the file to with an HTTP `PUT` request. |

#### Example: Create

```ts
const create_upload = await client.CreateUpload().create({
  contentLength: 1,
  contentType: 'example_contentType',
  emailAssetId: 'example_emailAssetId',
  presignedUrl: 'example_presignedUrl',
})
```


### CreateWorkflowNode

Create an instance: `const create_workflow_node = client.CreateWorkflowNode()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `node` | `any` |  |
| `workflow` | `Record<string, any>` |  |

#### Example: Create

```ts
const create_workflow_node = await client.CreateWorkflowNode().create({
  workflow_id: 'example_workflow_id',
  node: 'example_node',
  workflow: {},
})
```


### EmailMessage

Create an instance: `const email_message = client.EmailMessage()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bccEmail` | `string` | The email BCC address. |
| `campaignId` | `string` | The campaign this email message belongs to. |
| `ccEmail` | `string` | The email CC address. |
| `contactPropertiesFallbacks` | `Record<string, any>` | Fallback values for contact properties. |
| `contentRevisionId` | `string | null` | The current content revision. |
| `dataVariablesFallbacks` | `Record<string, any>` | Fallback values for data variables. |
| `emailFormat` | `string` | The rendering format of the email. |
| `eventPropertiesFallbacks` | `Record<string, any>` | Fallback values for event properties. |
| `expectedRevisionId` | `string` | The `contentRevisionId` you last fetched, or the `emailMessageContentRevisionId` you received when creating the campaign. |
| `fromEmail` | `string` | The email sender email address, without the team's sending domain. |
| `fromName` | `string` | The email sender name. |
| `id` | `string` | The ID of the email message. |
| `languageCode` | `string` | ISO 639-1 language code for the email, e.g. |
| `lmx` | `string` | The email body serialized as LMX. |
| `previewText` | `string` | The email preview text. |
| `replyToEmail` | `string` | The email reply-to address. |
| `subject` | `string` | The email subject. |
| `transactionalId` | `string` | The transactional email this email message belongs to. |
| `updatedAt` | `string` |  |
| `warnings` | `any[]` | Non-fatal issues raised while compiling the submitted LMX. |

#### Example: Load

```ts
const email_message = await client.EmailMessage().load({ id: 'email_message_id' })
```

#### Example: Create

```ts
const email_message = await client.EmailMessage().create({
  id: 'example_id',
  contentRevisionId: 'example_contentRevisionId',
  emailFormat: 'example_emailFormat',
  fromEmail: 'example_fromEmail',
  fromName: 'example_fromName',
  lmx: 'example_lmx',
  previewText: 'example_previewText',
  replyToEmail: 'example_replyToEmail',
  subject: 'example_subject',
  updatedAt: 'example_updatedAt',
})
```


### EmailMessageGuardian

Create an instance: `const email_message_guardian = client.EmailMessageGuardian()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `errors` | `any[]` | Validation errors. |
| `id` | `string` |  |
| `warnings` | `any[]` | Validation warnings. |

#### Example: List

```ts
const email_message_guardians = await client.EmailMessageGuardian().list({ id: "example" })
```


### EmailMessagePreview

Create an instance: `const email_message_preview = client.EmailMessagePreview()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `contactProperties` | `Record<string, any>` | Contact property values to render. |
| `dataVariables` | `Record<string, any>` | Transactional data variables to render. |
| `emails` | `any[]` | One or more addresses to send the preview to. |
| `eventProperties` | `Record<string, any>` | Event property values to render. |
| `id` | `string` | The ID of the email message the preview was sent for. |

#### Example: Create

```ts
const email_message_preview = await client.EmailMessagePreview().create({
  id: 'example_id',
  emails: [],
})
```


### EmailMetric

Create an instance: `const email_metric = client.EmailMetric()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clicks` | `number` | Number of sends where at least one link was clicked. |
| `hardBounces` | `number` | Number of sends that hard bounced. |
| `opens` | `number` | Number of sends that were opened at least once. |
| `sends` | `number` | Number of sends. |
| `softBounces` | `number` | Number of sends that soft bounced. |
| `spamReports` | `number` | Number of sends reported as spam. |
| `unsubscribes` | `number` | Number of unsubscribes. |

#### Example: Load

```ts
const email_metric = await client.EmailMetric().load({ campaign_id: 'campaign_id' })
```


### EventPattern

Create an instance: `const event_pattern = client.EventPattern()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `eventName` | `string` | The name of the event pattern. |
| `eventProperties` | `any[]` | The properties of the event pattern, which can be used in emails. |
| `id` | `string` | The ID of the event pattern. |
| `incomingWebhookPlatform` | `string | null` | The platform that sent this event pattern, if the event pattern is from an incoming webhook. |

#### Example: Load

```ts
const event_pattern = await client.EventPattern().load({ id: 'event_pattern_id' })
```

#### Example: List

```ts
const event_patterns = await client.EventPattern().list()
```


### EventSuccess

Create an instance: `const event_success = client.EventSuccess()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | The contact's email address. |
| `eventName` | `string` | The name of the event. |
| `eventProperties` | `Record<string, any>` | An object containing event property data for the event, available in emails sent by the event. |
| `mailingLists` | `Record<string, any>` | Manage mailing list subscriptions. |
| `success` | `boolean` |  |
| `userId` | `string` | The contact's unique user ID. |

#### Example: Create

```ts
const event_success = await client.EventSuccess().create({
  eventName: 'example_eventName',
  success: true,
})
```


### Group

Create an instance: `const group = client.Group()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | ISO 8601 timestamp for when the group was created. |
| `description` | `string` | The description of the group. |
| `id` | `string` | The ID of the group. |
| `name` | `string` | The name of the group. |
| `updatedAt` | `string` | ISO 8601 timestamp for when the group was last updated. |

#### Example: Load

```ts
const group = await client.Group().load({ campaign_group_id: 'campaign_group_id' })
```

#### Example: List

```ts
const groups = await client.Group().list()
```

#### Example: Create

```ts
const group = await client.Group().create({
  campaign_group_id: 'example_campaign_group_id',
  createdAt: 'example_createdAt',
  description: 'example_description',
  id: 'example_id',
  name: 'example_name',
  updatedAt: 'example_updatedAt',
})
```


### MailingList

Create an instance: `const mailing_list = client.MailingList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string | null` | The description of the mailing list. |
| `id` | `string` | The ID of the mailing list. |
| `isPublic` | `boolean` | Whether the mailing list is public (`true`) or private (`false`). |
| `name` | `string` | The name of the mailing list. |

#### Example: List

```ts
const mailing_lists = await client.MailingList().list()
```


### SimplifiedWorkflow

Create an instance: `const simplified_workflow = client.SimplifiedWorkflow()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | ISO 8601 timestamp for when the workflow was created. |
| `description` | `string` | The description of the workflow. |
| `expectedRevisionId` | `string | null` | The workflow revision token returned by the latest workflow read or mutation. |
| `id` | `string` | The ID of the workflow. |
| `mailingListId` | `string | null` | The ID of the mailing list the workflow sends to. |
| `name` | `string` | The name of the workflow. |
| `nodes` | `Record<string, any>` | A map of node IDs to simplified node objects. |
| `rootNodeId` | `string` | The ID of the root node in the workflow graph. |
| `status` | `string` |  |
| `updatedAt` | `string` | ISO 8601 timestamp for when the workflow was last updated. |
| `url` | `string` | The URL of the workflow in the Loops app. |
| `workflowRevisionId` | `string | null` | The current workflow revision token. |

#### Example: Load

```ts
const simplified_workflow = await client.SimplifiedWorkflow().load({ id: 'simplified_workflow_id' })
```

#### Example: List

```ts
const simplified_workflows = await client.SimplifiedWorkflow().list()
```

#### Example: Create

```ts
const simplified_workflow = await client.SimplifiedWorkflow().create({
  id: 'example_id',
  createdAt: 'example_createdAt',
  expectedRevisionId: 'example_expectedRevisionId',
  mailingListId: 'example_mailingListId',
  nodes: {},
  rootNodeId: 'example_rootNodeId',
  status: 'example_status',
  updatedAt: 'example_updatedAt',
  url: 'example_url',
  workflowRevisionId: 'example_workflowRevisionId',
})
```


### Theme

Create an instance: `const theme = client.Theme()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | ISO 8601 timestamp for when the theme was created. |
| `id` | `string` | The ID of the theme. |
| `isDefault` | `boolean` | Whether this theme is the team's default. |
| `name` | `string` | The name of the theme. |
| `styles` | `Record<string, any>` | Flat map of style attributes, matching the attribute names accepted by the LMX `<Style />` tag. |
| `updatedAt` | `string` | ISO 8601 timestamp for when the theme was last updated. |

#### Example: Load

```ts
const theme = await client.Theme().load({ id: 'theme_id' })
```

#### Example: List

```ts
const themes = await client.Theme().list()
```

#### Example: Create

```ts
const theme = await client.Theme().create({
  createdAt: 'example_createdAt',
  id: 'example_id',
  isDefault: true,
  name: 'example_name',
  styles: {},
  updatedAt: 'example_updatedAt',
})
```


### Transactional

Create an instance: `const transactional = client.Transactional()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addToAudience` | `boolean` | If `true`, a contact will be created in your audience using the `email` value (if a matching contact doesn't already exist). |
| `attachments` | `any[]` | A list containing file objects to be sent along with an email message. |
| `dataVariables` | `Record<string, any>` | An object containing data as defined by the data variables added to the transactional email template. |
| `email` | `string` | The recipient's email address. |
| `id` | `string` | The ID of the transactional email. |
| `lastUpdated` | `string` | The date and time the transactional email was last updated in ISO 8601 format. |
| `name` | `string` | The name of the transactional email. |
| `success` | `boolean` |  |
| `transactionalId` | `string` | The ID of the transactional email to send. |

#### Example: List

```ts
const transactionals = await client.Transactional().list()
```

#### Example: Create

```ts
const transactional = await client.Transactional().create({
  email: 'example_email',
  id: 'example_id',
  lastUpdated: 'example_lastUpdated',
  name: 'example_name',
  success: true,
  transactionalId: 'example_transactionalId',
})
```


### TransactionalDraft

Create an instance: `const transactional_draft = client.TransactionalDraft()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | ISO 8601 timestamp for when the transactional email was created. |
| `dataVariables` | `any[]` | Data variable names used by the published email. |
| `draftEmailMessageContentRevisionId` | `string | null` | The `contentRevisionId` of the draft email message. |
| `draftEmailMessageId` | `string | null` | The ID of the draft email message. |
| `id` | `string` | The ID of the transactional email. |
| `name` | `string` | The name of the transactional email. |
| `publishedEmailMessageId` | `string | null` | The ID of the published email message. |
| `transactionalGroupId` | `string | null` | The ID of the group this transactional email belongs to. |
| `updatedAt` | `string` | ISO 8601 timestamp for when the transactional email was last updated. |
| `url` | `string` | The URL of the transactional email in the Loops app. |

#### Example: Create

```ts
const transactional_draft = await client.TransactionalDraft().create({
  transactional_email_id: 'example_transactional_email_id',
  createdAt: 'example_createdAt',
  dataVariables: [],
  draftEmailMessageContentRevisionId: 'example_draftEmailMessageContentRevisionId',
  draftEmailMessageId: 'example_draftEmailMessageId',
  id: 'example_id',
  name: 'example_name',
  publishedEmailMessageId: 'example_publishedEmailMessageId',
  updatedAt: 'example_updatedAt',
  url: 'example_url',
})
```


### TransactionalMetric

Create an instance: `const transactional_metric = client.TransactionalMetric()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deliveries` | `number` | Number of sends delivered. |
| `hardBounces` | `number` | Number of sends that hard bounced. |
| `sends` | `number` | Number of sends. |
| `softBounces` | `number` | Number of sends that soft bounced. |
| `spamReports` | `number` | Number of sends reported as spam. |

#### Example: Load

```ts
const transactional_metric = await client.TransactionalMetric().load({ transactional_email_id: 'transactional_email_id' })
```


### TransactionalResource

Create an instance: `const transactional_resource = client.TransactionalResource()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | ISO 8601 timestamp for when the transactional email was created. |
| `dataVariables` | `any[]` | Data variable names used by the published email. |
| `draftEmailMessageId` | `string | null` | The ID of the draft email message. |
| `id` | `string` | The ID of the transactional email. |
| `name` | `string` | The name of the transactional email. |
| `publishedEmailMessageId` | `string | null` | The ID of the published email message. |
| `transactionalGroupId` | `string | null` | The ID of the group this transactional email belongs to. |
| `updatedAt` | `string` | ISO 8601 timestamp for when the transactional email was last updated. |
| `url` | `string` | The URL of the transactional email in the Loops app. |

#### Example: Load

```ts
const transactional_resource = await client.TransactionalResource().load({ transactional_id: 'transactional_id' })
```

#### Example: List

```ts
const transactional_resources = await client.TransactionalResource().list()
```

#### Example: Create

```ts
const transactional_resource = await client.TransactionalResource().create({
  transactional_id: 'example_transactional_id',
  createdAt: 'example_createdAt',
  dataVariables: [],
  draftEmailMessageId: 'example_draftEmailMessageId',
  id: 'example_id',
  name: 'example_name',
  publishedEmailMessageId: 'example_publishedEmailMessageId',
  transactionalGroupId: 'example_transactionalGroupId',
  updatedAt: 'example_updatedAt',
  url: 'example_url',
})
```


### UpdateComponent

Create an instance: `const update_component = client.UpdateComponent()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affectedEmailCount` | `number` | The number of emails using this component that were updated by the body change. |
| `id` | `string` | The ID of the component. |
| `lmx` | `string` | The component body serialized as LMX. |
| `name` | `string` | The name of the component. |

#### Example: Create

```ts
const update_component = await client.UpdateComponent().create({
  id: 'example_id',
  affectedEmailCount: 1,
  lmx: 'example_lmx',
  name: 'example_name',
})
```


### UpdateTheme

Create an instance: `const update_theme = client.UpdateTheme()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affectedEmailCount` | `number` | The number of emails using this theme that are affected by the style change. |
| `createdAt` | `string` | ISO 8601 timestamp for when the theme was created. |
| `id` | `string` | The ID of the theme. |
| `isDefault` | `boolean` | Whether this theme is the team's default. |
| `name` | `string` | The name of the theme. |
| `styles` | `Record<string, any>` | Flat map of style attributes, matching the attribute names accepted by the LMX `<Style />` tag. |
| `updatedAt` | `string` | ISO 8601 timestamp for when the theme was last updated. |

#### Example: Create

```ts
const update_theme = await client.UpdateTheme().create({
  id: 'example_id',
  affectedEmailCount: 1,
  createdAt: 'example_createdAt',
  isDefault: true,
  name: 'example_name',
  styles: {},
  updatedAt: 'example_updatedAt',
})
```


### UpdateWorkflowNode

Create an instance: `const update_workflow_node = client.UpdateWorkflowNode()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | The description of the workflow. |
| `expectedRevisionId` | `string | null` | The workflow revision token returned by the latest workflow read or mutation. |
| `id` | `string` | The ID of the workflow. |
| `mailingListId` | `string | null` | The ID of the mailing list the workflow sends to. |
| `name` | `string` | The name of the workflow. |
| `nodes` | `Record<string, any>` | A map of node IDs to simplified node objects. |
| `payload` | `any` | Node-type-specific fields to update. |
| `rootNodeId` | `string` | The ID of the root node in the workflow graph. |
| `status` | `string` |  |
| `url` | `string` | The URL of the workflow in the Loops app. |
| `workflowRevisionId` | `string | null` | The current workflow revision token. |

#### Example: Create

```ts
const update_workflow_node = await client.UpdateWorkflowNode().create({
  id: 'example_id',
  workflow_id: 'example_workflow_id',
  expectedRevisionId: 'example_expectedRevisionId',
  mailingListId: 'example_mailingListId',
  nodes: {},
  payload: 'example_payload',
  rootNodeId: 'example_rootNodeId',
  status: 'example_status',
  url: 'example_url',
  workflowRevisionId: 'example_workflowRevisionId',
})
```


### Workflow

Create an instance: `const workflow = client.Workflow()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### WorkflowNode

Create an instance: `const workflow_node = client.WorkflowNode()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### WorkflowNodeWithRevision

Create an instance: `const workflow_node_with_revision = client.WorkflowNodeWithRevision()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `workflowRevisionId` | `string | null` | The current workflow revision token. |

#### Example: Load

```ts
const workflow_node_with_revision = await client.WorkflowNodeWithRevision().load({ node_id: 'node_id', workflow_id: 'workflow_id' })
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Open types

7 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `update_workflow_node` | `payload` | 8 | 11 levels |
| `audience_segment` | `filter` | 3 | 7 levels |
| `campaign` | `audienceFilter` | 3 | 7 levels |
| `create_workflow_node` | `node` | 3 | 15 levels |
| `create_workflow_node` | `workflow` | 3 | 13 levels |
| `simplified_workflow` | `nodes` | 3 | 11 levels |
| `update_workflow_node` | `nodes` | 3 | 11 levels |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
loops/
├── src/
│   ├── LoopsSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { LoopsSDK } from '@voxgig-sdk/loops-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const eventpattern = client.EventPattern()
await eventpattern.list()

// eventpattern.data() now returns the eventpattern data from the last `list`
// eventpattern.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
