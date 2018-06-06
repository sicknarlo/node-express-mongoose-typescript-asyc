import * as mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: 'Enter a first name'
  },
  lastName: {
    type: String,
    required: 'Enter a last name'
  },
  email: {
    type: String
  },
  company: {
    type: String
  },
  phone: {
    type: Number
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

export interface IContact extends mongoose.Document {
  firstName: string;
  lastName: string;
  email?: string;
  company?: string;
  phone?: number;
  created_date: Date;
}

export const Contact = mongoose.model<IContact>('Contact', ContactSchema);
