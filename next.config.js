/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    MONGODB_URI : 'mongodb+srv://titidprogrammer:30041987Titile@cluster0.69e5w7x.mongodb.net/?retryWrites=true&w=majority',
    //'mongodb+srv://titidprogrammer:30041987Titile@cluster0.69e5w7x.mongodb.net/?retryWrites=true&w=majority',
    //'mongodb://127.0.0.1:27017/smnk',
    SMNK_URL: 'https://www.smnklimited.com/',
    //https://www.smnklimited.com/',
    //''http://localhost:3000/',
    CUSTOMER_SERVICE_ID:'64dd04c6025bda51e3231cef'
    //64dd04c6025bda51e3231cef online
    //64e35d468b2fcd7a6d3a7df6 local
  },modularizeImports:{
    '@mui/icons-material':{
      transform:'@mui/icons-material/{{member}}'
    }
  }
}

module.exports = nextConfig
