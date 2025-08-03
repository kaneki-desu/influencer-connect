'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Users, Target, DollarSign, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Influencer {
  _id: string;
  name: string;
  category: string;
  instagram: string;
  followers: number;
  location: string;
}

interface Campaign {
  _id: string;
  brand: string;
  objective: string;
  budget: number;
  startDate: string;
  endDate: string;
  influencerIds: Influencer[];
}

export default function Home() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const [influencersRes, campaignsRes] = await Promise.all([
          fetch('/api/influencers'),
          fetch('/api/campaigns')
        ]);
        
        if (!influencersRes.ok) {
          const errorData = await influencersRes.json();
          throw new Error(`Influencers API error: ${errorData.error || errorData.details || 'Unknown error'}`);
        }
        
        if (!campaignsRes.ok) {
          const errorData = await campaignsRes.json();
          throw new Error(`Campaigns API error: ${errorData.error || errorData.details || 'Unknown error'}`);
        }
        
        const influencersData = await influencersRes.json();
        const campaignsData = await campaignsRes.json();

        console.log("influencersData", influencersData);
        console.log("campaignsData", campaignsData);

        // Ensure we have arrays
        setInfluencers(Array.isArray(influencersData) ? influencersData : []);
        setCampaigns(Array.isArray(campaignsData) ? campaignsData : []);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalFollowers = influencers?.reduce((sum, inf) => sum + (inf.followers || 0), 0) || 0;
  const totalBudget = campaigns?.reduce((sum, camp) => sum + (camp.budget || 0), 0) || 0;
  const activeCampaigns = campaigns?.filter(camp => 
    new Date(camp.endDate) > new Date()
  ).length || 0;

  const categoryData = influencers?.reduce((acc, inf) => {
    if (inf.category) {
      acc[inf.category] = (acc[inf.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>) || {};

  const chartData = Object.entries(categoryData).map(([category, count]) => ({
    category,
    count
  }));

  const budgetData = campaigns?.map(camp => ({
    brand: camp.brand || 'Unknown',
    budget: camp.budget || 0
  })) || [];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Dashboard</h2>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Influencers</p>
                <p className="text-2xl font-bold text-gray-900">{influencers.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Followers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalFollowers.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{activeCampaigns}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{totalBudget.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Influencers by Category</h3>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No influencer data available
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Budgets (₹)</h3>
            {budgetData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="brand" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Budget']} />
                  <Bar dataKey="budget" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No campaign data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 