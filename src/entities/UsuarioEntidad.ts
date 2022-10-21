import PerfilEntidad from "./PerfilEntidad";

export class UsuarioEntidad {
  public nombreUsuaio: string;
  public correoUsuaio: string;
  public claveUsuaio: string;
  public fechaRegistro: Date;
  public estadoUsuaio: number;
  public codPerfil: PerfilEntidad;

  constructor(nom: string, corr: string, cla:string, fec: Date,est: number, perf:PerfilEntidad) {
    this.nombreUsuaio = nom;
    this.correoUsuaio = corr;
    this.claveUsuaio = cla;
    this.fechaRegistro = fec;
    this.codPerfil = perf;
    this.estadoUsuaio = est;
  }
}

export default UsuarioEntidad;
