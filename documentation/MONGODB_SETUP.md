# MongoDB Setup Guide - FuturistCards

## MongoDB Atlas Setup (Recommended)

### 1. Create MongoDB Atlas Account
1. Go to [mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project named "FuturistCards"

### 2. Create Database Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (Free tier)
3. Select your preferred cloud provider and region
4. Name your cluster (e.g., "Cluster0")
5. Click "Create Cluster"

### 3. Configure Database Access
1. **Create Database User**:
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `S-User` (or your preferred username)
   - Generate secure password or use: ******
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

2. **Configure Network Access**:
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your specific IP addresses
   - Click "Confirm"

### 4. Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and version "4.1 or later"
5. Copy the connection string:
```
mongodb+srv://S-User:<password>@cluster0.lhvxveo.mongodb.net/?retryWrites=true&w=majority
```

### 5. Configure Environment Variables
Update your `backend/.env` file:
```env
MONGODB_URI=mongodb+srv://S-User:bg1skvf3eZmQdLNh@cluster0.lhvxveo.mongodb.net/futuristcards?retryWrites=true&w=majority
```

## Local MongoDB Setup (Development Alternative)

### 1. Install MongoDB Community Edition

#### macOS (using Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

#### Ubuntu/Debian
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

#### Windows
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Start MongoDB service

### 2. Configure Local Connection
Update your `backend/.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/futuristcards
```

## Database Schema

### Collections Structure

#### Users Collection
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: 'user', 'business', 'admin'),
  phone: String,
  address: {
    country: String,
    city: String,
    street: String,
    houseNumber: String
  },
  avatar: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Cards Collection
```javascript
{
  _id: ObjectId,
  title: String,
  subtitle: String,
  description: String,
  phone: String,
  email: String,
  web: String,
  image: {
    url: String,
    alt: String
  },
  address: {
    state: String,
    country: String,
    city: String,
    street: String,
    houseNumber: Number,
    zip: String
  },
  bizNumber: Number (unique),
  likes: [ObjectId] (references to Users),
  user_id: ObjectId (reference to Users),
  createdAt: Date,
  updatedAt: Date
}
```

#### Favorites Collection
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (reference to Users),
  card_id: ObjectId (reference to Cards),
  createdAt: Date
}
```

### Database Indexes

#### Automatic Indexes
```javascript
// Users collection
db.users.createIndex({ "email": 1 }, { unique: true })

// Cards collection
db.cards.createIndex({ "bizNumber": 1 }, { unique: true })
db.cards.createIndex({ "user_id": 1 })
db.cards.createIndex({ "title": "text", "subtitle": "text", "description": "text" })

// Favorites collection
db.favorites.createIndex({ "user_id": 1, "card_id": 1 }, { unique: true })
db.favorites.createIndex({ "user_id": 1 })
db.favorites.createIndex({ "card_id": 1 })
```

## Database Seeding

### Sample Data Creation
The application includes a seeding system that creates:
- 5 sample users (1 admin, 3 business, 1 regular user)
- 5 business cards with different categories
- 7 favorites relationships

### Run Database Seeding
```bash
# From project root
npm run seed

# Or manually
node seed-database.js
```

## Connection Testing

### Test Connection
```javascript
// Test script (test-connection.js)
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });
```

Run test:
```bash
node test-connection.js
```

## Troubleshooting

### Common Issues

#### Connection Timeout
- Check network access settings in MongoDB Atlas
- Verify IP whitelist includes your current IP
- Check firewall settings

#### Authentication Failed
- Verify username and password in connection string
- Check database user permissions
- Ensure user has access to the correct database

#### Database Not Found
- MongoDB creates databases automatically on first write
- Run the seeding script to initialize data
- Check database name in connection string

### Connection String Format
```
mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?<options>
```

Example:
```
mongodb+srv://S-User:bg1skvf3eZmQdLNh@cluster0.lhvxveo.mongodb.net/futuristcards?retryWrites=true&w=majority
```

### Environment Variables Validation
```javascript
// Add to server.js for debugging
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('Database name:', process.env.MONGODB_URI?.split('/').pop()?.split('?')[0]);
```

## Production Considerations

### Security
- Use strong passwords for database users
- Restrict network access to specific IPs
- Enable MongoDB authentication
- Use SSL/TLS connections
- Regular security updates

### Performance
- Create appropriate indexes for queries
- Monitor database performance
- Set up connection pooling
- Configure read/write concerns
- Regular database maintenance

### Backup Strategy
```bash
# MongoDB Atlas automatic backups (enabled by default)
# Manual backup
mongodump --uri="mongodb+srv://..." --out=backup/$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb+srv://..." backup/20241201/
```
