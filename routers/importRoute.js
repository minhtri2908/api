import express from 'express';
import users from '../data.js'
import userModel from '../models/User.js';
const importRoute = express.Router();


importRoute.post('/', async (req, res) => {
   
    const ImportUser = await userModel.insertMany(users);
    res.send({ ImportUser });
  });

export default importRoute