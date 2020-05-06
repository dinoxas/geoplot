const user = {
  _id: '1',
  name: 'Dino',
  email: 'dhassiotis07@gmail.com',
  picture: 'https://cloudinary.com/dino'
};

module.exports = {
  Query: {
    me: () => user
  }
};
