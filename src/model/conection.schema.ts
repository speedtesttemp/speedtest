import conection from "./conection.model";
import { Schema, model } from "mongoose";

const conectionSchema = new Schema({
  ip: { type: String, required: true },
  data: { type: Array, required: true },
});

export default model<conection>("user_data", conectionSchema);
