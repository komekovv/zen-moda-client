import createNextIntlPlugin from 'next-intl/plugin';
import { readFileSync } from 'fs';
import { join } from 'path';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: getEnvConfig(),
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '9090',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '216.250.13.41',
                port: '9090',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '216.250.13.41',
                port: '9090',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'zen-moda.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'zen-moda.com',
                pathname: '/**',
            },
        ],
    },
};

export default withNextIntl(nextConfig);

function getEnvConfig() {
    const environment = process.env.TARGET_ENV || process.env.NODE_ENV;
    const configPath = join(process.cwd(), `env/${environment}.json`);
    const configData = readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
}