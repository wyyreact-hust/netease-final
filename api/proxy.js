// 该服务为 vercel serve跨域处理
const {
  createProxyMiddleware
} = require('http-proxy-middleware')

module.exports = (req, res) => {
  let target = ''
  // 代理目标地址
  // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
// xxxxx 替换为你跨域请求的服务器 如： http://baidu.com
  if (req.url.startsWith('/graphql')) {
    target = 'http://www.uniquemo.cn/graphql'
  }
  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
  })(req, res)
}