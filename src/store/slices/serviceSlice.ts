import Experience from "@/lib/types/experience";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


type ServiceAddedDetails={
    serviceAdded:boolean,
    message:string
}
const initialState={
    loading:false,

    serviceAdded: typeof window !== 'undefined' && 
    JSON.parse(localStorage.getItem('serviceAdded') as string) ?
     JSON.parse(localStorage.getItem('serviceAdded') as string) as ServiceAddedDetails
    : {serviceAdded:false,message:'Service not added'},

}

export const isServiceAdded = createAsyncThunk('service/isAdded',async(userId:string)=>{
    
    try{
        const res = await axios({
              method:'POST',
              url:`${process.env.SMNK_URL}api/sw-dashboard/service`,
              data:{userId}
          })
        const data = await res.data
        
       return data
        
    }catch(err:any){
      console.log(err)
      return {serviceAdded:false,message:'Service not added'}
    }
})


const serviceSlice = createSlice({
    name:'service',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(isServiceAdded.fulfilled,(state,action)=>{
            state.loading = false
            state.serviceAdded = action.payload
        })
        builder.addCase(isServiceAdded.pending,(state,action)=>{
            state.loading = true
        })
    },

})

//export const {logout} = userSlice.actions

export default serviceSlice.reducer