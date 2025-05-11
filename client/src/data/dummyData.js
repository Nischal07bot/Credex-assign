export const users = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    createdAt: "2024-03-15T10:00:00Z"
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    password: "password456",
    createdAt: "2024-03-15T11:00:00Z"
  }
];

export const posts = [
  {
    id: 1,
    userId: 1,
    title: "First Post",
    content: "This is my first post content",
    createdAt: "2024-03-15T12:00:00Z",
    likes: 10,
    comments: [
      {
        id: 1,
        userId: 2,
        content: "Great post!",
        createdAt: "2024-03-15T12:30:00Z"
      }
    ]
  },
  {
    id: 2,
    userId: 2,
    title: "Second Post",
    content: "This is my second post content",
    createdAt: "2024-03-15T13:00:00Z",
    likes: 5,
    comments: []
  }
];

// Simulate API delay
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated API functions
export const api = {
  // Auth functions
  login: async (email, password) => {
    await delay(1000); // Simulate network delay
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token: "dummy_token_" + user.id
      };
    }
    throw new Error("Invalid credentials");
  },

  register: async (username, email, password) => {
    await delay(1000);
    if (users.some(u => u.email === email || u.username === username)) {
      throw new Error("User already exists");
    }
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token: "dummy_token_" + newUser.id
    };
  },

  // Post functions
  getPosts: async () => {
    await delay(1000);
    return posts;
  },

  createPost: async (userId, title, content) => {
    await delay(1000);
    const newPost = {
      id: posts.length + 1,
      userId,
      title,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    posts.push(newPost);
    return newPost;
  },

  likePost: async (postId) => {
    await delay(500);
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.likes += 1;
      return post;
    }
    throw new Error("Post not found");
  },

  addComment: async (postId, userId, content) => {
    await delay(500);
    const post = posts.find(p => p.id === postId);
    if (post) {
      const newComment = {
        id: post.comments.length + 1,
        userId,
        content,
        createdAt: new Date().toISOString()
      };
      post.comments.push(newComment);
      return newComment;
    }
    throw new Error("Post not found");
  }
}; 