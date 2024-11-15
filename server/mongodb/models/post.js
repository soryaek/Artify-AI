import mongoose from 'mongoose';

const Post = new mongoose.Schema({
    name: { type: String, required: true},
    prompt: { type: String, required: true},
    photo: { type: String, required: true}
}, { timestamps: true })

Post.index({ createdAt: -1 });

const PostScheme = mongoose.model('Post', Post);

export default PostScheme;