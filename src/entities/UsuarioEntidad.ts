import PerfilEntidad from "./PerfilEntidad";

export class UsuarioEntidad {
  public nombreUsuario: string;
  public correoUsuario: string;
  public claveUsuario: string;
  public fechaRegistro: Date;
  public estadoUsuario: number;
  public codPerfil: PerfilEntidad;

  constructor(nom: string, corr: string, cla:string, fec: Date,est: number, perf:PerfilEntidad) {
    this.nombreUsuario = nom;
    this.correoUsuario = corr;
    this.claveUsuario = cla;
    this.fechaRegistro = fec;
    this.codPerfil = perf;
    this.estadoUsuario = est;
  }
}

export default UsuarioEntidad;
