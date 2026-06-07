-- ============================================================
-- Wellbeing Korea USA — Database Schema
-- Run this in the Supabase SQL Editor (supabase.com > SQL Editor)
-- ============================================================

-- Customers
create table if not exists customers (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  email               text unique not null,
  name                text,
  phone               text,
  stripe_customer_id  text unique
);

-- Orders
create table if not exists orders (
  id                          uuid primary key default gen_random_uuid(),
  created_at                  timestamptz not null default now(),
  customer_id                 uuid references customers(id) on delete set null,
  customer_email              text not null,
  customer_name               text not null,
  customer_phone              text,
  shipping_address            jsonb not null,
  status                      text not null default 'pending'
                                check (status in ('pending','paid','processing','shipped','delivered','cancelled','refunded')),
  stripe_payment_intent_id    text unique,
  stripe_session_id           text unique,
  subtotal_cents              integer not null,
  shipping_cents              integer not null default 0,
  tax_cents                   integer not null default 0,
  total_cents                 integer not null,
  notes                       text
);

-- Order items (one row per product per order)
create table if not exists order_items (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  order_id            uuid not null references orders(id) on delete cascade,
  sanity_product_id   text not null,   -- Sanity document _id
  product_name_en     text not null,
  product_name_kr     text not null,
  stripe_price_id     text,
  quantity            integer not null default 1 check (quantity > 0),
  unit_price_cents    integer not null,
  total_price_cents   integer not null
);

-- ── Indexes ──────────────────────────────────────────────────
create index if not exists orders_customer_id_idx        on orders(customer_id);
create index if not exists orders_stripe_session_idx      on orders(stripe_session_id);
create index if not exists orders_status_idx              on orders(status);
create index if not exists order_items_order_id_idx       on order_items(order_id);

-- ── Row Level Security ────────────────────────────────────────
-- All reads/writes go through the service-role key on the server.
-- Direct browser access is blocked.
alter table customers  enable row level security;
alter table orders     enable row level security;
alter table order_items enable row level security;

-- No policies = no browser access.
-- The server-side client uses the service role key which bypasses RLS.
