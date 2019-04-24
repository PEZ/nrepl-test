import * as fs from 'fs';
import * as path from 'path';

import { NReplClient, NReplSession } from "./nrepl";

const p = path.resolve(".", ".nrepl-port");


async function run() {
    let nClient: NReplClient,
        cljSession: NReplSession,
        cljsSession: NReplSession;
    try {
        const port = fs.readFileSync(path.resolve(".", ".nrepl-port"), 'utf8');
        console.log(port);
        nClient = await NReplClient.create({ host: "localhost", port: +port })
        nClient.addOnCloseHandler(c => {
            console.log("Connection closed");
        });
        cljSession = nClient.session;
        console.log("Connected session: clj");
        nClient.close();
    }
    catch (e) {
        console.log("No luck: ", e);
    }
}

run();


