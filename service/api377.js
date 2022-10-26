const express = require('express');
const moment = require('moment');
const app = express.Router();
const con = require("./db");
const db = con.db;

// let db330 = new Pool({
//     user: 'postgres',
//     host: '119.59.125.134',
//     database: 'cmu',
//     password: '',
//     port: 5432
// })

app.post("/api/score377", (req, res) => {
      const { stdid } = req.body;
      let sql = `select * from public.score330 where std_id = ${stdid} `
      db.query(sql).then(r => {
            // console.log(sql);
            res.status(200).json({
                  data: r.rows
            })
      })
})

app.post("/api/score377login", (req, res) => {
      const { name_en, pass } = req.body;
      let sql = `select std_id from public.score330 where name_en = '${name_en}' and pass='${pass}'`
      db.query(sql).then(r => {
            res.status(200).json({
                  data: true,
                  std_id: r.rows[0].std_id
            })
      })
})

app.post("/api/changepass", (req, res) => {
      const { pass, std_id } = req.body
      let sql = `UPDATE public.score330 SET pass='${pass}' WHERE std_id=${std_id}`;
      // console.log(sql);
      db.query(sql).then(r => {
            // console.log(r.rows);
            res.status(200).json({
                  data: "success"
            })
      })
})

module.exports = app;