const http = require("http")
const fs = require("fs")
const { URL } = require("url")
const serverAddr = "http://naizi.fun"
const Mock = require("mockjs")

http.createServer((req, res) => {
  const url = new URL(serverAddr + req.url)
  switch (url.pathname) {
    case "/getInfo":
      let result = Mock.mock({
        "姓名": "@cname",
        "居住地": "@city",
        "邮件": "@email",
        "生日": '@date("yyyy-MM-dd")'
      })
      res.end(JSON.stringify(result))
      break
    default:
      try {
        let pathname = url.pathname === "/" ? "/demo.html" : url.pathname
        res.end(fs.readFileSync(__dirname + pathname))
      } catch (e) {
        res.writeHead(404, "Not Found")
        res.end(`<title>Hello demo</title><h1>404 Not Found</h1>`)
      }
  }
}).listen(3000)
console.log(serverAddr)