const express = require('express');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post.model');
const User = require('../models/User.model');
const router = express.Router();

// Middleware to verify token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get all posts with pagination and filters
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const { category, tags, search, author } = req.query;
    
    let query = { isPublished: true };
    
    if (category) {
      query.category = new RegExp(category, 'i');
    }
    
    if (tags) {
      query.tags = { $in: tags.split(',').map(tag => new RegExp(tag, 'i')) };
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (author) {
      query.author = author;
    }

    const posts = await Post.find(query)
      .populate('author', 'username firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username firstName lastName');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new post
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, featuredImage } = req.body;

    const post = new Post({
      title,
      content,
      excerpt,
      category,
      tags: tags || [],
      featuredImage,
      author: req.userId
    });

    await post.save();
    await post.populate('author', 'username firstName lastName');

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update post
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const { title, content, excerpt, category, tags, featuredImage, isPublished } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    post.excerpt = excerpt || post.excerpt;
    post.category = category || post.category;
    post.tags = tags || post.tags;
    post.featuredImage = featuredImage || post.featuredImage;
    post.isPublished = isPublished !== undefined ? isPublished : post.isPublished;

    await post.save();
    await post.populate('author', 'username firstName lastName');

    res.json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete post
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's posts
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId, isPublished: true })
      .populate('author', 'username firstName lastName')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's own posts (including drafts)
router.get('/my/posts', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId })
      .populate('author', 'username firstName lastName')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Post.distinct('category', { isPublished: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get tags
router.get('/meta/tags', async (req, res) => {
  try {
    const tags = await Post.distinct('tags', { isPublished: true });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Bookmark routes
router.post('/:id/bookmark', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const postId = req.params.id;
    
    if (!user.bookmarks.includes(postId)) {
      user.bookmarks.push(postId);
      await user.save();
      res.json({ message: 'Post bookmarked successfully', bookmarked: true });
    } else {
      res.json({ message: 'Post already bookmarked', bookmarked: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id/bookmark', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const postId = req.params.id;
    
    user.bookmarks = user.bookmarks.filter(bookmark => !bookmark.equals(postId));
    await user.save();
    res.json({ message: 'Bookmark removed successfully', bookmarked: false });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/bookmarks/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate({
        path: 'bookmarks',
        populate: {
          path: 'author',
          select: 'username firstName lastName'
        }
      });
    
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
