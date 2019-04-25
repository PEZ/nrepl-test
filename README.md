# nrepl-test

A sandbox for playing with nrepl with Calva's nrepl client stuff.

The project consists of two parts:
1. A super minimal Clojure/ClojureScript project using deps.edn and Figwheel Main.
2. A TypeScript node script that runs a sequence of nrepl evaluations against the nrepl server in the Clojure project.

## Usage

```sh
$ npm i
```

### Start the REPL

In a terminal somewhere (inside VSCode for instance)...

To start with `nrepl 0.5.3` and friends:
```sh
$ clojure -Sdeps "{:deps {nrepl {:mvn/version \"0.5.3\"} cider/cider-nrepl {:mvn/version \"0.20.0\"} cider/piggieback {:mvn/version \"0.3.10\"} figwheel-sidecar {:mvn/version \"0.5.18\"}}}" -m nrepl.cmdline --middleware "[cider.nrepl/cider-middleware cider.piggieback/wrap-cljs-repl]"
```

To start with `nrepl 0.6.0` and friends:
```sh
$ clojure -Sdeps "{:deps {nrepl {:mvn/version \"0.6.0\"} cider/cider-nrepl {:mvn/version \"0.21.1\"} cider/piggieback {:mvn/version \"0.4.0\"} figwheel-sidecar {:mvn/version \"0.5.18\"}}}" -m nrepl.cmdline --middleware "[cider.nrepl/cider-middleware cider.piggieback/wrap-cljs-repl]"
```

### Connect and run some tests

If you are using VS Code:
1. Start the **Watcher** Build Task.
1. Run the script in the debugger: `F5`.

Not using VSCode? In another terminal tab, compile the test script:

```sh
$ npx tsc -p .
```

Run the script:
```sh
$ node out/talk-to-me.js
```