
import { NextRequest, NextResponse } from 'next/server';
import connectDB, { registerModels } from '@/lib/mongodb';
import Campaign from '@/models/Campaign';
import Influencer from '@/models/Influencer';

export async function GET() {
  try {
    await connectDB();
    
    // Register models to ensure they're available
    registerModels();
    
    // Ensure both models are registered
    if (!Campaign || !Influencer) {
      throw new Error('Models not properly registered');
    }
    
    const campaigns = await Campaign.find({})
      .populate('influencerIds', 'name category instagram followers location')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(campaigns);
  } catch (error: any) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch campaigns', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const campaign = await Campaign.create(body);
    return NextResponse.json(campaign, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create campaign' }, { status: 500 });
  }
} 