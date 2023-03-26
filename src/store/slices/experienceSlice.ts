import Experience from "@/lib/types/experience";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


type AddedExpDetails={
    isExpAdded:boolean,
    message:string
}
const initialState={
    loading:false,

    experience: typeof window !== 'undefined' && localStorage.getItem('exp') as string ? localStorage.getItem('exp') as string
                : [] as Experience[],

    addedExpDetails:{} as AddedExpDetails
}



const experienceSlice = createSlice({
    name:'experience',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        
    },

})

//export const {logout} = userSlice.actions

export default experienceSlice.reducer