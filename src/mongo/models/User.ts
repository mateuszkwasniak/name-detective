import { Schema, model, models } from "mongoose";

const UserSchema = new Schema<IUser>(
  {
    login: { required: true, type: String },
    password: { required: true, type: String },
    name: { required: true, type: String },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>("User", UserSchema);
