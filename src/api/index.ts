import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import agendash from './routes/agendash';
import contact from './routes/contact';
import employee from './routes/employee';

export default () => {
  const app = Router();
  auth(app);
  user(app);
  agendash(app);
  contact(app);
  employee(app);  // Ensure this line is present
  return app;
};
