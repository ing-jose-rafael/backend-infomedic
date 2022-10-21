export class PerfilEntidad {
  public nombrePerfil: string;
  public estadoPerfil: number;

  constructor(nom: string, estado: number) {
    this.nombrePerfil = nom;
    this.estadoPerfil = estado;
  }
}

export default PerfilEntidad;
