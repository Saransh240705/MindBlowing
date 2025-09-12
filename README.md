# MindBloging - MERN Stack Blog Platform

A modern, full-featured blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This application provides a complete blogging experience with user authentication, rich content creation, and an intuitive user interface.

## 🌟 Features

### Core Features
- **User Authentication**: Secure registration and login system with JWT tokens
- **CRUD Operations**: Create, read, update, and delete blog posts
- **Rich Text Editor**: Custom Markdown-based editor for beautiful content creation
- **Comment System**: Interactive commenting on blog posts
- **Categories & Tags**: Organize and filter posts by categories and tags
- **Search Functionality**: Search through posts by title, content, and metadata
- **View Counter**: Track how many people have viewed each blog post
- **Share Functionality**: Share posts on social media platforms or copy link
- **Bookmark System**: Users can bookmark posts for later reading
- **User Dashboard**: Personal analytics dashboard accessible via avatar click

### User Experience
- **Reading Progress**: Visual indicator showing reading completion
- **Dark/Light Mode**: Theme toggle for better user experience
- **Responsive Design**: Mobile-first design that works on all devices
- **LocalStorage Integration**: Frontend data persistence
- **Database Storage**: Backend data persistence with MongoDB

### Content Management
- **Post Management**: Dedicated page for managing your own posts
- **Draft Support**: Save posts as drafts before publishing
- **Image Support**: Featured images for posts
- **View Counter**: Track post popularity and engagement
- **Reading Time**: Automatic calculation of estimated reading time
- **Analytics**: Dashboard with post statistics and user insights

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React** - JavaScript library for building user interfaces
- **React Router** - Declarative routing
- **Axios** - HTTP client for API requests
- **Custom Rich Text Editor** - Markdown-based editor with live preview
- **CSS3** - Modern styling with custom properties

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Blog website2"
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install --legacy-peer-deps
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/mindbloging
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   PORT=5000
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # If using local MongoDB
   mongod
   
   # If using MongoDB Atlas, update the MONGODB_URI in .env
   ```

6. **Start the Application**
   
   Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
   
   In a new terminal, start the frontend:
   ```bash
   cd frontend
   npm start
   ```

7. **Access the Application**
   
   Open your browser and navigate to:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

## 📁 Project Structure

```
Blog website2/
├── backend/
│   ├── models/
│   │   ├── User.js          # User model
│   │   ├── Post.js          # Blog post model
│   │   └── Comment.js       # Comment model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── posts.js         # Post CRUD routes
│   │   └── comments.js      # Comment routes
│   ├── server.js            # Express server setup
│   ├── .env                 # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js           # Navigation component
│   │   │   ├── PostCard.js         # Post preview component
│   │   │   ├── PrivateRoute.js     # Route protection
│   │   │   └── ReadingProgress.js  # Reading progress indicator
│   │   ├── context/
│   │   │   ├── AuthContext.js      # Authentication state
│   │   │   └── ThemeContext.js     # Theme management
│   │   ├── pages/
│   │   │   ├── Home.js            # Homepage with post list
│   │   │   ├── Login.js           # Login page
│   │   │   ├── Register.js        # Registration page
│   │   │   ├── CreatePost.js      # Post creation
│   │   │   ├── EditPost.js        # Post editing
│   │   │   ├── PostDetail.js      # Individual post view
│   │   │   └── ManagePosts.js     # User's post management
│   │   ├── App.js             # Main app component
│   │   ├── App.css            # Global styles
│   │   └── index.js           # App entry point
│   └── package.json
├── .github/
│   └── copilot-instructions.md  # Copilot configuration
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts (with filters)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (auth required)
- `PUT /api/posts/:id` - Update post (auth required)
- `DELETE /api/posts/:id` - Delete post (auth required)
- `GET /api/posts/my/posts` - Get user's posts (auth required)
- `GET /api/posts/meta/categories` - Get all categories
- `GET /api/posts/meta/tags` - Get all tags

### Comments
- `GET /api/comments/post/:postId` - Get post comments
- `POST /api/comments` - Create comment (auth required)
- `PUT /api/comments/:id` - Update comment (auth required)
- `DELETE /api/comments/:id` - Delete comment (auth required)

## 🎨 Features in Detail

### User Authentication
- Secure registration with input validation
- JWT-based authentication
- Persistent login state
- Protected routes for authenticated users

### Blog Management
- Rich text editor with formatting options
- Image support for featured images
- Category and tag system for organization
- Draft and publish functionality
- Automatic reading time calculation

### User Interface
- Clean, modern design
- Dark/light mode toggle
- Responsive layout for mobile and desktop
- Reading progress indicator
- Smooth animations and transitions

### Search & Filtering
- Full-text search across posts
- Filter by categories and tags
- Real-time search results
- Clear filter functionality

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 🚀 Deployment

### Environment Variables

Before deploying, make sure to set up the following environment variables:

#### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
PORT=5001
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
```

#### Frontend (.env)
```
REACT_APP_GOOGLE_CLIENT_ID=your_google_oauth_client_id
REACT_APP_API_URL=https://your-backend-domain.com
```

### Deployment Steps

1. **Prepare for deployment:**
   ```bash
   npm run build
   ```

2. **Backend deployment:**
   - Deploy to platforms like Heroku, Railway, or Vercel
   - Ensure MongoDB connection is configured
   - Set all required environment variables

3. **Frontend deployment:**
   - Deploy to platforms like Netlify, Vercel, or GitHub Pages
   - Update API endpoints to production URLs
   - Configure build settings for React

4. **Database setup:**
   - Use MongoDB Atlas for cloud database
   - Or set up your own MongoDB instance

### Production Checklist

- [ ] Remove all console.log statements from production code
- [ ] Set up proper CORS configuration
- [ ] Configure environment variables
- [ ] Test all API endpoints
- [ ] Verify Google OAuth configuration
- [ ] Test responsive design on various devices
- [ ] Set up proper error handling
- [ ] Configure database backups
- [ ] Set up monitoring and logging

## 🎯 Future Enhancements

- User profiles and avatars
- Post likes and favorites
- Social media sharing
- Email notifications
- Advanced text formatting
- Image upload functionality
- Post scheduling
- Analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Support

If you have any questions or need help with setup, please open an issue in the repository.

---

**Happy Blogging with MindBloging! 🚀**
