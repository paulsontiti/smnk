import dbConnect from '../../../lib/mongoose'

export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()
    console.log('connected to get all messages')
    res.json('Hello')
}