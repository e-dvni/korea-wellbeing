export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          name: string | null;
          phone: string | null;
          stripe_customer_id: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["customers"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["customers"]["Insert"]>;
      };
      orders: {
        Row: {
          id: string;
          created_at: string;
          customer_id: string | null;
          customer_email: string;
          customer_name: string;
          customer_phone: string | null;
          shipping_address: ShippingAddress;
          status: OrderStatus;
          stripe_payment_intent_id: string | null;
          stripe_session_id: string | null;
          subtotal_cents: number;
          shipping_cents: number;
          tax_cents: number;
          total_cents: number;
          notes: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      order_items: {
        Row: {
          id: string;
          created_at: string;
          order_id: string;
          sanity_product_id: string;
          product_name_en: string;
          product_name_kr: string;
          stripe_price_id: string | null;
          quantity: number;
          unit_price_cents: number;
          total_price_cents: number;
        };
        Insert: Omit<Database["public"]["Tables"]["order_items"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["order_items"]["Insert"]>;
      };
    };
  };
};

export type ShippingAddress = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
export type Customer = Database["public"]["Tables"]["customers"]["Row"];
