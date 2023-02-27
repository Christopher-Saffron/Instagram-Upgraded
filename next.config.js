/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: "false",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'links.papareact.com',
        port: '',
        pathname: '/*',
      },
    ],
  },
}

module.exports = nextConfig
