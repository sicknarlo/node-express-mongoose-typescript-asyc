import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { AppRouter } from './routes/router';

class App {

  public app: express.Application;
  public mongoUrl: string = 'mongodb://localhost/MENT';

  constructor() {
    // Create Express app
    this.app = express();

    // Config
    this.config();
    this.mongoSetup();

    // Mount the AppRouter
    const router: AppRouter = new AppRouter();
    this.app.use('/', router.mount());
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());

    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    // We want global promises!
    (mongoose as any).Promise = global.Promise;
    mongoose.connect(this.mongoUrl);
  }

}
export default new App().app;
