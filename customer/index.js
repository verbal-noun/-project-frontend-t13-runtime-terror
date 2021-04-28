const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = 9090;
http.listen(process.env.PORT || port, () => {
  console.log(`listening on port *:${port}`);
});