/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    MONGODB_URI : 'mongodb+srv://titidprogrammer:30041987Titile@cluster0.69e5w7x.mongodb.net/?retryWrites=true&w=majority',
    //'mongodb+srv://titidprogrammer:30041987Titile@cluster0.69e5w7x.mongodb.net/?retryWrites=true&w=majority',
    //'mongodb://127.0.0.1:27017/smnk',
    SMNK_URL: 'https://smnk.vercer.app/',
    //https://smnk.vercer.app/',
    //''http://localhost:3000/',
    CUSTOMER_SERVICE_ID:'64329babe1abc00d02de123e'
  }
}

module.exports = nextConfig
