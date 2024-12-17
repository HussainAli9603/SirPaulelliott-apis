import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
