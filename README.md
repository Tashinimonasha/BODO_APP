# BODO APP - Boarding Accommodation Finder

## 📌 Project Overview
BODO APP is a comprehensive web application designed to revolutionize the way students and workers find nearby boarding accommodations. Our platform provides a seamless, user-friendly interface for both accommodation seekers and providers, making the process of finding and listing boarding places efficient and hassle-free.

## 🎯 Vision & Mission
Our mission is to empower individuals to find safe and reliable boarding accommodations effortlessly. We envision a future where the process of finding suitable living spaces is streamlined, ensuring convenience, comfort, and peace of mind for students and professionals alike.

## 🛠️ Tech Stack
- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS for modern, responsive design
- **Backend API**: Node.js, Express.js (Connected via RESTful API)
- **State Management**: React Hooks for efficient state handling
- **Authentication**: Firebase Authentication
- **Cloud Storage**: Firebase Storage for media files
- **Routing**: React Router for seamless navigation
- **UI Components**: Custom components with modern design principles

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Git

### 1️⃣ Clone & Setup
```sh
# Clone the repository
git clone https://github.com/Tashinimonasha/BODO_APP.git

# Navigate to project directory
cd BODO_APP

# Install dependencies
npm install
```

### 2️⃣ Environment Configuration
Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:3000/api

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Other Configurations
REACT_APP_MAP_API_KEY=your_map_api_key
```

### 3️⃣ Firebase Setup
1. Create a Firebase project
2. Enable Authentication (Email/Password)
3. Set up Cloud Storage
4. Copy Firebase config to `.env`

### 4️⃣ Development Server
```sh
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

The app will be available at `http://localhost:3000`

---

## � Key Features

### 👥 User Features
- **Authentication System**
  - Secure login and registration
  - Email verification
  - Password recovery functionality
  - User profile management

- **Boarding Search & Discovery**
  - Advanced search filters (location, price, type)
  - Real-time availability updates
  - Detailed boarding information
  - Image galleries with zoom functionality
  - Location-based search
  - Save favorite listings
  - Contact property owners directly

- **Listing Management**
  - Create and manage boarding listings
  - Upload multiple images
  - Set pricing and availability
  - Specify amenities and rules
  - Edit/Delete listings
  - Track listing views

### 👨‍💼 Admin Features
- **Dashboard**
  - Overview of platform statistics
  - User management system
  - Listing monitoring and control
  - Real-time analytics

- **Content Management**
  - Review and moderate listings
  - Manage user accounts
  - Handle reported content
  - System-wide announcements

### 💫 Additional Features
- **User Experience**
  - Responsive design for all devices
  - Intuitive navigation
  - Fast search and filtering
  - Interactive UI elements
  - Real-time updates

- **Security & Privacy**
  - Secure data transmission
  - User data protection
  - Privacy controls
  - Safe payment processing

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

## 📝 API Integration

### Authentication Endpoints
- **User Management:**
  - `POST /api/auth/login` → User login with credentials
  - `POST /api/auth/register` → New user registration
  - `POST /api/auth/forgot-password` → Password recovery
  - `POST /api/auth/verify-email` → Email verification
  - `GET /api/auth/user` → Get user profile
  - `PUT /api/auth/user` → Update user profile

### Boarding Management
- **Listings:**
  - `GET /api/boarding` → Fetch all listings
  - `GET /api/boarding/:id` → Get specific listing
  - `POST /api/boarding` → Create new listing
  - `PUT /api/boarding/:id` → Update listing
  - `DELETE /api/boarding/:id` → Remove listing
  - `GET /api/boarding/search` → Search listings

- **User Interactions:**
  - `POST /api/boarding/save/:id` → Save listing
  - `GET /api/boarding/saved` → Get saved listings
  - `POST /api/boarding/:id/contact` → Contact owner

### Admin Endpoints
- **Management:**
  - `GET /api/admin/dashboard` → Dashboard statistics
  - `GET /api/admin/users` → User management
  - `GET /api/admin/listings` → Listing management
  - `PUT /api/admin/listing/:id` → Moderate listing

---

## 📂 Project Structure
```
BODO_APP/
├── src/
│   ├── components/            # Reusable UI Components
│   │   ├── AdminHeader.js     # Admin dashboard header
│   │   ├── Footer.js         # Global footer component
│   │   ├── Header.js         # Main navigation header
│   │   ├── ListingCard.js    # Boarding listing card
│   │   └── SideBar.js        # Admin sidebar navigation
│   │
│   ├── pages/                # Application Pages
│   │   ├── About.js          # About page with mission/vision
│   │   ├── AddListing.js     # Create new boarding listing
│   │   ├── AdminDashboard.js # Admin control panel
│   │   ├── Boarding.js       # Main boarding listings
│   │   ├── BoardingDetails.js # Individual listing view
│   │   ├── Contact.js        # Contact information
│   │   ├── Forgotpassword.js # Password recovery
│   │   ├── Home.js          # Landing page
│   │   ├── Login.js         # User authentication
│   │   ├── MyAds.js         # User's listings management
│   │   ├── Register.js      # New user registration
│   │   ├── SavedAds.js      # Saved favorites
│   │   └── UsersPage.js     # User management (Admin)
│   │
│   ├── assets/              # Static Resources
│   │   ├── about/           # About page images
│   │   ├── backgrounds/     # Background images
│   │   ├── footer/         # Footer assets
│   │   ├── home/           # Homepage assets
│   │   └── login/          # Authentication page assets
│   │
│   ├── firebase/           # Firebase configuration
│   ├── i18n/               # Internationalization
│   ├── services/           # API services
│   │   └── notification.js # Notification handling
│   │
│   ├── styles/             # Global styles
│   ├── App.js              # Main application component
│   └── index.js            # Application entry point
│
├── public/                 # Public assets
├── build/                  # Production build
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md              # Project documentation
```

---

## �️ Security Measures
- Secure authentication via Firebase
- Protected API endpoints
- Input validation and sanitization
- XSS protection
- CSRF protection
- Data encryption in transit
- Secure file upload handling

## 🧪 Testing
```sh
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 📊 Performance Optimization
- Code splitting
- Lazy loading of components
- Image optimization
- Caching strategies
- CDN integration
- Minimized bundle size

## �📜 License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributors
- **Tashini Monasha** - Lead Developer
  - Implemented core features
  - Designed user interface
  - Managed project architecture

## 📩 Contact & Support
Need help? Feel free to reach out!

- 📧 Email: tashinimonasha44@gmail.com
- 🌐 GitHub: [Tashini Monasha](https://github.com/tashinimonasha)
- 💬 LinkedIn: [Tashini Monasha](https://www.linkedin.com/in/tashinimonasha)

### Reporting Issues
For bug reports and feature requests, please use the [GitHub Issues](https://github.com/Tashinimonasha/BODO_APP/issues) page.

---
Built with ❤️ by Tashini Monasha
