import express, { Application, NextFunction, Request, Response } from "express";
import router from "../routes";
import dotenv from "dotenv";
dotenv.config();
import "../config/database";
import { HttpError } from "../utils/errors/httpErrors";
import cors from "cors";

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
    this.app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "https://adagio.dinho.live",
          "https://adagio.vercel.app",
          /\.?-dinhostork.vercel.app$/,
        ],
      })
    );
    this.app.use(express.json());
    
    
    this.app.use(`/v${this.version}`, router);
    this.middleware();
  }

  public start(): Application {
    this.server = this.app.listen(this.port, () => {
      console.log(
        `Servidor rodando em ${this.url}:${this.port}/v${this.version}`
      );
    });

    return this.app;
  }

  middleware(): void {
    this.app.use(
      (err: HttpError, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof HttpError) {
          return err.sendResponse(res);
        }
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    );
  }

  public stop(): void {
    this.server.close();
  }
}
