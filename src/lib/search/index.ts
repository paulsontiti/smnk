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
export const fetchSearchJobs = async (searchParam:string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}api/job/search`,
      data:{searchParam}
    });
    const data = await res.data;
    return data;
  } catch (err: any) {
    console.log(err);
    return err;
  }
};

export const createSetFromArray = (data:any[]):string[]=>{
  if(data){
    const setOptions = new Set(data.flat())
  const options:any[] = []
  setOptions.forEach((val)=>{
   options.push(val)
  })
  return options
  }
  return data
}