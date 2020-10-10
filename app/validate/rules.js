/**
 *  用户名
 **/
exports.username = [
  {
    required: true,
    whitespace: true,
    message: '用户名不能为空'
  },
  {
    min: 6,
    max: 16,
    message: '用户名长度为 6 ~ 16 位'
  }
]

/**
 *  密码规则
 **/
exports.password = [
  {
    required: true,
    whitespace: true,
    message: '密码不能为空'
  },
  {
    message: '密码要求 8 ~ 16 位，首位字母',
    pattern: /^[a-zA-Z][a-zA-Z0-9_]{8,16}$/
  }
]
