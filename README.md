# Web Clipboard App 📋

[![K9Fox](https://img.shields.io/badge/By-K9Fox-2ea44f?style=flat-square&logo=github)](https://github.com/aiyafi)

A personal web clipboard solution for bridging the gap between iPhone and Windows ecosystems. Securely sync text snippets across devices with a self-hosted solution.

## Features 🚀
- **Personal Clipboard Management** (Create/Read/Update/Delete)
- Cross-device synchronization
- Responsive UI with smooth animations
- Secure authentication (personal use only)
- Theme support (light/dark mode)
- Real-time updates

## Installation ⚙️

1. Clone repository:
```bash
git clone https://github.com/aiyafi/web-clipboard-app.git
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```env
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

4. Run development server:
```bash
pnpm dev
```

## Project Structure 📂

```bash
src/
├── app/            # Next.js app router
├── components/     # UI components
│   ├── layout/     # Main layout components
│   ├── magicui/    # Animated components
│   └── ui/         # Radix UI primitives
├── hooks/          # Custom React hooks
├── lib/            # Client libraries
└── styles/         # Global CSS
```

## Dependencies 🧩

**Frontend**
- Next.js 15
- React 19
- shadcn/ui
- Radix UI Primitives
- Lucide Icons

**Styling**
- Tailwind CSS

**Utilities**
- clsx
- tailwind-merge

**Backend**
- Firebase

## Disclaimer ⚠️
This is a personal use application. Service access is restricted to the owner. Not intended for public hosting.

## Credits 🙌
- **K9Fox** ([@aiyafi](https://yafff.tech/))
- Radix UI
- Lucide React Icons
- Vercel Next.js Team

## License 📄
MIT License - See [LICENSE](LICENSE) for details.