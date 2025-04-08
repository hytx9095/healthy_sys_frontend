# healthy-sys-frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 自动生成请求代码
```
openapi --input http://localhost:9090/v2/api-docs --output ./generated --client axios
```