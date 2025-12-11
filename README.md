# RosettaScript

> Developer tools for converting, automating, and building. From Word to HTML converters to database visualization—we've got you covered.

[![Live Site](https://img.shields.io/badge/Live%20Site-rosettascript.github.io-22c55e?style=flat-square)](https://rosettascript.github.io)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

RosettaScript is a collection of powerful, free online developer tools designed to streamline your workflow. Whether you need to convert Word documents to HTML, format JSON, encode/decode Base64, or manage databases, RosettaScript has the tools you need.

## ✨ Features

- **Word to HTML Converter** - Convert Word documents to clean, semantic HTML with multiple output formats
- **JSON Formatter** - Beautify and validate JSON with syntax highlighting
- **Base64 Encoder/Decoder** - Encode and decode Base64 strings with UTF-8 support
- **URL Encoder/Decoder** - Encode and decode URL components
- **Color Converter** - Convert between HEX, RGB, HSL, and more
- **UUID Generator** - Generate version 4 UUIDs instantly
- **Regex Tester** - Test and debug regular expressions in real-time
- **Hash Generator** - Generate MD5, SHA-1, SHA-256, and SHA-512 hashes
- **JWT Decoder** - Decode and inspect JWT tokens
- **Timestamp Converter** - Convert between Unix timestamps and human-readable dates

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/rosettascript/rosettascript.github.io.git
cd rosettascript.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:8000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling
- **[React](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Router](https://reactrouter.com/)** - Client-side routing

## 📦 Project Structure

```
rosettascript.github.io/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── lib/            # Utility functions and libraries
│   └── data/           # Static data (blog posts, etc.)
├── public/             # Static assets
└── .github/workflows/  # CI/CD configuration
```

## 🚢 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions. The site is served at `https://rosettascript.github.io`.

### Manual Deployment

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/rosettascript/rosettascript.github.io/issues).

---

Built with ❤️ by [RosettaScript](https://rosettascript.github.io)
