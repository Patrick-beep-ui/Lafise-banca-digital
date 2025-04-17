/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.pixabay.com'], // ✅ Allow this external domain
      },
};

export default nextConfig;
