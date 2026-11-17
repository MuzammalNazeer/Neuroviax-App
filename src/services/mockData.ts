export interface KPIStats {
  revenue: number;
  revenueChange: number;
  ordersCount: number;
  ordersChange: number;
  lowStockCount: number;
  netCashFlow: number;
  activeCustomers: number;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: 'completed' | 'pending' | 'processing' | 'shipped' | 'cancelled';
  itemsCount: number;
  date: string;
  paymentMethod: string;
}

export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  reorderPoint: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface AIAssistant {
  id: string;
  name: string;
  domain: string;
  output: string;
  status: 'active' | 'learning' | 'standby';
  color: string;
  icon: string;
  confidence: number;
}

export interface CustomerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  segment: 'VIP Champions' | 'Loyal' | 'At-Risk' | 'New';
  totalSpent: number;
  ordersCount: number;
  lastPurchase: string;
}

export interface ExpenseItem {
  id: string;
  title: string;
  category: 'Operations' | 'Marketing' | 'Logistics' | 'Payroll' | 'Software';
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'approved';
}

export interface SupplierItem {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  leadTimeDays: number;
  reliabilityScore: number;
  activeOrders: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'success' | 'info' | 'ai';
  time: string;
  read: boolean;
}

export const MOCK_KPIS: KPIStats = {
  revenue: 128450.00,
  revenueChange: 14.8,
  ordersCount: 428,
  ordersChange: 9.2,
  lowStockCount: 4,
  netCashFlow: 45200.00,
  activeCustomers: 1250,
};

export const MOCK_AI_ASSISTANTS: AIAssistant[] = [
  {
    id: 'sales',
    name: 'Sales AI',
    domain: 'Orders · Customers · Products',
    output: 'Forecasts, segments, next-best-offer',
    status: 'active',
    color: '#10b981',
    icon: 'trending-up',
    confidence: 96,
  },
  {
    id: 'procurement',
    name: 'Procurement AI',
    domain: 'Suppliers · POs · Lead Times',
    output: 'Reorder suggestions, supplier pricing',
    status: 'active',
    color: '#3b82f6',
    icon: 'cart',
    confidence: 94,
  },
  {
    id: 'inventory',
    name: 'Inventory AI',
    domain: 'Stock · Batches · Warehouses',
    output: 'Stock alerts, shrinkage anomalies',
    status: 'active',
    color: '#f59e0b',
    icon: 'cube',
    confidence: 98,
  },
  {
    id: 'marketing',
    name: 'Marketing AI',
    domain: 'Campaigns · Loyalty · Retention',
    output: 'Segment-targeted promotions & churn prevention',
    status: 'active',
    color: '#ec4899',
    icon: 'megaphone',
    confidence: 91,
  },
  {
    id: 'support',
    name: 'Customer Support AI',
    domain: 'Conversations · Inquiries · Escalations',
    output: 'Draft replies, sentiment analysis',
    status: 'learning',
    color: '#8b5cf6',
    icon: 'chatbubbles',
    confidence: 89,
  },
  {
    id: 'finance',
    name: 'Finance AI',
    domain: 'Payments · Expenses · Cash Flow',
    output: 'Cash flow prediction, anomaly detection',
    status: 'active',
    color: '#06b6d4',
    icon: 'cash',
    confidence: 97,
  },
];

export const MOCK_ORDERS: OrderItem[] = [
  {
    id: '1',
    orderNumber: 'ORD-9482',
    customerName: 'Ahmad Khan',
    customerEmail: 'ahmad.khan@enterprise.com',
    totalAmount: 1840.50,
    status: 'completed',
    itemsCount: 4,
    date: '2026-11-17 19:40',
    paymentMethod: 'Stripe Credit Card',
  },
  {
    id: '2',
    orderNumber: 'ORD-9481',
    customerName: 'Sara Malik',
    customerEmail: 'sara.malik@techcorp.io',
    totalAmount: 920.00,
    status: 'processing',
    itemsCount: 2,
    date: '2026-11-17 18:15',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '3',
    orderNumber: 'ORD-9480',
    customerName: 'Zainab Fatima',
    customerEmail: 'zainab@retailhub.pk',
    totalAmount: 3250.00,
    status: 'pending',
    itemsCount: 6,
    date: '2026-11-17 16:30',
    paymentMethod: 'Cash on Delivery',
  },
  {
    id: '4',
    orderNumber: 'ORD-9479',
    customerName: 'Bilal Hassan',
    customerEmail: 'bilal@solux.com',
    totalAmount: 480.00,
    status: 'shipped',
    itemsCount: 1,
    date: '2026-11-17 14:10',
    paymentMethod: 'Stripe Credit Card',
  },
  {
    id: '5',
    orderNumber: 'ORD-9478',
    customerName: 'Hamza Farooq',
    customerEmail: 'hamza.f@growthlab.com',
    totalAmount: 760.00,
    status: 'completed',
    itemsCount: 3,
    date: '2026-11-17 11:05',
    paymentMethod: 'PayPal',
  },
];

export const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: '1',
    name: 'Neural Edge IoT Sensor Pro',
    sku: 'NEU-IOT-001',
    category: 'Hardware',
    price: 349.00,
    cost: 180.00,
    stock: 84,
    minStock: 25,
    reorderPoint: 35,
    status: 'in_stock',
  },
  {
    id: '2',
    name: 'AI Gateway Controller V2',
    sku: 'NEU-GW-002',
    category: 'Hardware',
    price: 699.00,
    cost: 390.00,
    stock: 8,
    minStock: 15,
    reorderPoint: 20,
    status: 'low_stock',
  },
  {
    id: '3',
    name: 'Smart Vision Telemetry Cam',
    sku: 'NEU-CAM-003',
    category: 'Vision Systems',
    price: 249.00,
    cost: 120.00,
    stock: 5,
    minStock: 10,
    reorderPoint: 15,
    status: 'low_stock',
  },
  {
    id: '4',
    name: 'Industrial Mesh Node Beacon',
    sku: 'NEU-MSH-004',
    category: 'Networking',
    price: 129.00,
    cost: 65.00,
    stock: 142,
    minStock: 30,
    reorderPoint: 45,
    status: 'in_stock',
  },
  {
    id: '5',
    name: 'Biometric Access Keypad Pro',
    sku: 'NEU-BIO-005',
    category: 'Security',
    price: 450.00,
    cost: 230.00,
    stock: 0,
    minStock: 10,
    reorderPoint: 12,
    status: 'out_of_stock',
  },
];

export const MOCK_CUSTOMERS: CustomerItem[] = [
  {
    id: '1',
    name: 'Ahmad Khan',
    email: 'ahmad.khan@enterprise.com',
    phone: '+92 300 1234567',
    segment: 'VIP Champions',
    totalSpent: 18450.00,
    ordersCount: 14,
    lastPurchase: '2026-11-17',
  },
  {
    id: '2',
    name: 'Sara Malik',
    email: 'sara.malik@techcorp.io',
    phone: '+92 321 7654321',
    segment: 'Loyal',
    totalSpent: 9240.00,
    ordersCount: 8,
    lastPurchase: '2026-11-15',
  },
  {
    id: '3',
    name: 'Zainab Fatima',
    email: 'zainab@retailhub.pk',
    phone: '+92 333 4567890',
    segment: 'New',
    totalSpent: 3250.00,
    ordersCount: 1,
    lastPurchase: '2026-11-17',
  },
  {
    id: '4',
    name: 'Tariq Mehmood',
    email: 'tariq@apexsupply.com',
    phone: '+92 312 9988776',
    segment: 'At-Risk',
    totalSpent: 12800.00,
    ordersCount: 11,
    lastPurchase: '2026-09-02',
  },
];

export const MOCK_EXPENSES: ExpenseItem[] = [
  { id: '1', title: 'AWS Cloud & GPU Compute Cluster', category: 'Software', amount: 3250.00, date: '2026-11-16', status: 'paid' },
  { id: '2', title: 'Logistics Fleet Maintenance', category: 'Logistics', amount: 1420.00, date: '2026-11-14', status: 'paid' },
  { id: '3', title: 'Q4 Paid Ads Campaign', category: 'Marketing', amount: 4500.00, date: '2026-11-12', status: 'approved' },
  { id: '4', title: 'Office Fiber Internet & Comms', category: 'Operations', amount: 380.00, date: '2026-11-10', status: 'paid' },
];

export const MOCK_SUPPLIERS: SupplierItem[] = [
  { id: '1', name: 'Apex Microelectronics Ltd', contactPerson: 'David Chen', email: 'david@apex-micro.com', phone: '+86 21 555 0192', leadTimeDays: 7, reliabilityScore: 98, activeOrders: 2 },
  { id: '2', name: 'Global Optics Shenzhen', contactPerson: 'Lin Wang', email: 'lin@globaloptics.cn', phone: '+86 755 888 1234', leadTimeDays: 12, reliabilityScore: 94, activeOrders: 1 },
  { id: '3', name: 'Indus Precision Plastics', contactPerson: 'Rashid Ali', email: 'rashid@indusprecision.com', phone: '+92 42 3578 9900', leadTimeDays: 4, reliabilityScore: 91, activeOrders: 3 },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: '1', title: 'AI Low Stock Warning', message: 'Smart Vision Telemetry Cam has only 5 units remaining.', type: 'alert', time: '10m ago', read: false },
  { id: '2', title: 'Large Order Completed', message: 'Order #ORD-9482 ($1,840.50) marked as delivered.', type: 'success', time: '1h ago', read: false },
  { id: '3', title: 'Cash Flow Projection', message: 'Positive net cashflow predicted for the upcoming 14 days.', type: 'ai', time: '3h ago', read: true },
  { id: '4', title: 'Anomaly Detected', message: 'Unusual spike in marketing ad spend detected on Nov 12.', type: 'info', time: '1d ago', read: true },
];

export const MOCK_COPILOT_SUGGESTIONS = [
  'What is our projected revenue for next month?',
  'Which products need reordering right now?',
  'Analyze customer churn risk for Q4',
  'Summarize today\'s financial performance',
  'Explain the latest expense anomaly',
];
