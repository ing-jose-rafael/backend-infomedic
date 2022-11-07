import { model, Schema } from "mongoose";
import EspecialidadEntidad from "../entities/EspecialidadEntidad";

const EspecialidadEsquema = new Schema<EspecialidadEntidad>(
  {
    nombre: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true,
      lowercase:true 
    },
    estado:{
      type:Number,
      enum:[ 1, 2 ],
      default: 1
    }
  },
  { versionKey: false }
);

export default model("Especilidad", EspecialidadEsquema, "Especilidad");
