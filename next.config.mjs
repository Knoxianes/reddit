/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'http',
            hostname: 'dummyimage.com',
            port: '',
        }]
    }
};

export default nextConfig;
