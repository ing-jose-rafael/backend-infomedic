import UsuarioEntidad from "./UsuarioEntidad";

class CitaEntidad {
  constructor(
    public codDoctor:UsuarioEntidad,
    public codPaciente:UsuarioEntidad,
    public notas:string,
    public fechaRegistro: Date,
    public estadoCita: number
    ) {
    
  }
}

export default CitaEntidad;