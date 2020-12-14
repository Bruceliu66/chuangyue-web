/* eslint-disable no-path-concat */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MockServer = require('@pat-fet/mock-server')

// 导入初始化数据
MockServer.Controller.inits = MockServer.requireAll({ dirname: __dirname + '/inits' })

// 导入控制器
MockServer.requireAll({ dirname: __dirname + '/controllers' })

// 配置
const config = {
  port: 3000,
  auth: {
    enabled: false
  },
  transform: ({ code, data, msg }) => {
    return {
      data: data,
      code: code,
      message: msg
    }
  },
  successCode: 200,
  errorCode: 500,
  cors: {
    allowHeaders: 'Content-Type,appId,ticket,userNo'
  }
}

const server = new MockServer(config)

server.run()
