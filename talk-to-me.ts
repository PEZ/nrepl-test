import * as fs from 'fs';
import * as path from 'path';

import { NReplClient, NReplSession } from "./nrepl";

const ADD_FORM = "(+ 1 1)",
    PRINT_FORM = '(println "hello")',
    ERR_FORM = 'FUBAR';

async function evalForm(form: string, session: NReplSession, slug: string) {
    console.log(`Evaluating ${form} in ${slug} REPL …`);
    const r = await session.eval(form, {
        stdout: m => console.log("stdout: ", m),
        stderr: m => console.error("stderr: ", m)
    });
    let hasError = false;
    const value = await r.value.catch(async reason => {
        console.error("Because reasons: " + reason);
        hasError = true;
    });
    if (!hasError) {
        console.log(`Result: ${value}`);
    } else {
        // Why this no work?
        // await session.stacktrace();
    }
}

async function startFigwheel(session: NReplSession) {
    const START_FIG_FORM = "(do (require 'figwheel.main) (figwheel.main/start :dev))";

    console.log(`Evaluating ${START_FIG_FORM} in CLJ REPL clone …`);
    const r = await session.eval(START_FIG_FORM, {
        stderr: m => console.error("ERROR starting Figwheel: ", m)
    });
    let hasError = false;
    const value = await r.value.catch(async reason => {
        console.error("Because reasons: " + reason);
        hasError = true;
    });
    if (!hasError) {
        console.log(`Result: ${value}`);
    } else {
        //await session.stacktrace();
    }
}

(async () => {
    let nClient: NReplClient,
        cljSession: NReplSession,
        cljsSession: NReplSession;
    const portFile = path.resolve(".", ".nrepl-port");
    console.log("Hello nrepl");
    if (fs.existsSync(portFile)) {
        const port = fs.readFileSync(portFile, 'utf8');
        nClient = await NReplClient.create({ host: "localhost", port: +port })
        nClient.addOnCloseHandler(c => {
            console.log("Connection closed");
        });
        cljSession = nClient.session;
        console.log("Connected CLJ REPL");
        await evalForm(ADD_FORM, cljSession, "CLJ");
        await evalForm(PRINT_FORM, cljSession, "CLJ");
        await evalForm(ERR_FORM, cljSession, "CLJ");
        await evalForm(ADD_FORM, cljSession, "CLJ");

        cljsSession = await cljSession.clone();
        console.log("Cloned CLJ session, for CLJS");
        console.log("Starting Figwheel …");
        await evalForm(START_FIG_FORM, cljsSession);

        await evalForm(ADD_FORM, cljSession, "CLJS");
        await evalForm(PRINT_FORM, cljSession, "CLJS");
        await evalForm(ERR_FORM, cljSession, "CLJS");
        await evalForm(ADD_FORM, cljSession, "CLJS");


        await cljSession.close();
        await nClient.close();
    } else {
        console.error("No .nrepl-port file found. Can't do my work.")
    }
})();


