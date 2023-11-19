export default class KArray{
    static filterById(arr: any, id: number|string){
        return arr.filter((item: any) => {
            return item.id == id
        })
    }

    static findById(arr:any, id:number|string){
        return arr.find((item: any)=>{
            return item.id == id;
        })
    }  
}