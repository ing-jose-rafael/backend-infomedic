import { model, Schema, Types } from "mongoose";
import UsuarioEntidad from "../entities/UsuarioEntidad";


const UsuarioEsquema = new Schema<UsuarioEntidad>(
  {
    nombreUsuaio:{
      type: String, 
      required: true, 
      trim: true
    },
    correoUsuaio:{
      type: String, 
      required: true, 
      unique: true, 
      trim: true,
      lowercase:true
    },
    claveUsuaio:{
      type: String, 
      required: true, 
      trim: true
    },
    fechaRegistro:{
      type:Date,
      default: Date.now()
    },
    estadoUsuaio:{
      type:Number,
      enum:[ 1, 2 ],
      default: 1
    },
    codPerfil:{
      type: Types.ObjectId,
      ref: 'Perfil',
      required: true
    },
  },
  { versionKey: false }
);

export default model("Usuario", UsuarioEsquema, "Usuario");
