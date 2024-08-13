/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://127.0.0.1:8000/api/:path*', // Proxy to Django backend
          },
        ];
      },

    //   async redirects() {
    //     return [
    //       {
    //         source: '/old-page',
    //         destination: '/home',
    //         permanent: true, // Use false for temporary redirects
    //       },
    //     ];
    //   },
};

export default nextConfig;
