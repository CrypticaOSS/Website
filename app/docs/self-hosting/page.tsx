import { useTranslations } from "next-intl";

export default function SelfHostingDocs() {
    const t = useTranslations();
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Self-Hosting Cryptica</h1>
            <p className="mb-4">
                Learn how to deploy and run Cryptica on your own infrastructure for maximum control and privacy.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Requirements</h2>
            <ul className="list-disc ml-6 mb-4">
                <li>Node.js 18+ or Bun</li>
                <li>Supported database (optional, for sync features)</li>
                <li>Git</li>
                <li>Cloud or on-premise server (Linux, macOS, or Windows)</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">Quick Start</h2>
            <ol className="list-decimal ml-6 mb-4">
                <li>Clone the repository: <code>git clone https://github.com/CrypticaOSS/Website.git</code></li>
                <li>Install dependencies: <code>bun install</code> or <code>npm install</code></li>
                <li>Run the app: <code>bun run dev</code> or <code>npm run dev</code></li>
                <li>Access your instance at <code>http://localhost:3000</code></li>
            </ol>
            <h2 className="text-xl font-semibold mt-6 mb-2">Configuration</h2>
            <p className="mb-4">
                No environment variables or .env file are required for a basic self-hosted Cryptica instance. All configuration is handled in-app or via the UI.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Production Deployment</h2>
            <ul className="list-disc ml-6 mb-4">
                <li>Use a process manager like <code>pm2</code> or systemd for reliability (optional)</li>
                <li>Configure HTTPS and a reverse proxy (e.g., Nginx or Caddy) for secure public access (optional)</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">Support</h2>
            <p>
                For advanced configuration, troubleshooting, or contributing, see the <a href="https://github.com/CrypticaOSS/Website" className="text-primary underline">GitHub repository</a>.
            </p>
        </div>
    );
}
