const express = require('express')
const app = express()

app.get('/', (req: any, res: any) => {
    res.send('Hello Word !')
})

app.listen(3000)
