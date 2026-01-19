const createNextIntlPlugin = require('next-intl/plugin');
const withPWA = require('next-pwa')({
  dest: 'public',
  sw: 'sw-chat.js',
  register: false,
  skipWaiting: true,
  disable: false, // Enable in dev for testing scope/registration
  buildExcludes: [/app-build-manifest\.json$/, /middleware-manifest\.json$/],
});

const withNextIntl = createNextIntlPlugin('./i18n/config.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withNextIntl(withPWA(nextConfig))