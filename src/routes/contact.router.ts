import { Request, Response, Router } from 'express';
import { IAppRouter } from './router';
import asyncCatch from '../utils/asyncCatch';
import { ContactController } from '../controllers/contact.controller';

export class ContactRouter implements IAppRouter {

  ContactController: ContactController = new ContactController();
  router: Router = Router();

  mount(): Router {
    // Contact
    this.router.route('/contact')

      // GET endpoint
      .get(asyncCatch(this.ContactController.getContacts))
      // POST endpoint
      .post(asyncCatch(this.ContactController.addNewContact))

    // Contact detail
    this.router.route('/contact/:contactId')
      // get specific contact
      .get(asyncCatch(this.ContactController.getContactWithID))
      .put(asyncCatch(this.ContactController.updateContact))
      .delete(asyncCatch(this.ContactController.deleteContact))

    return this.router;
  }
}
