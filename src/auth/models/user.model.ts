import * as mongoose from 'mongoose';

export const userInfo = new mongoose.Schema(
  {
    username: String,
    password: String,
    nombre: String,
    email: String,
    terminos: Boolean,
    rol: Number,
    hotel: String,
  },
  { collection: 'usuarios' },
);
