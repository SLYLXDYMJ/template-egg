module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize
  
  const User = app.model.define('users', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: STRING,
    createdAt: DATE,
    updatedAt: DATE
  })
  
  return User
}