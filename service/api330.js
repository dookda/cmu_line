const express = require('express');
const moment = require('moment');
const app = express.Router();
const con = require("./db");
const db330 = con.db330;

// let db330 = new Pool({
//     user: 'postgres',
//     host: '119.59.125.134',
//     database: 'cmu',
//     password: '',
//     port: 5432
// })

app.post("/api/score330", (req, res) => {
      const { stdid } = req.body;
      let sql = `select * from public.score330 where std_id = ${stdid} `
      db330.query(sql).then(r => {
            // console.log(sql);
            res.status(200).json({
                  data: r.rows
            })
      })
})

app.post("/api/score330login", (req, res) => {
      const { std_id, pass } = req.body;
      console.log(std_id, pass);
      let sql = `select std_id from public.score330 where std_id = ${std_id} and pass='${pass}' `
      db330.query(sql).then(r => {
            // console.log(r.rows);
            res.status(200).json({
                  data: r.rows
            })
      })
})

app.post("/api/changepass", (req, res) => {
      const { pass, std_id } = req.body
      let sql = `UPDATE public.score330 SET pass='${pass}' WHERE std_id=${std_id}`;
      // console.log(sql);
      db330.query(sql).then(r => {
            // console.log(r.rows);
            res.status(200).json({
                  data: "success"
            })
      })
})

module.exports = app;