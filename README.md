# Dev-Vault
# DevVault - Secure Secret Storage Solution

## Project Overview

DevVault is a full-stack application designed to provide secure storage and sharing of sensitive information, such as passwords, API keys, and personal notes. It leverages encryption, robust authentication, and role-based access control to ensure that secrets are protected from unauthorized access while offering a user-friendly interface to manage vault contents efficiently.

---

## Motivation

In today’s digital world, managing secrets securely is critical for both individuals and organizations. Many existing solutions are either too complex or lack essential security features. DevVault aims to fill this gap by combining advanced security measures with an intuitive user experience, enabling users to safely store and share secrets with confidence.

---

## Features

- **User Authentication & Authorization:** JWT-based login system ensures secure access.
- **Role-Based Access Control (RBAC):** Different user roles with specific permissions.
- **AES-256 Encryption:** All secrets are encrypted before storing in the database.
- **Secret Vault:** Users can create, update, delete, and share secrets securely.
- **Audit Logging:** Track user activities for security monitoring.
- **Responsive UI:** Clean and easy-to-use frontend with React.
- **API Integration:** RESTful backend built with Node.js and Express.
- **Docker Support:** Containerized backend and frontend for easy deployment.

---

## Technologies Used

- **Frontend:** React, React Router, Axios, CSS
- **Backend:** Node.js, Express.js, PostgreSQL, Sequelize ORM
- **Security:** JWT, AES-256 encryption, bcrypt
- **Deployment:** Docker, CI/CD pipelines
- **Others:** Swagger (API docs), Helmet (security headers), Rate limiting

---

## Architecture

1. **Frontend:** React app handles UI and interacts with backend APIs.
2. **Backend:** Node.js/Express server implements REST API with authentication, authorization, encryption, and database operations.
3. **Database:** PostgreSQL stores encrypted secrets and user info.
4. **Encryption:** Secrets encrypted client-side or server-side before database storage.
5. **Audit:** Backend logs user actions for compliance and security.

---

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- PostgreSQL
- Docker (optional but recommended)
- npm or yarn

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/DevVault.git
   cd DevVault/backend
   The final link to the deployable app is:
   
