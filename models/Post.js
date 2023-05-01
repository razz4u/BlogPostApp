const db = require('../db-config/database');
const { DataTypes } = require('sequelize');
const PostComment = require('./PostComment');

const Post = db.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Post.hasMany(PostComment, {
    foreignKey: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

PostComment.belongsTo(Post);


Post.sync({ alter: true }).then(() => console.log("Post table created")
).catch(err => console.log("Error:" + err));

module.exports = Post
