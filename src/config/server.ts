import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import { getSingular } from "../utils/functions";
import { ROUTES, ROUTE_PREFIX } from "../config";

const requestIp = require("request-ip");
import mongoConfig from "./mongo.config";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.middlewares();
    this.routes();
    this.app.get("/", (req, res) => {
      res.status(200).json({
        message: "API is running",
      });
    });
    mongoConfig.connect();
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: false,
      }),
    );
    this.app.use(cors());
    this.app.options("*", cors());
    this.app.use(morgan("dev"));
    this.app.use(requestIp.mw());
  }

  private routes(): void {
    ROUTES.forEach(async (route) => {
      const routeModule = await import(
        `../routes/${getSingular(route)}.routes`
      );

      if (process.env.ENVIROMENT == "DEV") {
        console.log(`Loading route ${route}`);
      }
      this.app.use(`${ROUTE_PREFIX}/${route}`, routeModule.default);
    });
  }
}

export default Server;
