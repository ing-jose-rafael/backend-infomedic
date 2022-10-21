import { model, Schema } from "mongoose";
import { PerfilEntidad } from "../entities/PerfilEntidad";

const PerfilEsquema = new Schema<PerfilEntidad>(
  {
    nombrePerfil: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
    },
    estadoPerfil:{
      type:Number,
      enum:[ 1, 2 ],
      default: 1
    }
  },
  { versionKey: false }
);

export default model("Perfil", PerfilEsquema, "Perfil");
