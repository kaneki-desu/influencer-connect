import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Campaign from '@/models/Campaign';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    
    const campaign = await Campaign.findByIdAndUpdate(
      params.id,
      { influencerIds: body.influencerIds },
      { new: true }
    ).populate('influencerIds', 'name category instagram followers location');
    
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }
    
    return NextResponse.json(campaign);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 });
  }
} 