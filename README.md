# nrepl-test

A sandbox for playing with nrepl with Calva's nrepl client stuff.

## Usage

### Start the REPL
In one terminal tab.

Start with `nrepl 0.5.3` and friends:
```sh
$ clojure -Sdeps "{:deps {nrepl {:mvn/version \"0.5.3\"} cider/cider-nrepl {:mvn/version \"0.20.0\"} cider/piggieback {:mvn/version \"0.3.10\"} figwheel-sidecar {:mvn/version \"0.5.18\"}}}" -m nrepl.cmdline --middleware "[cider.nrepl/cider-middleware cider.piggieback/wrap-cljs-repl]"
```

Start with `nrepl 0.6.0` and friends:
```sh
$ clojure -Sdeps "{:deps {nrepl {:mvn/version \"0.6.0\"} cider/cider-nrepl {:mvn/version \"0.21.1\"} cider/piggieback {:mvn/version \"0.4.0\"} figwheel-sidecar {:mvn/version \"0.5.18\"}}}" -m nrepl.cmdline --middleware "[cider.nrepl/cider-middleware cider.piggieback/wrap-cljs-repl]"
```


Open the browser at localhost:3449

### Connect and run some tests
In another terminal tab.

Compile the test script:

```sh
$ npm i
$ npx tsc -p .
```

Run the script:
```sh
$ node out/talk-to-me.js
```