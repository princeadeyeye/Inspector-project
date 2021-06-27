import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  unique_id: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  inspector_name: {
    type: String,
    required: true,
  },
});

const userModel = model('User', userSchema);

export default userModel;
