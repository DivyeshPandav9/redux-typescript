export interface EmpData {
        
    name: string;
    age: number | undefined;
    department: string;
    job_title: string;
    salary: number | undefined;
}
export interface Todo{
    id:string ;
    name:string;
    job_title:string;
    age:number;
    salary:number;
    department:string;   
}
export interface Errors{
    [key: string]:string;
}
export  interface ErrorObject{
    message:string;
}
export interface initialStateType {
    empList:Todo [],
  error: ErrorObject,
  updateList:EmpData,
  searchList: Todo[],
  loading: boolean,
  currentUser: string | null;
}