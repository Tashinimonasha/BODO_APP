# BODO APP - Frontend

## 📌 Project Overview
BODO APP is a web application designed to help users find nearby boarding accommodations. This is the frontend part of the project, built using React.js. It connects to the backend API for managing user authentication, boarding listings, and other functionalities.

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend API**: Node.js, Express.js (Connected via API)
- **State Management**: React Hooks
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage

---

## 🚀 Getting Started
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/bodo-frontend.git
cd bodo-frontend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory and add the following:
```env
REACT_APP_API_URL=http://localhost:3000/api
```
> Replace `http://localhost:3000/api` with the production API URL when deploying.

### 4️⃣ Start Development Server
```sh
npm start
```
This will start the app at `http://localhost:3001`.

---

## 🎯 Features
✅ User authentication (Login/Register via Firebase)
✅ Boarding listing management
✅ Search and filter boarding accommodations
✅ Responsive design with Tailwind CSS
✅ Secure API requests

---

## 🔧 Build & Deployment
### 🔹 Build for Production
```sh
npm run build
```
This will create an optimized production-ready build in the `build/` directory.

### 🔹 Deployment on Vercel
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Login to Vercel:
   ```sh
   vercel login
   ```
3. Deploy:
   ```sh
   vercel
   ```

> Alternatively, you can deploy to Netlify or Firebase Hosting.

---

## 📝 API Endpoints
The frontend interacts with the backend using the following API endpoints:

- **Auth Routes:**
  - `POST /api/auth/login` → User Login
  - `POST /api/auth/register` → User Registration

- **Boarding Routes:**
  - `GET /api/boarding` → Fetch all listings
  - `POST /api/boarding` → Add a new boarding

---

## 📂 Project Structure
```
BODO_APP/
│── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Main pages (Home, Login, Register, etc.)
│   ├── assets/            # Static files (Images, Icons)
│   ├── App.js             # Main App Component
│   ├── index.js           # Entry Point
│── .env                   # Environment Variables
│── package.json           # Dependencies
│── tailwind.config.js     # Tailwind CSS Config
```

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 🤝 Contributors
- **Tashini Monasha** 


---

## 📩 Contact
For any issues or suggestions, feel free to reach out:
📧 Email: tashinimonasha44@gmail.com  
🌐 GitHub: [Tashini Monasha](https://github.com/tashinimonasha)

