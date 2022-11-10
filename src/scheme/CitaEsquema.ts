import { model, Schema, Types } from "mongoose";
import CitaEntidad  from "../entities/CitaEntidad";


const CitaEsquema = new Schema<CitaEntidad>(
  {
    fechaRegistro:{ type:Date, default: Date.now()},
    estadoCita:{ type:Number, enum:[ 1, 2, 3, 4 ], default: 1 },
    codDoctor:{ type: Types.ObjectId, ref: 'Usuario', required: [true,'El codigo del Doctor es obligatorio'],},
    codPaciente:{ type: Types.ObjectId, ref: 'Usuario', required: [true,'El codigo del Paciente es obligatorio'], },
  },
  { versionKey: false }
);

export default model("Cita", CitaEsquema, "Cita");
