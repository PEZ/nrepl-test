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

1. Run your fork of the Calva `dev` branch and then open this project, and its `src/logger/main.cljs` in a debug session.
1. Jack in (`ctrl+alt+c ctrl+alt+j`).
1. Wait for the REPL server to start.
1. And then for Figwheel to start.

#### To repro the current issues:
1. Inline evaluate the `println` form in `main.js`. -> You should see that you get the `nil` result back, but no stdout is printed to `Calva says`.
1. Evaluate the in the CLJS REPL window. -> You should see a stacktrace printed and then that repl window is not usable any more. You'll need to close and reopen it to get it working again.


### Running the test script

1. Start the **Watcher** Build Task.
1. Run the script in the debugger: `F5`.

Check the output in the debug console.

### To test this with `nrepl 0.5.3` and friends:

Terminate the *Calva Jack-in* task.

In a terminal somewhere (inside VSCode for instance)...

```sh
$ clojure -Sdeps "{:deps {nrepl {:mvn/version \"0.5.3\"} cider/cider-nrepl {:mvn/version \"0.20.0\"} cider/piggieback {:mvn/version \"0.3.10\"} figwheel-sidecar {:mvn/version \"0.5.18\"}}}" -m nrepl.cmdline --middleware "[cider.nrepl/cider-middleware cider.piggieback/wrap-cljs-repl]"
```

Then Connect Calva (`ctrl+alt+c ctrl+alt+c`).