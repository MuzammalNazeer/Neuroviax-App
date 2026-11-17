# 📱 Neuroviax AI - React Native Enterprise Mobile App

Modern, high-performance **React Native (Expo SDK 58 + TypeScript)** mobile application for **Neuroviax AI** — Autonomous Business Intelligence, Enterprise ERP & Decision Engine.

---

## 🌟 App Screens & Architecture

### 1. Starting & Authentication Flow
- **Animated Splash Screen** (`SplashScreen.tsx`): Glowing neural pulse logo, animated loading progress, system initialization checks, and session-based auto-routing.
- **Interactive Onboarding** (`OnboardingScreen.tsx`): Multi-slide interactive carousel detailing Autonomous Optimization, Executive AI Copilot, and Unified ERP. Includes 1-click **Demo Mode** bypass.
- **Sign In Cockpit** (`LoginScreen.tsx`): Secure corporate login, password visibility toggle, remember device, Google Workspace SSO, and demo quick-fill (`admin@neuroviax.ai` / `password123`).
- **Register Business** (`RegisterScreen.tsx`): Name, Corporate email, Business name, Password, SLA agreement.
- **Two-Factor OTP Security** (`VerifyOTPScreen.tsx`): 6-digit verification code input with countdown timer and resend capability.
- **Password Recovery** (`ForgotPasswordScreen.tsx`): Self-serve OTP dispatch for account password reset.
- **Reset Password** (`ResetPasswordScreen.tsx`): New password creation and confirmation.

### 2. Main Navigation (Bottom Tab Cockpit)
- 📊 **Dashboard Screen** (`DashboardScreen.tsx`):
  - Live autonomous AI status indicator.
  - Core financial KPIs (Revenue, Orders, Net Cash Flow, Low Stock alerts).
  - Executive AI Copilot interactive quick banner.
  - 4 One-touch quick operations (Orders, Catalog, Inventory, Finance).
  - **6 Autonomous AI Assistant Cards**:
    - **Sales AI** (Prophet forecasting & segmentation)
    - **Procurement AI** (Supplier comparisons & automated POs)
    - **Inventory AI** (Shrinkage & stockout anomaly alerts)
    - **Marketing AI** (Targeted promotions & retention)
    - **Customer Support AI** (Intent classification & draft replies)
    - **Finance AI** (Cash flow forecasting & expense anomalies)
  - Recent sales transactions with status badges.
- 💬 **AI Executive Copilot** (`AICopilotScreen.tsx`):
  - ChatGPT-style interactive business intelligence chatbot.
  - Quick directive suggestion pills.
  - Formatted multi-modal intelligence output.
  - Real-time response generation.
- 🧠 **AI Intelligence Core** (`AIInsightsScreen.tsx`):
  - **Demand Forecasting** (Meta Prophet 30-day projection)
  - **Cash Flow Prediction** (Inflow vs. scheduled payables, net runway)
  - **Hybrid Anomaly Detector** (Scikit Isolation Forest deviation alerts)
  - **Customer Segmentation** (K-Means RFM clustering: Champions, Loyal, At-Risk)
  - **ABOP Control Loop** (Sense ➔ Orient ➔ Decide ➔ Act self-healing architecture)
- 📦 **Orders Management** (`OrdersScreen.tsx`):
  - Search by customer name or order number.
  - Filter tabs: `All`, `Completed`, `Processing`, `Pending`.
  - Detailed Order Bottom Sheet with customer information, line items, and 1-touch status updates.
  - Quick Counter Sale creation button.
- 🏢 **Warehouse Inventory** (`InventoryScreen.tsx`):
  - Real-time stock health meter.
  - Safety threshold and reorder trigger indicators.
  - Modal for receiving stock or logging scrap adjustments.

### 3. Specialized Stack Screens
- 🛍️ **Products Catalog** (`ProductsScreen.tsx`): Active SKUs, price, cost margin, stock levels, and Add New Product modal.
- 👥 **Enterprise CRM & Customers** (`CustomersScreen.tsx`): Customer directory, RFM segment tags, lifetime spend, 1-click phone call and email buttons.
- 🚚 **Supplier Logistics** (`SuppliersScreen.tsx`): Vendor directory, average lead times, reliability scores, and purchase order communications.
- 📈 **Audited BI Reports** (`ReportsScreen.tsx`): Period filters (30-day, 90-day, YTD), profit margin analysis, and simulated PDF/CSV export.
- 🛡️ **Enterprise Team & RBAC** (`TeamScreen.tsx`): Role-Based Access Control, member list, and modal for dispatching invitations.
- 🔗 **Connected Channels & Webhooks** (`IntegrationsScreen.tsx`): Shopify, WooCommerce, Stripe, QuickBooks, and WhatsApp Business API toggles.
- 💳 **Subscription Plans & Billing** (`SubscriptionScreen.tsx`): Starter Pilot, Pro Growth, and Enterprise Sovereign tiers with feature checklists.
- 🔔 **Notification Center** (`NotificationsScreen.tsx`): Push notifications for stock alerts, payments, and AI anomaly warnings.
- ⚙️ **Executive Profile & Settings** (`ProfileScreen.tsx`): User account details, Biometric Face-ID toggle, configurable **API Gateway Base URL**, and sign out.
- 🎛️ **Super Admin Cockpit** (`AdminDashboardScreen.tsx`): Multi-tenant overview, database and AI latency telemetry, platform MRR, and cache flush.

---

## 🚀 How to Run the App

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Option 1: Run directly from the `mobile` folder
```bash
cd mobile
npm start
```

### Option 2: Run from the root workspace
```bash
# In the Neuroviax-App folder:
npm run mobile
```

### Target Platforms
- Press `a` in the terminal to launch on an **Android** emulator or connected device.
- Press `i` in the terminal to launch on an **iOS** simulator (macOS required).
- Press `w` in the terminal to launch in your **Web Browser** (`localhost:8081`).
- Scan the printed QR code using the **Expo Go** app on your physical iOS or Android phone!

---

## 🔌 Backend Connectivity
The mobile app comes with intelligent dual-mode support:
1. **Self-Sufficient Mock Mode**: Works out of the box with complete enterprise data even without the backend running.
2. **Live Backend Mode**: In `Profile & Settings`, you can enter your server URL (default `http://10.0.2.2:5000/api` for Android emulator, or your LAN IP like `http://192.168.1.X:5000/api` for physical devices).
