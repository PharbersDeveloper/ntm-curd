"use strict"

import { configure, connectLogger, getLogger } from "log4js"

class PhLogger {
    constructor() {
        configure(process.env.PH_TS_SERVER_HOME + "/log4js.json")
    }

    public startConnectLog(app: { use: (arg0: any) => void; }) {
        app.use(connectLogger(getLogger("http"), { level: "auto" }))
    }

    public trace(msg?: any, ...params: any[]): void {
        getLogger().trace(msg, params)
    }

    public debug(msg?: any, ...params: any[]): void {
        getLogger().debug(msg, params)
    }

    public info(msg?: any, ...params: any[]): void {
        getLogger().info(msg, params)
    }

    public warn(msg?: any, ...params: any[]): void {
        getLogger().warn(msg, params)
    }

    public error(msg?: any, ...params: any[]): void {
        getLogger().error(msg, params)
    }

    public fatal(msg?: any, ...params: any[]): void {
        getLogger().fatal(msg, params)
    }
}

export default new PhLogger()
