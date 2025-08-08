# Cryptica 🔐

> Life's messy. Your passwords don't have to be.

A modern, secure password management and generation web application built with Next.js, TypeScript, and Tailwind CSS. Cryptica provides powerful password generation, strength analysis, encryption tools, and more - all wrapped in a beautiful, responsive Progressive Web App (PWA).

![Cryptica](https://img.shields.io/badge/Next.js-15.4.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![PWA](https://img.shields.io/badge/PWA-Ready-green?style=for-the-badge&logo=pwa)

## ✨ Features

### 🔑 Password Generation
- **Multiple Strength Levels**: Generate passwords from Very Weak to Very Strong
- **Custom Character Sets**: Define your own character sets for specialized needs
- **AI-Powered Generation**: Use OpenAI integration for creative, memorable passwords
- **Preset System**: Save and reuse password generation configurations
- **Bulk Generation**: Generate up to 50 passwords at once

### 📊 Password Analysis
- **Real-time Strength Assessment**: Instant feedback on password security
- **Entropy Calculation**: Advanced cryptographic strength measurement
- **Character Distribution**: Detailed breakdown of password composition
- **Time-to-Crack Estimation**: Understand how long it would take to brute force
- **Visual Strength Indicators**: Color-coded strength meters

### 🔐 Encryption Tools
- **Multiple Algorithms**: Support for various encryption standards
- **Text Encryption/Decryption**: Secure your sensitive information
- **Key Generation**: Generate secure encryption keys
- **Algorithm Selection**: Choose the right encryption for your needs

### 🌐 Progressive Web App
- **Offline Capability**: Works without internet connection
- **Installable**: Add to home screen on any device
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Fast Loading**: Optimized performance with Next.js 15

### 🌍 Internationalization
- **Multi-language Support**: English, French, and German
- **RTL Support**: Ready for right-to-left languages
- **Localized Content**: All features available in multiple languages

### 🎨 User Experience
- **Dark/Light Themes**: Automatic theme switching with system preference
- **Activity Tracking**: Monitor your password generation history
- **Settings Persistence**: Your preferences saved locally
- **Keyboard Navigation**: Full accessibility support
- **Screen Reader Friendly**: WCAG compliant

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cryptica-site.git
   cd cryptica-site
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Using yarn
   yarn install
   
   # Using bun (recommended)
   bun install

3. **Run the development server**
   ```bash
   # Using npm
   npm run dev
   
   # Using yarn
   yarn dev
   
   # Using bun
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development

### Project Structure
```
cryptica-site/
├── app/                    # Next.js App Router pages
│   ├── activity/          # Activity tracking
│   ├── breaches/          # Breach checking
│   ├── encryption/        # Encryption tools
│   ├── generate/          # Password generation
│   ├── presets/           # Password presets
│   ├── settings/          # User settings
│   └── strength/          # Password strength analysis
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and core logic
├── messages/             # Internationalization files
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Using bun (faster)
bun dev              # Start development server
bun build            # Build for production
bun start            # Start production server
```

### Code Quality

The project uses several tools to maintain code quality:

- **ESLint**: Code linting with Next.js and TypeScript rules
- **Prettier**: Code formatting with import sorting
- **TypeScript**: Static type checking
- **EditorConfig**: Consistent editor settings

### Adding New Features

1. **Create new pages** in the `app/` directory
2. **Add components** in the `components/` directory
3. **Create hooks** in the `hooks/` directory
4. **Add utilities** in the `lib/` directory
5. **Update translations** in `messages/` directory

## 🔧 Configuration

### Password Generation Settings

Customize password generation behavior in the settings:

- **Character Sets**: Define custom character sets
- **Default Length**: Set preferred password length
- **Strength Levels**: Configure strength thresholds
- **AI Integration**: Enable/disable OpenAI features

### PWA Configuration

The app is configured as a Progressive Web App with:

- **Manifest**: App metadata and icons
- **Service Worker**: Offline functionality
- **Installation**: Add to home screen capability
- **Themes**: Dark/light mode support

### Internationalization

Add new languages by:

1. Creating a new file in `messages/` (e.g., `es.json`)
2. Adding the locale to `i18n/config.ts`
3. Translating all keys from `en.json`

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Automatic deployment from Git
- **Railway**: Simple deployment with database support
- **Docker**: Containerized deployment
- **Self-hosted**: Traditional server deployment

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow the existing code style
- Use TypeScript for all new code
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Radix UI**: For accessible component primitives
- **Vercel**: For hosting and deployment
- **OpenAI**: For AI-powered password generation

## 📞 Support

- **Documentation**: [docs.crypticapp.org](https://docs.crypticapp.org)
- **Issues**: [GitHub Issues](https://github.com/CrypticaOSS/cryptica-site/issues)
- **Discussions**: [GitHub Discussions](https://github.com/CrypticaOSS/cryptica-site/discussions)
- **Email**: support@crypticapp.org

## 🔗 Links

- **Website**: [crypticapp.org](https://crypticapp.org)
- **Documentation**: [docs.crypticapp.org](https://docs.crypticapp.org)
- **GitHub**: [github.com/CrypticaOSS/cryptica-site](https://github.com/CrypticaOSS/cryptica-site)
- **Twitter**: [@crypticaapp](https://twitter.com/crypticaapp)

---

Made with ❤️ by the Cryptica Team 