/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    MONGODB_URI : 'mongodb+srv://smnkservicehub:smnkservicehub@cluster0.c0auc.mongodb.net/',
    //'mongodb+srv://smnkservicehub:smnkservicehub@cluster0.c0auc.mongodb.net/',
    //'mongodb://127.0.0.1:27017/smnk',
    SMNK_URL: 'https://www.smnklimited.com/',
    //https://www.smnklimited.com/',
    //''http://localhost:3000/',
    CUSTOMER_SERVICE_ID:'652a5789110b9fae034e9652'
    //652a5789110b9fae034e9652 online
    //64e35d468b2fcd7a6d3a7df6 local
  },modularizeImports:{
    '@mui/icons-material':{
      transform:'@mui/icons-material/{{member}}'
    }
  }
}

module.exports = nextConfig
