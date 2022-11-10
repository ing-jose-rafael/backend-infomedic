import PerfilEntidad from "./PerfilEntidad";

export class UsuarioEntidad {
  constructor(
    public nombreUsuario: string,
    public cedulaUsuario: string,
    public correoUsuario: string,
    public claveUsuario: string,
    public fechaRegistro: Date,
    public estadoUsuario: number,
    public codPerfil: PerfilEntidad,
    public nombreImagenUsuario?: string,
    public avatar?: string,
    public horario?:string,
    public tiempoConsulta?:number,
    public disponibilidad?:string[],
    public especialidades?:[],
    public calificación?:number
  ){}

  // constructor(
  //     nom: string, 
  //     ced:string, 
  //     corr: string, 
  //     cla:string, 
  //     fec: Date,
  //     est: number = 1, 
  //     perf:PerfilEntidad,
  //     hor?:string,
  //     tiemp?:number,
  //     disp?:string[],
  //     cali?:number,
  //   ) {
  //     this.nombreUsuario = nom;
  //     this.cedulaUsuario = ced;
  //     this.correoUsuario = corr;
  //     this.claveUsuario = cla;
  //     this.fechaRegistro = fec;
  //     this.codPerfil = perf;
  //     this.estadoUsuario = est;
  //     this.horario = hor;
  // }
}

export default UsuarioEntidad;
