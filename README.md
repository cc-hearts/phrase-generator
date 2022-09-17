# Phrase Generator

词条生成器 生成词条便于调试

区分两个环境：

- node
  > ```js
  > node index.js
  > ```

可以使用`--help` 获取文章提示

```shell
# "start": "node ./index.js --articleLMax 10000 --articleLMin 6000 --sectionLMin 200 --sectionLMax 500",
yarn start --help
```

- browser
  > Live Server index.html
