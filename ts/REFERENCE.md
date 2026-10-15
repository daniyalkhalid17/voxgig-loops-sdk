# Loops TypeScript SDK Reference

Complete API reference for the Loops TypeScript SDK.


## LoopsSDK

### Constructor

```ts
new LoopsSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LoopsSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = LoopsSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `LoopsSDK` instance in test mode.


### Instance Methods

#### `ApiKey(data?: object)`

Create a new `ApiKey` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiKeyEntity` instance.

#### `AudienceSegment(data?: object)`

Create a new `AudienceSegment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AudienceSegmentEntity` instance.

#### `Campaign(data?: object)`

Create a new `Campaign` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CampaignEntity` instance.

#### `ChangeWorkflowMailingList(data?: object)`

Create a new `ChangeWorkflowMailingList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ChangeWorkflowMailingListEntity` instance.

#### `Complete(data?: object)`

Create a new `Complete` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CompleteEntity` instance.

#### `Component(data?: object)`

Create a new `Component` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ComponentEntity` instance.

#### `Configuration(data?: object)`

Create a new `Configuration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConfigurationEntity` instance.

#### `Contact(data?: object)`

Create a new `Contact` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContactEntity` instance.

#### `ContactDelete(data?: object)`

Create a new `ContactDelete` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContactDeleteEntity` instance.

#### `ContactProperty(data?: object)`

Create a new `ContactProperty` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContactPropertyEntity` instance.

#### `ContactPropertySuccess(data?: object)`

Create a new `ContactPropertySuccess` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContactPropertySuccessEntity` instance.

#### `ContactSuccess(data?: object)`

Create a new `ContactSuccess` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContactSuccessEntity` instance.

#### `ContactSuppressionRemove(data?: object)`

Create a new `ContactSuppressionRemove` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContactSuppressionRemoveEntity` instance.

#### `ContactSuppressionStatus(data?: object)`

Create a new `ContactSuppressionStatus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ContactSuppressionStatusEntity` instance.

#### `CreateUpload(data?: object)`

Create a new `CreateUpload` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreateUploadEntity` instance.

#### `CreateWorkflowNode(data?: object)`

Create a new `CreateWorkflowNode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreateWorkflowNodeEntity` instance.

#### `EmailMessage(data?: object)`

Create a new `EmailMessage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailMessageEntity` instance.

#### `EmailMessageGuardian(data?: object)`

Create a new `EmailMessageGuardian` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailMessageGuardianEntity` instance.

#### `EmailMessagePreview(data?: object)`

Create a new `EmailMessagePreview` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailMessagePreviewEntity` instance.

#### `EmailMetric(data?: object)`

Create a new `EmailMetric` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailMetricEntity` instance.

#### `EventPattern(data?: object)`

Create a new `EventPattern` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventPatternEntity` instance.

#### `EventSuccess(data?: object)`

Create a new `EventSuccess` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventSuccessEntity` instance.

#### `Group(data?: object)`

Create a new `Group` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GroupEntity` instance.

#### `MailingList(data?: object)`

Create a new `MailingList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MailingListEntity` instance.

#### `SimplifiedWorkflow(data?: object)`

Create a new `SimplifiedWorkflow` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SimplifiedWorkflowEntity` instance.

#### `Theme(data?: object)`

Create a new `Theme` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ThemeEntity` instance.

#### `Transactional(data?: object)`

Create a new `Transactional` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TransactionalEntity` instance.

#### `TransactionalDraft(data?: object)`

Create a new `TransactionalDraft` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TransactionalDraftEntity` instance.

#### `TransactionalMetric(data?: object)`

Create a new `TransactionalMetric` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TransactionalMetricEntity` instance.

#### `TransactionalResource(data?: object)`

Create a new `TransactionalResource` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TransactionalResourceEntity` instance.

#### `UpdateComponent(data?: object)`

Create a new `UpdateComponent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UpdateComponentEntity` instance.

#### `UpdateTheme(data?: object)`

Create a new `UpdateTheme` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UpdateThemeEntity` instance.

#### `UpdateWorkflowNode(data?: object)`

Create a new `UpdateWorkflowNode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UpdateWorkflowNodeEntity` instance.

#### `Workflow(data?: object)`

Create a new `Workflow` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WorkflowEntity` instance.

#### `WorkflowNode(data?: object)`

Create a new `WorkflowNode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WorkflowNodeEntity` instance.

#### `WorkflowNodeWithRevision(data?: object)`

Create a new `WorkflowNodeWithRevision` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WorkflowNodeWithRevisionEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `LoopsSDK.test()`.

**Returns:** `LoopsSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## ApiKeyEntity

```ts
const api_key = client.ApiKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `success` | `boolean` | Yes |  |
| `teamName` | `string` | Yes | The name of the team the API key belongs to. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ApiKey().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiKeyEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AudienceSegmentEntity

```ts
const audience_segment = client.AudienceSegment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes | ISO 8601 timestamp for when the audience segment was created. |
| `description` | `string | null` | Yes | An optional description of the audience segment. |
| `filter` | `Record<string, any> | null` | Yes | A tree of audience conditions combined with `match`. |
| `id` | `string` | Yes | The ID of the audience segment. |
| `name` | `string` | Yes | The name of the audience segment. |
| `updatedAt` | `string` | Yes | ISO 8601 timestamp for when the audience segment was last updated. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `createdAt` | - | - | - |
| `description` | - | - | Yes |
| `filter` | - | - | - |
| `id` | - | - | - |
| `name` | - | - | - |
| `updatedAt` | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AudienceSegment().create({
  createdAt: 'example_createdAt',
  description: 'example_description',
  filter: {},
  id: 'example_id',
  name: 'example_name',
  updatedAt: 'example_updatedAt',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AudienceSegment().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.AudienceSegment().load({ id: 'audience_segment_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AudienceSegmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CampaignEntity

```ts
const campaign = client.Campaign()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `audienceFilter` | `Record<string, any> | null` | Yes | The filter rules that define the audience for this campaign, if set. |
| `audienceSegmentId` | `string | null` | Yes | The ID of the audience segment this campaign targets, if set. |
| `campaignGroupId` | `string | null` | Yes | The ID of the campaign group this campaign belongs to. |
| `createdAt` | `string` | Yes | ISO 8601 timestamp for when the campaign was created. |
| `emailMessageId` | `string | null` | Yes | The associated email message ID. |
| `id` | `string` | Yes | The ID of the campaign. |
| `mailingListId` | `string | null` | Yes | The ID of the mailing list this campaign sends to, if set. |
| `name` | `string` | Yes | The name of the campaign. |
| `scheduling` | `Record<string, any>` | Yes | When the campaign is scheduled to send. |
| `status` | `string` | Yes | The status of the campaign. |
| `updatedAt` | `string` | Yes | ISO 8601 timestamp for when the campaign was last updated. |
| `url` | `string` | Yes | The URL of the campaign in the Loops app. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `audienceFilter` | - | - | - |
| `audienceSegmentId` | - | - | Yes |
| `campaignGroupId` | - | - | Yes |
| `createdAt` | - | - | - |
| `emailMessageId` | - | - | - |
| `id` | - | - | - |
| `mailingListId` | - | - | Yes |
| `name` | - | - | Yes |
| `scheduling` | - | - | - |
| `status` | - | - | - |
| `updatedAt` | - | - | - |
| `url` | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Campaign().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Campaign().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Campaign().load({ id: 'campaign_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CampaignEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ChangeWorkflowMailingListEntity

```ts
const change_workflow_mailing_list = client.ChangeWorkflowMailingList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dryRun` | `boolean` | No | If `true`, the request will be validated but the workflow will not be modified. |
| `expectedRevisionId` | `string | null` | Yes | The workflow revision token returned by the latest workflow read or mutation. |
| `mailingListId` | `string | null` | Yes | The mailing list to use for the workflow. |
| `queuedContactPolicy` | `string` | No | `fail` returns queued-contact impact instead of mutating. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ChangeWorkflowMailingList().create({
  workflow_id: 'example_workflow_id',
  expectedRevisionId: 'example_expectedRevisionId',
  mailingListId: 'example_mailingListId',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ChangeWorkflowMailingListEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CompleteEntity

```ts
const complete = client.Complete()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `emailAssetId` | `string` | Yes | The ID of the created asset. |
| `finalUrl` | `string` | Yes | The public URL of the uploaded asset. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Complete().create({
  upload_id: 'example_upload_id',
  emailAssetId: 'example_emailAssetId',
  finalUrl: 'example_finalUrl',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CompleteEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ComponentEntity

```ts
const component = client.Component()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes | The ID of the component. |
| `lmx` | `string` | Yes | The component body serialized as LMX. |
| `name` | `string` | Yes | The name of the component. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Component().create({
  id: 'example_id',
  lmx: 'example_lmx',
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Component().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Component().load({ id: 'component_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ComponentEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConfigurationEntity

```ts
const configuration = client.Configuration()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Configuration().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConfigurationEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ContactEntity

```ts
const contact = client.Contact()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | No | The contact's email address. |
| `firstName` | `string | null` | No | The contact's first name. |
| `id` | `string` | No | The contact's Loops ID. |
| `lastName` | `string | null` | No | The contact's last name. |
| `mailingLists` | `Record<string, any>` | No | Mailing lists the contact is subscribed to, represented by key-value pairs of mailing list IDs and `true`. |
| `optInStatus` | `string | null` | No | Double opt-in status. |
| `source` | `string` | No | The source the contact was created from. |
| `subscribed` | `boolean` | No | Whether the contact will receive campaign and workflow emails. |
| `userGroup` | `string` | No | The contact's user group. |
| `userId` | `string | null` | No | The contact's unique user ID. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `find` | `/v1/contacts/find` | `client.Contact().list({ $action: 'find', ... })` |

An action returns that action's OWN response, which is not necessarily a
Contact record — check the API definition for its shape.

```ts
const result = await client.Contact().list({
  $action: 'find',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Contact().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContactEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ContactDeleteEntity

```ts
const contact_delete = client.ContactDelete()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | No | The contact's email address. |
| `message` | `string` | Yes |  |
| `success` | `boolean` | Yes |  |
| `userId` | `string` | No | The contact's unique user ID. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ContactDelete().create({
  message: 'example_message',
  success: true,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContactDeleteEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ContactPropertyEntity

```ts
const contact_property = client.ContactProperty()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | `string` | Yes | The key of the contact property. |
| `label` | `string` | Yes | The human-friendly label for this property. |
| `type` | `string` | Yes | The type of property. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ContactProperty().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContactPropertyEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ContactPropertySuccessEntity

```ts
const contact_property_success = client.ContactPropertySuccess()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | The name of the property. |
| `success` | `boolean` | Yes |  |
| `type` | `string` | Yes | The type of property. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ContactPropertySuccess().create({
  name: 'example_name',
  success: true,
  type: 'example_type',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContactPropertySuccessEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ContactSuccessEntity

```ts
const contact_success = client.ContactSuccess()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes | The contact's email address. |
| `firstName` | `string` | No | The contact's first name. |
| `id` | `string` | Yes |  |
| `lastName` | `string` | No | The contact's last name. |
| `mailingLists` | `Record<string, any>` | No | Manage mailing list subscriptions. |
| `source` | `string` | No | A custom source value to replace the default “API”. |
| `subscribed` | `boolean` | No | Whether the contact will receive campaign and workflow emails. |
| `success` | `boolean` | Yes |  |
| `userGroup` | `string` | No | The contact's user group. |
| `userId` | `string` | No | A unique user ID (for example, from an external application). |

### Field Usage by Operation

| Field | create | update |
| --- | --- | --- |
| `email` | - | Yes |
| `firstName` | - | - |
| `id` | - | - |
| `lastName` | - | - |
| `mailingLists` | - | - |
| `source` | - | - |
| `subscribed` | - | - |
| `success` | - | - |
| `userGroup` | - | - |
| `userId` | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ContactSuccess().create({
  email: 'example_email',
  id: 'example_id',
  success: true,
})
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.ContactSuccess().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContactSuccessEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ContactSuppressionRemoveEntity

```ts
const contact_suppression_remove = client.ContactSuppressionRemove()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.ContactSuppressionRemove().remove()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContactSuppressionRemoveEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ContactSuppressionStatusEntity

```ts
const contact_suppression_status = client.ContactSuppressionStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contact` | `Record<string, any>` | Yes |  |
| `isSuppressed` | `boolean` | Yes | Whether the contact is suppressed. |
| `removalQuota` | `Record<string, any>` | Yes | The removal quota for the contact. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ContactSuppressionStatus().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ContactSuppressionStatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreateUploadEntity

```ts
const create_upload = client.CreateUpload()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contentLength` | `number` | Yes | The size of the file in bytes. |
| `contentType` | `string` | Yes | The MIME type of the file to upload. |
| `emailAssetId` | `string` | Yes | The ID of the created asset. |
| `presignedUrl` | `string` | Yes | The pre-signed URL to upload the file to with an HTTP `PUT` request. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CreateUpload().create({
  contentLength: 1,
  contentType: 'example_contentType',
  emailAssetId: 'example_emailAssetId',
  presignedUrl: 'example_presignedUrl',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreateUploadEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreateWorkflowNodeEntity

```ts
const create_workflow_node = client.CreateWorkflowNode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `node` | `any` | Yes |  |
| `workflow` | `Record<string, any>` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CreateWorkflowNode().create({
  workflow_id: 'example_workflow_id',
  node: 'example_node',
  workflow: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreateWorkflowNodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmailMessageEntity

```ts
const email_message = client.EmailMessage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bccEmail` | `string` | No | The email BCC address. |
| `campaignId` | `string` | No | The campaign this email message belongs to. |
| `ccEmail` | `string` | No | The email CC address. |
| `contactPropertiesFallbacks` | `Record<string, any>` | No | Fallback values for contact properties. |
| `contentRevisionId` | `string | null` | Yes | The current content revision. |
| `dataVariablesFallbacks` | `Record<string, any>` | No | Fallback values for data variables. |
| `emailFormat` | `string` | Yes | The rendering format of the email. |
| `eventPropertiesFallbacks` | `Record<string, any>` | No | Fallback values for event properties. |
| `expectedRevisionId` | `string` | No | The `contentRevisionId` you last fetched, or the `emailMessageContentRevisionId` you received when creating the campaign. |
| `fromEmail` | `string` | Yes | The email sender email address, without the team's sending domain. |
| `fromName` | `string` | Yes | The email sender name. |
| `id` | `string` | Yes | The ID of the email message. |
| `languageCode` | `string` | No | ISO 639-1 language code for the email, e.g. |
| `lmx` | `string` | Yes | The email body serialized as LMX. |
| `previewText` | `string` | Yes | The email preview text. |
| `replyToEmail` | `string` | Yes | The email reply-to address. |
| `subject` | `string` | Yes | The email subject. |
| `transactionalId` | `string` | No | The transactional email this email message belongs to. |
| `updatedAt` | `string` | Yes |  |
| `warnings` | `any[]` | No | Non-fatal issues raised while compiling the submitted LMX. |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `bccEmail` | - | - |
| `campaignId` | - | - |
| `ccEmail` | - | - |
| `contactPropertiesFallbacks` | - | - |
| `contentRevisionId` | - | - |
| `dataVariablesFallbacks` | - | - |
| `emailFormat` | - | Yes |
| `eventPropertiesFallbacks` | - | - |
| `expectedRevisionId` | - | - |
| `fromEmail` | - | Yes |
| `fromName` | - | Yes |
| `id` | - | - |
| `languageCode` | - | - |
| `lmx` | - | Yes |
| `previewText` | - | Yes |
| `replyToEmail` | - | Yes |
| `subject` | - | Yes |
| `transactionalId` | - | - |
| `updatedAt` | - | - |
| `warnings` | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.EmailMessage().create({
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.EmailMessage().load({ id: 'email_message_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailMessageEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmailMessageGuardianEntity

```ts
const email_message_guardian = client.EmailMessageGuardian()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `errors` | `any[]` | Yes | Validation errors. |
| `id` | `string` | No |  |
| `warnings` | `any[]` | Yes | Validation warnings. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.EmailMessageGuardian().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailMessageGuardianEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmailMessagePreviewEntity

```ts
const email_message_preview = client.EmailMessagePreview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `contactProperties` | `Record<string, any>` | No | Contact property values to render. |
| `dataVariables` | `Record<string, any>` | No | Transactional data variables to render. |
| `emails` | `any[]` | Yes | One or more addresses to send the preview to. |
| `eventProperties` | `Record<string, any>` | No | Event property values to render. |
| `id` | `string` | Yes | The ID of the email message the preview was sent for. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.EmailMessagePreview().create({
  id: 'example_id',
  emails: [],
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailMessagePreviewEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmailMetricEntity

```ts
const email_metric = client.EmailMetric()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clicks` | `number` | Yes | Number of sends where at least one link was clicked. |
| `hardBounces` | `number` | Yes | Number of sends that hard bounced. |
| `opens` | `number` | Yes | Number of sends that were opened at least once. |
| `sends` | `number` | Yes | Number of sends. |
| `softBounces` | `number` | Yes | Number of sends that soft bounced. |
| `spamReports` | `number` | Yes | Number of sends reported as spam. |
| `unsubscribes` | `number` | Yes | Number of unsubscribes. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.EmailMetric().load({ campaign_id: 'campaign_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailMetricEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventPatternEntity

```ts
const event_pattern = client.EventPattern()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `eventName` | `string` | Yes | The name of the event pattern. |
| `eventProperties` | `any[]` | Yes | The properties of the event pattern, which can be used in emails. |
| `id` | `string` | Yes | The ID of the event pattern. |
| `incomingWebhookPlatform` | `string | null` | Yes | The platform that sent this event pattern, if the event pattern is from an incoming webhook. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.EventPattern().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.EventPattern().load({ id: 'event_pattern_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventPatternEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventSuccessEntity

```ts
const event_success = client.EventSuccess()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | No | The contact's email address. |
| `eventName` | `string` | Yes | The name of the event. |
| `eventProperties` | `Record<string, any>` | No | An object containing event property data for the event, available in emails sent by the event. |
| `mailingLists` | `Record<string, any>` | No | Manage mailing list subscriptions. |
| `success` | `boolean` | Yes |  |
| `userId` | `string` | No | The contact's unique user ID. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.EventSuccess().create({
  eventName: 'example_eventName',
  success: true,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventSuccessEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GroupEntity

```ts
const group = client.Group()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes | ISO 8601 timestamp for when the group was created. |
| `description` | `string` | Yes | The description of the group. |
| `id` | `string` | Yes | The ID of the group. |
| `name` | `string` | Yes | The name of the group. |
| `updatedAt` | `string` | Yes | ISO 8601 timestamp for when the group was last updated. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `createdAt` | - | - | - |
| `description` | - | - | Yes |
| `id` | - | - | - |
| `name` | - | - | Yes |
| `updatedAt` | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Group().create({
  campaign_group_id: 'example_campaign_group_id',
  createdAt: 'example_createdAt',
  description: 'example_description',
  id: 'example_id',
  name: 'example_name',
  updatedAt: 'example_updatedAt',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Group().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Group().load({ campaign_group_id: 'campaign_group_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GroupEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MailingListEntity

```ts
const mailing_list = client.MailingList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string | null` | Yes | The description of the mailing list. |
| `id` | `string` | Yes | The ID of the mailing list. |
| `isPublic` | `boolean` | Yes | Whether the mailing list is public (`true`) or private (`false`). |
| `name` | `string` | Yes | The name of the mailing list. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.MailingList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MailingListEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SimplifiedWorkflowEntity

```ts
const simplified_workflow = client.SimplifiedWorkflow()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes | ISO 8601 timestamp for when the workflow was created. |
| `description` | `string` | No | The description of the workflow. |
| `expectedRevisionId` | `string | null` | Yes | The workflow revision token returned by the latest workflow read or mutation. |
| `id` | `string` | Yes | The ID of the workflow. |
| `mailingListId` | `string | null` | Yes | The ID of the mailing list the workflow sends to. |
| `name` | `string` | No | The name of the workflow. |
| `nodes` | `Record<string, any>` | Yes | A map of node IDs to simplified node objects. |
| `rootNodeId` | `string` | Yes | The ID of the root node in the workflow graph. |
| `status` | `string` | Yes |  |
| `updatedAt` | `string` | Yes | ISO 8601 timestamp for when the workflow was last updated. |
| `url` | `string` | Yes | The URL of the workflow in the Loops app. |
| `workflowRevisionId` | `string | null` | Yes | The current workflow revision token. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `createdAt` | - | - | - |
| `description` | - | - | - |
| `expectedRevisionId` | - | - | - |
| `id` | - | - | - |
| `mailingListId` | - | - | Yes |
| `name` | - | Yes | Yes |
| `nodes` | - | - | - |
| `rootNodeId` | - | - | - |
| `status` | - | - | - |
| `updatedAt` | - | - | - |
| `url` | - | - | - |
| `workflowRevisionId` | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.SimplifiedWorkflow().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.SimplifiedWorkflow().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.SimplifiedWorkflow().load({ id: 'simplified_workflow_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SimplifiedWorkflowEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ThemeEntity

```ts
const theme = client.Theme()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes | ISO 8601 timestamp for when the theme was created. |
| `id` | `string` | Yes | The ID of the theme. |
| `isDefault` | `boolean` | Yes | Whether this theme is the team's default. |
| `name` | `string` | Yes | The name of the theme. |
| `styles` | `Record<string, any>` | Yes | Flat map of style attributes, matching the attribute names accepted by the LMX `<Style />` tag. |
| `updatedAt` | `string` | Yes | ISO 8601 timestamp for when the theme was last updated. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `createdAt` | - | - | - |
| `id` | - | - | - |
| `isDefault` | - | - | - |
| `name` | - | - | - |
| `styles` | - | - | Yes |
| `updatedAt` | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Theme().create({
  createdAt: 'example_createdAt',
  id: 'example_id',
  isDefault: true,
  name: 'example_name',
  styles: {},
  updatedAt: 'example_updatedAt',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Theme().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Theme().load({ id: 'theme_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ThemeEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TransactionalEntity

```ts
const transactional = client.Transactional()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addToAudience` | `boolean` | No | If `true`, a contact will be created in your audience using the `email` value (if a matching contact doesn't already exist). |
| `attachments` | `any[]` | No | A list containing file objects to be sent along with an email message. |
| `dataVariables` | `Record<string, any>` | No | An object containing data as defined by the data variables added to the transactional email template. |
| `email` | `string` | Yes | The recipient's email address. |
| `id` | `string` | Yes | The ID of the transactional email. |
| `lastUpdated` | `string` | Yes | The date and time the transactional email was last updated in ISO 8601 format. |
| `name` | `string` | Yes | The name of the transactional email. |
| `success` | `boolean` | Yes |  |
| `transactionalId` | `string` | Yes | The ID of the transactional email to send. |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `addToAudience` | - | - |
| `attachments` | - | - |
| `dataVariables` | Yes | - |
| `email` | - | - |
| `id` | - | - |
| `lastUpdated` | - | - |
| `name` | - | - |
| `success` | - | - |
| `transactionalId` | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Transactional().create({
  email: 'example_email',
  id: 'example_id',
  lastUpdated: 'example_lastUpdated',
  name: 'example_name',
  success: true,
  transactionalId: 'example_transactionalId',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Transactional().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TransactionalEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TransactionalDraftEntity

```ts
const transactional_draft = client.TransactionalDraft()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes | ISO 8601 timestamp for when the transactional email was created. |
| `dataVariables` | `any[]` | Yes | Data variable names used by the published email. |
| `draftEmailMessageContentRevisionId` | `string | null` | Yes | The `contentRevisionId` of the draft email message. |
| `draftEmailMessageId` | `string | null` | Yes | The ID of the draft email message. |
| `id` | `string` | Yes | The ID of the transactional email. |
| `name` | `string` | Yes | The name of the transactional email. |
| `publishedEmailMessageId` | `string | null` | Yes | The ID of the published email message. |
| `transactionalGroupId` | `string | null` | No | The ID of the group this transactional email belongs to. |
| `updatedAt` | `string` | Yes | ISO 8601 timestamp for when the transactional email was last updated. |
| `url` | `string` | Yes | The URL of the transactional email in the Loops app. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.TransactionalDraft().create({
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

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TransactionalDraftEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TransactionalMetricEntity

```ts
const transactional_metric = client.TransactionalMetric()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deliveries` | `number` | Yes | Number of sends delivered. |
| `hardBounces` | `number` | Yes | Number of sends that hard bounced. |
| `sends` | `number` | Yes | Number of sends. |
| `softBounces` | `number` | Yes | Number of sends that soft bounced. |
| `spamReports` | `number` | Yes | Number of sends reported as spam. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.TransactionalMetric().load({ transactional_email_id: 'transactional_email_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TransactionalMetricEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TransactionalResourceEntity

```ts
const transactional_resource = client.TransactionalResource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes | ISO 8601 timestamp for when the transactional email was created. |
| `dataVariables` | `any[]` | Yes | Data variable names used by the published email. |
| `draftEmailMessageId` | `string | null` | Yes | The ID of the draft email message. |
| `id` | `string` | Yes | The ID of the transactional email. |
| `name` | `string` | Yes | The name of the transactional email. |
| `publishedEmailMessageId` | `string | null` | Yes | The ID of the published email message. |
| `transactionalGroupId` | `string | null` | Yes | The ID of the group this transactional email belongs to. |
| `updatedAt` | `string` | Yes | ISO 8601 timestamp for when the transactional email was last updated. |
| `url` | `string` | Yes | The URL of the transactional email in the Loops app. |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `createdAt` | - | - | - |
| `dataVariables` | - | - | - |
| `draftEmailMessageId` | - | - | - |
| `id` | - | - | - |
| `name` | - | - | Yes |
| `publishedEmailMessageId` | - | - | - |
| `transactionalGroupId` | - | - | Yes |
| `updatedAt` | - | - | - |
| `url` | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.TransactionalResource().create({
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.TransactionalResource().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.TransactionalResource().load({ transactional_id: 'transactional_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TransactionalResourceEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UpdateComponentEntity

```ts
const update_component = client.UpdateComponent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affectedEmailCount` | `number` | Yes | The number of emails using this component that were updated by the body change. |
| `id` | `string` | Yes | The ID of the component. |
| `lmx` | `string` | Yes | The component body serialized as LMX. |
| `name` | `string` | Yes | The name of the component. |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `affectedEmailCount` | - |
| `id` | - |
| `lmx` | Yes |
| `name` | Yes |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.UpdateComponent().create({
  id: 'example_id',
  affectedEmailCount: 1,
  lmx: 'example_lmx',
  name: 'example_name',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UpdateComponentEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UpdateThemeEntity

```ts
const update_theme = client.UpdateTheme()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affectedEmailCount` | `number` | Yes | The number of emails using this theme that are affected by the style change. |
| `createdAt` | `string` | Yes | ISO 8601 timestamp for when the theme was created. |
| `id` | `string` | Yes | The ID of the theme. |
| `isDefault` | `boolean` | Yes | Whether this theme is the team's default. |
| `name` | `string` | Yes | The name of the theme. |
| `styles` | `Record<string, any>` | Yes | Flat map of style attributes, matching the attribute names accepted by the LMX `<Style />` tag. |
| `updatedAt` | `string` | Yes | ISO 8601 timestamp for when the theme was last updated. |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `affectedEmailCount` | - |
| `createdAt` | - |
| `id` | - |
| `isDefault` | - |
| `name` | Yes |
| `styles` | Yes |
| `updatedAt` | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.UpdateTheme().create({
  id: 'example_id',
  affectedEmailCount: 1,
  createdAt: 'example_createdAt',
  isDefault: true,
  name: 'example_name',
  styles: {},
  updatedAt: 'example_updatedAt',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UpdateThemeEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UpdateWorkflowNodeEntity

```ts
const update_workflow_node = client.UpdateWorkflowNode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | The description of the workflow. |
| `expectedRevisionId` | `string | null` | Yes | The workflow revision token returned by the latest workflow read or mutation. |
| `id` | `string` | Yes | The ID of the workflow. |
| `mailingListId` | `string | null` | Yes | The ID of the mailing list the workflow sends to. |
| `name` | `string` | No | The name of the workflow. |
| `nodes` | `Record<string, any>` | Yes | A map of node IDs to simplified node objects. |
| `payload` | `any` | Yes | Node-type-specific fields to update. |
| `rootNodeId` | `string` | Yes | The ID of the root node in the workflow graph. |
| `status` | `string` | Yes |  |
| `url` | `string` | Yes | The URL of the workflow in the Loops app. |
| `workflowRevisionId` | `string | null` | Yes | The current workflow revision token. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.UpdateWorkflowNode().create({
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

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UpdateWorkflowNodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WorkflowEntity

```ts
const workflow = client.Workflow()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Workflow().remove({ id: 'workflow_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WorkflowEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WorkflowNodeEntity

```ts
const workflow_node = client.WorkflowNode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.WorkflowNode().remove({ id: 'workflow_node_id', workflow_id: 'workflow_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WorkflowNodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WorkflowNodeWithRevisionEntity

```ts
const workflow_node_with_revision = client.WorkflowNodeWithRevision()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `workflowRevisionId` | `string | null` | Yes | The current workflow revision token. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `add_branch` | `/v1/workflows/{workflowId}/nodes/{nodeId}/add-branch` | `client.WorkflowNodeWithRevision().create({ $action: 'add_branch', ... })` |
| `reroute` | `/v1/workflows/{workflowId}/nodes/{nodeId}/reroute` | `client.WorkflowNodeWithRevision().create({ $action: 'reroute', ... })` |

An action returns that action's OWN response, which is not necessarily a
WorkflowNodeWithRevision record — check the API definition for its shape.

```ts
const result = await client.WorkflowNodeWithRevision().create({
  $action: 'add_branch',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.WorkflowNodeWithRevision().load({ node_id: 'node_id', workflow_id: 'workflow_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WorkflowNodeWithRevisionEntity` instance with the same client and
options.

#### `client()`

Return the parent `LoopsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new LoopsSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

