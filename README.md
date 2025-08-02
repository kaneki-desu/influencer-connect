# InfluencerConnect - Campaign & Influencer Management Dashboard

A modern web application for influencer marketing agencies to manage influencers, create campaigns, and assign influencers to campaigns efficiently.

## 🚀 Features

### Core Features
- **Influencer Management**: Add, view, and delete influencer profiles
- **Campaign Management**: Create and manage brand campaigns
- **Assignment System**: Assign multiple influencers to campaigns
- **Dashboard Overview**: Real-time statistics and analytics
- **Search & Filter**: Advanced filtering by category and search functionality

### Bonus Features
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Data Visualization**: Charts showing influencer distribution and campaign budgets
- **Real-time Updates**: Dynamic data updates across all pages
- **Status Tracking**: Campaign status indicators (Active, Ending Soon, Completed)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose ODM
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Deployment**: Vercel (Frontend), MongoDB Atlas (Database)

## 📋 Database Schema

### Influencer Model
```json
{
  "name": "Bittu Kumar",
  "category": "Tech",
  "instagram": "@bittu-kumar",
  "followers": 25000,
  "location": "Noida",
  "createdAt": "ISO Date"
}
```

### Campaign Model
```json
{
  "brand": "OnePlus",
  "objective": "Promote new phone",
  "budget": 50000,
  "startDate": "ISO Date",
  "endDate": "ISO Date",
  "influencerIds": ["influencer_id_1", "influencer_id_2"]
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database (local or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/influencer-connect.git
   cd influencer-connect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages & Features

### Dashboard (`/`)
- Overview statistics (total influencers, followers, campaigns, budget)
- Interactive charts showing influencer distribution and campaign budgets
- Real-time data visualization

### Influencers (`/influencers`)
- Add new influencer profiles
- View all influencers in a searchable table
- Filter by category
- Delete influencers
- Search functionality

### Campaigns (`/campaigns`)
- Create new campaigns with brand details, objectives, and budgets
- View campaign cards with status indicators
- See assigned influencers for each campaign
- Campaign duration tracking

### Assign (`/assign`)
- Select campaigns and assign multiple influencers
- Visual assignment interface
- Current assignment overview
- Bulk assignment management

## 🔧 API Endpoints

### Influencers
- `GET /api/influencers` - Fetch all influencers
- `POST /api/influencers` - Create new influencer
- `DELETE /api/influencers/[id]` - Delete influencer

### Campaigns
- `GET /api/campaigns` - Fetch all campaigns with populated influencers
- `POST /api/campaigns` - Create new campaign
- `PUT /api/campaigns/[id]` - Update campaign influencer assignments

## 🎨 UI Components

- **Navigation**: Responsive navigation with active state indicators
- **Cards**: Reusable card components with hover effects
- **Forms**: Modal forms with validation
- **Tables**: Sortable and filterable data tables
- **Charts**: Interactive charts using Recharts
- **Status Badges**: Color-coded status indicators

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
```env
MONGODB_URI=your_mongodb_atlas_connection_string
```

## 📊 Features Overview

| Feature | Status | Description |
|---------|--------|-------------|
| Influencer CRUD | ✅ | Complete CRUD operations |
| Campaign Management | ✅ | Create and manage campaigns |
| Assignment System | ✅ | Assign influencers to campaigns |
| Dashboard Analytics | ✅ | Charts and statistics |
| Search & Filter | ✅ | Advanced filtering |
| Responsive Design | ✅ | Mobile-friendly UI |
| Real-time Updates | ✅ | Dynamic data updates |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
- Create an issue in the GitHub repository
- Check the documentation above
- Ensure your MongoDB connection is properly configured

## 🔮 Future Enhancements

- [ ] Edit functionality for campaigns and influencers
- [ ] Advanced analytics and reporting
- [ ] Email notifications
- [ ] User authentication and roles
- [ ] Campaign performance tracking
- [ ] Integration with social media APIs

---

**Built with ❤️ using Next.js, React, and MongoDB** 