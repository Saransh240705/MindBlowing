// LocalStorage utility for managing blog data on the frontend
export class LocalStorageManager {
  constructor() {
    this.POSTS_KEY = 'mindBloging_posts';
    this.DRAFTS_KEY = 'mindBloging_drafts';
    this.USER_PREFS_KEY = 'mindBloging_userPrefs';
    this.READING_PROGRESS_KEY = 'mindBloging_readingProgress';
  }

  // Posts management
  getPosts() {
    try {
      const posts = localStorage.getItem(this.POSTS_KEY);
      return posts ? JSON.parse(posts) : [];
    } catch (error) {
      console.error('Error getting posts from localStorage:', error);
      return [];
    }
  }

  savePost(post) {
    try {
      const posts = this.getPosts();
      const existingIndex = posts.findIndex(p => p.id === post.id);
      
      if (existingIndex >= 0) {
        posts[existingIndex] = post;
      } else {
        post.id = Date.now().toString();
        post.createdAt = new Date().toISOString();
        posts.unshift(post);
      }
      
      localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts));
      return post;
    } catch (error) {
      console.error('Error saving post to localStorage:', error);
      return null;
    }
  }

  deletePost(postId) {
    try {
      const posts = this.getPosts();
      const filteredPosts = posts.filter(p => p.id !== postId);
      localStorage.setItem(this.POSTS_KEY, JSON.stringify(filteredPosts));
      return true;
    } catch (error) {
      console.error('Error deleting post from localStorage:', error);
      return false;
    }
  }

  getPost(postId) {
    const posts = this.getPosts();
    return posts.find(p => p.id === postId) || null;
  }

  // Drafts management
  getDrafts() {
    try {
      const drafts = localStorage.getItem(this.DRAFTS_KEY);
      return drafts ? JSON.parse(drafts) : [];
    } catch (error) {
      console.error('Error getting drafts from localStorage:', error);
      return [];
    }
  }

  saveDraft(draft) {
    try {
      const drafts = this.getDrafts();
      const existingIndex = drafts.findIndex(d => d.id === draft.id);
      
      if (existingIndex >= 0) {
        drafts[existingIndex] = draft;
      } else {
        draft.id = Date.now().toString();
        draft.updatedAt = new Date().toISOString();
        drafts.unshift(draft);
      }
      
      localStorage.setItem(this.DRAFTS_KEY, JSON.stringify(drafts));
      return draft;
    } catch (error) {
      console.error('Error saving draft to localStorage:', error);
      return null;
    }
  }

  deleteDraft(draftId) {
    try {
      const drafts = this.getDrafts();
      const filteredDrafts = drafts.filter(d => d.id !== draftId);
      localStorage.setItem(this.DRAFTS_KEY, JSON.stringify(filteredDrafts));
      return true;
    } catch (error) {
      console.error('Error deleting draft from localStorage:', error);
      return false;
    }
  }

  // User preferences
  getUserPreferences() {
    try {
      const prefs = localStorage.getItem(this.USER_PREFS_KEY);
      return prefs ? JSON.parse(prefs) : {
        theme: 'light',
        fontSize: 'medium',
        showReadingProgress: true,
        autoSaveDrafts: true,
      };
    } catch (error) {
      console.error('Error getting user preferences from localStorage:', error);
      return {};
    }
  }

  saveUserPreferences(preferences) {
    try {
      localStorage.setItem(this.USER_PREFS_KEY, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Error saving user preferences to localStorage:', error);
      return false;
    }
  }

  // Reading progress
  getReadingProgress(postId) {
    try {
      const progress = localStorage.getItem(this.READING_PROGRESS_KEY);
      const allProgress = progress ? JSON.parse(progress) : {};
      return allProgress[postId] || 0;
    } catch (error) {
      console.error('Error getting reading progress from localStorage:', error);
      return 0;
    }
  }

  saveReadingProgress(postId, progress) {
    try {
      const allProgress = localStorage.getItem(this.READING_PROGRESS_KEY);
      const progressData = allProgress ? JSON.parse(allProgress) : {};
      progressData[postId] = progress;
      localStorage.setItem(this.READING_PROGRESS_KEY, JSON.stringify(progressData));
      return true;
    } catch (error) {
      console.error('Error saving reading progress to localStorage:', error);
      return false;
    }
  }

  // Utility methods
  clearAllData() {
    try {
      localStorage.removeItem(this.POSTS_KEY);
      localStorage.removeItem(this.DRAFTS_KEY);
      localStorage.removeItem(this.USER_PREFS_KEY);
      localStorage.removeItem(this.READING_PROGRESS_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing localStorage data:', error);
      return false;
    }
  }

  exportData() {
    try {
      return {
        posts: this.getPosts(),
        drafts: this.getDrafts(),
        preferences: this.getUserPreferences(),
        readingProgress: JSON.parse(localStorage.getItem(this.READING_PROGRESS_KEY) || '{}'),
        exportDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      return null;
    }
  }

  importData(data) {
    try {
      if (data.posts) {
        localStorage.setItem(this.POSTS_KEY, JSON.stringify(data.posts));
      }
      if (data.drafts) {
        localStorage.setItem(this.DRAFTS_KEY, JSON.stringify(data.drafts));
      }
      if (data.preferences) {
        localStorage.setItem(this.USER_PREFS_KEY, JSON.stringify(data.preferences));
      }
      if (data.readingProgress) {
        localStorage.setItem(this.READING_PROGRESS_KEY, JSON.stringify(data.readingProgress));
      }
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}

// Create a singleton instance
export const localStorageManager = new LocalStorageManager();

// Export utility functions for easy access
export const {
  getPosts,
  savePost,
  deletePost,
  getPost,
  getDrafts,
  saveDraft,
  deleteDraft,
  getUserPreferences,
  saveUserPreferences,
  getReadingProgress,
  saveReadingProgress,
  clearAllData,
  exportData,
  importData,
} = localStorageManager;
