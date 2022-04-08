const express = require('express')
const con = require("./db");
const db = con.db;

const app = express()
const port = 3100

const googleapi = require('./googleapi');
app.use(googleapi);

app.post('/api/getprofile', (req, res) => {
    res.send('Hello World!')
});

app.post('/api/setprofile', async (req, res) => {
    const { usrid, data } = req.body;
    await db.query(`INSERT INTO usertb(usrid, ts)VALUES('${usrid}', now())`)

    let d;
    for (d in data) {
        if (data[d] !== '') {
            let sql = `UPDATE usertb SET ${d}='${data[d]}', ts=now() WHERE usrid='${usrid}'`;
            await db.query(sql)
        }
    }
    res.status(200).json({
        data: "success"
    })
})

app.get('/api/test', async (req, res) => {



})

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`)
});