# Deployment Guide - InfluencerConnect

This guide will help you deploy the InfluencerConnect application to Vercel and set up MongoDB Atlas.

## 🚀 Quick Deployment Steps

### 1. MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster (M0 Free tier recommended)

2. **Configure Database**
   - Create a database named `influencer-connect`
   - Create collections: `influencers` and `campaigns`
   - Set up database access (create a user with read/write permissions)
   - Configure network access (allow all IPs: 0.0.0.0/0)

3. **Get Connection String**
   - Go to your cluster → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### 2. GitHub Repository Setup

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/influencer-connect.git
   git push -u origin main
   ```

### 3. Vercel Deployment

1. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   - In Vercel dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add: `MONGODB_URI` with your MongoDB Atlas connection string

3. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Your app will be available at: `https://your-project-name.vercel.app`

## 🔧 Environment Variables

### Required Variables
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/influencer-connect?retryWrites=true&w=majority
```

### Local Development
Create a `.env.local` file in your project root:
```env
MONGODB_URI=mongodb://localhost:27017/influencer-connect
```

## 📊 Database Schema Verification

After deployment, verify your database collections:

### Influencers Collection
```javascript
{
  "_id": ObjectId,
  "name": "String",
  "category": "String",
  "instagram": "String",
  "followers": "Number",
  "location": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Campaigns Collection
```javascript
{
  "_id": ObjectId,
  "brand": "String",
  "objective": "String",
  "budget": "Number",
  "startDate": "Date",
  "endDate": "Date",
  "influencerIds": ["ObjectId"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## 🧪 Testing the Deployment

1. **Test API Endpoints**
   ```bash
   # Test influencers endpoint
   curl https://your-app.vercel.app/api/influencers
   
   # Test campaigns endpoint
   curl https://your-app.vercel.app/api/campaigns
   ```

2. **Test Frontend**
   - Visit your Vercel URL
   - Try adding an influencer
   - Create a campaign
   - Assign influencers to campaigns

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify your connection string
   - Check if IP is whitelisted in MongoDB Atlas
   - Ensure database user has correct permissions

2. **Build Errors**
   - Check Vercel build logs
   - Ensure all dependencies are in package.json
   - Verify TypeScript configuration

3. **API Errors**
   - Check browser console for errors
   - Verify environment variables are set correctly
   - Test API endpoints directly

### Debug Steps

1. **Check Vercel Logs**
   - Go to Vercel dashboard → Functions
   - Check function logs for errors

2. **Test Locally**
   ```bash
   npm run dev
   # Test with local MongoDB
   ```

3. **Verify Environment Variables**
   - Check Vercel dashboard → Settings → Environment Variables
   - Ensure MONGODB_URI is set correctly

## 📈 Performance Optimization

1. **Database Indexing**
   ```javascript
   // Add indexes for better performance
   db.influencers.createIndex({ "category": 1 })
   db.influencers.createIndex({ "followers": -1 })
   db.campaigns.createIndex({ "brand": 1 })
   ```

2. **Caching**
   - Consider implementing Redis for caching
   - Use Next.js built-in caching mechanisms

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit `.env.local` to Git
   - Use Vercel's environment variable system
   - Rotate database passwords regularly

2. **Database Security**
   - Use strong passwords for database users
   - Restrict IP access in MongoDB Atlas
   - Enable MongoDB Atlas security features

## 📱 Mobile Optimization

The application is already responsive, but consider:
- Testing on various devices
- Optimizing images for mobile
- Ensuring touch-friendly interactions

## 🚀 Post-Deployment Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Environment variables are set in Vercel
- [ ] Application is accessible via Vercel URL
- [ ] All API endpoints are working
- [ ] Can add/edit/delete influencers
- [ ] Can create campaigns
- [ ] Can assign influencers to campaigns
- [ ] Charts and analytics are working
- [ ] Mobile responsiveness is verified

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify MongoDB Atlas connection
3. Test API endpoints individually
4. Check browser console for errors
5. Review the README.md for setup instructions

---

 