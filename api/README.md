# BusinessPro API

A secure REST API for user authentication and management, built with Express.js and Node.js.

## Features

- ✅ User registration with email verification
- ✅ Secure password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Email OTP verification system
- ✅ Rate limiting and security middleware
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Error handling middleware
- ✅ Environment-based configuration

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **express-validator** - Input validation
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting

## Project Structure

```
api/
├── controllers/
│   └── authController.js    # Authentication logic
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── models/
│   └── User.js             # User model (placeholder)
├── routes/
│   └── auth.js             # Authentication routes
├── services/
│   └── emailService.js     # Email service for OTP
├── utils/
│   └── otpUtils.js         # OTP utility functions
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
└── server.js              # Main server file
```

## Installation

1. **Navigate to the API directory:**

   ```bash
   cd api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

4. **Edit the `.env` file with your configuration:**

   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000

   # JWT Configuration
   JWT_SECRET=your-super-secure-jwt-secret-key-here
   JWT_EXPIRES_IN=7d

   # Email Configuration
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   FROM_NAME=BusinessPro

   # OTP Configuration
   OTP_EXPIRES_IN=5
   OTP_RESEND_COOLDOWN=1

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

## Email Setup

### Gmail Configuration

1. Enable 2FA on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password in `EMAIL_PASSWORD`

### Other Email Providers

Update the email configuration in `.env`:

```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
EMAIL_SERVICE=your-service
```

## API Endpoints

### Authentication Routes

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| POST   | `/api/auth/signup`     | User registration  |
| POST   | `/api/auth/signin`     | User login         |
| POST   | `/api/auth/verify-otp` | Email verification |
| POST   | `/api/auth/resend-otp` | Resend OTP         |
| GET    | `/api/auth/me`         | Get current user   |
| PUT    | `/api/auth/profile`    | Update profile     |

### Request/Response Examples

#### User Registration

```bash
POST /api/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "agreeToTerms": true
}
```

#### OTP Verification

```bash
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### User Login

```bash
POST /api/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

## Running the Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 5000).

## Security Features

- **Password Hashing**: bcrypt with salt rounds of 12
- **JWT Tokens**: Secure authentication with configurable expiry
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Comprehensive validation and sanitization
- **CORS Protection**: Configurable cross-origin policies
- **Helmet**: Security headers and protection
- **Environment Variables**: Secure configuration management

## Validation Rules

### User Registration

- **First/Last Name**: 2-50 characters, letters and spaces only
- **Email**: Valid email format, normalized
- **Company**: 2-100 characters
- **Password**: Minimum 8 characters, must contain uppercase, lowercase, and number
- **Terms Agreement**: Must be true

### OTP

- **Format**: Exactly 6 digits
- **Expiry**: 5 minutes
- **Attempts**: Maximum 3 attempts per OTP
- **Resend Cooldown**: 1 minute between requests

## Rate Limiting

- **Global**: 100 requests per 15 minutes per IP
- **Signup**: 3 attempts per hour per email
- **Signin**: 5 attempts per 15 minutes per email
- **OTP Verification**: 5 attempts per 15 minutes per email
- **OTP Resend**: 3 attempts per hour per email

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors if applicable
}
```

## Health Check

```bash
GET /
```

Returns server status and configuration information.

## Database Integration

Currently uses in-memory storage for development. To integrate with a database:

1. Install database driver (e.g., `mongoose` for MongoDB)
2. Update `models/User.js` with actual database operations
3. Implement database connection in `server.js`
4. Update controllers to use database operations

## Development Notes

- Uses temporary in-memory storage for users and OTPs
- Email templates are embedded in the email service
- JWT tokens include user ID for session management
- All passwords are hashed with bcrypt before storage
- OTPs are generated as 6-digit numbers with 5-minute expiry

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Update documentation
5. Test all endpoints

## License

This project is part of the BusinessPro application suite.
