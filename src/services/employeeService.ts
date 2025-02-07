import Employee from '@/models/EmployeeModel';
import { Service } from 'typedi';
import { EmployeeDto, GetEmployeeByEmailDto, GetEmployeeDto, UpdateEmployeeDto, DeleteEmployeeDto } from '@/interfaces/IEmployee';
import { Optional } from 'sequelize';

@Service()
export default class EmployeeService {

  public createEmployeeDTO(req: any): EmployeeDto {
    if (!req.body.name) throw new Error("Name is required");
    if (!req.body.position) throw new Error("Position is required");
    if (!req.body.salary) throw new Error("Salary is required");
    if (!req.body.email) throw new Error("Email is required");
    if (!req.body.department) throw new Error("Department is required");
    if (!req.body.date_of_joining) throw new Error("Date of Joining is required");
    
    return {
      name: req.body.name,
      position: req.body.position,
      salary: req.body.salary,
      email: req.body.email,
      department: req.body.department,
      date_of_joining: req.body.date_of_joining,
    };
  }

  public async createEmployee(dto: Optional<EmployeeDto, 'id'>) {
    return await Employee.create({ ...dto });
  }

  public async getAllEmployees(): Promise<Employee[]> {
    return await Employee.findAll();
  }

  public updateEmployeeDTO(req: any): UpdateEmployeeDto {
    if (!req.body.email) throw new Error("Email is required");
    return {
      name: req.body.name,
      position: req.body.position,
      salary: req.body.salary,
      email: req.body.email,
      department: req.body.department,
      date_of_joining: req.body.date_of_joining,
    };
  }

  public async updateEmployee(email: string, updateData: UpdateEmployeeDto): Promise<Employee | null> {
    const employee = await Employee.findOne({ where: { email } });
    if (!employee) throw new Error("Employee not found");

    await Employee.update(updateData, { where: { email } });
    return await Employee.findOne({ where: { email } });
  }

  public async getEmployeeByEmail(email: string): Promise<Employee | null> {
    return await Employee.findOne({ where: { email } });
  }

  public async deleteEmployee(email: string): Promise<void> {
    const employee = await Employee.findOne({ where: { email } });
    if (!employee) throw new Error("Employee not found");

    await Employee.destroy({ where: { email } });
  }
}
