export interface MenuItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  category: 'Specialty Coffee' | 'Botanical Latte' | 'Artisan Patisserie';
  description: string;
  detailedStory: string;
  image: string;
  secondaryImage?: string;
  tags: string[];
  tastingNotes: string[];
  ingredients: string[];
  nutrition: {
    calories: string;
    caffeine: string;
    dietary: string;
  };
  options: {
    type: 'beverage' | 'pastry';
    temperatures?: ('Hot' | 'Iced')[];
    milks?: string[];
    sweetness?: string[];
    additions?: { name: string; price: number }[];
    pastryServings?: ('Warm & Crisp' | 'Fresh Room Temp')[];
  };
  rating: number;
  reviewsCount: number;
  badge?: string;
}

export interface CartCustomization {
  temperature?: 'Hot' | 'Iced';
  milk?: string;
  sweetness?: string;
  selectedAdditions: string[];
  pastryServing?: string;
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique timestamp/hash for distinct line item
  menuItem: MenuItem;
  quantity: number;
  customization: CartCustomization;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderCustomerInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
}

export interface OrderSummary {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  orderType: 'pickup' | 'delivery';
  paymentMethod: 'cod' | 'card' | 'apple_pay';
  customer: OrderCustomerInfo;
  cardLast4?: string;
  status: 'Received' | 'Brewing & Crafting' | 'Ready for Pickup' | 'Out for Delivery';
  createdAt: string;
  estimatedTime: string;
}
