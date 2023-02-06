# supercollider - a  sclang language grammar for highlightjs

![license](https://badgen.net/badge/license/MIT/blue)

> sclang is the language of the audio synthesis platform SuperCollider

The implementation details are lent from <https://github.com/highlightjs/highlightjs-cypher> and <https://github.com/highlightjs/highlightjs-robots-txt>.

## Usage

Simply include the Highlight.js library in your webpage or Node app, then load this module.

### Static website or simple usage

Simply load the module after loading Highlight.js.  You'll use the minified version found in the `dist` directory.  This module is just a CDN build of the language, so it will register itself as the Javascript is loaded.

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

To provide a deterministic build system we rely on Docker.

### How to build

The build process is rather complicated, take a look at <https://github.com/highlightjs/highlight.js/blob/main/extra/3RD_PARTY_QUICK_START.md>.

The docker container allows to automate the necessary setup.

```shell
docker build -t sc-highlightjs .
# mount the artifacts dist folder from container to host
docker run --volume "$(pwd)/dist:/highlightjs/sclang/dist" sc-highlightjs
```

### How to run tests

```shell
docker build -t sc-highlightjs .
docker run sc-highlightjs npm run test
```

## License

MIT
