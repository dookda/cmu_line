const express = require('express');
const moment = require('moment');
const app = express.Router();
const _ = require('lodash');
const qrcode = require('qrcode');

const con = require("./db");
const db = con.db;

app.post("/api/getuser", (req, res) => {
    const { usrid } = req.body;
    const sql = `SELECT * FROM student WHERE usrid='${usrid}'`;
    db.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
});

app.post("/api/getalluser", (req, res) => {
    const { usrid } = req.body;
    // console.log(usrid);
    const sql = `SELECT *, TO_CHAR(ts, 'DD-MM-YYYY') as ts7 FROM student `;
    db.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
});

app.post("/api/delete", (req, res) => {
    const { gid } = req.body;
    // console.log(gid);
    const sql = `DELETE FROM student WHERE gid=${gid}`;
    // console.log(sql);
    db.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
});

app.post("/api/insertuser", async (req, res) => {
    const { usrid, data } = req.body;
    // const sql = `INSERT INTO usertb(usrid, username, agency, linename, email, tel)VALUES('${usrid}', '${username}', '${agency}', '${linename}', '${email}', '${tel}') `;
    await db.query(`INSERT INTO student(usrid, ts)VALUES('${usrid}', now())`)

    let d;
    for (d in data) {
        if (data[d] !== '') {
            let sql = `UPDATE student SET ${d}='${data[d]}', ts=now() WHERE usrid='${usrid}'`;
            await db.query(sql)
        }
    }
    res.status(200).json({
        data: "success"
    })
});

app.post("/api/chkadmin", (req, res) => {
    const { usrid } = req.body;
    const sql = `SELECT * FROM student WHERE usrid='${usrid}'`;
    db.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
});

app.post("/api/updateuser", (req, res) => {
    const { usrid, data } = req.body;
    const sql = `SELECT * FROM student WHERE usrid='${usrid}'`;
    let d;
    db.query(sql).then(r => {
        if (r.rows.length > 0) {
            for (d in data) {
                if (data[d] !== '') {
                    let sql = `UPDATE student SET ${d}='${data[d]}', ts=now() WHERE usrid='${usrid}'`;
                    console.log(sql);
                    db.query(sql)
                }
            }
        } else {
            db.query(`INSERT INTO student(usrid, ts)VALUES('${usrid}', now())`).then(() => {
                for (d in data) {
                    if (data[d] !== '') {
                        let sql = `UPDATE student SET ${d}='${data[d]}', ts=now() WHERE usrid='${usrid}'`;
                        db.query(sql)
                    }
                }
            })
        }
        res.status(200).json({ data: "success" })
    })
});

app.post("/api/checkin", (req, res) => {
    const { usrid, studentid, username } = req.body;
    const sql = `INSERT INTO checkin (usrid,studentid,username,ts) VALUES ('${usrid}','${studentid}','${username}',now())`;
    db.query(sql).then(r => {
        res.status(200).json({
            data: "success"
        })
    })
})

app.post("/api/getcheckin", (req, res) => {
    const { usrid } = req.body;
    // console.log(usrid); 
    const sql = `SELECT *, TO_CHAR(ts, 'DD-MM-YYYY HH24:MI') as ts7 FROM checkin `;
    db.query(sql).then(r => {
        res.status(200).json({
            data: r.rows
        })
    })
});

app.post("/api/genqr", (req, res) => {
    const { usrid } = req.body;

    let stringdata = "https://liff.line.me/1657043590-BOEgp5Yl"
    let errorCorrectionLevel = { errorCorrectionLevel: 'H' }
    qrcode.toDataURL(stringdata, errorCorrectionLevel, (err, code) => res.status(200).json({ data: code }));
    // qrcode.toString(stringdata, function (err, code) {
    //     console.log(code)
    // });
})

module.exports = app;