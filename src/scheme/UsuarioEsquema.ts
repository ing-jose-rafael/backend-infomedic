import { model, Schema, Types } from "mongoose";
import UsuarioEntidad from "../entities/UsuarioEntidad";


const UsuarioEsquema = new Schema<UsuarioEntidad>(
  {
    nombreUsuario:{
      type: String, 
      required: [true,'El nombre es obligatorio'],
      trim: true
    },
    correoUsuario:{
      type: String, 
      required: [true,'El correo es obligatorio'], 
      unique: true, 
      trim: true,
      lowercase:true
    },
    claveUsuario:{
      type: String, 
      required: [true,'La clave es obligatoria'],
      trim: true
    },
    fechaRegistro:{
      type:Date,
      default: Date.now()
    },
    estadoUsuario:{
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
