
type Experience={
    _id:string,
    userId:string,
    title:string,
    company:string,
    state:string,
    lga:string,
    address:string,
    onRole:boolean,
    startDate:Date,
    endDate?:Date,
    description:string,
    files?:string[]
}

export default Experience