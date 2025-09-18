# Deployment Guide - FuturistCards

## Production Deployment Options

### Option 1: Docker Deployment (Recommended)

#### Prerequisites
- Docker and Docker Compose installed
- MongoDB Atlas account
- Domain name (optional)

#### Steps
1. **Prepare environment files**
```bash
cp backend/.env.example .env.production
cp frontend/.env.example frontend/.env.production
```

2. **Configure production variables**
Edit `.env.production`:
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/futuristcards
JWT_SECRET=your-super-secure-jwt-secret
CORS_ORIGIN=https://yourdomain.com
```

3. **Build and deploy**
```bash
docker-compose -f config/docker-compose.yml up --build -d
```

### Option 2: Separate Hosting

#### Frontend (Vercel/Netlify)
1. **Build the frontend**
```bash
cd frontend
npm run build
```

2. **Deploy dist/ folder** to your hosting provider

3. **Set environment variables**:
```
VITE_API_URL=https://your-backend-api.com/api
VITE_APP_NAME=FuturistCards
```

#### Backend (Render/Railway/Heroku)
1. **Set environment variables** in hosting platform:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret
PORT=5001
```

2. **Deploy backend folder** to hosting service

### Option 3: VPS Deployment

#### Server Setup
```bash
# Install Node.js, npm, nginx
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
```

#### Application Deployment
```bash
# Clone repository
git clone <repo-url>
cd FuturistCards

# Install dependencies
npm run install:all

# Build frontend
cd frontend && npm run build

# Configure nginx
sudo cp config/nginx.conf /etc/nginx/sites-available/futuristcards
sudo ln -s /etc/nginx/sites-available/futuristcards /etc/nginx/sites-enabled/
sudo systemctl restart nginx

# Start backend with PM2
npm install -g pm2
cd backend
pm2 start server.js --name futuristcards-api
```

## Database Setup

### MongoDB Atlas
1. Create cluster at mongodb.com
2. Create database user
3. Whitelist IP addresses
4. Get connection string
5. Update MONGODB_URI in environment

### Local MongoDB (Development)
```bash
# Install MongoDB
brew install mongodb/brew/mongodb-community

# Start service
brew services start mongodb/brew/mongodb-community

# Use local URI
MONGODB_URI=mongodb://localhost:27017/futuristcards
```

## SSL Configuration

### Let's Encrypt (Free SSL)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Nginx SSL Configuration
```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    location / {
        root /var/www/futuristcards/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Environment Variables Reference

### Backend (.env)
```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
CORS_ORIGIN=https://yourdomain.com
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)
```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_APP_NAME=FuturistCards
VITE_APP_VERSION=1.0.0
VITE_DEFAULT_LANGUAGE=en
VITE_ENABLE_ANALYTICS=true
```

## Health Checks

### Backend Health Endpoint
```bash
curl https://api.yourdomain.com/health
# Should return: {"status": "OK", "timestamp": "..."}
```

### Frontend Build Verification
```bash
cd frontend
npm run build
# Check dist/ folder is created with assets
```

## Monitoring

### PM2 Process Management
```bash
pm2 status
pm2 logs futuristcards-api
pm2 restart futuristcards-api
```

### Nginx Logs
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Backup Strategy

### Database Backup
```bash
mongodump --uri="mongodb+srv://..." --out=backup/$(date +%Y%m%d)
```

### Application Backup
```bash
tar -czf futuristcards-backup-$(date +%Y%m%d).tar.gz FuturistCards/
```

## Performance Optimization

### Frontend
- Gzip compression enabled
- Asset minification
- Image optimization
- Bundle size: ~110KB gzipped

### Backend
- MongoDB indexing
- Rate limiting
- Caching headers
- Response compression

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] Rate limiting configured
- [ ] CORS properly set
- [ ] Security headers (Helmet)
- [ ] Input validation active
- [ ] JWT secrets rotated
- [ ] Regular dependency updates
