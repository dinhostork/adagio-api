import express, { Application } from "express";
import router from "../routes";
import dotenv from "dotenv";
dotenv.config();
import "../config/database";

export class Server {
  private app: Application;
  private readonly port: number;
  private version: number | string;
  private url: string;
  private server: any;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.APLICATION_PORT || "5000");
    this.version = process.env.API_VERSION || 1;
    this.url = process.env.API_URL || "localhost";

    this.app.use(express.json());
    this.app.use(`/v${this.version}`, router);
  }

  public start(): Application {
    this.server = this.app.listen(this.port, () => {
      console.log(
        `Servidor rodando em ${this.url}:${this.port}/v${this.version}`
      );
    });

    return this.app;
  }

  public stop(): void {
    this.server.close();
  }
}
