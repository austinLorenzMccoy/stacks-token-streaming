# sBTC Streamr Frontend

A beautiful, modern frontend for the sBTC Streamr protocol with real-time updates and unique "Liquid Flow" theme.

## 🎨 Unique Features

### Liquid Flow Theme
- **Custom Color Palette**: Flow (cyan/blue), Stream (purple/magenta), Bitcoin (orange)
- **Animated Gradients**: Flowing background animations
- **Glass Morphism**: Frosted glass cards with backdrop blur
- **Glow Effects**: Dynamic shadows and glowing elements
- **Real-time Animations**: Pulsing indicators and flowing progress bars

### Design Elements
- **Flowing Borders**: Animated gradient borders on hover
- **Glass Cards**: Translucent cards with blur effects
- **Gradient Text**: Multi-color gradient text effects
- **Bitcoin Glow**: Special glow effect for Bitcoin-related elements
- **Shimmer Effects**: Animated shimmer backgrounds

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Dashboard with stream list
│   ├── create/            # Create stream page
│   ├── stream/[id]/       # Stream details page
│   └── my-streams/        # User's streams page
├── components/            # React components
│   ├── navbar.tsx        # Navigation with wallet
│   ├── stream-card.tsx   # Stream display card
│   └── stream-dashboard.tsx # Dashboard component
├── hooks/                 # Custom React hooks
│   └── use-stacks.ts     # Wallet integration
└── lib/                   # Utilities and contract interactions
    ├── stream-contract.ts # Contract functions
    └── utils.ts          # Helper functions
```

## 🎯 Key Features

### Wallet Integration
- **Stacks Connect**: Seamless wallet connection
- **Real-time Updates**: Automatic balance updates
- **Transaction Signing**: Secure contract interactions

### Stream Management
- **Create Streams**: Intuitive form with validation
- **View Streams**: Beautiful cards with real-time data
- **Withdraw**: One-click token withdrawal
- **Refuel**: Add funds to existing streams
- **Refund**: Claim excess tokens

### Real-time Features
- **Block Height Updates**: Every 30 seconds
- **Balance Calculations**: Live available balance
- **Progress Tracking**: Visual progress bars
- **Status Indicators**: Active, Pending, Completed

## 🎨 Theme Customization

The theme is defined in `tailwind.config.ts`:

```typescript
colors: {
  flow: { /* Cyan/Blue shades */ },
  stream: { /* Purple/Magenta shades */ },
  bitcoin: { /* Orange shades */ }
}
```

Custom utilities in `globals.css`:
- `.glass-card` - Frosted glass effect
- `.glass-button` - Gradient button
- `.stream-card` - Hoverable stream card
- `.text-gradient` - Gradient text
- `.bitcoin-glow` - Glowing text effect

## 🔧 Configuration

Update contract address in `src/hooks/use-stacks.ts` and `src/lib/stream-contract.ts`:

```typescript
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";
const CONTRACT_NAME = "stream";
```

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Responsive grid layouts
- **Desktop**: Full-featured experience

## 🌐 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Other Platforms
```bash
npm run build
# Deploy the .next folder
```

## 🎨 Color Palette

- **Flow**: `#0ea5e9` - Primary blue/cyan
- **Stream**: `#d946ef` - Secondary purple/magenta
- **Bitcoin**: `#f97316` - Accent orange
- **Background**: Dark gradient from slate-950

## ✨ Animations

- **flow**: Horizontal translation animation
- **pulse-slow**: Slow pulsing effect
- **shimmer**: Background shimmer effect

## 🔐 Security

- No private keys stored
- All transactions require wallet approval
- Read-only contract calls for data fetching

---

**Built with ❤️ using Next.js 15, React 19, and TailwindCSS**
