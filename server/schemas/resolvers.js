const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      return await User.findOne(
        { $or: [{ _id: context._id}, { username: context.username }] }
      ).populate('savedBooks');
    },
  },

  Mutation: {
    loginUser: async (parent,  { email, password }) => {
      const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
      if (!user) {
        throw new AuthenticationError('Cannot find this user');
      }
  
      const correctPw = await user.isCorrectPassword(password);
  
      if (!correctPw) {
        throw new AuthenticationError('Wrong password!');
      }
      const token = signToken(user);
      return({ token, user });
    },
  
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
  
      if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { book }, context) => {
        try {
        return await User.findOneAndUpdate(
          { _id: context._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    },

    removeBook: async (parents, args, context) => {
      return await User.findOneAndUpdate(
        { _id: context._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true, runValidators: true }
        );
    }
  },
}
      

module.exports = resolvers;
