import mongoose, { Schema, Document } from "mongoose";

export interface IBrochureLead extends Document {
  name: string;
  email: string;
  phone: string;
  stayId: string;
  stayTitle: string;
  location?: string;
  brochureUrl?: string;
  travelDates?: string;
  message?: string;
  createdAt: Date;
}

const BrochureLeadSchema = new Schema<IBrochureLead>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  stayId: { type: String, required: true },
  stayTitle: { type: String, required: true },
  location: { type: String },
  brochureUrl: { type: String },
  travelDates: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const BrochureLead =
  (mongoose.models.BrochureLead as mongoose.Model<IBrochureLead>) ||
  mongoose.model<IBrochureLead>("BrochureLead", BrochureLeadSchema);
