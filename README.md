# 💰 Expense Tracker

A modern, beautiful expense tracking application built with React, TypeScript, and Three.js. Track your expenses and income with style, featuring stunning 3D visualizations, comprehensive analytics, and an intuitive user interface.

## ✨ Features

- **📊 Dashboard Overview** - Get a bird's eye view of your financial health with interactive charts and summaries
- **💸 Expense & Income Management** - Easily track all your transactions with detailed categorization
- **🎨 Custom Categories** - Create personalized categories with emojis and color coding
- **📈 Advanced Analytics** - Visualize your spending patterns with beautiful charts powered by Recharts
- **🎭 3D Visualizations** - Immersive Three.js powered visual effects for an engaging experience
- **🌓 Dark Mode** - Seamless theme switching with system preference detection
- **📱 Responsive Design** - Works beautifully on all devices, from mobile to desktop
- **⚡ Real-time Updates** - Powered by React Query for optimal data synchronization
- **🎯 Type Safety** - Built with TypeScript and Zod for robust validation

## 🚀 Tech Stack

### Core
- **React 19** - Latest React with improved performance
- **TypeScript** - Type-safe development experience
- **Vite** - Lightning fast build tool and dev server

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Perfect dark mode implementation

### State & Data
- **React Query (TanStack Query)** - Powerful async state management
- **React Hook Form** - Performant form validation
- **Zod** - TypeScript-first schema validation
- **Axios** - Promise-based HTTP client

### Visualization
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **Recharts** - Composable charting library

### Developer Experience
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📁 Project Structure

```
expense-tracker/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   └── layout/         # Layout components
│   ├── features/           # Feature-based modules
│   │   ├── categories/     # Category management
│   │   ├── expenses/       # Expense tracking
│   │   ├── analytics/      # Analytics & charts
│   │   └── dashboard/      # Dashboard overview
│   ├── lib/                # Utilities and helpers
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   ├── routes/             # React Router configuration
│   └── App.tsx             # Main application component
├── public/                 # Static assets
└── dist/                   # Production build output
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your API endpoint:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Features in Detail

### Dashboard
- Real-time expense and income overview
- Quick statistics cards
- Recent transactions list
- Monthly spending trends

### Categories
- Create custom categories with emoji icons
- Color-coded organization
- Separate expense and income categories
- Visual category management

### Analytics
- Interactive charts and graphs
- Spending breakdown by category
- Time-based trend analysis
- Export capabilities

### Expense Management
- Quick expense entry
- Date and amount tracking
- Category assignment
- Notes and descriptions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Three.js](https://threejs.org/) for 3D graphics capabilities
- [Recharts](https://recharts.org/) for beautiful charts

---

**Built with ❤️ by Uday**

*Last Updated: December 2025*
