import express from 'express';
import userModel from '../models/User.js';

const userRoute = express.Router();

userRoute.put('/:id',  async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

userRoute.post('/signin', async (req, res) => {
  const signinUser = await userModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      name: signinUser.name,
      email: signinUser.email,
    });
    
  } else {
    res.status(401).send({ message: 'Invalid Email or Password.' });
  }
});

userRoute.post('/register', async (req, res) => {
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,

    });
  } else {
    res.status(401).send({ message: 'Invalid User Data.' });
  }
});


export default userRoute;

