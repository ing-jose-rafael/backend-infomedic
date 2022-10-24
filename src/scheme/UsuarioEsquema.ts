import { model, Schema, Types } from "mongoose";
import UsuarioEntidad from "../entities/UsuarioEntidad";


const UsuarioEsquema = new Schema<UsuarioEntidad>(
  {
    nombreUsuaio:{
      type: String, 
      required: [true,'El nombre es obligatorio'],
      trim: true
    },
    correoUsuaio:{
      type: String, 
      required: [true,'El correo es obligatorio'], 
      unique: true, 
      trim: true,
      lowercase:true
    },
    claveUsuaio:{
      type: String, 
      required: [true,'La clave es obligatoria'],
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
      required: [true,'El codigo del perfil es obligatorio'],
    },
    
  },
  { versionKey: false }
);

export default model("Usuario", UsuarioEsquema, "Usuario");
