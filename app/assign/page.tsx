'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Users, Target, Check, X } from 'lucide-react';

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

export default function Assign() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [campaignsRes, influencersRes] = await Promise.all([
        fetch('/api/campaigns'),
        fetch('/api/influencers')
      ]);
      
      const campaignsData = await campaignsRes.json();
      const influencersData = await influencersRes.json();
      
      setCampaigns(campaignsData);
      setInfluencers(influencersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCampaignChange = (campaignId: string) => {
    setSelectedCampaign(campaignId);
    const campaign = campaigns.find(c => c._id === campaignId);
    if (campaign) {
      setSelectedInfluencers(campaign.influencerIds.map(inf => inf._id));
    } else {
      setSelectedInfluencers([]);
    }
  };

  const handleInfluencerToggle = (influencerId: string) => {
    setSelectedInfluencers(prev => 
      prev.includes(influencerId)
        ? prev.filter(id => id !== influencerId)
        : [...prev, influencerId]
    );
  };

  const handleSave = async () => {
    if (!selectedCampaign) {
      alert('Please select a campaign');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/campaigns/${selectedCampaign}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          influencerIds: selectedInfluencers
        }),
      });

      if (response.ok) {
        alert('Influencers assigned successfully!');
        fetchData();
        setSelectedCampaign('');
        setSelectedInfluencers([]);
      } else {
        alert('Failed to assign influencers');
      }
    } catch (error) {
      console.error('Error assigning influencers:', error);
      alert('Failed to assign influencers');
    } finally {
      setSaving(false);
    }
  };

  const selectedCampaignData = campaigns.find(c => c._id === selectedCampaign);
  const assignedInfluencerIds = selectedCampaignData?.influencerIds.map(inf => inf._id) || [];

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Assign Influencers to Campaigns</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Campaign Selection */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Select Campaign
            </h2>
            
            <div className="space-y-3">
              {campaigns.map((campaign) => (
                <div
                  key={campaign._id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedCampaign === campaign._id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleCampaignChange(campaign._id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{campaign.brand}</h3>
                      <p className="text-sm text-gray-600 mt-1">{campaign.objective}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        ${campaign.budget.toLocaleString()} • {campaign.influencerIds.length} influencers
                      </p>
                    </div>
                    {selectedCampaign === campaign._id && (
                      <Check className="w-5 h-5 text-primary-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {campaigns.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No campaigns available
              </div>
            )}
          </div>

          {/* Influencer Selection */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Select Influencers
            </h2>

            {selectedCampaign ? (
              <>
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900">
                    {selectedCampaignData?.brand}
                  </h3>
                  <p className="text-sm text-blue-700 mt-1">
                    {selectedCampaignData?.objective}
                  </p>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {influencers.map((influencer) => (
                    <div
                      key={influencer._id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedInfluencers.includes(influencer._id)
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleInfluencerToggle(influencer._id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-gray-900">{influencer.name}</h4>
                          <p className="text-sm text-gray-600">
                            {influencer.instagram} • {influencer.category}
                          </p>
                          <p className="text-sm text-gray-500">
                            {influencer.followers.toLocaleString()} followers • {influencer.location}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {assignedInfluencerIds.includes(influencer._id) && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Assigned
                            </span>
                          )}
                          {selectedInfluencers.includes(influencer._id) ? (
                            <Check className="w-4 h-4 text-primary-600" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-gray-300 rounded" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">
                      {selectedInfluencers.length} influencers selected
                    </span>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="btn-primary flex items-center"
                    >
                      {saving ? 'Saving...' : 'Save Assignment'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Select a campaign to assign influencers
              </div>
            )}
          </div>
        </div>

        {/* Current Assignments Summary */}
        {selectedCampaign && selectedCampaignData && (
          <div className="card mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Current Assignments for {selectedCampaignData.brand}
            </h3>
            
            {selectedCampaignData.influencerIds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCampaignData.influencerIds.map((influencer) => (
                  <div key={influencer._id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{influencer.name}</h4>
                        <p className="text-sm text-gray-600">{influencer.instagram}</p>
                        <p className="text-sm text-gray-500">
                          {influencer.followers.toLocaleString()} followers • {influencer.category}
                        </p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Assigned
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No influencers assigned to this campaign yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 