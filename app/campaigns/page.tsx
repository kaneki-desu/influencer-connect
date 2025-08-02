'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Plus, Calendar, DollarSign, Users, Target } from 'lucide-react';
import { format } from 'date-fns';

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
  createdAt: string;
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    objective: '',
    budget: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns');
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          budget: parseInt(formData.budget)
        }),
      });

      if (response.ok) {
        setFormData({
          brand: '',
          objective: '',
          budget: '',
          startDate: '',
          endDate: ''
        });
        setShowAddForm(false);
        fetchCampaigns();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create campaign');
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Failed to create campaign');
    }
  };

  const getStatusColor = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    if (end < now) return 'bg-red-100 text-red-800';
    if (end.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    if (end < now) return 'Completed';
    if (end.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000) return 'Ending Soon';
    return 'Active';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Campaign
          </button>
        </div>

        {/* Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Create New Campaign</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Objective</label>
                  <textarea
                    required
                    value={formData.objective}
                    onChange={(e) => setFormData({...formData, objective: e.target.value})}
                    className="input-field"
                    rows={3}
                    placeholder="Describe the campaign objective..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button type="submit" className="btn-primary flex-1">
                    Create Campaign
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{campaign.brand}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.endDate)}`}>
                  {getStatusText(campaign.endDate)}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{campaign.objective}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span className="font-medium">${campaign.budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {format(new Date(campaign.startDate), 'MMM dd, yyyy')} - {format(new Date(campaign.endDate), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{campaign.influencerIds.length} influencers assigned</span>
                </div>
              </div>

              {campaign.influencerIds.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Assigned Influencers:</h4>
                  <div className="space-y-1">
                    {campaign.influencerIds.slice(0, 3).map((influencer) => (
                      <div key={influencer._id} className="text-xs text-gray-600">
                        • {influencer.name} ({influencer.category})
                      </div>
                    ))}
                    {campaign.influencerIds.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{campaign.influencerIds.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {campaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Target className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
            <p className="text-gray-600">Create your first campaign to get started</p>
          </div>
        )}
      </div>
    </div>
  );
} 