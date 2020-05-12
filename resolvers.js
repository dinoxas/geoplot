const { AuthenticationError } = require('apollo-server');
const Pin = require('./models/Pin');

// ctx - context within new apollo server
const authenticated = (next) => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError('You must be logged in');
  }
  // make it possible to execute the resolver function
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser),
    getPins: async (root, args, ctx) => {
      // pass in empty filter to get all pins
      const pins = await Pin.find({})
        .populate('author')
        .populate('comments.author');
      return pins;
    }
  },
  Mutation: {
    createPin: authenticated(async (root, args, ctx) => {
      const newPin = await new Pin({
        ...args.input,
        author: ctx.currentUser._id
      }).save();

      // populate newPin document author field
      const pinAdded = await Pin.populate(newPin, 'author');

      return pinAdded;
    }),
    deletePin: authenticated(async (root, args, ctx) => {
      // pass in name of arg in deletePin mutation
      const pinDeleted = await Pin.findOneAndDelete({ _id: args.pinId }).exec();

      return pinDeleted;
    }),
    createComment: authenticated(async (root, args, ctx) => {
      const newComment = { text: args.text, author: ctx.currentUser._id };
      const pinUpdated = await Pin.findOneAndUpdate(
        { _id: args.pinId },
        { $push: { comments: newComment } },
        { new: true }
      )
        .populate('author')
        .populate('comments.author');

      return pinUpdated;
    })
  }
};
