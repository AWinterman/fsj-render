# fsj-render

take your output from [fsj](https://www.npmjs.org/package/fsj) and render a single
page app with it.

The results of running    

```sh
find . -name "*.md" -o -name "*.markdown" \
  | fsj -t "pandoc -f markdown -t html" \
  | ./fsj-render
```

(after npm i && npm dedupe) are available [here](http://awinterman.github.io/fsj-render/)

## Todo
- let user specify your own css
- make some ux improvements to default html/css

