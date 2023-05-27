const express = require('express');
const Post = require('../models/post');
const { auth } = require('../middleware/auth')

const router = express.Router();

// Получить посты с пагинацией
router.get('/', async (req, res) => {
    const page = parseInt(req.body.page) || 1;
    const limit = 20;

    console.log(page, ' page')
  
    try {
      const posts = await Post.find()
        .sort({ date: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('author', 'username');
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка в получении постов' });
    }
  });

// Создать новый пост
router.post('/', auth, async (req, res) => {
  const { message } = req.body;
  const author = req.user.id;

  console.log(message)
  console.log(author)

  try {
    const newPost = new Post({
      message,
      author: author
    });   

    await newPost.save();

    res.status(201).json({ message: 'Пост был успешно создан' });
  } catch (error) {
    console.log(error, 'error')
    res.status(500).json({ message: 'Не удалось создать пост' });
  }
});

// Изменить пост
router.put('/:id', auth, async (req, res) => {
  const postId = req.params.id;
  const { message } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'У вас нет прав для изменения данного поста' });
    }

    post.message = message;

    await post.save();

    res.status(200).json({ message: 'Пост успешно изменен' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Не удалось изменить пост' });
  }
});

// Удаление поста
router.delete('/:id', auth, async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Данный пост не найден' });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'У вас нет прав для удаления поста' });
    }

    await post.deleteOne();

    res.status(200).json({ message: 'Пост успешно удален' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Не удалось удалить пост' });
  }
});

module.exports = router;