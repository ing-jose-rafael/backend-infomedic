import { model, Schema, Types } from "mongoose";
import UsuarioEntidad from "../entities/UsuarioEntidad";


const UsuarioEsquema = new Schema<UsuarioEntidad>(
  {
    nombreUsuario:{
      type: String, 
      required: [true,'El nombre es obligatorio'],
      trim: true
    },
    cedulaUsuario:{ 
      type: String,
      required: [true,'la cedula es obligatoria'],
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
    horario:{ type: String },
    tiempoConsulta:{ type: Number },
    disponibilidad:{ type: [],default: undefined },
    especialidades:{ type: [ Types.ObjectId ], ref:'Especilidad',default: undefined },
    calificación:{ type: Number },
  },
  { versionKey: false }
);

export default model("Usuario", UsuarioEsquema, "Usuario");
