// Typed models for the Loops SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface ApiKey {
  success: boolean
  teamName: string
}

export interface ApiKeyLoadMatch {
  success?: boolean
  teamName?: string
}

export interface AudienceSegment {
  createdAt: string
  description: string | null
  filter: Record<string, any> | null
  id: string
  name: string
  updatedAt: string
}

export interface AudienceSegmentLoadMatch {
  id: string
}

export interface AudienceSegmentListMatch {
  cursor?: string
  per_page?: string
}

export interface AudienceSegmentCreateData {
  createdAt: string
  description: string | null
  filter: Record<string, any> | null
  id: string
  name: string
  updatedAt: string
}

export interface Campaign {
  audienceFilter: Record<string, any> | null
  audienceSegmentId: string | null
  campaignGroupId: string | null
  createdAt: string
  emailMessageId: string | null
  id: string
  mailingListId: string | null
  name: string
  scheduling: Record<string, any>
  status: string
  updatedAt: string
  url: string
}

export interface CampaignLoadMatch {
  id: string
}

export interface CampaignListMatch {
  cursor?: string
  per_page?: string
}

export interface CampaignCreateData {
  id: string
  audienceFilter: Record<string, any> | null
  audienceSegmentId: string | null
  campaignGroupId: string | null
  createdAt: string
  emailMessageId: string | null
  mailingListId: string | null
  name: string
  scheduling: Record<string, any>
  status: string
  updatedAt: string
  url: string
}

export interface ChangeWorkflowMailingList {
  dryRun?: boolean
  expectedRevisionId: string | null
  mailingListId: string | null
  queuedContactPolicy?: string
}

export interface ChangeWorkflowMailingListCreateData {
  workflow_id: string
  dryRun?: boolean
  expectedRevisionId: string | null
  mailingListId: string | null
  queuedContactPolicy?: string
}

export interface Complete {
  emailAssetId: string
  finalUrl: string
}

export interface CompleteCreateData {
  upload_id: string
  emailAssetId: string
  finalUrl: string
}

export interface Component {
  id: string
  lmx: string
  name: string
}

export interface ComponentLoadMatch {
  id: string
}

export interface ComponentListMatch {
  cursor?: string
  per_page?: string
}

export interface ComponentCreateData {
  id: string
  lmx: string
  name: string
}

export interface Configuration {
}

export interface ConfigurationListMatch {
}

export interface Contact {
  email?: string
  firstName?: string | null
  id?: string
  lastName?: string | null
  mailingLists?: Record<string, any>
  optInStatus?: string | null
  source?: string
  subscribed?: boolean
  userGroup?: string
  userId?: string | null
}

export interface ContactListMatch {
  email?: string
  user_id?: string

  // Selects a custom action instead of the plain list:
  //   'find'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ContactDelete {
  email?: string
  message: string
  success: boolean
  userId?: string
}

export interface ContactDeleteCreateData {
  email?: string
  message: string
  success: boolean
  userId?: string
}

export interface ContactProperty {
  key: string
  label: string
  type: string
}

export interface ContactPropertyListMatch {
  list?: string
}

export interface ContactPropertySuccess {
  name: string
  success: boolean
  type: string
}

export interface ContactPropertySuccessCreateData {
  name: string
  success: boolean
  type: string
}

export interface ContactSuccess {
  email: string
  firstName?: string
  id: string
  lastName?: string
  mailingLists?: Record<string, any>
  source?: string
  subscribed?: boolean
  success: boolean
  userGroup?: string
  userId?: string
}

export interface ContactSuccessCreateData {
  email: string
  firstName?: string
  id: string
  lastName?: string
  mailingLists?: Record<string, any>
  source?: string
  subscribed?: boolean
  success: boolean
  userGroup?: string
  userId?: string
}

export interface ContactSuccessUpdateData {
  email?: string
  firstName?: string
  id?: string
  lastName?: string
  mailingLists?: Record<string, any>
  source?: string
  subscribed?: boolean
  success?: boolean
  userGroup?: string
  userId?: string
}

export interface ContactSuppressionRemove {
}

export interface ContactSuppressionRemoveRemoveMatch {
  email?: string
  user_id?: string
}

export interface ContactSuppressionStatus {
  contact: Record<string, any>
  isSuppressed: boolean
  removalQuota: Record<string, any>
}

export interface ContactSuppressionStatusLoadMatch {
  email?: string
  user_id?: string
}

export interface CreateUpload {
  contentLength: number
  contentType: string
  emailAssetId: string
  presignedUrl: string
}

export interface CreateUploadCreateData {
  contentLength: number
  contentType: string
  emailAssetId: string
  presignedUrl: string
}

export interface CreateWorkflowNode {
  node: any
  workflow: Record<string, any>
}

export interface CreateWorkflowNodeCreateData {
  workflow_id: string
  node: any
  workflow: Record<string, any>
}

export interface EmailMessage {
  bccEmail?: string
  campaignId?: string
  ccEmail?: string
  contactPropertiesFallbacks?: Record<string, any>
  contentRevisionId: string | null
  dataVariablesFallbacks?: Record<string, any>
  emailFormat: string
  eventPropertiesFallbacks?: Record<string, any>
  expectedRevisionId?: string
  fromEmail: string
  fromName: string
  id: string
  languageCode?: string
  lmx: string
  previewText: string
  replyToEmail: string
  subject: string
  transactionalId?: string
  updatedAt: string
  warnings?: any[]
}

export interface EmailMessageLoadMatch {
  id: string
}

export interface EmailMessageCreateData {
  id: string
  bccEmail?: string
  campaignId?: string
  ccEmail?: string
  contactPropertiesFallbacks?: Record<string, any>
  contentRevisionId: string | null
  dataVariablesFallbacks?: Record<string, any>
  emailFormat: string
  eventPropertiesFallbacks?: Record<string, any>
  expectedRevisionId?: string
  fromEmail: string
  fromName: string
  languageCode?: string
  lmx: string
  previewText: string
  replyToEmail: string
  subject: string
  transactionalId?: string
  updatedAt: string
  warnings?: any[]
}

export interface EmailMessageGuardian {
  errors: any[]
  id?: string
  warnings: any[]
}

export interface EmailMessageGuardianListMatch {
  id: string
}

export interface EmailMessagePreview {
  contactProperties?: Record<string, any>
  dataVariables?: Record<string, any>
  emails: any[]
  eventProperties?: Record<string, any>
  id: string
}

export interface EmailMessagePreviewCreateData {
  id: string
  contactProperties?: Record<string, any>
  dataVariables?: Record<string, any>
  emails: any[]
  eventProperties?: Record<string, any>
}

export interface EmailMetric {
  clicks: number
  hardBounces: number
  opens: number
  sends: number
  softBounces: number
  spamReports: number
  unsubscribes: number
}

export interface EmailMetricLoadMatch {
  campaign_id: string
}

export interface EventPattern {
  eventName: string
  eventProperties: any[]
  id: string
  incomingWebhookPlatform: string | null
}

export interface EventPatternLoadMatch {
  id: string
}

export interface EventPatternListMatch {
  cursor?: string
  per_page?: string
}

export interface EventSuccess {
  email?: string
  eventName: string
  eventProperties?: Record<string, any>
  mailingLists?: Record<string, any>
  success: boolean
  userId?: string
}

export interface EventSuccessCreateData {
  email?: string
  eventName: string
  eventProperties?: Record<string, any>
  mailingLists?: Record<string, any>
  success: boolean
  userId?: string
}

export interface Group {
  createdAt: string
  description: string
  id: string
  name: string
  updatedAt: string
}

export interface GroupLoadMatch {
  campaign_group_id: string
}

export interface GroupListMatch {
  cursor?: string
  per_page?: string
}

export interface GroupCreateData {
  campaign_group_id: string
  createdAt: string
  description: string
  id: string
  name: string
  updatedAt: string
}

export interface MailingList {
  description: string | null
  id: string
  isPublic: boolean
  name: string
}

export interface MailingListListMatch {
  description?: string | null
  id?: string
  isPublic?: boolean
  name?: string
}

export interface SimplifiedWorkflow {
  createdAt: string
  description?: string
  expectedRevisionId: string | null
  id: string
  mailingListId: string | null
  name?: string
  nodes: Record<string, any>
  rootNodeId: string
  status: string
  updatedAt: string
  url: string
  workflowRevisionId: string | null
}

export interface SimplifiedWorkflowLoadMatch {
  id: string
}

export interface SimplifiedWorkflowListMatch {
  cursor?: string
  per_page?: string
}

export interface SimplifiedWorkflowCreateData {
  id: string
  createdAt: string
  description?: string
  expectedRevisionId: string | null
  mailingListId: string | null
  name?: string
  nodes: Record<string, any>
  rootNodeId: string
  status: string
  updatedAt: string
  url: string
  workflowRevisionId: string | null
}

export interface Theme {
  createdAt: string
  id: string
  isDefault: boolean
  name: string
  styles: Record<string, any>
  updatedAt: string
}

export interface ThemeLoadMatch {
  id: string
}

export interface ThemeListMatch {
  cursor?: string
  per_page?: string
}

export interface ThemeCreateData {
  createdAt: string
  id: string
  isDefault: boolean
  name: string
  styles: Record<string, any>
  updatedAt: string
}

export interface Transactional {
  addToAudience?: boolean
  attachments?: any[]
  dataVariables?: Record<string, any>
  email: string
  id: string
  lastUpdated: string
  name: string
  success: boolean
  transactionalId: string
}

export interface TransactionalListMatch {
  cursor?: string
  per_page?: string
}

export interface TransactionalCreateData {
  addToAudience?: boolean
  attachments?: any[]
  dataVariables?: Record<string, any>
  email: string
  id: string
  lastUpdated: string
  name: string
  success: boolean
  transactionalId: string
}

export interface TransactionalDraft {
  createdAt: string
  dataVariables: any[]
  draftEmailMessageContentRevisionId: string | null
  draftEmailMessageId: string | null
  id: string
  name: string
  publishedEmailMessageId: string | null
  transactionalGroupId?: string | null
  updatedAt: string
  url: string
}

export interface TransactionalDraftCreateData {
  transactional_email_id: string
  createdAt: string
  dataVariables: any[]
  draftEmailMessageContentRevisionId: string | null
  draftEmailMessageId: string | null
  id: string
  name: string
  publishedEmailMessageId: string | null
  transactionalGroupId?: string | null
  updatedAt: string
  url: string
}

export interface TransactionalMetric {
  deliveries: number
  hardBounces: number
  sends: number
  softBounces: number
  spamReports: number
}

export interface TransactionalMetricLoadMatch {
  transactional_email_id: string
}

export interface TransactionalResource {
  createdAt: string
  dataVariables: any[]
  draftEmailMessageId: string | null
  id: string
  name: string
  publishedEmailMessageId: string | null
  transactionalGroupId: string | null
  updatedAt: string
  url: string
}

export interface TransactionalResourceLoadMatch {
  transactional_id: string
}

export interface TransactionalResourceListMatch {
  cursor?: string
  per_page?: string
}

export interface TransactionalResourceCreateData {
  transactional_id: string
  createdAt: string
  dataVariables: any[]
  draftEmailMessageId: string | null
  id: string
  name: string
  publishedEmailMessageId: string | null
  transactionalGroupId: string | null
  updatedAt: string
  url: string
}

export interface UpdateComponent {
  affectedEmailCount: number
  id: string
  lmx: string
  name: string
}

export interface UpdateComponentCreateData {
  id: string
  affectedEmailCount: number
  lmx: string
  name: string
}

export interface UpdateTheme {
  affectedEmailCount: number
  createdAt: string
  id: string
  isDefault: boolean
  name: string
  styles: Record<string, any>
  updatedAt: string
}

export interface UpdateThemeCreateData {
  id: string
  affectedEmailCount: number
  createdAt: string
  isDefault: boolean
  name: string
  styles: Record<string, any>
  updatedAt: string
}

export interface UpdateWorkflowNode {
  description?: string
  expectedRevisionId: string | null
  id: string
  mailingListId: string | null
  name?: string
  nodes: Record<string, any>
  payload: any
  rootNodeId: string
  status: string
  url: string
  workflowRevisionId: string | null
}

export interface UpdateWorkflowNodeCreateData {
  id: string
  workflow_id: string
  description?: string
  expectedRevisionId: string | null
  mailingListId: string | null
  name?: string
  nodes: Record<string, any>
  payload: any
  rootNodeId: string
  status: string
  url: string
  workflowRevisionId: string | null
}

export interface Workflow {
  id?: string
}

export interface WorkflowRemoveMatch {
  id: string
}

export interface WorkflowNode {
  id?: string
}

export interface WorkflowNodeRemoveMatch {
  id?: string
  workflow_id: string
  node_id?: string
}

export interface WorkflowNodeWithRevision {
  workflowRevisionId: string | null
}

export interface WorkflowNodeWithRevisionLoadMatch {
  node_id: string
  workflow_id: string
}

export interface WorkflowNodeWithRevisionCreateData {
  node_id: string
  workflow_id: string
  workflowRevisionId: string | null

  // Selects a custom action instead of the plain create:
  //   'add_branch' | 'reroute'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

