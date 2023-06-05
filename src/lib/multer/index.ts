import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from "next";
import multer from 'multer'
import path from 'path';
import { GridFsStorage } from 'multer-gridfs-storage';
import crypto from 'crypto'


  
export const multerHandler = nextConnect({
  onError: (err, req:NextApiRequest, res:NextApiResponse, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req:NextApiRequest, res:NextApiResponse) => {
    res.status(404).end("Page is not found");
  },
  })
  
export const multerUpload= ()=>{
  const storage = new GridFsStorage({
    url:process.env.MONGODB_URI as string,
    file:(req,file)=>{
      return new Promise((resolve,reject)=>{
        crypto.randomBytes(16,(err,buf)=>{
          if(err){
            return reject(err)
          }
          const filename = buf.toString('hex') + path.extname(file.originalname)
          const fileinfo = {
            filename:filename,
            bucketName:'dps'
          }
          resolve(fileinfo)
        })
      })
    }
  })
    
    return  multer({ storage})
  }