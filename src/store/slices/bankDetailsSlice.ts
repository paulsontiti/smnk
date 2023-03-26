import Experience from "@/lib/types/experience";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


type BankDetailsAdded={
    bankDetailsAdded:boolean,
    message:string
}
const initialState={
    loading:false,

    bankDetailsAdded: typeof window !== 'undefined' && 
    JSON.parse(localStorage.getItem('bankDetailsAdded') as string) ?
     JSON.parse(localStorage.getItem('bankDetailsAdded') as string) as BankDetailsAdded
    : {bankDetailsAdded:false,message:'Bank Details not added'},

}

export const isBankDetailsAdded = createAsyncThunk('bank-details/isAdded',async(userId:string)=>{
    
    try{
        const res = await axios({
              method:'POST',
              url:`${process.env.SMNK_URL}api/sw-dashboard/bank-details`,
              data:{userId}
          })
        const data = await res.data
        
       return data
        
    }catch(err:any){
      console.log(err)
      return {bankDetailsAdded:false,message:'Bank Details not added'}
    }
})


const bankDetailsSlice = createSlice({
    name:'service',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(isBankDetailsAdded.fulfilled,(state,action)=>{
            state.loading = false
            state.bankDetailsAdded = action.payload
        })
        builder.addCase(isBankDetailsAdded.pending,(state,action)=>{
            state.loading = true
        })
    },

})

//export const {logout} = userSlice.actions

export default bankDetailsSlice.reducer