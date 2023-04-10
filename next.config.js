/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    MONGODB_URI : 'mongodb+srv://paulsontiti:blackwizzardstechnology@cluster0.69e5w7x.mongodb.net/?retryWrites=true&w=majority',
    SMNK_URL: 'https://smnk.vercel.app/',
    CUSTOMER_SERVICE_ID:'64329babe1abc00d02de123e'
  }
}

module.exports = nextConfig
