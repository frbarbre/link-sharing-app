import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  link: { type: String },
  platform: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Link = mongoose.models.Link || mongoose.model('Link', linkSchema);

export default Link;
