# Demo Accounts - FuturistCards

## Test Account Credentials

### Admin Account
- **Email**: admin@futuristcards.com
- **Password**: AdminPass123!
- **Role**: Administrator
- **Access**: Full platform management, user management, analytics dashboard

### Business Accounts

#### John Doe - Business Owner
- **Email**: john.doe@example.com
- **Password**: Password123!
- **Role**: Business
- **Access**: Create/edit business cards, view analytics

#### Sarah Cohen - Marketing Professional
- **Email**: sarah.cohen@example.com
- **Password**: Password123!
- **Role**: Business
- **Access**: Create/edit business cards, view analytics

#### David Levi - Consultant
- **Email**: david.levi@example.com
- **Password**: Password123!
- **Role**: Business
- **Access**: Create/edit business cards, view analytics

### Standard User Account
- **Email**: test@example.com
- **Password**: TestPass123!
- **Role**: User
- **Access**: View cards, add to favorites, search and filter

## Usage Instructions

1. **Login**: Use any of the above credentials on the login page
2. **Admin Features**: Use admin account to access user management and platform analytics
3. **Business Features**: Use business accounts to create and manage business cards
4. **User Features**: Use standard account to browse and favorite cards

## Sample Data
The database is pre-seeded with:
- 5 users with different roles
- 5 business cards with various categories
- 7 favorites relationships
- Sample analytics data

## Security Notes
- All passwords use bcrypt hashing with 12 rounds
- JWT tokens expire after 7 days
- Refresh tokens expire after 30 days
- Rate limiting: 100 requests per 15 minutes
