define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "app/public/docs/main.js",
    "group": "F:\\Github Store\\template-egg\\app\\public\\docs\\main.js",
    "groupTitle": "F:\\Github Store\\template-egg\\app\\public\\docs\\main.js",
    "name": ""
  },
  {
    "type": " DELETE ",
    "url": "/product/:id",
    "title": "删除条目",
    "group": "产品",
    "success": {
      "fields": {
        "成功响应": [
          {
            "group": "成功响应",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "defaultValue": "200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "成功响应",
            "type": "Any",
            "optional": false,
            "field": "data",
            "description": "<p>响应数据</p>"
          },
          {
            "group": "成功响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "defaultValue": "√",
            "description": "<p>成功消息</p>"
          }
        ],
        "失败响应": [
          {
            "group": "失败响应",
            "type": "Integer",
            "allowedValues": [
              "\"400（客户端错误）\"",
              "\"401（鉴权失败）\"",
              "\"500（服务器错误）\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>状态码</p>"
          },
          {
            "group": "失败响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/product.js",
    "groupTitle": "产品",
    "name": " delete ProductId"
  },
  {
    "type": " GET ",
    "url": "/product",
    "title": "获取数据列表",
    "group": "产品",
    "parameter": {
      "fields": {
        "查询字符串_": [
          {
            "group": "查询字符串_",
            "type": "String",
            "optional": true,
            "field": "eq",
            "description": "<p>全等（?eq=id:8,name:jason,createdAt:1601174038966）</p>"
          },
          {
            "group": "查询字符串_",
            "type": "String",
            "optional": true,
            "field": "ne",
            "description": "<p>不全等（?ne=id:8,name:jason,createdAt:1601174038966）</p>"
          },
          {
            "group": "查询字符串_",
            "type": "String",
            "optional": true,
            "field": "in",
            "description": "<p>包含（?in=id:8,id:9,type:web,type:php）</p>"
          },
          {
            "group": "查询字符串_",
            "type": "String",
            "optional": true,
            "field": "notIn",
            "description": "<p>不包含（?notIn=id:8,id:9,type:web,type:php）</p>"
          },
          {
            "group": "查询字符串_",
            "type": "String",
            "optional": true,
            "field": "lt",
            "description": "<p>小于（?lt=price:9999,createdAt:1601173375000）</p>"
          },
          {
            "group": "查询字符串_",
            "type": "String",
            "optional": true,
            "field": "gt",
            "description": "<p>大于（?gt=price:1000,createdAt:1601173375000）</p>"
          },
          {
            "group": "查询字符串_",
            "type": "String",
            "optional": true,
            "field": "lte",
            "description": "<p>小于等于（?lte=price:9999,createdAt:1601173375000）</p>"
          },
          {
            "group": "查询字符串_",
            "type": "String",
            "optional": true,
            "field": "gte",
            "description": "<p>大于等于（?gte=price:9999,createdAt:1601173375000）</p>"
          },
          {
            "group": "查询字符串_",
            "type": "String",
            "optional": true,
            "field": "like",
            "description": "<p>模糊查询（?like=name:ja,body:ppa）</p>"
          },
          {
            "group": "查询字符串_",
            "type": "String",
            "optional": true,
            "field": "notLike",
            "description": "<p>模糊查询，不包含（?notLike=name:ja,body:ppa）</p>"
          }
        ],
        "查询字符串": [
          {
            "group": "查询字符串",
            "type": "Number",
            "optional": true,
            "field": "offset",
            "description": "<p>用于分页查询，跳过 offset 条结果</p>"
          },
          {
            "group": "查询字符串",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>用于分页查询，限制返回的条目数</p>"
          },
          {
            "group": "查询字符串",
            "type": "String",
            "optional": true,
            "field": "order",
            "description": "<p>排序，格式：createdAt:DESC,id:ASC</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "成功响应": [
          {
            "group": "成功响应",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "defaultValue": "200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "成功响应",
            "type": "Any",
            "optional": false,
            "field": "data",
            "description": "<p>响应数据</p>"
          },
          {
            "group": "成功响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "defaultValue": "√",
            "description": "<p>成功消息</p>"
          }
        ],
        "成功响应 data": [
          {
            "group": "成功响应 data",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>匹配的条目总数量，用于分页</p>"
          },
          {
            "group": "成功响应 data",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>条目数据</p>"
          }
        ],
        "失败响应": [
          {
            "group": "失败响应",
            "type": "Integer",
            "allowedValues": [
              "\"400（客户端错误）\"",
              "\"401（鉴权失败）\"",
              "\"500（服务器错误）\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>状态码</p>"
          },
          {
            "group": "失败响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/product.js",
    "groupTitle": "产品",
    "name": " get Product"
  },
  {
    "type": " GET ",
    "url": "/product/count",
    "title": "获取数量",
    "group": "产品",
    "parameter": {
      "fields": {
        "查询字符串": [
          {
            "group": "查询字符串",
            "type": "String",
            "optional": true,
            "field": "eq",
            "description": "<p>全等（?eq=id:8,name:jason,createdAt:1601174038966）</p>"
          },
          {
            "group": "查询字符串",
            "type": "String",
            "optional": true,
            "field": "ne",
            "description": "<p>不全等（?ne=id:8,name:jason,createdAt:1601174038966）</p>"
          },
          {
            "group": "查询字符串",
            "type": "String",
            "optional": true,
            "field": "in",
            "description": "<p>包含（?in=id:8,id:9,type:web,type:php）</p>"
          },
          {
            "group": "查询字符串",
            "type": "String",
            "optional": true,
            "field": "notIn",
            "description": "<p>不包含（?notIn=id:8,id:9,type:web,type:php）</p>"
          },
          {
            "group": "查询字符串",
            "type": "String",
            "optional": true,
            "field": "lt",
            "description": "<p>小于（?lt=price:9999,createdAt:1601173375000）</p>"
          },
          {
            "group": "查询字符串",
            "type": "String",
            "optional": true,
            "field": "gt",
            "description": "<p>大于（?gt=price:1000,createdAt:1601173375000）</p>"
          },
          {
            "group": "查询字符串",
            "type": "String",
            "optional": true,
            "field": "lte",
            "description": "<p>小于等于（?lte=price:9999,createdAt:1601173375000）</p>"
          },
          {
            "group": "查询字符串",
            "type": "String",
            "optional": true,
            "field": "gte",
            "description": "<p>大于等于（?gte=price:9999,createdAt:1601173375000）</p>"
          },
          {
            "group": "查询字符串",
            "type": "String",
            "optional": true,
            "field": "like",
            "description": "<p>模糊查询（?like=name:ja,body:ppa）</p>"
          },
          {
            "group": "查询字符串",
            "type": "String",
            "optional": true,
            "field": "notLike",
            "description": "<p>模糊查询，不包含（?notLike=name:ja,body:ppa）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "成功响应": [
          {
            "group": "成功响应",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "defaultValue": "200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "成功响应",
            "type": "Any",
            "optional": false,
            "field": "data",
            "description": "<p>响应数据</p>"
          },
          {
            "group": "成功响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "defaultValue": "√",
            "description": "<p>成功消息</p>"
          }
        ],
        "成功响应_": [
          {
            "group": "成功响应_",
            "type": "Number",
            "optional": false,
            "field": "data",
            "description": "<p>数量</p>"
          }
        ],
        "失败响应": [
          {
            "group": "失败响应",
            "type": "Integer",
            "allowedValues": [
              "\"400（客户端错误）\"",
              "\"401（鉴权失败）\"",
              "\"500（服务器错误）\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>状态码</p>"
          },
          {
            "group": "失败响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/product.js",
    "groupTitle": "产品",
    "name": " get ProductCount"
  },
  {
    "type": " GET ",
    "url": "/product/:id",
    "title": "根据 id 查询单条数据",
    "group": "产品",
    "success": {
      "fields": {
        "成功响应": [
          {
            "group": "成功响应",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "defaultValue": "200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "成功响应",
            "type": "Any",
            "optional": false,
            "field": "data",
            "description": "<p>响应数据</p>"
          },
          {
            "group": "成功响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "defaultValue": "√",
            "description": "<p>成功消息</p>"
          }
        ],
        "失败响应": [
          {
            "group": "失败响应",
            "type": "Integer",
            "allowedValues": [
              "\"400（客户端错误）\"",
              "\"401（鉴权失败）\"",
              "\"500（服务器错误）\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>状态码</p>"
          },
          {
            "group": "失败响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/product.js",
    "groupTitle": "产品",
    "name": " get ProductId"
  },
  {
    "type": " POST ",
    "url": "/product",
    "title": "创建条目",
    "group": "产品",
    "success": {
      "fields": {
        "成功响应": [
          {
            "group": "成功响应",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "defaultValue": "200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "成功响应",
            "type": "Any",
            "optional": false,
            "field": "data",
            "description": "<p>响应数据</p>"
          },
          {
            "group": "成功响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "defaultValue": "√",
            "description": "<p>成功消息</p>"
          }
        ],
        "失败响应": [
          {
            "group": "失败响应",
            "type": "Integer",
            "allowedValues": [
              "\"400（客户端错误）\"",
              "\"401（鉴权失败）\"",
              "\"500（服务器错误）\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>状态码</p>"
          },
          {
            "group": "失败响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/product.js",
    "groupTitle": "产品",
    "name": " post Product"
  },
  {
    "type": " PUT ",
    "url": "/product/:id",
    "title": "更新条目",
    "group": "产品",
    "success": {
      "fields": {
        "成功响应": [
          {
            "group": "成功响应",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "defaultValue": "200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "成功响应",
            "type": "Any",
            "optional": false,
            "field": "data",
            "description": "<p>响应数据</p>"
          },
          {
            "group": "成功响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "defaultValue": "√",
            "description": "<p>成功消息</p>"
          }
        ],
        "失败响应": [
          {
            "group": "失败响应",
            "type": "Integer",
            "allowedValues": [
              "\"400（客户端错误）\"",
              "\"401（鉴权失败）\"",
              "\"500（服务器错误）\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>状态码</p>"
          },
          {
            "group": "失败响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/product.js",
    "groupTitle": "产品",
    "name": " put ProductId"
  },
  {
    "type": " Get ",
    "url": "/me",
    "title": "获取用户信息",
    "group": "用户",
    "header": {
      "fields": {
        "请求头": [
          {
            "group": "请求头",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "成功响应": [
          {
            "group": "成功响应",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "defaultValue": "200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "成功响应",
            "type": "Any",
            "optional": false,
            "field": "data",
            "description": "<p>响应数据</p>"
          },
          {
            "group": "成功响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "defaultValue": "√",
            "description": "<p>成功消息</p>"
          }
        ],
        "失败响应": [
          {
            "group": "失败响应",
            "type": "Integer",
            "allowedValues": [
              "\"400（客户端错误）\"",
              "\"401（鉴权失败）\"",
              "\"500（服务器错误）\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>状态码</p>"
          },
          {
            "group": "失败响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/user.js",
    "groupTitle": "用户",
    "name": " get Me"
  },
  {
    "type": " Post ",
    "url": "/login",
    "title": "登录",
    "group": "用户",
    "parameter": {
      "fields": {
        "请求体": [
          {
            "group": "请求体",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "请求体",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "成功响应": [
          {
            "group": "成功响应",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "defaultValue": "200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "成功响应",
            "type": "Any",
            "optional": false,
            "field": "data",
            "description": "<p>响应数据</p>"
          },
          {
            "group": "成功响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "defaultValue": "√",
            "description": "<p>成功消息</p>"
          }
        ],
        "失败响应": [
          {
            "group": "失败响应",
            "type": "Integer",
            "allowedValues": [
              "\"400（客户端错误）\"",
              "\"401（鉴权失败）\"",
              "\"500（服务器错误）\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>状态码</p>"
          },
          {
            "group": "失败响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/user.js",
    "groupTitle": "用户",
    "name": " post Login"
  },
  {
    "type": " Post ",
    "url": "/register",
    "title": "注册",
    "group": "用户",
    "parameter": {
      "fields": {
        "请求体": [
          {
            "group": "请求体",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "请求体",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "成功响应": [
          {
            "group": "成功响应",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "defaultValue": "200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "成功响应",
            "type": "Any",
            "optional": false,
            "field": "data",
            "description": "<p>响应数据</p>"
          },
          {
            "group": "成功响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "defaultValue": "√",
            "description": "<p>成功消息</p>"
          }
        ],
        "失败响应": [
          {
            "group": "失败响应",
            "type": "Integer",
            "allowedValues": [
              "\"400（客户端错误）\"",
              "\"401（鉴权失败）\"",
              "\"500（服务器错误）\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>状态码</p>"
          },
          {
            "group": "失败响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/user.js",
    "groupTitle": "用户",
    "name": " post Register"
  },
  {
    "type": " Put ",
    "url": "/password",
    "title": "修改密码",
    "group": "用户",
    "header": {
      "fields": {
        "请求头": [
          {
            "group": "请求头",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "请求体": [
          {
            "group": "请求体",
            "type": "String",
            "optional": false,
            "field": "originPassword",
            "description": "<p>原始密码</p>"
          },
          {
            "group": "请求体",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>新密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "成功响应": [
          {
            "group": "成功响应",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "defaultValue": "200",
            "description": "<p>状态码</p>"
          },
          {
            "group": "成功响应",
            "type": "Any",
            "optional": false,
            "field": "data",
            "description": "<p>响应数据</p>"
          },
          {
            "group": "成功响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "defaultValue": "√",
            "description": "<p>成功消息</p>"
          }
        ],
        "失败响应": [
          {
            "group": "失败响应",
            "type": "Integer",
            "allowedValues": [
              "\"400（客户端错误）\"",
              "\"401（鉴权失败）\"",
              "\"500（服务器错误）\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>状态码</p>"
          },
          {
            "group": "失败响应",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误消息</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controller/user.js",
    "groupTitle": "用户",
    "name": " put Password"
  }
] });
