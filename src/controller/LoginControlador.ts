import { Request, Response } from "express";
import LoginDao from "../dao/loginDao";

class LoginControlador extends LoginDao{
  public registrarse(req: Request, res: Response): void{
    LoginControlador.crearUsuario(req,res);
  }
  public iniciar(req:Request, res:Response):void{
    LoginControlador.iniciarSesion(req,res);
  }
}
const loginControlador = new LoginControlador();
export default loginControlador;