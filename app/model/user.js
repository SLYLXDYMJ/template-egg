/** 表名称 **/
const TABLE_NAME = 'users'

/** 模型名称 **/
const MODEL_NAME = 'User'

module.exports = app => {
  if (!MODEL_NAME) return
  
  const { INTEGER, STRING, TEXT, FLOAT, BOOLEAN, ENUM, DATE } = app.Sequelize
  
  const Model = app.model.define(TABLE_NAME, {
    /**
     *  字段配置参数字典
     *    type             - 指定类型
     *    primaryKey       - 该字段为主键
     *    autoIncrement    - 该字段为自增整数列
     *    defaultValue     - 默认值
     *    allowNull        - 为 false 时该字段不能为 null
     *    unique           - 唯一值（可以为 true 和 字符串，字符串可以同时约束多个字段）
     *    field            - 指定数据库中该列的名称，默认和模型字段名相同
     **/
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: STRING,
      allowNull: false
    },
    createdAt: {
      type: DATE,
      allowNull: false
    },
    updatedAt: {
      type: DATE,
      allowNull: false
    }
  }, {
    /**
     *  配置参数字典
     *    tableName       - 指定表名，默认等于模型复数化名称
     *    freezeTableName - 为 true 时，停止自动复数化表名
     *    timestamps      - 为 false 时禁用 Sequelize 提供的 createdAt 和 updatedAt 自动管理
     *    createdAt       - 为 false 时仅关闭 createdAt 管理，为字符串时则修改自动管理的字段名称
     *    updatedAt       - 同上
     **/
  })
  
  /**
   *  配置字典
   *    as          - 指定当前源模型的别名，单数形式，如果你为一个表创建多次关联，或者不想使用定义模型时使用的名称
   *    foreignKey  - 指定目标表中的外键名，默认的外键命名规为 源模型名 + 源模型主键名
   *    targetKey   - 指定关联目标表的字段名，默认为目标表的主键字段
   *    hooks       - 设置为 true 时，会在关联模型删除时执行 before-/afterDestroy 钩子方法
   *
   *    constraints - 是否在删除或更新时启用外键约束，默认 true
   *    onDelete    - 指定删除时关联表该如何操作
   *    onUpdate    - 指定更新时关联表该如何操作
   *
   **/
  Model.associate = function () {
    /**
     *  一对一关系
     *  关联关系(外键)存在于目标模型中
     *  onDelete 可选：CASCADE SET NULL
     *  onUpdate 可选：CASCADE
     **/
    // app.model[ MODEL_NAME ].hasOne(null, {})
    
    /**
     *  多对一关系
     *  关联关系(外键)存在于源模型中
     *  onDelete 可选：SET NULL NO ACTION
     *  onUpdate 可选：CASCADE
     **/
    // app.model[ MODEL_NAME ].belongsTo(null, {})
    
    /**
     *  一对多关系
     *  关联关系(外键)存在于目标模型中
     *  onDelete 可选：SET NULL NO ACTION
     *  onUpdate 可选：CASCADE
     **/
    // app.model[ MODEL_NAME ].hasMany(null, {})
    
    /**
     *  多对对关系
     *  会通过 sourceId 和 targetId 创建交叉表
     *  onDelete 可选：SET NULL NO ACTION
     *  onUpdate 可选：CASCADE
     **/
    // app.model[ MODEL_NAME ].belongsToMany(null, {})
  }
  
  return Model
}