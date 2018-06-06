import { Request, Response, Router } from 'express';
import { ContactRouter } from './contact.router';

const VERSION = 'v1';

export interface IAppRouter {
  router: Router;
  mount(): Router;
}

export class AppRouter implements IAppRouter {

  router: Router = Router();
  // An array of routers
  private routes: Array<Router> = [
    new ContactRouter().mount()
  ];

  mount(): Router {
    // Health check
    this.router.get('/api/health-check', (req: Request, res: Response) => {
      res.status(200).send({
        message: 'OK'
      })
    })

    // Version check
    this.router.get('/api/version', (req: Request, res: Response) => {
      res.status(200).send({
        message: VERSION
      })
    })

    // Loop through and use our routers
    this.routes.forEach(router =>
      this.router.use(`/api/${VERSION}`, router)
    )

    return this.router;
  }
}
