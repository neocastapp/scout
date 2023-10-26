import * as cors from "cors";
import * as nocache from "nocache";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import api from "./v2/index";
import * as errorHandler from "./helpers/errorHandler";

import home from "./home";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(nocache());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(helmet());
    this.express.use(express.static("public"));
  }

  private setRoutes(): void {
    this.express.use("/", home);
    this.express.use("/v1", api);
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  }
}

export default new App().express;
