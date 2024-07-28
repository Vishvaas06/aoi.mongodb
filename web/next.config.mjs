/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/cards',
            destination: 'https://jjkapi.vercel.app/cards', // Proxy to external API
          },
          {
            source: '/api/card/:id',
            destination: 'https://jjkapi.vercel.app/card/:id', // Proxy to external API
          },
        ];
      },
};

export default nextConfig;
