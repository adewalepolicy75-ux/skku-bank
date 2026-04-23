# SKKU Bank

A Kuda-style digital banking app for the Sungkyunkwan University community.

## Features

- User authentication with OTP verification
- Send money to other SKKU users
- Check balance and transaction history
- User profile management
- Secure money transfers with atomic transactions

## Tech Stack

- **Framework**: Next.js 14
- **Authentication**: NextAuth.js
- **Database**: MongoDB + Prisma ORM
- **Styling**: CSS (to be added)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally or connection string
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables in `.env.local`:

```
DATABASE_URL="mongodb://localhost:27017/skku-bank"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

4. Setup database with Prisma:

```bash
npx prisma migrate dev
```

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Auth

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/verify-otp` - Verify OTP

### Users

- `GET /api/users?identifier={phone or email}` - Find SKKU user

### Transfers

- `POST /api/transfer` - Send money to another user

### Account

- `GET /api/balance` - Get current balance
- `GET /api/transactions` - Get transaction history

## Project Structure

```
skku-bank/
├── app/
│   ├── (landing)/          # Public marketing pages
│   ├── (auth)/             # Authentication pages
│   ├── (dashboard)/        # Protected dashboard pages
│   ├── api/                # API routes
│   └── layout.js           # Root layout
├── components/             # React components
├── lib/                    # Utilities and configurations
├── prisma/                 # Database schema
└── package.json
```

## Next Steps

1. Add CSS styling (Bootstrap, Tailwind, or custom)
2. Implement OTP sending via SMS/Email
3. Add 2FA support
4. Implement transaction notifications
5. Add admin dashboard
6. Set up payment gateway integration
7. Deploy to production

## License

MIT
