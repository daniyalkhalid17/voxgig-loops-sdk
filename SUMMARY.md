# Loops OpenAPI Spec

This is the OpenAPI Spec for the [Loops API](https://loops.so/docs/api).

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 36 entities and 72 HTTP routes. There are 1 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### ApiKey

Results: Success.

SDK operations: `load`.

Key fields to recognise:

- `teamName`: The name of the team the API key belongs to.

### AudienceSegment

Results: Audience segment created.; Successful.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `createdAt`: ISO 8601 timestamp for when the audience segment was created.
- `description`: An optional description of the audience segment.
- `filter`: A tree of audience conditions combined with `match`.
- `id`: The ID of the audience segment.
- `name`: The name of the audience segment.

### Campaign

Results: Campaign updated.; Campaign created.; Successful.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `audienceFilter`: The filter rules that define the audience for this campaign, if set.
- `audienceSegmentId`: The ID of the audience segment this campaign targets, if set.
- `campaignGroupId`: The ID of the campaign group this campaign belongs to.
- `createdAt`: ISO 8601 timestamp for when the campaign was created.
- `emailMessageId`: The associated email message ID.

### ChangeWorkflowMailingList

Results: Mailing-list dry run, queued-contact warning, or update result. Confirmed update responses include the simplified workflow after the mailing list changes.

SDK operations: `create`.

Key fields to recognise:

- `dryRun`: If `true`, the request will be validated but the workflow will not be modified.
- `expectedRevisionId`: The workflow revision token returned by the latest workflow read or mutation.
- `mailingListId`: The ID of the mailing list the workflow sends to.
- `queuedContactPolicy`: `fail` returns queued-contact impact instead of mutating.

### Complete

Results: Upload completed.

SDK operations: `create`.

Key fields to recognise:

- `emailAssetId`: The ID of the created asset.
- `finalUrl`: The public URL of the uploaded asset.

### Component

Results: Component created.; Successful.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `id`: The ID of the component.
- `lmx`: The component body serialized as LMX.
- `name`: The name of the component.

### Configuration

Results: Successful.

SDK operations: `list`.

### Contact

Results: List of contacts (or an empty array if no contact was found). Contact objects will include any custom properties.

SDK operations: `list`.

Key fields to recognise:

- `email`: The contact&#39;s email address.
- `firstName`: The contact&#39;s first name.
- `id`: The contact&#39;s Loops ID.
- `lastName`: The contact&#39;s last name.
- `mailingLists`: Mailing lists the contact is subscribed to, represented by key-value pairs of mailing list IDs and `true`.

### ContactDelete

Results: Successful delete.

SDK operations: `create`.

Key fields to recognise:

- `email`: The contact&#39;s email address.
- `userId`: The contact&#39;s unique user ID.

### ContactProperty

Results: Successful.

SDK operations: `list`.

Key fields to recognise:

- `key`: The key of the contact property.
- `label`: The human-friendly label for this property.
- `type`: The type of property.

### ContactPropertySuccess

Results: Successful create.

SDK operations: `create`.

Key fields to recognise:

- `name`: The name of the property.
- `type`: The type of property.

### ContactSuccess

Results: Successful create.; Successful update.

SDK operations: `create`, `update`.

Key fields to recognise:

- `email`: The contact&#39;s email address.
- `firstName`: The contact&#39;s first name.
- `lastName`: The contact&#39;s last name.
- `mailingLists`: Manage mailing list subscriptions.
- `source`: A custom source value to replace the default “API”.

### ContactSuppressionRemove

Results: Successful removal.

SDK operations: `remove`.

### ContactSuppressionStatus

Results: Successful.

SDK operations: `load`.

Key fields to recognise:

- `isSuppressed`: Whether the contact is suppressed.
- `removalQuota`: The removal quota for the contact.

### CreateUpload

Results: Pre-signed upload URL created.

SDK operations: `create`.

Key fields to recognise:

- `contentLength`: The size of the file in bytes.
- `contentType`: The MIME type of the file to upload.
- `emailAssetId`: The ID of the created asset. Pass this as `emailAssetId` to `POST /v1/uploads/&#123;emailAssetId&#125;/complete` once the file has been uploaded.
- `presignedUrl`: The pre-signed URL to upload the file to with an HTTP `PUT` request. Send the same `Content-Type` and `Content-Length` used in the create request.

### CreateWorkflowNode

Results: Workflow node created.

SDK operations: `create`.

### EmailMessage

Results: Email message updated.; Successful.

SDK operations: `create`, `load`.

Key fields to recognise:

- `bccEmail`: The email BCC address. Only present when set.
- `campaignId`: The campaign this email message belongs to. Present only when the message belongs to a campaign (mutually exclusive with `transactionalId`).
- `ccEmail`: The email CC address. Only present when set.
- `contactPropertiesFallbacks`: Fallback values for contact properties. Only present when set.
- `contentRevisionId`: The current content revision. Pass this as `expectedRevisionId` on your next update.

### EmailMessageGuardian

Results: Successful.

SDK operations: `list`.

Key fields to recognise:

- `errors`: Validation errors. These must be resolved before the email can be published.
- `warnings`: Validation warnings. These are advisory and do not block publishing.

### EmailMessagePreview

Results: Preview scheduled.

SDK operations: `create`.

Key fields to recognise:

- `contactProperties`: Contact property values to render.
- `dataVariables`: Transactional data variables to render.
- `emails`: One or more addresses to send the preview to.
- `eventProperties`: Event property values to render.
- `id`: The ID of the email message the preview was sent for.

### EmailMetric

Results: Successful.

SDK operations: `load`.

Key fields to recognise:

- `clicks`: Number of sends where at least one link was clicked.
- `hardBounces`: Number of sends that hard bounced.
- `opens`: Number of sends that were opened at least once.
- `sends`: Number of sends.
- `softBounces`: Number of sends that soft bounced.

### EventPattern

Results: Successful.

SDK operations: `list`, `load`.

Key fields to recognise:

- `eventName`: The name of the event pattern. Use this when sending events with the API.
- `eventProperties`: The properties of the event pattern, which can be used in emails.
- `id`: The ID of the event pattern.
- `incomingWebhookPlatform`: The platform that sent this event pattern, if the event pattern is from an incoming webhook. Will be `null` for custom events.

### EventSuccess

Results: Successful send.

SDK operations: `create`.

Key fields to recognise:

- `email`: The contact&#39;s email address.
- `eventName`: The name of the event.
- `eventProperties`: An object containing event property data for the event, available in emails sent by the event.
- `mailingLists`: Manage mailing list subscriptions.
- `userId`: The contact&#39;s unique user ID.

### Group

Results: Campaign group updated.; Transactional group updated.; Workflow group updated.; Campaign group created.; Transactional group created.; Workflow group created.; Successful.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `createdAt`: ISO 8601 timestamp for when the group was created.
- `description`: The description of the group.
- `id`: The ID of the group.
- `name`: The name of the group.
- `updatedAt`: ISO 8601 timestamp for when the group was last updated.

### MailingList

Results: Successful.

SDK operations: `list`.

Key fields to recognise:

- `description`: The description of the mailing list. `null` if no description is set.
- `id`: The ID of the mailing list.
- `isPublic`: Whether the mailing list is public (`true`) or private (`false`).
- `name`: The name of the mailing list.

### SimplifiedWorkflow

Results: Workflow properties updated.; Workflow created.; Successful.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `createdAt`: ISO 8601 timestamp for when the workflow was created.
- `description`: The description of the workflow.
- `expectedRevisionId`: The workflow revision token returned by the latest workflow read or mutation.
- `id`: The ID of the workflow.
- `mailingListId`: The ID of the mailing list the workflow sends to.

### Theme

Results: Theme created.; Successful.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `createdAt`: ISO 8601 timestamp for when the theme was created.
- `id`: The ID of the theme.
- `isDefault`: Whether this theme is the team&#39;s default.
- `name`: The name of the theme.
- `styles`: Flat map of style attributes, matching the attribute names accepted by the LMX `&lt;Style /&gt;` tag.

### Transactional

Results: Successful send.; Successful.

SDK operations: `create`, `list`.

Key fields to recognise:

- `addToAudience`: If `true`, a contact will be created in your audience using the `email` value (if a matching contact doesn&#39;t already exist).
- `attachments`: A list containing file objects to be sent along with an email message.
- `dataVariables`: The data variables used by the transactional email.
- `email`: The recipient&#39;s email address.
- `id`: The ID of the transactional email.

### TransactionalDraft

Results: Draft ready.

SDK operations: `create`.

Key fields to recognise:

- `createdAt`: ISO 8601 timestamp for when the transactional email was created.
- `dataVariables`: Data variable names used by the published email. Empty for unpublished transactional emails.
- `draftEmailMessageContentRevisionId`: The `contentRevisionId` of the draft email message. Pass this as `expectedRevisionId` on your first update via `POST /v1/email-messages/&#123;emailMessageId&#125;`.
- `draftEmailMessageId`: The ID of the draft email message.
- `id`: The ID of the transactional email.

### TransactionalMetric

Results: Successful.

SDK operations: `load`.

Key fields to recognise:

- `deliveries`: Number of sends delivered.
- `hardBounces`: Number of sends that hard bounced.
- `sends`: Number of sends.
- `softBounces`: Number of sends that soft bounced.
- `spamReports`: Number of sends reported as spam.

### TransactionalResource

Results: Transactional email updated.; Transactional email published.; Transactional email created.; Successful.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `createdAt`: ISO 8601 timestamp for when the transactional email was created.
- `dataVariables`: Data variable names used by the published email. Empty for unpublished transactional emails.
- `draftEmailMessageId`: The ID of the draft email message. `null` if there is no draft version.
- `id`: The ID of the transactional email.
- `name`: The name of the transactional email.

### UpdateComponent

Results: Successful.

SDK operations: `create`.

Key fields to recognise:

- `affectedEmailCount`: The number of emails using this component that were updated by the body change. `0` when only the name changed.
- `id`: The ID of the component.
- `lmx`: The component body serialized as LMX.
- `name`: The name of the component.

### UpdateTheme

Results: Successful.

SDK operations: `create`.

Key fields to recognise:

- `affectedEmailCount`: The number of emails using this theme that are affected by the style change. `0` when only the name changed.
- `createdAt`: ISO 8601 timestamp for when the theme was created.
- `id`: The ID of the theme.
- `isDefault`: Whether this theme is the team&#39;s default.
- `name`: The name of the theme.

### UpdateWorkflowNode

Results: Workflow node updated.

SDK operations: `create`.

Key fields to recognise:

- `description`: The description of the workflow.
- `expectedRevisionId`: The workflow revision token returned by the latest workflow read or mutation.
- `id`: The ID of the campaign, workflow, or workflow email.
- `mailingListId`: The ID of the mailing list this trigger sends to, if set.
- `name`: The name of the workflow.

### Workflow

Results: Workflow deleted. No response body.

SDK operations: `remove`.

### WorkflowNode

Results: Delete dry run, queued-contact warning, or deletion result. Confirmed deletion responses include the simplified workflow after the node is removed.; Delete dry run, queued-contact warning, or deletion result. Confirmed deletion responses include the simplified workflow after the nodes are removed.

SDK operations: `remove`.

Key fields to recognise:

- `id`: The ID of the workflow.

### WorkflowNodeWithRevision

Results: Branch added.; Node connection rerouted.; Successful.

SDK operations: `create`, `load`.

Key fields to recognise:

- `workflowRevisionId`: The current workflow revision token. Pass the latest value as `expectedRevisionId` on the next workflow mutation.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| ApiKey | `load` | `GET /v1/api-key` | Required |
| AudienceSegment | `create` | `POST /v1/audience-segments` | Required |
| AudienceSegment | `list` | `GET /v1/audience-segments` | Required |
| AudienceSegment | `load` | `GET /v1/audience-segments/{audienceSegmentId}` | Required |
| Campaign | `create` | `POST /v1/campaigns/{campaignId}` | Required |
| Campaign | `create` | `POST /v1/campaigns` | Required |
| Campaign | `list` | `GET /v1/campaigns` | Required |
| Campaign | `load` | `GET /v1/campaigns/{campaignId}` | Required |
| ChangeWorkflowMailingList | `create` | `POST /v1/workflows/{workflowId}/mailing-list` | Required |
| Complete | `create` | `POST /v1/uploads/{emailAssetId}/complete` | Required |
| Component | `create` | `POST /v1/components` | Required |
| Component | `list` | `GET /v1/components` | Required |
| Component | `load` | `GET /v1/components/{componentId}` | Required |
| Configuration | `list` | `GET /v1/dedicated-sending-ips` | Required |
| Contact | `list` | `GET /v1/contacts/find` | Required |
| ContactDelete | `create` | `POST /v1/contacts/delete` | Required |
| ContactProperty | `list` | `GET /v1/contacts/properties` | Required |
| ContactPropertySuccess | `create` | `POST /v1/contacts/properties` | Required |
| ContactSuccess | `create` | `POST /v1/contacts/create` | Required |
| ContactSuccess | `update` | `PUT /v1/contacts/update` | Required |
| ContactSuppressionRemove | `remove` | `DELETE /v1/contacts/suppression` | Required |
| ContactSuppressionStatus | `load` | `GET /v1/contacts/suppression` | Required |
| CreateUpload | `create` | `POST /v1/uploads` | Required |
| CreateWorkflowNode | `create` | `POST /v1/workflows/{workflowId}/nodes` | Required |
| EmailMessage | `create` | `POST /v1/email-messages/{emailMessageId}` | Required |
| EmailMessage | `load` | `GET /v1/email-messages/{emailMessageId}` | Required |
| EmailMessageGuardian | `list` | `GET /v1/email-messages/{emailMessageId}/guardian` | Required |
| EmailMessagePreview | `create` | `POST /v1/email-messages/{emailMessageId}/preview` | Required |
| EmailMetric | `load` | `GET /v1/workflows/{workflowId}/nodes/{nodeId}/metrics` | Required |
| EmailMetric | `load` | `GET /v1/campaigns/{campaignId}/metrics` | Required |
| EventPattern | `list` | `GET /v1/event-patterns` | Required |
| EventPattern | `load` | `GET /v1/event-patterns/by-name/{eventName}` | Required |
| EventPattern | `load` | `GET /v1/event-patterns/{eventPatternId}` | Required |
| EventSuccess | `create` | `POST /v1/events/send` | Required |
| Group | `create` | `POST /v1/campaign-groups/{campaignGroupId}` | Required |
| Group | `create` | `POST /v1/transactional-groups/{transactionalGroupId}` | Required |
| Group | `create` | `POST /v1/workflow-groups/{workflowGroupId}` | Required |
| Group | `create` | `POST /v1/campaign-groups` | Required |
| Group | `create` | `POST /v1/transactional-groups` | Required |
| Group | `create` | `POST /v1/workflow-groups` | Required |
| Group | `list` | `GET /v1/campaign-groups` | Required |
| Group | `list` | `GET /v1/transactional-groups` | Required |
| Group | `list` | `GET /v1/workflow-groups` | Required |
| Group | `load` | `GET /v1/campaign-groups/{campaignGroupId}` | Required |
| Group | `load` | `GET /v1/transactional-groups/{transactionalGroupId}` | Required |
| Group | `load` | `GET /v1/workflow-groups/{workflowGroupId}` | Required |
| MailingList | `list` | `GET /v1/lists` | Required |
| SimplifiedWorkflow | `create` | `POST /v1/workflows/{workflowId}` | Required |
| SimplifiedWorkflow | `create` | `POST /v1/workflows` | Required |
| SimplifiedWorkflow | `list` | `GET /v1/workflows` | Required |
| SimplifiedWorkflow | `load` | `GET /v1/workflows/{workflowId}` | Required |
| Theme | `create` | `POST /v1/themes` | Required |
| Theme | `list` | `GET /v1/themes` | Required |
| Theme | `load` | `GET /v1/themes/{themeId}` | Required |
| Transactional | `create` | `POST /v1/transactional` | Required |
| Transactional | `list` | `GET /v1/transactional` | Required |
| TransactionalDraft | `create` | `POST /v1/transactional-emails/{transactionalId}/draft` | Required |
| TransactionalMetric | `load` | `GET /v1/transactional-emails/{transactionalId}/metrics` | Required |
| TransactionalResource | `create` | `POST /v1/transactional-emails/{transactionalId}` | Required |
| TransactionalResource | `create` | `POST /v1/transactional-emails/{transactionalId}/publish` | Required |
| TransactionalResource | `create` | `POST /v1/transactional-emails` | Required |
| TransactionalResource | `list` | `GET /v1/transactional-emails` | Required |
| TransactionalResource | `load` | `GET /v1/transactional-emails/{transactionalId}` | Required |
| UpdateComponent | `create` | `POST /v1/components/{componentId}` | Required |
| UpdateTheme | `create` | `POST /v1/themes/{themeId}` | Required |
| UpdateWorkflowNode | `create` | `POST /v1/workflows/{workflowId}/nodes/{nodeId}` | Required |
| Workflow | `remove` | `DELETE /v1/workflows/{workflowId}` | Required |
| WorkflowNode | `remove` | `DELETE /v1/workflows/{workflowId}/nodes/{nodeId}` | Required |
| WorkflowNode | `remove` | `DELETE /v1/workflows/{workflowId}/nodes/{nodeId}/recursive` | Required |
| WorkflowNodeWithRevision | `create` | `POST /v1/workflows/{workflowId}/nodes/{nodeId}/add-branch` | Required |
| WorkflowNodeWithRevision | `create` | `POST /v1/workflows/{workflowId}/nodes/{nodeId}/reroute` | Required |
| WorkflowNodeWithRevision | `load` | `GET /v1/workflows/{workflowId}/nodes/{nodeId}` | Required |

## Connect to the API

- API server: `https://app.loops.so/api`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

