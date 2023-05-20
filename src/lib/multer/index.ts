import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from "next";
import multer from 'multer'
import path from 'path';


  
export const multerHandler = nextConnect({
  onError: (err, req:NextApiRequest, res:NextApiResponse, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req:NextApiRequest, res:NextApiResponse) => {
    res.status(404).end("Page is not found");
  },
  })
  
export const multerUpload= (storageUrl:string)=>{
  console.log(storageUrl)
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('Hello from uploader')
        cb(null, path.join(process.cwd(),'public',storageUrl))
      },
      filename: function (req, file, cb) {
        console.log(file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
      }
    })
    
    return  multer({ storage: storage })
  }