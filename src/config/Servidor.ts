import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import path from 'path'
import ConexionDB from "./ConexionDB";

// Acá van los import de las rutas
import perfilRuta from '../router/PerfilRuta'
import usuarioRuta from "../router/UsuarioRuta";
import seguridad from "../middleware/seguridad";
// *************************************************

class Servidor {
  public app: express.Application;
  private paths: any

  constructor() {
    dotenv.config({ path: ".env" });
    this.app = express();
    this.app.set("PORT", process.env.PORT);
    // Conectar a base de datos
    ConexionDB();
    
    this.paths = {
      perfil: '/api/perfil',
      usuario: '/api/usuario',
    }
    
    // Middlewares
    this. middlewares();

    // Rutas de mi aplicación
    this.iniciarRutas();
  }

  public  middlewares() {
    // CORS
    this.app.use( cors() );

    this.app.use( morgan("dev") );

    // Lectura y parseo del body
    this.app.use( express.json({ limit: "100Mb" }) );
    // Directorio Público
    this.app.use( express.static('./public') );
    this.app.use( express.urlencoded({ extended: true }) );
  }

  public iniciarRutas() {

    // this.app.use( this.paths.perfil, perfilRuta )
    this.app.use( this.paths.perfil,seguridad.validarJWT, perfilRuta )
    this.app.use( this.paths.usuario, usuarioRuta )
  }

  public iniciarServidor() {
    this.app.listen(this.app.get("PORT"), () => {
      console.log("Servidor Backend en puerto", this.app.get("PORT"));
    });
  }
}

export default Servidor;
