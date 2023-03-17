/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    MONGODB_URI : 'mongodb+srv://paulsontiti:blackwizzardstechnology@cluster0.69e5w7x.mongodb.net/?retryWrites=true&w=majority',
    SMNK_URL: 'http://localhost:3000/'
  }
}

module.exports = nextConfig
