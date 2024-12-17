import Post from '../models/post.js';

// Create a Post
export const createPost = async (req, res) => {
  const { userId, title, content } = req.body;

  try {
    const post = await Post.create({ userId, title, content });
    res.status(201).json({success:true, message: 'Post created successfully', post});
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
};

// Edit a Post
export const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, content, updatedAt: new Date() },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({success:true, message: 'Post Updated successfully', post});
  } catch (err) {
    res.status(500).json({ message: 'Error updating post', error: err.message });
  }
};

// Delete a Post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ success:true, message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting post', error: err.message });
  }
};

// Add a Comment to a Post
export const addComment = async (req, res) => {
  const { id } = req.params;
  const { userId, comment } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ userId, comment });
    await post.save();

    res.json({success:true, message: 'Post added comment successfully',post});
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment', error: err.message });
  }
};

