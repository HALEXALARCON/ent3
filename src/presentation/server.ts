import express, { Request, Response, NextFunction, Router } from "express";
import cookieParser from "cookie-parser";

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    this.port = options.port;
    this.routes = options.routes;
  }

  async start() {
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    // Ping
    this.app.get("/ping", (_req, res) => res.json({ pong: true }));

    // Routes
    this.app.use(this.routes);

    // 404
    this.app.use((_req, res) => {
      res.status(404).json({ message: "Not Found" });
    });

    // Global error handler
    this.app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      console.error("Unhandled error:", err.stack ?? err);
      res.status(500).json({ message: "Internal server error" });
    });

    // Start server
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on http://localhost:${this.port}`);
    });
  }
}
