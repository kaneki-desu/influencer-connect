import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Influencer from '@/models/Influencer';

export async function GET() {
  try {
    await connectDB();
    const influencers = await Influencer.find({}).sort({ createdAt: -1 });
    return NextResponse.json(influencers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch influencers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const influencer = await Influencer.create(body);
    return NextResponse.json(influencer, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Instagram handle already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create influencer' }, { status: 500 });
  }
} 