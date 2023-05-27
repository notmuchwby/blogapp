const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
require('dotenv').config();

const router = express.Router();

// Регистрация
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Пользователь уже существует' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    if(!token) {
        return res.status(404).json({ message: "Ошибка при регистрации"})
    }
    await user.save();
    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка при регистрации' });
  }
});

// Логин 
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Неправильное имя пользователя или пароль' });
      }
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        return res.status(401).json({ message: 'Неправильное имя пользователя или пароль' });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      if(!token) {
        return res.status(404).json({ message: "Ошибка при входе"})
    }
      res.status(200).json({ user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при входе' });
    }
  });
  
module.exports = router;