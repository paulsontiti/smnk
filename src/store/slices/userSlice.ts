import UserLoginDetails from "@/lib/types/userLoginDetails";
import PersonalInfo from "@/lib/types/userInfo";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import User from "@/lib/types/user";
import SubmitInfoValues from "@/lib/types/submitInfo";



export const fetchUser = createAsyncThunk('users/getUser',async(thunkApi)=>{
 const res = await axios('')
 const data = await res.data
 return data
})

export const fetchUserInfo = createAsyncThunk('users/getUserInfo',async(userId:string)=>{
    try{
        const res = await axios(`${process.env.SMNK_URL}api/sw-dashboard/${userId}`)
        const data = await res.data
        return data
    }catch(err){
        console.log(err)
        return
    }
   })

   export const login = createAsyncThunk('users/login',async(values:any)=>{
    try{
        const res = await axios({
          method:'POST',
          url:`${process.env.SMNK_URL}api/users/login`,
          data:values
      })
      const data = await res.data
      if(data.loginDetails.isLoginValid){
        alert(data.loginDetails.message)
             return data   
          //router.push('/')
        
      }else{
        alert(data.loginDetails.message)
        return data
      }
      
      }catch(err:any){
        console.log(err)
        alert(err.message)
      }
   })

   export const addUserInfo = createAsyncThunk('users/addUserInfo',async(submitValues:SubmitInfoValues)=>{
    try{
        const res = await axios({
              method:'POST',
              url:`${process.env.SMNK_URL}api/sw-dashboard/add-personal-info`,
              data:submitValues
          })
        const data = await res.data
        
        if(data.isInfoAdded){
          alert(data.message)
          
           return data
          
        }else{
          alert(data.message)
          
        }
        
    }catch(err:any){
      alert(err.response.data.message)
    }
   })

   export const editUserInfo = createAsyncThunk('users/editUserInfo',async(submitValues:SubmitInfoValues)=>{
    try{
        const res = await axios({
              method:'POST',
              url:`${process.env.SMNK_URL}api/sw-dashboard/edit-personal-info`,
              data:submitValues
          })
        const data = await res.data
        
        if(data.isInfoEdited){
          alert(data.message)
           return data
          
        }else{
          alert(data.message)
          
        }
        
    }catch(err:any){
      alert(err.response.data.message)
    }
   })

  
   type AddedInfoDetails={isInfoAdded:boolean,message:string}
   type EditedInfoDetails={isInfoEdited:boolean,message:string}

const initialState = {
    loginDetails:{} as UserLoginDetails,

    user: typeof window !== 'undefined' && 
                    JSON.parse(localStorage.getItem('user') as string),
                                        
    info: typeof window !== 'undefined' && 
                    JSON.parse(localStorage.getItem('user') as string) ,
    
    addedInfoDetails:{} as AddedInfoDetails,
    editedInfoDetails:{} as EditedInfoDetails,
    loading:false
}

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        logout:(state)=>{           
            state.loginDetails = {} as UserLoginDetails,
            localStorage.removeItem('user')
            localStorage.removeItem('info')
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading = false
            
            state.user = action.payload
        })
        builder.addCase(fetchUser.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchUserInfo.fulfilled,(state,action)=>{
            state.loading = false
            localStorage.setItem('info',JSON.stringify(action.payload))
            state.info = action.payload
        })
        builder.addCase(fetchUserInfo.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(login.fulfilled,(state,action)=>{
            state.loading = false
            
            state.loginDetails = action.payload.loginDetails 
            localStorage.setItem('user',JSON.stringify(action.payload.user))

            console.log(typeof window !== 'undefined' && 
            JSON.parse(JSON.stringify(localStorage.getItem('user'))))

            state.user = action.payload.user 
        })
        builder.addCase(login.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(addUserInfo.fulfilled,(state,action)=>{
            state.loading = false
            state.addedInfoDetails = action.payload
        })
        builder.addCase(addUserInfo.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(editUserInfo.fulfilled,(state,action)=>{
            state.loading = false
            
            state.editedInfoDetails = action.payload
        })
        builder.addCase(editUserInfo.pending,(state)=>{
            state.loading = true
        })
    }
})

export const {logout} = userSlice.actions

export default userSlice.reducer