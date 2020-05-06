const { AuthenticationError } = require('apollo-server');

const user = {
  _id: '1',
  name: 'Dino',
  email: 'dhassiotis07@gmail.com',
  picture: 'https://cloudinary.com/dino'
};

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
    me: authenticated((root, args, ctx) => ctx.currentUser)
  }
};
