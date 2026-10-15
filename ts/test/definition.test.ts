import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "api_key",
    "accessor": "ApiKey",
    "op": "load",
    "method": "GET",
    "path": "/v1/api-key",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "success": true,
      "teamName": "x"
    },
    "idField": "id"
  },
  {
    "entity": "audience_segment",
    "accessor": "AudienceSegment",
    "op": "create",
    "method": "POST",
    "path": "/v1/audience-segments",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "description": "x",
      "createdAt": "x",
      "updatedAt": "x",
      "filter": {
        "match": "all",
        "conditions": [
          {
            "type": "property",
            "key": "x",
            "operator": "any",
            "value": "x"
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "audience_segment",
    "accessor": "AudienceSegment",
    "op": "list",
    "method": "GET",
    "path": "/v1/audience-segments",
    "args": [],
    "select": {
      "cursor": "v1",
      "per_page": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "perPage",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "per_page",
        "wire": "perPage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "pagination": {
        "totalResults": 1,
        "returnedResults": 1,
        "perPage": 1,
        "totalPages": 1,
        "nextCursor": "x",
        "nextPage": "x"
      },
      "data": [
        {
          "id": "x",
          "name": "x",
          "description": "x",
          "createdAt": "x",
          "updatedAt": "x",
          "filter": {
            "match": "all",
            "conditions": [
              {}
            ]
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "audience_segment",
    "accessor": "AudienceSegment",
    "op": "load",
    "method": "GET",
    "path": "/v1/audience-segments/{audienceSegmentId}",
    "args": [
      {
        "name": "id",
        "wire": "audienceSegmentId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "description": "x",
      "createdAt": "x",
      "updatedAt": "x",
      "filter": {
        "match": "all",
        "conditions": [
          {
            "type": "property",
            "key": "x",
            "operator": "any",
            "value": "x"
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "campaign",
    "accessor": "Campaign",
    "op": "create",
    "method": "POST",
    "path": "/v1/campaigns/{campaignId}",
    "args": [
      {
        "name": "id",
        "wire": "campaignId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "url": "x",
      "name": "x",
      "status": "Draft",
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-01T00:00:00Z",
      "emailMessageId": "x",
      "campaignGroupId": "x",
      "mailingListId": "x",
      "audienceSegmentId": "x",
      "audienceFilter": {
        "match": "all",
        "conditions": [
          {
            "type": "property",
            "key": "x",
            "operator": "any",
            "value": "x"
          }
        ]
      },
      "scheduling": {
        "method": "now",
        "timestamp": "2026-01-01T00:00:00Z"
      }
    },
    "idField": "id"
  },
  {
    "entity": "campaign",
    "accessor": "Campaign",
    "op": "create",
    "method": "POST",
    "path": "/v1/campaigns",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "id": "x",
      "url": "x",
      "name": "x",
      "status": "Draft",
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-01T00:00:00Z",
      "emailMessageId": "x",
      "emailMessageContentRevisionId": "x",
      "campaignGroupId": "x",
      "mailingListId": "x",
      "audienceSegmentId": "x",
      "audienceFilter": {
        "match": "all",
        "conditions": [
          {
            "type": "property",
            "key": "x",
            "operator": "any",
            "value": "x"
          }
        ]
      },
      "scheduling": {
        "method": "now",
        "timestamp": "2026-01-01T00:00:00Z"
      }
    },
    "idField": "id"
  },
  {
    "entity": "campaign",
    "accessor": "Campaign",
    "op": "list",
    "method": "GET",
    "path": "/v1/campaigns",
    "args": [],
    "select": {
      "cursor": "v1",
      "per_page": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "perPage",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "per_page",
        "wire": "perPage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "pagination": {
        "totalResults": 1,
        "returnedResults": 1,
        "perPage": 1,
        "totalPages": 1,
        "nextCursor": "x",
        "nextPage": "x"
      },
      "data": [
        {
          "id": "x",
          "url": "x",
          "name": "x",
          "status": "Draft",
          "createdAt": "2026-01-01T00:00:00Z",
          "updatedAt": "2026-01-01T00:00:00Z",
          "emailMessageId": "x",
          "campaignGroupId": "x",
          "mailingListId": "x",
          "audienceSegmentId": "x",
          "audienceFilter": {
            "match": "all",
            "conditions": [
              {}
            ]
          },
          "scheduling": {
            "method": "now",
            "timestamp": "2026-01-01T00:00:00Z"
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "campaign",
    "accessor": "Campaign",
    "op": "load",
    "method": "GET",
    "path": "/v1/campaigns/{campaignId}",
    "args": [
      {
        "name": "id",
        "wire": "campaignId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "url": "x",
      "name": "x",
      "status": "Draft",
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-01T00:00:00Z",
      "emailMessageId": "x",
      "campaignGroupId": "x",
      "mailingListId": "x",
      "audienceSegmentId": "x",
      "audienceFilter": {
        "match": "all",
        "conditions": [
          {
            "type": "property",
            "key": "x",
            "operator": "any",
            "value": "x"
          }
        ]
      },
      "scheduling": {
        "method": "now",
        "timestamp": "2026-01-01T00:00:00Z"
      }
    },
    "idField": "id"
  },
  {
    "entity": "change_workflow_mailing_list",
    "accessor": "ChangeWorkflowMailingList",
    "op": "create",
    "method": "POST",
    "path": "/v1/workflows/{workflowId}/mailing-list",
    "args": [
      {
        "name": "workflow_id",
        "wire": "workflowId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": "dryRun",
      "mailingListId": "x",
      "queuedContactCount": 1
    },
    "idField": "id"
  },
  {
    "entity": "complete",
    "accessor": "Complete",
    "op": "create",
    "method": "POST",
    "path": "/v1/uploads/{emailAssetId}/complete",
    "args": [
      {
        "name": "upload_id",
        "wire": "emailAssetId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "emailAssetId": "x",
      "finalUrl": "x"
    },
    "idField": "id"
  },
  {
    "entity": "component",
    "accessor": "Component",
    "op": "create",
    "method": "POST",
    "path": "/v1/components",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "id": "x",
      "name": "x",
      "lmx": "x"
    },
    "idField": "id"
  },
  {
    "entity": "component",
    "accessor": "Component",
    "op": "list",
    "method": "GET",
    "path": "/v1/components",
    "args": [],
    "select": {
      "cursor": "v1",
      "per_page": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "perPage",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "per_page",
        "wire": "perPage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "pagination": {
        "totalResults": 1,
        "returnedResults": 1,
        "perPage": 1,
        "totalPages": 1,
        "nextCursor": "x",
        "nextPage": "x"
      },
      "data": [
        {
          "id": "x",
          "name": "x",
          "lmx": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "component",
    "accessor": "Component",
    "op": "load",
    "method": "GET",
    "path": "/v1/components/{componentId}",
    "args": [
      {
        "name": "id",
        "wire": "componentId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "lmx": "x"
    },
    "idField": "id"
  },
  {
    "entity": "configuration",
    "accessor": "Configuration",
    "op": "list",
    "method": "GET",
    "path": "/v1/dedicated-sending-ips",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      "52.21.45.123",
      "52.21.45.124",
      "52.21.45.125"
    ],
    "idField": "id"
  },
  {
    "entity": "contact",
    "accessor": "Contact",
    "op": "list",
    "method": "GET",
    "path": "/v1/contacts/find",
    "action": "find",
    "args": [],
    "select": {
      "email": "v1",
      "user_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "email",
      "userId"
    ],
    "queryArgs": [
      {
        "name": "email",
        "wire": "email"
      },
      {
        "name": "user_id",
        "wire": "userId"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "id": "x",
        "email": "x",
        "firstName": "x",
        "lastName": "x",
        "source": "x",
        "subscribed": true,
        "userGroup": "x",
        "userId": "x",
        "mailingLists": {},
        "optInStatus": "accepted"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "contact_delete",
    "accessor": "ContactDelete",
    "op": "create",
    "method": "POST",
    "path": "/v1/contacts/delete",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "success": true,
      "message": "x"
    },
    "idField": "id"
  },
  {
    "entity": "contact_property",
    "accessor": "ContactProperty",
    "op": "list",
    "method": "GET",
    "path": "/v1/contacts/properties",
    "args": [],
    "select": {
      "list": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "list"
    ],
    "queryArgs": [
      {
        "name": "list",
        "wire": "list"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "key": "x",
        "label": "x",
        "type": "string"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "contact_property_success",
    "accessor": "ContactPropertySuccess",
    "op": "create",
    "method": "POST",
    "path": "/v1/contacts/properties",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "success": true
    },
    "idField": "id"
  },
  {
    "entity": "contact_success",
    "accessor": "ContactSuccess",
    "op": "create",
    "method": "POST",
    "path": "/v1/contacts/create",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "success": true,
      "id": "x"
    },
    "idField": "id"
  },
  {
    "entity": "contact_success",
    "accessor": "ContactSuccess",
    "op": "update",
    "method": "PUT",
    "path": "/v1/contacts/update",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "success": true,
      "id": "x"
    },
    "idField": "id"
  },
  {
    "entity": "contact_suppression_remove",
    "accessor": "ContactSuppressionRemove",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/contacts/suppression",
    "args": [],
    "select": {
      "email": "v1",
      "user_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "email",
      "userId"
    ],
    "queryArgs": [
      {
        "name": "email",
        "wire": "email"
      },
      {
        "name": "user_id",
        "wire": "userId"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "success": true,
      "message": "x",
      "removalQuota": {
        "limit": 1,
        "remaining": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "contact_suppression_status",
    "accessor": "ContactSuppressionStatus",
    "op": "load",
    "method": "GET",
    "path": "/v1/contacts/suppression",
    "args": [],
    "select": {
      "email": "v1",
      "user_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "email",
      "userId"
    ],
    "queryArgs": [
      {
        "name": "email",
        "wire": "email"
      },
      {
        "name": "user_id",
        "wire": "userId"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "contact": {
        "id": "x",
        "email": "x",
        "userId": "x"
      },
      "isSuppressed": true,
      "removalQuota": {
        "limit": 1,
        "remaining": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "create_upload",
    "accessor": "CreateUpload",
    "op": "create",
    "method": "POST",
    "path": "/v1/uploads",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "emailAssetId": "x",
      "presignedUrl": "x"
    },
    "idField": "id"
  },
  {
    "entity": "create_workflow_node",
    "accessor": "CreateWorkflowNode",
    "op": "create",
    "method": "POST",
    "path": "/v1/workflows/{workflowId}/nodes",
    "args": [
      {
        "name": "workflow_id",
        "wire": "workflowId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "node": {
        "id": "x",
        "typeName": "SignupTrigger",
        "nextNodeIds": [
          "x"
        ],
        "workflowRevisionId": "x",
        "createdChildNodes": [
          {
            "id": "x",
            "typeName": "SignupTrigger",
            "nextNodeIds": []
          }
        ]
      },
      "workflow": {
        "id": "x",
        "url": "x",
        "workflowRevisionId": "x",
        "status": "Draft",
        "name": "x",
        "description": "x",
        "mailingListId": "x",
        "rootNodeId": "x",
        "nodes": {
          "cf16k73gq014h3mmj5b6jdi9r": {
            "typeName": "SignupTrigger",
            "nextNodeIds": [
              "cf16k73gq014h3mmj5b4jdifg",
              "cf16k73gq014h3mmj5b4jdifh"
            ]
          }
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "email_message",
    "accessor": "EmailMessage",
    "op": "create",
    "method": "POST",
    "path": "/v1/email-messages/{emailMessageId}",
    "args": [
      {
        "name": "id",
        "wire": "emailMessageId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "campaignId": "x",
      "transactionalId": "x",
      "subject": "x",
      "previewText": "x",
      "fromName": "x",
      "fromEmail": "x",
      "replyToEmail": "x",
      "ccEmail": "x",
      "bccEmail": "x",
      "languageCode": "x",
      "emailFormat": "styled",
      "lmx": "x",
      "contentRevisionId": "x",
      "updatedAt": "2026-01-01T00:00:00Z",
      "contactPropertiesFallbacks": {},
      "eventPropertiesFallbacks": {},
      "dataVariablesFallbacks": {},
      "warnings": [
        {
          "rule": "x",
          "severity": "warning",
          "message": "x",
          "path": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "email_message",
    "accessor": "EmailMessage",
    "op": "load",
    "method": "GET",
    "path": "/v1/email-messages/{emailMessageId}",
    "args": [
      {
        "name": "id",
        "wire": "emailMessageId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "campaignId": "x",
      "transactionalId": "x",
      "subject": "x",
      "previewText": "x",
      "fromName": "x",
      "fromEmail": "x",
      "replyToEmail": "x",
      "ccEmail": "x",
      "bccEmail": "x",
      "languageCode": "x",
      "emailFormat": "styled",
      "lmx": "x",
      "contentRevisionId": "x",
      "updatedAt": "2026-01-01T00:00:00Z",
      "contactPropertiesFallbacks": {},
      "eventPropertiesFallbacks": {},
      "dataVariablesFallbacks": {},
      "warnings": [
        {
          "rule": "x",
          "severity": "warning",
          "message": "x",
          "path": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "email_message_guardian",
    "accessor": "EmailMessageGuardian",
    "op": "list",
    "method": "GET",
    "path": "/v1/email-messages/{emailMessageId}/guardian",
    "args": [
      {
        "name": "id",
        "wire": "emailMessageId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "errors": [
        {
          "rule": "missingButtonHrefs",
          "title": "Missing button link",
          "description": "Buttons won't work without href value",
          "items": [
            {
              "label": "Click here"
            }
          ]
        },
        {
          "rule": "missingLinkHrefs",
          "title": "Missing text link",
          "description": "Links won't work without href value",
          "items": [
            {
              "label": "See more"
            }
          ]
        }
      ],
      "warnings": []
    },
    "idField": "id"
  },
  {
    "entity": "email_message_preview",
    "accessor": "EmailMessagePreview",
    "op": "create",
    "method": "POST",
    "path": "/v1/email-messages/{emailMessageId}/preview",
    "args": [
      {
        "name": "id",
        "wire": "emailMessageId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x"
    },
    "idField": "id"
  },
  {
    "entity": "email_metric",
    "accessor": "EmailMetric",
    "op": "load",
    "method": "GET",
    "path": "/v1/workflows/{workflowId}/nodes/{nodeId}/metrics",
    "args": [
      {
        "name": "node_id",
        "wire": "nodeId",
        "value": "p1"
      },
      {
        "name": "workflow_id",
        "wire": "workflowId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "sends": 1,
      "opens": 1,
      "clicks": 1,
      "unsubscribes": 1,
      "spamReports": 1,
      "hardBounces": 1,
      "softBounces": 1
    },
    "idField": "id"
  },
  {
    "entity": "email_metric",
    "accessor": "EmailMetric",
    "op": "load",
    "method": "GET",
    "path": "/v1/campaigns/{campaignId}/metrics",
    "args": [
      {
        "name": "campaign_id",
        "wire": "campaignId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "sends": 1,
      "opens": 1,
      "clicks": 1,
      "unsubscribes": 1,
      "spamReports": 1,
      "hardBounces": 1,
      "softBounces": 1
    },
    "idField": "id"
  },
  {
    "entity": "event_pattern",
    "accessor": "EventPattern",
    "op": "list",
    "method": "GET",
    "path": "/v1/event-patterns",
    "args": [],
    "select": {
      "cursor": "v1",
      "per_page": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "perPage",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "per_page",
        "wire": "perPage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "pagination": {
        "totalResults": 1,
        "returnedResults": 1,
        "perPage": 1,
        "totalPages": 1,
        "nextCursor": "x",
        "nextPage": "x"
      },
      "data": [
        {
          "id": "x",
          "eventName": "x",
          "incomingWebhookPlatform": "clerk"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "event_pattern",
    "accessor": "EventPattern",
    "op": "load",
    "method": "GET",
    "path": "/v1/event-patterns/by-name/{eventName}",
    "args": [
      {
        "name": "event_name",
        "wire": "eventName",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "eventName": "x",
      "eventProperties": [
        {
          "name": "x",
          "type": "string"
        }
      ],
      "incomingWebhookPlatform": "clerk"
    },
    "idField": "id"
  },
  {
    "entity": "event_pattern",
    "accessor": "EventPattern",
    "op": "load",
    "method": "GET",
    "path": "/v1/event-patterns/{eventPatternId}",
    "args": [
      {
        "name": "id",
        "wire": "eventPatternId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "eventName": "x",
      "eventProperties": [
        {
          "name": "x",
          "type": "string"
        }
      ],
      "incomingWebhookPlatform": "clerk"
    },
    "idField": "id"
  },
  {
    "entity": "event_success",
    "accessor": "EventSuccess",
    "op": "create",
    "method": "POST",
    "path": "/v1/events/send",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "idempotency_key",
        "wire": "Idempotency-Key",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "success": true
    },
    "idField": "id"
  },
  {
    "entity": "group",
    "accessor": "Group",
    "op": "create",
    "method": "POST",
    "path": "/v1/campaign-groups/{campaignGroupId}",
    "args": [
      {
        "name": "campaign_group_id",
        "wire": "campaignGroupId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "description": "x",
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "group",
    "accessor": "Group",
    "op": "create",
    "method": "POST",
    "path": "/v1/transactional-groups/{transactionalGroupId}",
    "args": [
      {
        "name": "transactional_group_id",
        "wire": "transactionalGroupId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "description": "x",
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "group",
    "accessor": "Group",
    "op": "create",
    "method": "POST",
    "path": "/v1/workflow-groups/{workflowGroupId}",
    "args": [
      {
        "name": "workflow_group_id",
        "wire": "workflowGroupId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "description": "x",
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "group",
    "accessor": "Group",
    "op": "load",
    "method": "GET",
    "path": "/v1/campaign-groups/{campaignGroupId}",
    "args": [
      {
        "name": "campaign_group_id",
        "wire": "campaignGroupId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "description": "x",
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "group",
    "accessor": "Group",
    "op": "load",
    "method": "GET",
    "path": "/v1/transactional-groups/{transactionalGroupId}",
    "args": [
      {
        "name": "transactional_group_id",
        "wire": "transactionalGroupId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "description": "x",
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "group",
    "accessor": "Group",
    "op": "load",
    "method": "GET",
    "path": "/v1/workflow-groups/{workflowGroupId}",
    "args": [
      {
        "name": "workflow_group_id",
        "wire": "workflowGroupId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "description": "x",
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "mailing_list",
    "accessor": "MailingList",
    "op": "list",
    "method": "GET",
    "path": "/v1/lists",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "id": "x",
        "name": "x",
        "description": "x",
        "isPublic": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "simplified_workflow",
    "accessor": "SimplifiedWorkflow",
    "op": "create",
    "method": "POST",
    "path": "/v1/workflows/{workflowId}",
    "args": [
      {
        "name": "id",
        "wire": "workflowId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "url": "x",
      "workflowRevisionId": "x",
      "status": "Draft",
      "name": "x",
      "description": "x",
      "mailingListId": "x",
      "rootNodeId": "x",
      "nodes": {
        "cf16k73gq014h3mmj5b6jdi9r": {
          "typeName": "SignupTrigger",
          "nextNodeIds": [
            "cf16k73gq014h3mmj5b4jdifg",
            "cf16k73gq014h3mmj5b4jdifh"
          ]
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "simplified_workflow",
    "accessor": "SimplifiedWorkflow",
    "op": "create",
    "method": "POST",
    "path": "/v1/workflows",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "url": "x",
      "workflowRevisionId": "x",
      "status": "Draft",
      "name": "x",
      "description": "x",
      "mailingListId": "x",
      "rootNodeId": "x",
      "nodes": {
        "cf16k73gq014h3mmj5b6jdi9r": {
          "typeName": "SignupTrigger",
          "nextNodeIds": [
            "cf16k73gq014h3mmj5b4jdifg",
            "cf16k73gq014h3mmj5b4jdifh"
          ]
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "simplified_workflow",
    "accessor": "SimplifiedWorkflow",
    "op": "list",
    "method": "GET",
    "path": "/v1/workflows",
    "args": [],
    "select": {
      "cursor": "v1",
      "per_page": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "perPage",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "per_page",
        "wire": "perPage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "pagination": {
        "totalResults": 1,
        "returnedResults": 1,
        "perPage": 1,
        "totalPages": 1,
        "nextCursor": "x",
        "nextPage": "x"
      },
      "data": [
        {
          "id": "x",
          "url": "x",
          "name": "x",
          "createdAt": "2026-01-01T00:00:00Z",
          "updatedAt": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "simplified_workflow",
    "accessor": "SimplifiedWorkflow",
    "op": "load",
    "method": "GET",
    "path": "/v1/workflows/{workflowId}",
    "args": [
      {
        "name": "id",
        "wire": "workflowId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "url": "x",
      "workflowRevisionId": "x",
      "status": "Draft",
      "name": "x",
      "description": "x",
      "mailingListId": "x",
      "rootNodeId": "x",
      "nodes": {
        "cf16k73gq014h3mmj5b6jdi9r": {
          "typeName": "SignupTrigger",
          "nextNodeIds": [
            "cf16k73gq014h3mmj5b4jdifg",
            "cf16k73gq014h3mmj5b4jdifh"
          ]
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "theme",
    "accessor": "Theme",
    "op": "create",
    "method": "POST",
    "path": "/v1/themes",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "id": "x",
      "name": "x",
      "styles": {
        "backgroundColor": "x",
        "backgroundXPadding": 1,
        "backgroundYPadding": 1,
        "bodyColor": "x",
        "bodyXPadding": 1,
        "bodyYPadding": 1,
        "bodyFontFamily": "x",
        "bodyFontCategory": "x",
        "borderColor": "x",
        "borderWidth": 1,
        "borderRadius": 1,
        "buttonBodyColor": "x",
        "buttonBodyXPadding": 1,
        "buttonBodyYPadding": 1,
        "buttonBorderColor": "x",
        "buttonBorderWidth": 1,
        "buttonBorderRadius": 1,
        "buttonTextColor": "x",
        "buttonTextFormat": 1,
        "buttonTextFontSize": 1,
        "dividerColor": "x",
        "dividerBorderWidth": 1,
        "textBaseColor": "x",
        "textBaseFontSize": 1,
        "textBaseLineHeight": 1,
        "textBaseLetterSpacing": 1,
        "textLinkColor": "x",
        "heading1Color": "x",
        "heading1FontSize": 1,
        "heading1LineHeight": 1,
        "heading1LetterSpacing": 1,
        "heading2Color": "x",
        "heading2FontSize": 1,
        "heading2LineHeight": 1,
        "heading2LetterSpacing": 1,
        "heading3Color": "x",
        "heading3FontSize": 1,
        "heading3LineHeight": 1,
        "heading3LetterSpacing": 1
      },
      "isDefault": true,
      "createdAt": "x",
      "updatedAt": "x"
    },
    "idField": "id"
  },
  {
    "entity": "theme",
    "accessor": "Theme",
    "op": "list",
    "method": "GET",
    "path": "/v1/themes",
    "args": [],
    "select": {
      "cursor": "v1",
      "per_page": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "perPage",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "per_page",
        "wire": "perPage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "pagination": {
        "totalResults": 1,
        "returnedResults": 1,
        "perPage": 1,
        "totalPages": 1,
        "nextCursor": "x",
        "nextPage": "x"
      },
      "data": [
        {
          "id": "x",
          "name": "x",
          "styles": {
            "backgroundColor": "x",
            "backgroundXPadding": 1,
            "backgroundYPadding": 1,
            "bodyColor": "x",
            "bodyXPadding": 1,
            "bodyYPadding": 1,
            "bodyFontFamily": "x",
            "bodyFontCategory": "x",
            "borderColor": "x",
            "borderWidth": 1,
            "borderRadius": 1,
            "buttonBodyColor": "x",
            "buttonBodyXPadding": 1,
            "buttonBodyYPadding": 1,
            "buttonBorderColor": "x",
            "buttonBorderWidth": 1,
            "buttonBorderRadius": 1,
            "buttonTextColor": "x",
            "buttonTextFormat": 1,
            "buttonTextFontSize": 1,
            "dividerColor": "x",
            "dividerBorderWidth": 1,
            "textBaseColor": "x",
            "textBaseFontSize": 1,
            "textBaseLineHeight": 1,
            "textBaseLetterSpacing": 1,
            "textLinkColor": "x",
            "heading1Color": "x",
            "heading1FontSize": 1,
            "heading1LineHeight": 1,
            "heading1LetterSpacing": 1,
            "heading2Color": "x",
            "heading2FontSize": 1,
            "heading2LineHeight": 1,
            "heading2LetterSpacing": 1,
            "heading3Color": "x",
            "heading3FontSize": 1,
            "heading3LineHeight": 1,
            "heading3LetterSpacing": 1
          },
          "isDefault": true,
          "createdAt": "x",
          "updatedAt": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "theme",
    "accessor": "Theme",
    "op": "load",
    "method": "GET",
    "path": "/v1/themes/{themeId}",
    "args": [
      {
        "name": "id",
        "wire": "themeId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "styles": {
        "backgroundColor": "x",
        "backgroundXPadding": 1,
        "backgroundYPadding": 1,
        "bodyColor": "x",
        "bodyXPadding": 1,
        "bodyYPadding": 1,
        "bodyFontFamily": "x",
        "bodyFontCategory": "x",
        "borderColor": "x",
        "borderWidth": 1,
        "borderRadius": 1,
        "buttonBodyColor": "x",
        "buttonBodyXPadding": 1,
        "buttonBodyYPadding": 1,
        "buttonBorderColor": "x",
        "buttonBorderWidth": 1,
        "buttonBorderRadius": 1,
        "buttonTextColor": "x",
        "buttonTextFormat": 1,
        "buttonTextFontSize": 1,
        "dividerColor": "x",
        "dividerBorderWidth": 1,
        "textBaseColor": "x",
        "textBaseFontSize": 1,
        "textBaseLineHeight": 1,
        "textBaseLetterSpacing": 1,
        "textLinkColor": "x",
        "heading1Color": "x",
        "heading1FontSize": 1,
        "heading1LineHeight": 1,
        "heading1LetterSpacing": 1,
        "heading2Color": "x",
        "heading2FontSize": 1,
        "heading2LineHeight": 1,
        "heading2LetterSpacing": 1,
        "heading3Color": "x",
        "heading3FontSize": 1,
        "heading3LineHeight": 1,
        "heading3LetterSpacing": 1
      },
      "isDefault": true,
      "createdAt": "x",
      "updatedAt": "x"
    },
    "idField": "id"
  },
  {
    "entity": "transactional",
    "accessor": "Transactional",
    "op": "create",
    "method": "POST",
    "path": "/v1/transactional",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "idempotency_key",
        "wire": "Idempotency-Key",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "success": true
    },
    "idField": "id"
  },
  {
    "entity": "transactional",
    "accessor": "Transactional",
    "op": "list",
    "method": "GET",
    "path": "/v1/transactional",
    "args": [],
    "select": {
      "cursor": "v1",
      "per_page": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "perPage",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "per_page",
        "wire": "perPage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "pagination": {
        "totalResults": 1,
        "returnedResults": 1,
        "perPage": 1,
        "totalPages": 1,
        "nextCursor": "x",
        "nextPage": "x"
      },
      "data": [
        {
          "id": "x",
          "name": "x",
          "lastUpdated": "x",
          "dataVariables": []
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "transactional_draft",
    "accessor": "TransactionalDraft",
    "op": "create",
    "method": "POST",
    "path": "/v1/transactional-emails/{transactionalId}/draft",
    "args": [
      {
        "name": "transactional_email_id",
        "wire": "transactionalId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "url": "x",
      "name": "x",
      "draftEmailMessageId": "x",
      "draftEmailMessageContentRevisionId": "x",
      "publishedEmailMessageId": "x",
      "transactionalGroupId": "x",
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-01T00:00:00Z",
      "dataVariables": [
        "x"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "transactional_metric",
    "accessor": "TransactionalMetric",
    "op": "load",
    "method": "GET",
    "path": "/v1/transactional-emails/{transactionalId}/metrics",
    "args": [
      {
        "name": "transactional_email_id",
        "wire": "transactionalId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "sends": 1,
      "deliveries": 1,
      "spamReports": 1,
      "hardBounces": 1,
      "softBounces": 1
    },
    "idField": "id"
  },
  {
    "entity": "transactional_resource",
    "accessor": "TransactionalResource",
    "op": "create",
    "method": "POST",
    "path": "/v1/transactional-emails",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "id": "x",
      "url": "x",
      "name": "x",
      "draftEmailMessageId": "x",
      "draftEmailMessageContentRevisionId": "x",
      "publishedEmailMessageId": "x",
      "transactionalGroupId": "x",
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-01T00:00:00Z",
      "dataVariables": [
        "x"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "transactional_resource",
    "accessor": "TransactionalResource",
    "op": "list",
    "method": "GET",
    "path": "/v1/transactional-emails",
    "args": [],
    "select": {
      "cursor": "v1",
      "per_page": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "perPage",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "per_page",
        "wire": "perPage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "pagination": {
        "totalResults": 1,
        "returnedResults": 1,
        "perPage": 1,
        "totalPages": 1,
        "nextCursor": "x",
        "nextPage": "x"
      },
      "data": [
        {
          "id": "x",
          "url": "x",
          "name": "x",
          "draftEmailMessageId": "x",
          "publishedEmailMessageId": "x",
          "transactionalGroupId": "x",
          "createdAt": "2026-01-01T00:00:00Z",
          "updatedAt": "2026-01-01T00:00:00Z",
          "dataVariables": [
            "x"
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "transactional_resource",
    "accessor": "TransactionalResource",
    "op": "load",
    "method": "GET",
    "path": "/v1/transactional-emails/{transactionalId}",
    "args": [
      {
        "name": "transactional_id",
        "wire": "transactionalId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "url": "x",
      "name": "x",
      "draftEmailMessageId": "x",
      "publishedEmailMessageId": "x",
      "transactionalGroupId": "x",
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-01-01T00:00:00Z",
      "dataVariables": [
        "x"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "update_component",
    "accessor": "UpdateComponent",
    "op": "create",
    "method": "POST",
    "path": "/v1/components/{componentId}",
    "args": [
      {
        "name": "id",
        "wire": "componentId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "lmx": "x",
      "affectedEmailCount": 1
    },
    "idField": "id"
  },
  {
    "entity": "update_theme",
    "accessor": "UpdateTheme",
    "op": "create",
    "method": "POST",
    "path": "/v1/themes/{themeId}",
    "args": [
      {
        "name": "id",
        "wire": "themeId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "name": "x",
      "styles": {
        "backgroundColor": "x",
        "backgroundXPadding": 1,
        "backgroundYPadding": 1,
        "bodyColor": "x",
        "bodyXPadding": 1,
        "bodyYPadding": 1,
        "bodyFontFamily": "x",
        "bodyFontCategory": "x",
        "borderColor": "x",
        "borderWidth": 1,
        "borderRadius": 1,
        "buttonBodyColor": "x",
        "buttonBodyXPadding": 1,
        "buttonBodyYPadding": 1,
        "buttonBorderColor": "x",
        "buttonBorderWidth": 1,
        "buttonBorderRadius": 1,
        "buttonTextColor": "x",
        "buttonTextFormat": 1,
        "buttonTextFontSize": 1,
        "dividerColor": "x",
        "dividerBorderWidth": 1,
        "textBaseColor": "x",
        "textBaseFontSize": 1,
        "textBaseLineHeight": 1,
        "textBaseLetterSpacing": 1,
        "textLinkColor": "x",
        "heading1Color": "x",
        "heading1FontSize": 1,
        "heading1LineHeight": 1,
        "heading1LetterSpacing": 1,
        "heading2Color": "x",
        "heading2FontSize": 1,
        "heading2LineHeight": 1,
        "heading2LetterSpacing": 1,
        "heading3Color": "x",
        "heading3FontSize": 1,
        "heading3LineHeight": 1,
        "heading3LetterSpacing": 1
      },
      "isDefault": true,
      "createdAt": "x",
      "updatedAt": "x",
      "affectedEmailCount": 1
    },
    "idField": "id"
  },
  {
    "entity": "update_workflow_node",
    "accessor": "UpdateWorkflowNode",
    "op": "create",
    "method": "POST",
    "path": "/v1/workflows/{workflowId}/nodes/{nodeId}",
    "args": [
      {
        "name": "id",
        "wire": "nodeId",
        "value": "p1"
      },
      {
        "name": "workflow_id",
        "wire": "workflowId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "typeName": "SignupTrigger",
      "nextNodeIds": [
        "x"
      ],
      "workflowRevisionId": "x",
      "workflow": {
        "id": "x",
        "url": "x",
        "workflowRevisionId": "x",
        "status": "Draft",
        "name": "x",
        "description": "x",
        "mailingListId": "x",
        "rootNodeId": "x",
        "nodes": {
          "cf16k73gq014h3mmj5b6jdi9r": {
            "typeName": "SignupTrigger",
            "nextNodeIds": [
              "cf16k73gq014h3mmj5b4jdifg",
              "cf16k73gq014h3mmj5b4jdifh"
            ]
          }
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "workflow",
    "accessor": "Workflow",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/workflows/{workflowId}",
    "args": [
      {
        "name": "id",
        "wire": "workflowId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "workflow_node",
    "accessor": "WorkflowNode",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/workflows/{workflowId}/nodes/{nodeId}",
    "args": [
      {
        "name": "id",
        "wire": "nodeId",
        "value": "p1"
      },
      {
        "name": "workflow_id",
        "wire": "workflowId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": "dryRun",
      "nodeIds": [
        "x"
      ],
      "queuedContactCount": 1
    },
    "idField": "id"
  },
  {
    "entity": "workflow_node",
    "accessor": "WorkflowNode",
    "op": "remove",
    "method": "DELETE",
    "path": "/v1/workflows/{workflowId}/nodes/{nodeId}/recursive",
    "args": [
      {
        "name": "node_id",
        "wire": "nodeId",
        "value": "p1"
      },
      {
        "name": "workflow_id",
        "wire": "workflowId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "status": "dryRun",
      "nodeIds": [
        "x"
      ],
      "queuedContactCount": 1
    },
    "idField": "id"
  },
  {
    "entity": "workflow_node_with_revision",
    "accessor": "WorkflowNodeWithRevision",
    "op": "create",
    "method": "POST",
    "path": "/v1/workflows/{workflowId}/nodes/{nodeId}/add-branch",
    "action": "add_branch",
    "args": [
      {
        "name": "node_id",
        "wire": "nodeId",
        "value": "p1"
      },
      {
        "name": "workflow_id",
        "wire": "workflowId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "node": {
        "id": "x",
        "typeName": "SignupTrigger",
        "nextNodeIds": [
          "x"
        ],
        "workflowRevisionId": "x"
      },
      "workflow": {
        "id": "x",
        "url": "x",
        "workflowRevisionId": "x",
        "status": "Draft",
        "name": "x",
        "description": "x",
        "mailingListId": "x",
        "rootNodeId": "x",
        "nodes": {
          "cf16k73gq014h3mmj5b6jdi9r": {
            "typeName": "SignupTrigger",
            "nextNodeIds": [
              "cf16k73gq014h3mmj5b4jdifg",
              "cf16k73gq014h3mmj5b4jdifh"
            ]
          }
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "workflow_node_with_revision",
    "accessor": "WorkflowNodeWithRevision",
    "op": "create",
    "method": "POST",
    "path": "/v1/workflows/{workflowId}/nodes/{nodeId}/reroute",
    "action": "reroute",
    "args": [
      {
        "name": "node_id",
        "wire": "nodeId",
        "value": "p1"
      },
      {
        "name": "workflow_id",
        "wire": "workflowId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "typeName": "SignupTrigger",
      "nextNodeIds": [
        "x"
      ],
      "workflowRevisionId": "x",
      "workflow": {
        "id": "x",
        "url": "x",
        "workflowRevisionId": "x",
        "status": "Draft",
        "name": "x",
        "description": "x",
        "mailingListId": "x",
        "rootNodeId": "x",
        "nodes": {
          "cf16k73gq014h3mmj5b6jdi9r": {
            "typeName": "SignupTrigger",
            "nextNodeIds": [
              "cf16k73gq014h3mmj5b4jdifg",
              "cf16k73gq014h3mmj5b4jdifh"
            ]
          }
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "workflow_node_with_revision",
    "accessor": "WorkflowNodeWithRevision",
    "op": "load",
    "method": "GET",
    "path": "/v1/workflows/{workflowId}/nodes/{nodeId}",
    "args": [
      {
        "name": "node_id",
        "wire": "nodeId",
        "value": "p1"
      },
      {
        "name": "workflow_id",
        "wire": "workflowId",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": "x",
      "workflowId": "x",
      "typeName": "SignupTrigger",
      "nextNodeIds": [
        "x"
      ],
      "workflowRevisionId": "x"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
