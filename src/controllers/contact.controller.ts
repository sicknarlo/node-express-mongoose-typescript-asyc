import * as mongoose from 'mongoose';
import { Contact } from '../models/contact.model';
import { Request, Response } from 'express';

export class ContactController {

  public async addNewContact (req: Request, res: Response) {
    let newContact = new Contact(req.body);

    const savedContact = await newContact.save();
    return res.json(savedContact);
  }

  public async getContacts (req: Request, res: Response) {
    const contacts = await Contact.find();
    return res.json(contacts);
  }

  public async getContactWithID (req: Request, res: Response) {
    const contact = await Contact.findById(req.params.contactId);
    return res.json(contact);
  }

  public async updateContact (req: Request, res: Response) {
    const contact = await Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true });
    return res.json(contact);
  }

  public async deleteContact (req: Request, res: Response) {
    await Contact.remove({ _id: req.params.contactId });
    return res.json({ message: 'Successfully deleted contact!' });
  }
}
