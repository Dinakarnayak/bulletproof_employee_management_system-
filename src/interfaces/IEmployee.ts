export interface IEmployee {
    id?: number;
    name: string;
    position: string;
    salary: number;
    createdAt?: Date;
    updatedAt?: Date;
    email: string;
    department: string;
    date_of_joining: Date;
  }
  
  export class EmployeeDto {
    name: string;
    position: string;
    salary: number;
    email: string;
    department: string;
    date_of_joining: Date;
  }
  
  export class UpdateEmployeeDto {
    name?: string;
    position?: string;
    salary?: number;
    email?: string;
    department?: string;
    date_of_joining?: Date;
  }
  
  export class GetEmployeeDto {
    name: string;
    position: string;
    salary: number;
    email: string;
    department: string;
    date_of_joining: Date;
  }
  
  export class GetEmployeeByEmailDto {
    name: string;
    position: string;
    salary: number;
    email: string;
    department: string;
    date_of_joining: Date;
  }
  
  export class DeleteEmployeeDto {
    email: string;
  }
  