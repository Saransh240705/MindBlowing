const express = require('express');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post.model');
const User = require('../models/User.model');
const Comment = require('../models/Comment.model');
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

// Get user dashboard stats
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    
    // Get user's posts count and total views
    const userPosts = await Post.find({ author: userId });
    const totalPosts = userPosts.length;
    const totalViews = userPosts.reduce((sum, post) => sum + post.views, 0);
    
    // Get user's comments count
    const totalComments = await Comment.countDocuments({ author: userId });
    
    // Get user's bookmarks count
    const user = await User.findById(userId);
    const totalBookmarks = user.bookmarks.length;
    
    // Get recent posts
    const recentPosts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title views createdAt isPublished');
    
    // Get most viewed posts
    const popularPosts = await Post.find({ author: userId })
      .sort({ views: -1 })
      .limit(5)
      .select('title views createdAt');

    res.json({
      stats: {
        totalPosts,
        totalViews,
        totalComments,
        totalBookmarks
      },
      recentPosts,
      popularPosts
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user profile for dashboard
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { firstName, lastName, bio, avatar } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { firstName, lastName, bio, avatar },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
