import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  link: { type: String, required: true },
  platform: { type: String, required: true, unique: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Link = mongoose.models.Link || mongoose.model('Link', linkSchema);

export default Link;
