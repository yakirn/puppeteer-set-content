const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

const ready = new Promise(resolve => {
   const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    resolve(server)
  });
})



module.exports = {
  ready
}