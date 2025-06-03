# DevVault Dependencies

A summary of all npm dependencies used in the DevVault project.

---

## 📦 Backend Dependencies (Node.js + Express)

Install these using:  
```bash
cd backend  
npm install
```

```json
{
  "dependencies": {
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "pg": "^8.10.0",
    "sequelize": "^6.31.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

---

## 💻 Frontend Dependencies (React + Tailwind)

Install these using:  
```bash
cd frontend  
npm install
```

```json
{
  "dependencies": {
    "axios": "^1.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "tailwindcss": "^3.3.2",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "web-vitals": "^2.1.4"
  }
}
```

---

## 🛠 Installation Summary

- Make sure Node.js and npm are installed
- Run `npm install` separately in `frontend/` and `backend/` folders
- Use `npm start` in both to launch the app locally

---

## 📎 Notes
- Tailwind CSS requires a `tailwind.config.js` setup
- `.env` variables must be configured for both backend and frontend
