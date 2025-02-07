import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import EmployeeService from '@/services/employeeService'; // Ensure lowercase import
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/employees', route);

  route.get('/', middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response) => {
    const employeeService = Container.get(EmployeeService);
    const employees = await employeeService.getAllEmployees();
    return res.status(200).json({ employees });
  });

  route.get('/:email', middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response) => {
    const email = req.params.email;
    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
    }
    const employeeService = Container.get(EmployeeService);
    const employee = await employeeService.getEmployeeByEmail(email);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    return res.status(200).json({ employee });
  });

  route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeService = Container.get(EmployeeService);
      const newEmployee = await employeeService.createEmployee(req.body);
      return res.status(201).json({ employee: newEmployee });
    } catch (error) {
      return next(error);
    }
  });

  route.put('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeService = Container.get(EmployeeService);
      const updatedEmployee = await employeeService.updateEmployee(req.params.email, req.body);
      return res.status(200).json({ employee: updatedEmployee });
    } catch (error) {
      return next(error);
    }
  });

  route.delete('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeService = Container.get(EmployeeService);
      await employeeService.deleteEmployee(req.params.email);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  });
};
