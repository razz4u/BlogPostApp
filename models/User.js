const db = require('../db-config/database');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const Post = require('./Post')
const PostComment = require('./PostComment')

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  defaultScope: {
    rawAttributes: { exclude: ['password'] },
  },
},
);

User.beforeCreate(async (user) => {
  user.password = await user.generatePasswordHash();
});

User.prototype.generatePasswordHash = function () {
  if (this.password) {
    return bcrypt.hash(this.password, 10);
  }
};


User.hasMany(Post, {
  foreignKey: {
      type: DataTypes.INTEGER,
      allowNull: false
  }
});


Post.belongsTo(User);
PostComment.belongsTo(User);

User.sync({ alter: true }).then(() => console.log("User table created")
).catch(err => console.log("Error:" + err));

module.exports = User
