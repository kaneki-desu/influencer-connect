import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'Please provide a brand name'],
    maxlength: [100, 'Brand name cannot be more than 100 characters'],
  },
  objective: {
    type: String,
    required: [true, 'Please provide a campaign objective'],
    maxlength: [500, 'Objective cannot be more than 500 characters'],
  },
  budget: {
    type: Number,
    required: [true, 'Please provide a budget'],
    min: [0, 'Budget cannot be negative'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide a start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide an end date'],
  },
  influencerIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer',
  }],
}, {
  timestamps: true,
});

// Validate that end date is after start date
CampaignSchema.pre('save', function(next) {
  if (this.startDate >= this.endDate) {
    next(new Error('End date must be after start date'));
  } else {
    next();
  }
});

export default mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema); 