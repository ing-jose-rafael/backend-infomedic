import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import ConexionDB from "./ConexionDB";

// Acá van los import de las rutas
import perfilRuta from '../router/PerfilRuta'
// *************************************************

class Servidor {
  public app: express.Application;

  constructor() {
    dotenv.config({ path: ".env" });
    ConexionDB();
    this.app = express();
    this.iniciarConfiguracion();
    this.iniciarRutas();
  }

  public iniciarConfiguracion() {
    this.app.set("PORT", process.env.PORT);
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "100Mb" }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  public iniciarRutas() {
    this.app.use('/api/perfiles',perfilRuta)
  }

  public iniciarServidor() {
    this.app.listen(this.app.get("PORT"), () => {
      console.log("Servidor Backend en puerto", this.app.get("PORT"));
    });
  }
}

export default Servidor;
