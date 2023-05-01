const db = require('../db-config/database');
const { DataTypes } = require('sequelize');

const PostComment = db.define('PostComment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

PostComment.sync({alter : true}).then(() => console.log("PostComment table created")
).catch(err => console.log("Error:" + err));

module.exports = PostComment
