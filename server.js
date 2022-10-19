const { WarpFactory, LoggerFactory } = require('warp-contracts')
const path = require('path')
const http = require('http')
const send = require('http-json-response')
const Arweave = require('arweave')
const cors = require('permissive-cors')
const corsMiddleware = cors()

LoggerFactory.INST.logLevel('error')
//const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
const warp = WarpFactory.forMainnet()

const server = http.createServer((req, res) => {
  corsMiddleware(req, res, async () => {
    const result = await warp.contract('VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA').setEvaluationOptions({
      internalWrites: true,
      allowUnsafeClient: true,
      allowBigInt: true
    }).readState()
    //console.log(result)
    send(res, result.cachedValue.state)
  })

})

server.listen(3000)
