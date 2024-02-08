# supercollider - a  sclang language grammar for highlightjs

![license](https://badgen.net/badge/license/MIT/blue)

> sclang is the language of the audio synthesis platform SuperCollider

The implementation details are lent from <https://github.com/highlightjs/highlightjs-cypher> and <https://github.com/highlightjs/highlightjs-robots-txt>.

## Usage

Simply include the Highlight.js library in your webpage or Node app, then load this module.

### Static website or simple usage

Simply load the module after loading Highlight.js.
It is possible to use the minified version found in the `dist` directory.  This module is just a CDN build of the language, so it will register itself as the Javascript is loaded.

```html
<script type="text/javascript" src="/path/to/highlight.min.js"></script>
<script type="text/javascript" src="/path/to/sclang.min.js"></script>
<script type="text/javascript">
  hljs.highlightAll();
</script>
```

### Using directly from the UNPKG CDN

TODO

### With Node or another build system

If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language module, then register it with Highlight.js.

```javascript
var hljs = require('highlight.js');
var hljsSclang = require('highlightjs-sclang');

hljs.registerLanguage("sclang", hljsSclang);
hljs.highlightAll();
```

## Development

Start a local development server via `python3 -m http.server` and access the `test.html` file on <http://127.0.0.1:8000/test/test.html>.
After this modify the `src/sclang.js` file and reload the browser.

After the adjustments have been made, it is necessary to build a minified version before it can be published.

### How to build

As the build process is rather complex (see <https://github.com/highlightjs/highlight.js/blob/main/extra/3RD_PARTY_QUICK_START.md>) this repository relies on Docker to create deterministic builds on any platform.

```shell
docker build -t sc-highlightjs .
# mount the artifacts dist folder from container to host
docker run --volume "$(pwd)/dist:/highlightjs/sclang/dist" sc-highlightjs
```

Alternatively use `make build-docker`.

### How to run tests

```shell
docker build -t sc-highlightjs .
docker run sc-highlightjs npm run test
```

Alternatively use `make test-docker`.

## License

MIT
