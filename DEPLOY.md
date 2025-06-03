# DevVault Deployment Guide

This guide walks you through deploying DevVault both locally and in production.

---

## 🧪 Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/DevVault.git
   cd DevVault
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Add your variables
   npm run dev
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env  # Add your variables
   npm start
   ```

4. Access the frontend at `http://localhost:3000` and backend at `http://localhost:5000`

---

## 🚀 Production Deployment

You can deploy using:

### Render / Railway (Backend)
- Connect your repo
- Add environment variables in the dashboard
- Set build command: `npm install`
- Set start command: `npm run start`

### Vercel (Frontend)
- Import frontend repo/folder
- Add `.env` variables
- Set build command: `npm run build`
- Set output directory: `build`

---

## 🔐 Notes

- Ensure CORS is set properly in `backend/server.js`
- Use HTTPS in production
- Set JWT secrets and DB credentials safely in `.env`

Good luck!
