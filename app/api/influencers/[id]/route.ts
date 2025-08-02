import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Influencer from '@/models/Influencer';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const influencer = await Influencer.findByIdAndDelete(params.id);
    
    if (!influencer) {
      return NextResponse.json({ error: 'Influencer not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Influencer deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete influencer' }, { status: 500 });
  }
} 