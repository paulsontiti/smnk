
type Address ={
    state:string,
    lga:string,
    street:string,
}




 type PersonalInfo ={
    _id:string
    firstName:string,
lastName:string,
userName:string,
address:Address
description:string,
type: 'Individual' | 'Company',
userId:string
}

export default PersonalInfo