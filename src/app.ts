import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as _ from "lodash";
import { dbService } from "./services/db.service";
import { ENV_APP_PORT_REST, IS_PRODUCTION } from "./util/secrets.util";
import { employeeService } from "./services/entities/employee.service";
import { EmployeeController } from "./controllers/employee.controller";
import { employeeMiddleware } from "./middlewares/employee.middleware";
import { Helpers } from "./util/helpers.util";
import { RouteNotFoundException } from "./exceptions/route-not-found.exception";
import { errorHandler } from "./handlers/error-handler";
import moment from "moment";

const compression = require("compression");

const appErrorHandler = require("errorhandler");

export class Application {
    private readonly APP: express.Application;
    private readonly PORT: number;
    private readonly ALLOWED_ORIGINS = [
        "https://krp-erp-backend.herokuapp.com/",
        "http://localhost:4200",
        "http://localhost:3000",
    ];

    constructor(port: number) {
        this.APP = express();
        this.PORT = port;

        this.setupCORS();
        this.initServices();
        this.initGlobalMiddleware();
        this.initRoutes();
    }

    initRoutes() {
        // Static Public Content
        this.APP.use("/public", express.static("public", {maxAge: 31557600000}));

        this.APP.get("/test", errorHandler((req: express.Request, res: express.Response) => {
            console.log(moment().format());
            return res.json({
                success: true
            });
        }));

        // PUBLIC APIS
        this.APP.post("/login", errorHandler(EmployeeController.login));
        // EMPLOYEE APIS
        this.APP.get("/employees", employeeMiddleware, errorHandler(EmployeeController.list));
        this.APP.get("/me", employeeMiddleware, errorHandler(EmployeeController.showMe));
        this.APP.get("/employees/:id([0-9]+)", employeeMiddleware, errorHandler(EmployeeController.showById));
        this.APP.post("/employees/invite-teachers", errorHandler(EmployeeController.sendTeacherInvite));
        this.APP.post("/employees/invite-clerical-staffs", errorHandler(EmployeeController.sendClericalStaffInvite));
        this.APP.post("/employees/invite-admins", errorHandler(EmployeeController.sendAdminInvite));
        this.APP.post("/employees", errorHandler(EmployeeController.signUp));
        this.APP.all("*", (req: express.Request, res: express.Response) => Helpers.handleError(res, new RouteNotFoundException()));
    }

    start(): void {
        this.APP.listen(process.env.PORT, () => {
            console.log(`App Started on PORT: ${process.env.PORT}`);
        });
    }

    private setupCORS(): void {
        this.APP.use(cors({
            origin: (origin, callback) => {
                if (!origin || _.includes(this.ALLOWED_ORIGINS, origin)) {
                    callback(undefined, true);
                } else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            methods: [
                "GET",
                "HEAD",
                "PUT",
                "PATCH",
                "POST",
                "DELETE"
            ],
            exposedHeaders: ["Content-Disposition"]
        }));
        this.APP.options("*");
    }

    // Express configuration
    private initGlobalMiddleware(): void {
        this.APP.set("port", process.env.PORT);
        this.APP.use(bodyParser.json());
        this.APP.use(bodyParser.urlencoded({extended: true}));
        this.APP.use(compression({
            level: 3
        }));

        if (IS_PRODUCTION) {
            this.APP.use(appErrorHandler());
        }
    }

    private initServices(): void {
        // Entities
        employeeService;

        // Factories

        // Others
        dbService;
    }
}