import { model, Schema } from 'mongoose';

const investigtionSchema = new Schema({
    unique_id: String,
    inspector_name: {
    type: String,
    required: true,
  },
  investigation_data: {
    type: Object,
    required: true,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

const investigtionModel = model('Investigtion', investigtionSchema);

export default investigtionModel;
