import axios from "axios";

export const fetchTalents = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.SMNK_URL}api/talents`,
    });
    const data = await res.data;
    return data;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
export const fetchCategories = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.SMNK_URL}api/talents/categories`,
    });
    const data = await res.data;
    return data;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
export const fetchServiceTitles = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.SMNK_URL}api/talents/service-titles`,
    });
    const data = await res.data;
    return data;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
export const fetchJobs = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.SMNK_URL}api/job`,
    });
    const data = await res.data;
    return data;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};

export const fetchUsers = async (service:string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}api/talents/services`,
      data:{service}
    });
    const data = await res.data;
    return data;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
export const fetchRecommendedSW = async (jobId:string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}api/talents/recommended-sw`,
      data:{jobId}
    });
    const data = await res.data;
    return data;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
export const fetchProfessionalsDetails = async (userId:string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}api/talents/details`,
      data:{userId}
    });
    const data = await res.data;
    return data;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
export const getWallet = async (userId:string) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.SMNK_URL}api/wallet/${userId}`,
    });
    const data = await res.data;
    return data;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
export const fetchSearchJobs = async (searchParam:string) => {
  let data,error
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}api/job/search`,
      data:{searchParam}
    });
    data = await res.data;
  } catch (err: any) {
    console.log(err);
    error = err
  }
  return {data,error}
};

export const createSetFromArray = (data:any[]):string[]=>{
  if(Array.isArray(data) && data.length > 1){
    const setOptions = new Set(data.flat())
  const options:any[] = []
  setOptions.forEach((val)=>{
   options.push(val)
  })
  return options
  }
  return data
}