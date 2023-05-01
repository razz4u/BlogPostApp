const { where } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Post = require('../models/Post')

const resolvers = {
    register: async ({ username, email, password }) => {
        return await User.create({ username, email, password })
    },

    login: async ({ email, password }) => {
        const user = await User.findOne({ where: { email } });

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user.id }, "mySecret", {
                expiresIn: "1h"
            });

            return { ...user.toJSON(), token };
        }
        throw new Error('Invalid credentials');
    },

    createPost: async (args, context, info) => {
        const { title, content } = args
        const { user } = await context();

        if (!user) {
            throw new Error('You must login to create a post');
        }
        return await Post.create({
            UserId: user.id,
            content,
            title,
        });
    },

    createComment: async (args, context) => {
        const { content, postId } = args
        const { user } = await context();
        if (!user) {
            throw new Error('You must login to create a comment');
        }

        const post = await Post.findByPk(postId);

        if (post) {
            const comment = await Comment.create({
                content,
                PostId: postId,
                UserId: user.id,
            });
            return { comment };
        }
        throw new Error('Unable to create a comment');
    },

    updatePost: async ( args, context) => {
        const { id, title, content } = args 
        const { user } = await context()
        if (!user) {
            throw new Error('You must be logged in to update a post');
        }
        const post = await Post.findByPk(id);
        if (!post) {
            throw new Error('Post not found');
        }
        if (post.UserId !== user.id) {
            throw new Error('You can only update your own posts');
        }
        await post.update({ title, content, updatedAt: new Date() });
        return { success: true };
    },

    deletePost: async (args, context ) => {
        const { id }= args 
        const { user } = await context()
        if (!user) {
            throw new Error('You must be logged in to delete a post');
        }
        const post = await Post.findByPk(id);
        if (!post) {
            throw new Error('Post not found');
        }
        if (post.UserId !== user.id) {
            throw new Error('You can only update your own posts');
        }
        await post.destroy();
        return { success: true };
    },

    getAllPosts: async () => {
        const posts = await Post.findAll({ include: User });
        return posts;
      },
      getPostById: async ( { id }) => {
        const post = await Post.findByPk(id, { include: User });
        return post;
      },

};

module.exports = resolvers;
