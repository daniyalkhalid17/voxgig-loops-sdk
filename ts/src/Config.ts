
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Loops',
        slug: "loops",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "https://app.loops.so/api",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        api_key: {
        },
  
        audience_segment: {
        },
  
        campaign: {
        },
  
        change_workflow_mailing_list: {
        },
  
        complete: {
        },
  
        component: {
        },
  
        configuration: {
        },
  
        contact: {
        },
  
        contact_delete: {
        },
  
        contact_property: {
        },
  
        contact_property_success: {
        },
  
        contact_success: {
        },
  
        contact_suppression_remove: {
        },
  
        contact_suppression_status: {
        },
  
        create_upload: {
        },
  
        create_workflow_node: {
        },
  
        email_message: {
        },
  
        email_message_guardian: {
        },
  
        email_message_preview: {
        },
  
        email_metric: {
        },
  
        event_pattern: {
        },
  
        event_success: {
        },
  
        group: {
        },
  
        mailing_list: {
        },
  
        simplified_workflow: {
        },
  
        theme: {
        },
  
        transactional: {
        },
  
        transactional_draft: {
        },
  
        transactional_metric: {
        },
  
        transactional_resource: {
        },
  
        update_component: {
        },
  
        update_theme: {
        },
  
        update_workflow_node: {
        },
  
        workflow: {
        },
  
        workflow_node: {
        },
  
        workflow_node_with_revision: {
        },
  
    }
  }


  entity = {
    "api_key": {
      "fields": [
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "teamName",
          "title": "Team Name",
          "type": "`$STRING`",
          "req": true,
          "short": "The name of the team the API key belongs to."
        }
      ],
      "name": "api_key",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/api-key",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "api-key"
                }
              ],
              "parts": [
                "v1",
                "api-key"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "audience_segment": {
      "fields": [
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the audience segment was created."
        },
        {
          "name": "description",
          "title": "Description",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "An optional description of the audience segment."
        },
        {
          "name": "filter",
          "title": "Filter",
          "type": [
            "`$ONE`",
            [
              "`$OBJECT`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "A tree of audience conditions combined with `match`."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the audience segment."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "The name of the audience segment."
        },
        {
          "name": "updatedAt",
          "title": "Updated At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the audience segment was last updated."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "audience_segment",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/audience-segments",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "audience-segments"
                }
              ],
              "parts": [
                "v1",
                "audience-segments"
              ],
              "rename": {},
              "transform": {
                "req": {
                  "description": "`reqdata.description`",
                  "filter": "`reqdata.filter`",
                  "name": "`reqdata.name`"
                },
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/audience-segments",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "audience-segments"
                }
              ],
              "parts": [
                "v1",
                "audience-segments"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "per_page",
                    "orig": "perPage",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/audience-segments/{audienceSegmentId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "audience-segments"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v1",
                "audience-segments",
                "{id}"
              ],
              "rename": {
                "param": {
                  "audienceSegmentId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "audienceSegmentId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "campaign": {
      "fields": [
        {
          "name": "audienceFilter",
          "title": "Audience Filter",
          "type": [
            "`$ONE`",
            [
              "`$OBJECT`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The filter rules that define the audience for this campaign, if set."
        },
        {
          "name": "audienceSegmentId",
          "title": "Audience Segment Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "op": {
            "create": {
              "type": [
                "`$ONE`",
                [
                  "`$STRING`",
                  "`$NULL`"
                ]
              ]
            }
          },
          "short": "The ID of the audience segment this campaign targets, if set."
        },
        {
          "name": "campaignGroupId",
          "title": "Campaign Group Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The ID of the campaign group this campaign belongs to."
        },
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the campaign was created.",
          "format": "date-time"
        },
        {
          "name": "emailMessageId",
          "title": "Email Message Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The associated email message ID."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the campaign."
        },
        {
          "name": "mailingListId",
          "title": "Mailing List Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "op": {
            "create": {
              "type": [
                "`$ONE`",
                [
                  "`$STRING`",
                  "`$NULL`"
                ]
              ]
            }
          },
          "short": "The ID of the mailing list this campaign sends to, if set."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The name of the campaign."
        },
        {
          "name": "scheduling",
          "title": "Scheduling",
          "type": "`$OBJECT`",
          "req": true,
          "short": "When the campaign is scheduled to send."
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "req": true,
          "short": "The status of the campaign."
        },
        {
          "name": "updatedAt",
          "title": "Updated At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the campaign was last updated.",
          "format": "date-time"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "req": true,
          "short": "The URL of the campaign in the Loops app.",
          "format": "uri"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "campaign",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/campaigns/{campaignId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "campaigns"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v1",
                "campaigns",
                "{id}"
              ],
              "rename": {
                "param": {
                  "campaignId": "id"
                }
              },
              "transform": {
                "req": {
                  "audienceFilter": "`reqdata.audience_filter`",
                  "audienceSegmentId": "`reqdata.audience_segment_id`",
                  "campaignGroupId": "`reqdata.campaign_group_id`",
                  "mailingListId": "`reqdata.mailing_list_id`",
                  "name": "`reqdata.name`",
                  "scheduling": "`reqdata.scheduling`"
                },
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "campaignId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/campaigns",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "campaigns"
                }
              ],
              "parts": [
                "v1",
                "campaigns"
              ],
              "rename": {},
              "transform": {
                "req": {
                  "audienceFilter": "`reqdata.audience_filter`",
                  "audienceSegmentId": "`reqdata.audience_segment_id`",
                  "campaignGroupId": "`reqdata.campaign_group_id`",
                  "mailingListId": "`reqdata.mailing_list_id`",
                  "name": "`reqdata.name`",
                  "scheduling": "`reqdata.scheduling`"
                },
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/campaigns",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "campaigns"
                }
              ],
              "parts": [
                "v1",
                "campaigns"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "per_page",
                    "orig": "perPage",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/campaigns/{campaignId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "campaigns"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v1",
                "campaigns",
                "{id}"
              ],
              "rename": {
                "param": {
                  "campaignId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "campaignId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "change_workflow_mailing_list": {
      "fields": [
        {
          "name": "dryRun",
          "title": "Dry Run",
          "type": "`$BOOLEAN`",
          "short": "If `true`, the request will be validated but the workflow will not be modified."
        },
        {
          "name": "expectedRevisionId",
          "title": "Expected Revision Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The workflow revision token returned by the latest workflow read or mutation."
        },
        {
          "name": "mailingListId",
          "title": "Mailing List Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The mailing list to use for the workflow."
        },
        {
          "name": "queuedContactPolicy",
          "title": "Queued Contact Policy",
          "type": "`$STRING`",
          "short": "`fail` returns queued-contact impact instead of mutating."
        }
      ],
      "name": "change_workflow_mailing_list",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/workflows/{workflowId}/mailing-list",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflows"
                },
                {
                  "var": "workflow_id"
                },
                {
                  "lit": "mailing-list"
                }
              ],
              "parts": [
                "v1",
                "workflows",
                "{workflow_id}",
                "mailing-list"
              ],
              "rename": {
                "param": {
                  "workflowId": "workflow_id"
                }
              },
              "transform": {
                "req": {
                  "dryRun": "`reqdata.dry_run`",
                  "expectedRevisionId": "`reqdata.expected_revision_id`",
                  "mailingListId": "`reqdata.mailing_list_id`",
                  "queuedContactPolicy": "`reqdata.queued_contact_policy`"
                },
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "workflow_id",
                    "orig": "workflowId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "workflow_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.workflow"
          ]
        ]
      }
    },
    "complete": {
      "fields": [
        {
          "name": "emailAssetId",
          "title": "Email Asset Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the created asset."
        },
        {
          "name": "finalUrl",
          "title": "Final Url",
          "type": "`$STRING`",
          "req": true,
          "short": "The public URL of the uploaded asset."
        }
      ],
      "name": "complete",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/uploads/{emailAssetId}/complete",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "uploads"
                },
                {
                  "var": "upload_id"
                },
                {
                  "lit": "complete"
                }
              ],
              "parts": [
                "v1",
                "uploads",
                "{upload_id}",
                "complete"
              ],
              "rename": {
                "param": {
                  "emailAssetId": "upload_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "upload_id",
                    "orig": "emailAssetId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "upload_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "component": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the component."
        },
        {
          "name": "lmx",
          "title": "Lmx",
          "type": "`$STRING`",
          "req": true,
          "short": "The component body serialized as LMX."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "The name of the component."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "component",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/components",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "components"
                }
              ],
              "parts": [
                "v1",
                "components"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/components",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "components"
                }
              ],
              "parts": [
                "v1",
                "components"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "per_page",
                    "orig": "perPage",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/components/{componentId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "components"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v1",
                "components",
                "{id}"
              ],
              "rename": {
                "param": {
                  "componentId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "componentId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "configuration": {
      "fields": [],
      "name": "configuration",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/dedicated-sending-ips",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "dedicated-sending-ips"
                }
              ],
              "parts": [
                "v1",
                "dedicated-sending-ips"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "contact": {
      "fields": [
        {
          "name": "email",
          "title": "Email",
          "type": "`$STRING`",
          "short": "The contact's email address."
        },
        {
          "name": "firstName",
          "title": "First Name",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "short": "The contact's first name."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "The contact's Loops ID."
        },
        {
          "name": "lastName",
          "title": "Last Name",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "short": "The contact's last name."
        },
        {
          "name": "mailingLists",
          "title": "Mailing Lists",
          "type": "`$OBJECT`",
          "short": "Mailing lists the contact is subscribed to, represented by key-value pairs of mailing list IDs and `true`."
        },
        {
          "name": "optInStatus",
          "title": "Opt In Status",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "short": "Double opt-in status."
        },
        {
          "name": "source",
          "title": "Source",
          "type": "`$STRING`",
          "short": "The source the contact was created from."
        },
        {
          "name": "subscribed",
          "title": "Subscribed",
          "type": "`$BOOLEAN`",
          "short": "Whether the contact will receive campaign and workflow emails."
        },
        {
          "name": "userGroup",
          "title": "User Group",
          "type": "`$STRING`",
          "short": "The contact's user group."
        },
        {
          "name": "userId",
          "title": "User Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "short": "The contact's unique user ID."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "contact",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/contacts/find",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "contacts"
                },
                {
                  "lit": "find"
                }
              ],
              "parts": [
                "v1",
                "contacts",
                "find"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "email",
                    "orig": "email",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "user_id",
                    "orig": "userId",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "$action": "find"
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "contact_delete": {
      "fields": [
        {
          "name": "email",
          "title": "Email",
          "type": "`$STRING`",
          "short": "The contact's email address."
        },
        {
          "name": "message",
          "title": "Message",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "userId",
          "title": "User Id",
          "type": "`$STRING`",
          "short": "The contact's unique user ID."
        }
      ],
      "name": "contact_delete",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/contacts/delete",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "contacts"
                },
                {
                  "lit": "delete"
                }
              ],
              "parts": [
                "v1",
                "contacts",
                "delete"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "contact_property": {
      "fields": [
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "req": true,
          "short": "The key of the contact property."
        },
        {
          "name": "label",
          "title": "Label",
          "type": "`$STRING`",
          "req": true,
          "short": "The human-friendly label for this property."
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "req": true,
          "short": "The type of property."
        }
      ],
      "name": "contact_property",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/contacts/properties",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "contacts"
                },
                {
                  "lit": "properties"
                }
              ],
              "parts": [
                "v1",
                "contacts",
                "properties"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "list",
                    "orig": "list",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "contact_property_success": {
      "fields": [
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "The name of the property."
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "req": true,
          "short": "The type of property."
        }
      ],
      "name": "contact_property_success",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/contacts/properties",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "contacts"
                },
                {
                  "lit": "properties"
                }
              ],
              "parts": [
                "v1",
                "contacts",
                "properties"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "contact_success": {
      "fields": [
        {
          "name": "email",
          "title": "Email",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "update": {
              "type": "`$STRING`"
            }
          },
          "short": "The contact's email address."
        },
        {
          "name": "firstName",
          "title": "First Name",
          "type": "`$STRING`",
          "short": "The contact's first name."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "lastName",
          "title": "Last Name",
          "type": "`$STRING`",
          "short": "The contact's last name."
        },
        {
          "name": "mailingLists",
          "title": "Mailing Lists",
          "type": "`$OBJECT`",
          "short": "Manage mailing list subscriptions."
        },
        {
          "name": "source",
          "title": "Source",
          "type": "`$STRING`",
          "short": "A custom source value to replace the default “API”."
        },
        {
          "name": "subscribed",
          "title": "Subscribed",
          "type": "`$BOOLEAN`",
          "short": "Whether the contact will receive campaign and workflow emails."
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "userGroup",
          "title": "User Group",
          "type": "`$STRING`",
          "short": "The contact's user group."
        },
        {
          "name": "userId",
          "title": "User Id",
          "type": "`$STRING`",
          "short": "A unique user ID (for example, from an external application)."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "contact_success",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/contacts/create",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "contacts"
                },
                {
                  "lit": "create"
                }
              ],
              "parts": [
                "v1",
                "contacts",
                "create"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/v1/contacts/update",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "contacts"
                },
                {
                  "lit": "update"
                }
              ],
              "parts": [
                "v1",
                "contacts",
                "update"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "contact_suppression_remove": {
      "fields": [],
      "name": "contact_suppression_remove",
      "op": {
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/v1/contacts/suppression",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "contacts"
                },
                {
                  "lit": "suppression"
                }
              ],
              "parts": [
                "v1",
                "contacts",
                "suppression"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.removalQuota`"
              },
              "args": {
                "query": [
                  {
                    "name": "email",
                    "orig": "email",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "user_id",
                    "orig": "userId",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "contact_suppression_status": {
      "fields": [
        {
          "name": "contact",
          "title": "Contact",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "isSuppressed",
          "title": "Is Suppressed",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Whether the contact is suppressed."
        },
        {
          "name": "removalQuota",
          "title": "Removal Quota",
          "type": "`$OBJECT`",
          "req": true,
          "short": "The removal quota for the contact."
        }
      ],
      "name": "contact_suppression_status",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/contacts/suppression",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "contacts"
                },
                {
                  "lit": "suppression"
                }
              ],
              "parts": [
                "v1",
                "contacts",
                "suppression"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "email",
                    "orig": "email",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "user_id",
                    "orig": "userId",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "create_upload": {
      "fields": [
        {
          "name": "contentLength",
          "title": "Content Length",
          "type": "`$INTEGER`",
          "req": true,
          "short": "The size of the file in bytes."
        },
        {
          "name": "contentType",
          "title": "Content Type",
          "type": "`$STRING`",
          "req": true,
          "short": "The MIME type of the file to upload."
        },
        {
          "name": "emailAssetId",
          "title": "Email Asset Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the created asset."
        },
        {
          "name": "presignedUrl",
          "title": "Presigned Url",
          "type": "`$STRING`",
          "req": true,
          "short": "The pre-signed URL to upload the file to with an HTTP `PUT` request."
        }
      ],
      "name": "create_upload",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/uploads",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "uploads"
                }
              ],
              "parts": [
                "v1",
                "uploads"
              ],
              "rename": {},
              "transform": {
                "req": {
                  "contentLength": "`reqdata.content_length`",
                  "contentType": "`reqdata.content_type`"
                },
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "create_workflow_node": {
      "fields": [
        {
          "name": "node",
          "title": "Node",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "workflow",
          "title": "Workflow",
          "type": "`$OBJECT`",
          "req": true
        }
      ],
      "name": "create_workflow_node",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/workflows/{workflowId}/nodes",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflows"
                },
                {
                  "var": "workflow_id"
                },
                {
                  "lit": "nodes"
                }
              ],
              "parts": [
                "v1",
                "workflows",
                "{workflow_id}",
                "nodes"
              ],
              "rename": {
                "param": {
                  "workflowId": "workflow_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "workflow_id",
                    "orig": "workflowId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "workflow_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.workflow"
          ]
        ]
      }
    },
    "email_message": {
      "fields": [
        {
          "name": "bccEmail",
          "title": "Bcc Email",
          "type": "`$STRING`",
          "short": "The email BCC address."
        },
        {
          "name": "campaignId",
          "title": "Campaign Id",
          "type": "`$STRING`",
          "short": "The campaign this email message belongs to."
        },
        {
          "name": "ccEmail",
          "title": "Cc Email",
          "type": "`$STRING`",
          "short": "The email CC address."
        },
        {
          "name": "contactPropertiesFallbacks",
          "title": "Contact Properties Fallbacks",
          "type": "`$OBJECT`",
          "short": "Fallback values for contact properties."
        },
        {
          "name": "contentRevisionId",
          "title": "Content Revision Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The current content revision."
        },
        {
          "name": "dataVariablesFallbacks",
          "title": "Data Variables Fallbacks",
          "type": "`$OBJECT`",
          "short": "Fallback values for data variables."
        },
        {
          "name": "emailFormat",
          "title": "Email Format",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The rendering format of the email."
        },
        {
          "name": "eventPropertiesFallbacks",
          "title": "Event Properties Fallbacks",
          "type": "`$OBJECT`",
          "short": "Fallback values for event properties."
        },
        {
          "name": "expectedRevisionId",
          "title": "Expected Revision Id",
          "type": "`$STRING`",
          "short": "The `contentRevisionId` you last fetched, or the `emailMessageContentRevisionId` you received when creating the campaign."
        },
        {
          "name": "fromEmail",
          "title": "From Email",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The email sender email address, without the team's sending domain."
        },
        {
          "name": "fromName",
          "title": "From Name",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The email sender name."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the email message."
        },
        {
          "name": "languageCode",
          "title": "Language Code",
          "type": "`$STRING`",
          "short": "ISO 639-1 language code for the email, e.g."
        },
        {
          "name": "lmx",
          "title": "Lmx",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The email body serialized as LMX."
        },
        {
          "name": "previewText",
          "title": "Preview Text",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The email preview text."
        },
        {
          "name": "replyToEmail",
          "title": "Reply To Email",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The email reply-to address."
        },
        {
          "name": "subject",
          "title": "Subject",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The email subject."
        },
        {
          "name": "transactionalId",
          "title": "Transactional Id",
          "type": "`$STRING`",
          "short": "The transactional email this email message belongs to."
        },
        {
          "name": "updatedAt",
          "title": "Updated At",
          "type": "`$STRING`",
          "req": true,
          "format": "date-time"
        },
        {
          "name": "warnings",
          "title": "Warnings",
          "type": "`$ARRAY`",
          "short": "Non-fatal issues raised while compiling the submitted LMX."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "email_message",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/email-messages/{emailMessageId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "email-messages"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v1",
                "email-messages",
                "{id}"
              ],
              "rename": {
                "param": {
                  "emailMessageId": "id"
                }
              },
              "transform": {
                "req": {
                  "bccEmail": "`reqdata.bcc_email`",
                  "ccEmail": "`reqdata.cc_email`",
                  "contactPropertiesFallbacks": "`reqdata.contact_properties_fallback`",
                  "dataVariablesFallbacks": "`reqdata.data_variables_fallback`",
                  "emailFormat": "`reqdata.email_format`",
                  "eventPropertiesFallbacks": "`reqdata.event_properties_fallback`",
                  "expectedRevisionId": "`reqdata.expected_revision_id`",
                  "fromEmail": "`reqdata.from_email`",
                  "fromName": "`reqdata.from_name`",
                  "languageCode": "`reqdata.language_code`",
                  "lmx": "`reqdata.lmx`",
                  "previewText": "`reqdata.preview_text`",
                  "replyToEmail": "`reqdata.reply_to_email`",
                  "subject": "`reqdata.subject`"
                },
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "emailMessageId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/email-messages/{emailMessageId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "email-messages"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v1",
                "email-messages",
                "{id}"
              ],
              "rename": {
                "param": {
                  "emailMessageId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "emailMessageId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "email_message_guardian": {
      "fields": [
        {
          "name": "errors",
          "title": "Errors",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Validation errors."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "warnings",
          "title": "Warnings",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Validation warnings."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "email_message_guardian",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/email-messages/{emailMessageId}/guardian",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "email-messages"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "guardian"
                }
              ],
              "parts": [
                "v1",
                "email-messages",
                "{id}",
                "guardian"
              ],
              "rename": {
                "param": {
                  "emailMessageId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "emailMessageId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "email_message_preview": {
      "fields": [
        {
          "name": "contactProperties",
          "title": "Contact Properties",
          "type": "`$OBJECT`",
          "short": "Contact property values to render."
        },
        {
          "name": "dataVariables",
          "title": "Data Variables",
          "type": "`$OBJECT`",
          "short": "Transactional data variables to render."
        },
        {
          "name": "emails",
          "title": "Emails",
          "type": "`$ARRAY`",
          "req": true,
          "short": "One or more addresses to send the preview to."
        },
        {
          "name": "eventProperties",
          "title": "Event Properties",
          "type": "`$OBJECT`",
          "short": "Event property values to render."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the email message the preview was sent for."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "email_message_preview",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/email-messages/{emailMessageId}/preview",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "email-messages"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "preview"
                }
              ],
              "parts": [
                "v1",
                "email-messages",
                "{id}",
                "preview"
              ],
              "rename": {
                "param": {
                  "emailMessageId": "id"
                }
              },
              "transform": {
                "req": {
                  "contactProperties": "`reqdata.contact_property`",
                  "dataVariables": "`reqdata.data_variable`",
                  "emails": "`reqdata.email`",
                  "eventProperties": "`reqdata.event_property`"
                },
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "emailMessageId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "email_metric": {
      "fields": [
        {
          "name": "clicks",
          "title": "Clicks",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of sends where at least one link was clicked."
        },
        {
          "name": "hardBounces",
          "title": "Hard Bounces",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of sends that hard bounced."
        },
        {
          "name": "opens",
          "title": "Opens",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of sends that were opened at least once."
        },
        {
          "name": "sends",
          "title": "Sends",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of sends."
        },
        {
          "name": "softBounces",
          "title": "Soft Bounces",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of sends that soft bounced."
        },
        {
          "name": "spamReports",
          "title": "Spam Reports",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of sends reported as spam."
        },
        {
          "name": "unsubscribes",
          "title": "Unsubscribes",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of unsubscribes."
        }
      ],
      "name": "email_metric",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/workflows/{workflowId}/nodes/{nodeId}/metrics",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflows"
                },
                {
                  "var": "workflow_id"
                },
                {
                  "lit": "nodes"
                },
                {
                  "var": "node_id"
                },
                {
                  "lit": "metrics"
                }
              ],
              "parts": [
                "v1",
                "workflows",
                "{workflow_id}",
                "nodes",
                "{node_id}",
                "metrics"
              ],
              "rename": {
                "param": {
                  "nodeId": "node_id",
                  "workflowId": "workflow_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "node_id",
                    "orig": "nodeId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "workflow_id",
                    "orig": "workflowId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "node_id",
                  "workflow_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/campaigns/{campaignId}/metrics",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "campaigns"
                },
                {
                  "var": "campaign_id"
                },
                {
                  "lit": "metrics"
                }
              ],
              "parts": [
                "v1",
                "campaigns",
                "{campaign_id}",
                "metrics"
              ],
              "rename": {
                "param": {
                  "campaignId": "campaign_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "campaign_id",
                    "orig": "campaignId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "campaign_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.campaign"
          ],
          [
            "$.main.kit.entity.workflow"
          ]
        ]
      }
    },
    "event_pattern": {
      "fields": [
        {
          "name": "eventName",
          "title": "Event Name",
          "type": "`$STRING`",
          "req": true,
          "short": "The name of the event pattern."
        },
        {
          "name": "eventProperties",
          "title": "Event Properties",
          "type": "`$ARRAY`",
          "req": true,
          "short": "The properties of the event pattern, which can be used in emails."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the event pattern."
        },
        {
          "name": "incomingWebhookPlatform",
          "title": "Incoming Webhook Platform",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The platform that sent this event pattern, if the event pattern is from an incoming webhook."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "event_pattern",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/event-patterns",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "event-patterns"
                }
              ],
              "parts": [
                "v1",
                "event-patterns"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "per_page",
                    "orig": "perPage",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/event-patterns/by-name/{eventName}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "event-patterns"
                },
                {
                  "lit": "by-name"
                },
                {
                  "var": "event_name"
                }
              ],
              "parts": [
                "v1",
                "event-patterns",
                "by-name",
                "{event_name}"
              ],
              "rename": {
                "param": {
                  "eventName": "event_name"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "event_name",
                    "orig": "eventName",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "event_name"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/event-patterns/{eventPatternId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "event-patterns"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v1",
                "event-patterns",
                "{id}"
              ],
              "rename": {
                "param": {
                  "eventPatternId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "eventPatternId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "event_success": {
      "fields": [
        {
          "name": "email",
          "title": "Email",
          "type": "`$STRING`",
          "short": "The contact's email address."
        },
        {
          "name": "eventName",
          "title": "Event Name",
          "type": "`$STRING`",
          "req": true,
          "short": "The name of the event."
        },
        {
          "name": "eventProperties",
          "title": "Event Properties",
          "type": "`$OBJECT`",
          "short": "An object containing event property data for the event, available in emails sent by the event."
        },
        {
          "name": "mailingLists",
          "title": "Mailing Lists",
          "type": "`$OBJECT`",
          "short": "Manage mailing list subscriptions."
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "userId",
          "title": "User Id",
          "type": "`$STRING`",
          "short": "The contact's unique user ID."
        }
      ],
      "name": "event_success",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/events/send",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "events"
                },
                {
                  "lit": "send"
                }
              ],
              "parts": [
                "v1",
                "events",
                "send"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "idempotency_key",
                    "orig": "Idempotency-Key",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "group": {
      "fields": [
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the group was created.",
          "format": "date-time"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The description of the group."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the group."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The name of the group."
        },
        {
          "name": "updatedAt",
          "title": "Updated At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the group was last updated.",
          "format": "date-time"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "group",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/campaign-groups/{campaignGroupId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "campaign-groups"
                },
                {
                  "var": "campaign_group_id"
                }
              ],
              "parts": [
                "v1",
                "campaign-groups",
                "{campaign_group_id}"
              ],
              "rename": {
                "param": {
                  "campaignGroupId": "campaign_group_id"
                }
              },
              "transform": {
                "req": {
                  "description": "`reqdata.description`",
                  "name": "`reqdata.name`"
                },
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "campaign_group_id",
                    "orig": "campaignGroupId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "campaign_group_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/transactional-groups/{transactionalGroupId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "transactional-groups"
                },
                {
                  "var": "transactional_group_id"
                }
              ],
              "parts": [
                "v1",
                "transactional-groups",
                "{transactional_group_id}"
              ],
              "rename": {
                "param": {
                  "transactionalGroupId": "transactional_group_id"
                }
              },
              "transform": {
                "req": {
                  "description": "`reqdata.description`",
                  "name": "`reqdata.name`"
                },
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "transactional_group_id",
                    "orig": "transactionalGroupId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "transactional_group_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/workflow-groups/{workflowGroupId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflow-groups"
                },
                {
                  "var": "workflow_group_id"
                }
              ],
              "parts": [
                "v1",
                "workflow-groups",
                "{workflow_group_id}"
              ],
              "rename": {
                "param": {
                  "workflowGroupId": "workflow_group_id"
                }
              },
              "transform": {
                "req": {
                  "description": "`reqdata.description`",
                  "name": "`reqdata.name`"
                },
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "workflow_group_id",
                    "orig": "workflowGroupId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "workflow_group_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/campaign-groups",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "campaign-groups"
                }
              ],
              "parts": [
                "v1",
                "campaign-groups"
              ],
              "rename": {},
              "transform": {
                "req": {
                  "description": "`reqdata.description`",
                  "name": "`reqdata.name`"
                },
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/transactional-groups",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "transactional-groups"
                }
              ],
              "parts": [
                "v1",
                "transactional-groups"
              ],
              "rename": {},
              "transform": {
                "req": {
                  "description": "`reqdata.description`",
                  "name": "`reqdata.name`"
                },
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/workflow-groups",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflow-groups"
                }
              ],
              "parts": [
                "v1",
                "workflow-groups"
              ],
              "rename": {},
              "transform": {
                "req": {
                  "description": "`reqdata.description`",
                  "name": "`reqdata.name`"
                },
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/campaign-groups",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "campaign-groups"
                }
              ],
              "parts": [
                "v1",
                "campaign-groups"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "per_page",
                    "orig": "perPage",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/transactional-groups",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "transactional-groups"
                }
              ],
              "parts": [
                "v1",
                "transactional-groups"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "per_page",
                    "orig": "perPage",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/workflow-groups",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflow-groups"
                }
              ],
              "parts": [
                "v1",
                "workflow-groups"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "per_page",
                    "orig": "perPage",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/campaign-groups/{campaignGroupId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "campaign-groups"
                },
                {
                  "var": "campaign_group_id"
                }
              ],
              "parts": [
                "v1",
                "campaign-groups",
                "{campaign_group_id}"
              ],
              "rename": {
                "param": {
                  "campaignGroupId": "campaign_group_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "campaign_group_id",
                    "orig": "campaignGroupId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "campaign_group_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/transactional-groups/{transactionalGroupId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "transactional-groups"
                },
                {
                  "var": "transactional_group_id"
                }
              ],
              "parts": [
                "v1",
                "transactional-groups",
                "{transactional_group_id}"
              ],
              "rename": {
                "param": {
                  "transactionalGroupId": "transactional_group_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "transactional_group_id",
                    "orig": "transactionalGroupId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "transactional_group_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/workflow-groups/{workflowGroupId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflow-groups"
                },
                {
                  "var": "workflow_group_id"
                }
              ],
              "parts": [
                "v1",
                "workflow-groups",
                "{workflow_group_id}"
              ],
              "rename": {
                "param": {
                  "workflowGroupId": "workflow_group_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "workflow_group_id",
                    "orig": "workflowGroupId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "workflow_group_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "mailing_list": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The description of the mailing list."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the mailing list."
        },
        {
          "name": "isPublic",
          "title": "Is Public",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Whether the mailing list is public (`true`) or private (`false`)."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "The name of the mailing list."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "mailing_list",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/lists",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "lists"
                }
              ],
              "parts": [
                "v1",
                "lists"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "simplified_workflow": {
      "fields": [
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the workflow was created.",
          "format": "date-time"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "The description of the workflow."
        },
        {
          "name": "expectedRevisionId",
          "title": "Expected Revision Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The workflow revision token returned by the latest workflow read or mutation."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the workflow."
        },
        {
          "name": "mailingListId",
          "title": "Mailing List Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "op": {
            "create": {
              "type": [
                "`$ONE`",
                [
                  "`$STRING`",
                  "`$NULL`"
                ]
              ]
            }
          },
          "short": "The ID of the mailing list the workflow sends to."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "list": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "The name of the workflow."
        },
        {
          "name": "nodes",
          "title": "Nodes",
          "type": "`$OBJECT`",
          "req": true,
          "short": "A map of node IDs to simplified node objects."
        },
        {
          "name": "rootNodeId",
          "title": "Root Node Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the root node in the workflow graph."
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "updatedAt",
          "title": "Updated At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the workflow was last updated.",
          "format": "date-time"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "req": true,
          "short": "The URL of the workflow in the Loops app.",
          "format": "uri"
        },
        {
          "name": "workflowRevisionId",
          "title": "Workflow Revision Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The current workflow revision token."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "simplified_workflow",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/workflows/{workflowId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflows"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v1",
                "workflows",
                "{id}"
              ],
              "rename": {
                "param": {
                  "workflowId": "id"
                }
              },
              "transform": {
                "req": {
                  "description": "`reqdata.description`",
                  "expectedRevisionId": "`reqdata.expected_revision_id`",
                  "name": "`reqdata.name`"
                },
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "workflowId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/workflows",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflows"
                }
              ],
              "parts": [
                "v1",
                "workflows"
              ],
              "rename": {},
              "transform": {
                "req": {
                  "description": "`reqdata.description`",
                  "mailingListId": "`reqdata.mailing_list_id`",
                  "name": "`reqdata.name`"
                },
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/workflows",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflows"
                }
              ],
              "parts": [
                "v1",
                "workflows"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "per_page",
                    "orig": "perPage",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/workflows/{workflowId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflows"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v1",
                "workflows",
                "{id}"
              ],
              "rename": {
                "param": {
                  "workflowId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "workflowId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "theme": {
      "fields": [
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the theme was created."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the theme."
        },
        {
          "name": "isDefault",
          "title": "Is Default",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Whether this theme is the team's default."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "The name of the theme."
        },
        {
          "name": "styles",
          "title": "Styles",
          "type": "`$OBJECT`",
          "req": true,
          "op": {
            "create": {
              "type": "`$OBJECT`"
            }
          },
          "short": "Flat map of style attributes, matching the attribute names accepted by the LMX `<Style />` tag."
        },
        {
          "name": "updatedAt",
          "title": "Updated At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the theme was last updated."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "theme",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/themes",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "themes"
                }
              ],
              "parts": [
                "v1",
                "themes"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/themes",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "themes"
                }
              ],
              "parts": [
                "v1",
                "themes"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "per_page",
                    "orig": "perPage",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/themes/{themeId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "themes"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v1",
                "themes",
                "{id}"
              ],
              "rename": {
                "param": {
                  "themeId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "themeId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "transactional": {
      "fields": [
        {
          "name": "addToAudience",
          "title": "Add To Audience",
          "type": "`$BOOLEAN`",
          "short": "If `true`, a contact will be created in your audience using the `email` value (if a matching contact doesn't already exist)."
        },
        {
          "name": "attachments",
          "title": "Attachments",
          "type": "`$ARRAY`",
          "short": "A list containing file objects to be sent along with an email message."
        },
        {
          "name": "dataVariables",
          "title": "Data Variables",
          "type": "`$OBJECT`",
          "op": {
            "list": {
              "req": true,
              "type": "`$ARRAY`"
            }
          },
          "short": "An object containing data as defined by the data variables added to the transactional email template."
        },
        {
          "name": "email",
          "title": "Email",
          "type": "`$STRING`",
          "req": true,
          "short": "The recipient's email address."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the transactional email."
        },
        {
          "name": "lastUpdated",
          "title": "Last Updated",
          "type": "`$STRING`",
          "req": true,
          "short": "The date and time the transactional email was last updated in ISO 8601 format."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "The name of the transactional email."
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "transactionalId",
          "title": "Transactional Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the transactional email to send."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "transactional",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/transactional",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "transactional"
                }
              ],
              "parts": [
                "v1",
                "transactional"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "idempotency_key",
                    "orig": "Idempotency-Key",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/transactional",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "transactional"
                }
              ],
              "parts": [
                "v1",
                "transactional"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "per_page",
                    "orig": "perPage",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "transactional_draft": {
      "fields": [
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the transactional email was created.",
          "format": "date-time"
        },
        {
          "name": "dataVariables",
          "title": "Data Variables",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Data variable names used by the published email."
        },
        {
          "name": "draftEmailMessageContentRevisionId",
          "title": "Draft Email Message Content Revision Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The `contentRevisionId` of the draft email message."
        },
        {
          "name": "draftEmailMessageId",
          "title": "Draft Email Message Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The ID of the draft email message."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the transactional email."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "The name of the transactional email."
        },
        {
          "name": "publishedEmailMessageId",
          "title": "Published Email Message Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The ID of the published email message."
        },
        {
          "name": "transactionalGroupId",
          "title": "Transactional Group Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "short": "The ID of the group this transactional email belongs to."
        },
        {
          "name": "updatedAt",
          "title": "Updated At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the transactional email was last updated.",
          "format": "date-time"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "req": true,
          "short": "The URL of the transactional email in the Loops app.",
          "format": "uri"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "transactional_draft",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/transactional-emails/{transactionalId}/draft",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "transactional-emails"
                },
                {
                  "var": "transactional_email_id"
                },
                {
                  "lit": "draft"
                }
              ],
              "parts": [
                "v1",
                "transactional-emails",
                "{transactional_email_id}",
                "draft"
              ],
              "rename": {
                "param": {
                  "transactionalId": "transactional_email_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "transactional_email_id",
                    "orig": "transactionalId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "transactional_email_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "transactional_metric": {
      "fields": [
        {
          "name": "deliveries",
          "title": "Deliveries",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of sends delivered."
        },
        {
          "name": "hardBounces",
          "title": "Hard Bounces",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of sends that hard bounced."
        },
        {
          "name": "sends",
          "title": "Sends",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of sends."
        },
        {
          "name": "softBounces",
          "title": "Soft Bounces",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of sends that soft bounced."
        },
        {
          "name": "spamReports",
          "title": "Spam Reports",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of sends reported as spam."
        }
      ],
      "name": "transactional_metric",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/transactional-emails/{transactionalId}/metrics",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "transactional-emails"
                },
                {
                  "var": "transactional_email_id"
                },
                {
                  "lit": "metrics"
                }
              ],
              "parts": [
                "v1",
                "transactional-emails",
                "{transactional_email_id}",
                "metrics"
              ],
              "rename": {
                "param": {
                  "transactionalId": "transactional_email_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "transactional_email_id",
                    "orig": "transactionalId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "transactional_email_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "transactional_resource": {
      "fields": [
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the transactional email was created.",
          "format": "date-time"
        },
        {
          "name": "dataVariables",
          "title": "Data Variables",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Data variable names used by the published email."
        },
        {
          "name": "draftEmailMessageId",
          "title": "Draft Email Message Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The ID of the draft email message."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the transactional email."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The name of the transactional email."
        },
        {
          "name": "publishedEmailMessageId",
          "title": "Published Email Message Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The ID of the published email message."
        },
        {
          "name": "transactionalGroupId",
          "title": "Transactional Group Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The ID of the group this transactional email belongs to."
        },
        {
          "name": "updatedAt",
          "title": "Updated At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the transactional email was last updated.",
          "format": "date-time"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "req": true,
          "short": "The URL of the transactional email in the Loops app.",
          "format": "uri"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "transactional_resource",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/transactional-emails/{transactionalId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "transactional-emails"
                },
                {
                  "var": "transactional_id"
                }
              ],
              "parts": [
                "v1",
                "transactional-emails",
                "{transactional_id}"
              ],
              "rename": {
                "param": {
                  "transactionalId": "transactional_id"
                }
              },
              "transform": {
                "req": {
                  "name": "`reqdata.name`",
                  "transactionalGroupId": "`reqdata.transactional_group_id`"
                },
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "transactional_id",
                    "orig": "transactionalId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "transactional_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/transactional-emails/{transactionalId}/publish",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "transactional-emails"
                },
                {
                  "var": "transactional_id"
                },
                {
                  "lit": "publish"
                }
              ],
              "parts": [
                "v1",
                "transactional-emails",
                "{transactional_id}",
                "publish"
              ],
              "rename": {
                "param": {
                  "transactionalId": "transactional_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "transactional_id",
                    "orig": "transactionalId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "transactional_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/transactional-emails",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "transactional-emails"
                }
              ],
              "parts": [
                "v1",
                "transactional-emails"
              ],
              "rename": {},
              "transform": {
                "req": {
                  "name": "`reqdata.name`",
                  "transactionalGroupId": "`reqdata.transactional_group_id`"
                },
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/transactional-emails",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "transactional-emails"
                }
              ],
              "parts": [
                "v1",
                "transactional-emails"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "per_page",
                    "orig": "perPage",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/transactional-emails/{transactionalId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "transactional-emails"
                },
                {
                  "var": "transactional_id"
                }
              ],
              "parts": [
                "v1",
                "transactional-emails",
                "{transactional_id}"
              ],
              "rename": {
                "param": {
                  "transactionalId": "transactional_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "transactional_id",
                    "orig": "transactionalId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "transactional_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "update_component": {
      "fields": [
        {
          "name": "affectedEmailCount",
          "title": "Affected Email Count",
          "type": "`$NUMBER`",
          "req": true,
          "short": "The number of emails using this component that were updated by the body change."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the component."
        },
        {
          "name": "lmx",
          "title": "Lmx",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The component body serialized as LMX."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The name of the component."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "update_component",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/components/{componentId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "components"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v1",
                "components",
                "{id}"
              ],
              "rename": {
                "param": {
                  "componentId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "componentId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "update_theme": {
      "fields": [
        {
          "name": "affectedEmailCount",
          "title": "Affected Email Count",
          "type": "`$NUMBER`",
          "req": true,
          "short": "The number of emails using this theme that are affected by the style change."
        },
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the theme was created."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the theme."
        },
        {
          "name": "isDefault",
          "title": "Is Default",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Whether this theme is the team's default."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "The name of the theme."
        },
        {
          "name": "styles",
          "title": "Styles",
          "type": "`$OBJECT`",
          "req": true,
          "op": {
            "create": {
              "type": "`$OBJECT`"
            }
          },
          "short": "Flat map of style attributes, matching the attribute names accepted by the LMX `<Style />` tag."
        },
        {
          "name": "updatedAt",
          "title": "Updated At",
          "type": "`$STRING`",
          "req": true,
          "short": "ISO 8601 timestamp for when the theme was last updated."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "update_theme",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/themes/{themeId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "themes"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v1",
                "themes",
                "{id}"
              ],
              "rename": {
                "param": {
                  "themeId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "themeId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "update_workflow_node": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "The description of the workflow."
        },
        {
          "name": "expectedRevisionId",
          "title": "Expected Revision Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The workflow revision token returned by the latest workflow read or mutation."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the workflow."
        },
        {
          "name": "mailingListId",
          "title": "Mailing List Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The ID of the mailing list the workflow sends to."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "The name of the workflow."
        },
        {
          "name": "nodes",
          "title": "Nodes",
          "type": "`$OBJECT`",
          "req": true,
          "short": "A map of node IDs to simplified node objects."
        },
        {
          "name": "payload",
          "title": "Payload",
          "type": "`$ANY`",
          "req": true,
          "short": "Node-type-specific fields to update."
        },
        {
          "name": "rootNodeId",
          "title": "Root Node Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the root node in the workflow graph."
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "req": true,
          "short": "The URL of the workflow in the Loops app.",
          "format": "uri"
        },
        {
          "name": "workflowRevisionId",
          "title": "Workflow Revision Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The current workflow revision token."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "update_workflow_node",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/workflows/{workflowId}/nodes/{nodeId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflows"
                },
                {
                  "var": "workflow_id"
                },
                {
                  "lit": "nodes"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v1",
                "workflows",
                "{workflow_id}",
                "nodes",
                "{id}"
              ],
              "rename": {
                "param": {
                  "nodeId": "id",
                  "workflowId": "workflow_id"
                }
              },
              "transform": {
                "req": {
                  "expectedRevisionId": "`reqdata.expected_revision_id`",
                  "payload": "`reqdata.payload`"
                },
                "res": "`body.workflow`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "nodeId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "workflow_id",
                    "orig": "workflowId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "workflow_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.workflow"
          ]
        ]
      }
    },
    "workflow": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "workflow",
      "op": {
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/v1/workflows/{workflowId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflows"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v1",
                "workflows",
                "{id}"
              ],
              "rename": {
                "param": {
                  "workflowId": "id"
                }
              },
              "transform": {
                "req": {
                  "confirmDelete": "`reqdata.confirm_delete`",
                  "expectedRevisionId": "`reqdata.expected_revision_id`"
                },
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "workflowId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "workflow_node": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "workflow_node",
      "op": {
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/v1/workflows/{workflowId}/nodes/{nodeId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflows"
                },
                {
                  "var": "workflow_id"
                },
                {
                  "lit": "nodes"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v1",
                "workflows",
                "{workflow_id}",
                "nodes",
                "{id}"
              ],
              "rename": {
                "param": {
                  "nodeId": "id",
                  "workflowId": "workflow_id"
                }
              },
              "transform": {
                "req": {
                  "dryRun": "`reqdata.dry_run`",
                  "expectedRevisionId": "`reqdata.expected_revision_id`",
                  "queuedContactPolicy": "`reqdata.queued_contact_policy`"
                },
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "nodeId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "workflow_id",
                    "orig": "workflowId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "workflow_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/v1/workflows/{workflowId}/nodes/{nodeId}/recursive",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflows"
                },
                {
                  "var": "workflow_id"
                },
                {
                  "lit": "nodes"
                },
                {
                  "var": "node_id"
                },
                {
                  "lit": "recursive"
                }
              ],
              "parts": [
                "v1",
                "workflows",
                "{workflow_id}",
                "nodes",
                "{node_id}",
                "recursive"
              ],
              "rename": {
                "param": {
                  "nodeId": "node_id",
                  "workflowId": "workflow_id"
                }
              },
              "transform": {
                "req": {
                  "dryRun": "`reqdata.dry_run`",
                  "expectedRevisionId": "`reqdata.expected_revision_id`",
                  "queuedContactPolicy": "`reqdata.queued_contact_policy`"
                },
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "node_id",
                    "orig": "nodeId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "workflow_id",
                    "orig": "workflowId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "node_id",
                  "workflow_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.workflow"
          ],
          [
            "$.main.kit.entity.workflow"
          ]
        ]
      }
    },
    "workflow_node_with_revision": {
      "fields": [
        {
          "name": "workflowRevisionId",
          "title": "Workflow Revision Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The current workflow revision token."
        }
      ],
      "name": "workflow_node_with_revision",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/workflows/{workflowId}/nodes/{nodeId}/add-branch",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflows"
                },
                {
                  "var": "workflow_id"
                },
                {
                  "lit": "nodes"
                },
                {
                  "var": "node_id"
                },
                {
                  "lit": "add-branch"
                }
              ],
              "parts": [
                "v1",
                "workflows",
                "{workflow_id}",
                "nodes",
                "{node_id}",
                "add-branch"
              ],
              "rename": {
                "param": {
                  "nodeId": "node_id",
                  "workflowId": "workflow_id"
                }
              },
              "transform": {
                "req": {
                  "expectedRevisionId": "`reqdata.expected_revision_id`"
                },
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "node_id",
                    "orig": "nodeId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "workflow_id",
                    "orig": "workflowId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "$action": "add_branch",
                "exist": [
                  "node_id",
                  "workflow_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/v1/workflows/{workflowId}/nodes/{nodeId}/reroute",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflows"
                },
                {
                  "var": "workflow_id"
                },
                {
                  "lit": "nodes"
                },
                {
                  "var": "node_id"
                },
                {
                  "lit": "reroute"
                }
              ],
              "parts": [
                "v1",
                "workflows",
                "{workflow_id}",
                "nodes",
                "{node_id}",
                "reroute"
              ],
              "rename": {
                "param": {
                  "nodeId": "node_id",
                  "workflowId": "workflow_id"
                }
              },
              "transform": {
                "req": {
                  "expectedRevisionId": "`reqdata.expected_revision_id`",
                  "newTargetNodeId": "`reqdata.new_target_node_id`"
                },
                "res": "`body.workflow`"
              },
              "args": {
                "params": [
                  {
                    "name": "node_id",
                    "orig": "nodeId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "workflow_id",
                    "orig": "workflowId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "$action": "reroute",
                "exist": [
                  "node_id",
                  "workflow_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/workflows/{workflowId}/nodes/{nodeId}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflows"
                },
                {
                  "var": "workflow_id"
                },
                {
                  "lit": "nodes"
                },
                {
                  "var": "node_id"
                }
              ],
              "parts": [
                "v1",
                "workflows",
                "{workflow_id}",
                "nodes",
                "{node_id}"
              ],
              "rename": {
                "param": {
                  "nodeId": "node_id",
                  "workflowId": "workflow_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "node_id",
                    "orig": "nodeId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "workflow_id",
                    "orig": "workflowId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "node_id",
                  "workflow_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.workflow"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

