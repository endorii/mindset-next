# 🛍️ Mindset Clothing E-commerce

Mindset Clothing is a full-stack, production-ready e-commerce platform for a modern clothing store.  
It includes a complete shopping flow, admin dashboard, real Stripe payments, delivery integration (Nova Poshta), and a scalable backend built with NestJS & PostgreSQL.

This project demonstrates real-world architecture, clean code structure, strong typing, advanced state management, and a fully functional business flow — from browsing products to order management and analytics.

---

## 🔗 Live Demo
**https://www.tenshimindset.shop**


---

## 🚀 Tech Stack

### **Frontend**
- Next.js 15 (SSR, ISR, CSR)  
- TypeScript  
- TailwindCSS 4  
- Zustand (global state)  
- React Query (server state)  
- Axios  
- Shadcn (Radix UI)  
- Recharts  
- React Hook Form  
- Embla Carousel / Swiper  
- Sonner (notifications)  

### **Backend**
- NestJS  
- PostgreSQL  
- Prisma ORM  
- JWT Authentication
- OAuth  
- Stripe API + Webhooks  
- Nova Post API integration  
- Class-validator / class-transformer  
- Multer file uploads  / Supabase
- Nodemailer / SendGrid (for email notifications)  
- Swagger API Docs  

### **Additional Tools** 
- ESLint + Prettier    
- Deployment: Railway
- Postman

---

## 🔥 Features

### 🛒 Customer Features
- Product catalog with categories & collections  
- Advanced filters (sizes, categories, collections, search)  
- Product detail pages (gallery, variants, reviews)  
- Shopping cart (persistent)  
- Checkout with real **Stripe Payment**  
- Delivery address integration with **Nova Post API**  
- Order history  
- User authentication (JWT cookies)  
- Leave & view reviews  

### 🔐 Admin Dashboard
Secure admin panel with full store management:

- Manage **collections**  
- Manage **categories**  
- Manage **products**  
- Process & update **orders**  
- Review moderation  
- Sales analytics & charts  
- User roles (admin / customer)  
- Product image uploads  

---

## 🧩 Environment Variables

### **Frontend (`client/.env.local`)**
```bash
# APP
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_URL=
NEXT_PUBLIC_APP_URL=
NODE_ENV=

# Secret for call /api/revalidate
REVALIDATE_SECRET=
```

### **Backend (`server/.env`)**
```bash
# APP 
FRONTEND_URL=
DATABASE_URL=
NODE_ENV=
PORT=
FRONTEND_DOMAIN=

# JWT 
# Access Token Configuration
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRES=15m
ACCESS_TOKEN_EXPIRES_MS=

# Refresh Token Configuration
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRES=
REFRESH_TOKEN_EXPIRES_MS=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

#Node Mailer (SendGrid)
SENDGRID_API_KEY=
MAIL_FROM=

# Supabase
SUPABASE_URL=
SUPABASE_SERVICE_KEY=

# NovaPost UA 
NOVA_POST_API_KEY=

# Node Mailer (gmail SMTP)
MAIL_HOST=
MAIL_PORT=
MAIL_SECURE=
MAIL_USER=
MAIL_PASS=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_SECRET_WEBHOOK_KEY=

# Secret for call /api/revalidate
REVALIDATE_SECRET=
```

---

## 📦 Running Locally

### **Clone repository**
```bash
git clone https://github.com/endorii/mindset-next
cd mindset-next
```

###Client
```bash
cd client
npm install
npm run dev
```

###Server
```bash
cd server
npm install
npx prisma migrate dev
npm run dev
```

---

## 📦 Deployment
- Frontend: Railway
- Backend: Railway 
- Database: PostgreSQL (Railway)
- Stripe webhooks: Configured for production domain

---

## 📌 Why I Built This Project
A personal full-stack project designed to practice building a real e-commerce platform from scratch, including business logic, payments, delivery integration, admin tools, and production deployment.
The goal was to simulate real work on a complex commercial product using modern technologies and clean architecture.

---

## ✔️ Roadmap
- Promo codes & discount system
- Multi-language support (UA / EN)
- Mobile app (React Native)
- Inventory management improvements
- Infinite scrolling / lazy loading
- Improved filtering and pagination system

---

## 📄 License
This project is not open-source.  
Source code is available for review but not for commercial use or redistribution.
