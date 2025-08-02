import mongoose from 'mongoose';

const InfluencerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Fashion', 'Tech', 'Lifestyle', 'Food', 'Travel', 'Fitness', 'Beauty', 'Gaming', 'Education', 'Other'],
  },
  instagram: {
    type: String,
    required: [true, 'Please provide an Instagram handle'],
    unique: true,
  },
  followers: {
    type: Number,
    required: [true, 'Please provide follower count'],
    min: [0, 'Follower count cannot be negative'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Influencer || mongoose.model('Influencer', InfluencerSchema); 