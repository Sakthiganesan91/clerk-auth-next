import { Document, model, models, Schema } from "mongoose";

const userSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  linkedin: {
    type: String,
  },
  address: {
    type: String,
  },
});

const User = models?.User || model("User", userSchema);
export default User;
