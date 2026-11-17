# 📱 Neuroviax AI - Enterprise Mobile Ecosystem

An autonomous AI-powered **React Native (Expo SDK 58 + TypeScript)** mobile application backed by a dedicated **Node.js / Express REST API** & **MongoDB Database**.

> **Note**: This repository is strictly the **React Native Mobile App** and its supporting backend API and database services. All legacy web code has been removed.

---

## 🏗️ Architecture Overview

```text
Neuroviax-App/
├── assets/                    # App icons, splash screen, adaptive icons
├── src/                       # 📱 Pure React Native Mobile Application
│   ├── theme/                 # Cyber Emerald theme & design tokens
│   ├── context/               # AuthContext (sessions, tokens, RBAC)
│   ├── services/              # API Client (live server + offline mock fallback)
│   ├── components/            # Reusable UI (Header, Button, Input, Card, StatCard, Badge)
│   ├── navigation/            # RootNavigator & MainTabNavigator
│   └── screens/
│       ├── SplashScreen.tsx             # Animated Neural Splash Screen
│       ├── OnboardingScreen.tsx         # 3-Slide Interactive Carousel + Demo Mode
│       ├── auth/
│       │   ├── LoginScreen.tsx          # Login + Quick Demo Credentials Fill
│       │   ├── RegisterScreen.tsx       # Enterprise Account Registration
│       │   ├── VerifyOTPScreen.tsx      # 6-Digit Two-Factor OTP Security
│       │   ├── ForgotPasswordScreen.tsx # Password Reset Code Dispatch
│       │   └── ResetPasswordScreen.tsx  # New Password Form
│       └── main/
│           ├── DashboardScreen.tsx      # KPIs, 6 Autonomous AI Assistants, Revenue Trends
│           ├── AICopilotScreen.tsx      # ChatGPT-style Business AI Copilot
│           ├── AIInsightsScreen.tsx     # Demand, Cash Flow, Anomaly, RFM Segments, ABOP
│           ├── OrdersScreen.tsx         # Orders List, Filter tabs, Detail modal, Status updates
│           ├── ProductsScreen.tsx       # SKUs, Stock, Cost margins, Add Product
│           ├── InventoryScreen.tsx      # Multi-warehouse stock tracking, Adjustment modal
│           ├── FinanceScreen.tsx        # Inflow/Outflow runway, Add Expense modal
│           ├── CustomersScreen.tsx      # Customer CRM, RFM segments, Call/Email buttons
│           ├── SuppliersScreen.tsx      # Vendor lead-time, reliability ratings
│           ├── ReportsScreen.tsx        # Audited BI reports (30d, 90d, YTD), PDF/CSV export
│           ├── TeamScreen.tsx           # Team RBAC & Invite modal
│           ├── IntegrationsScreen.tsx   # Shopify, WooCommerce, Stripe, WhatsApp toggles
│           ├── SubscriptionScreen.tsx   # Starter, Pro, Enterprise tier upgrades
│           ├── NotificationsScreen.tsx  # Push alert center (Stockout, Anomaly, Payment)
│           ├── ProfileScreen.tsx        # Settings, Biometric toggle, Configurable API URL
│           └── AdminDashboardScreen.tsx # Super Admin Multi-Tenant Cockpit
├── backend/                   # 🚀 Node.js / Express API & Database Service
│   ├── config/                # MongoDB & auto-fallback in-memory database
│   ├── controllers/           # AI, Orders, Products, Payments, Auth controllers
│   ├── models/                # Mongoose schema models
│   ├── routes/                # REST endpoints
│   ├── seed/                  # Demo seed generator
│   └── server.js              # Express app entry
├── App.tsx                    # Root React Native Entry
├── app.json                   # Expo App Configuration
├── index.ts                   # registerRootComponent
├── package.json               # Scripts & dependencies
└── tsconfig.json              # TypeScript Configuration
```

---

## 🚀 How to Run the App & Backend

### 1. Run the React Native Mobile App
```bash
# In the root folder:
npm start
```
- Press `a` for **Android** emulator or connected device.
- Press `i` for **iOS** simulator.
- Press `w` for **Web** preview (`http://localhost:8081`).
- Scan the printed QR code using the **Expo Go** mobile app on your physical phone!

### 2. Run the Backend API & Database
```bash
# Starts the Node.js/Express API server on port 5000:
npm run backend

# Or in development watch mode:
npm run backend:dev
```
* **Database**: Automatically connects to local MongoDB (`mongodb://127.0.0.1:27017/neuroviax`). If MongoDB is not running, it automatically activates an **In-Memory database** with full pre-seeded demo data so testing is seamless!

---

## 🔑 Demo Account
- **Email**: `admin@neuroviax.ai`
- **Password**: `password123`
- Or click the **Demo Mode** button on the Onboarding screen for instant access!
