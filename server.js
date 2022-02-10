const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { CreatePool, createPool } = require("mysql");
const { route } = require("express/lib/router");
const { response } = require("express");
const { send } = require("process");
app.use(cors());
app.use(express.json());
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "racuni",
});

let datum;

app.post("/index.html", (req, res) => {
  //console.log(req.body);
  //EPS1

  let queryResp = pool.query(
    `SELECT * FROM racuni WHERE Datum = "${req.body.date}"`,
    (err, result, rows) => {
      console.log(result);
      if (rows != 0) {
        return;
      }
    }
  );

  pool.query(
    `INSERT INTO racuni (Naziv, Datum, Cena) VALUES ("EPS1", "${req.body.date}", ${req.body.eps1})`
  );

  //EPS2
  pool.query(
    `INSERT INTO racuni (Naziv, Datum, Cena) VALUES ("EPS2", "${req.body.date}", ${req.body.eps2})`
  );

  //EPS3
  pool.query(
    `INSERT INTO racuni (Naziv, Datum, Cena) VALUES ("EPS3", "${req.body.date}", ${req.body.eps3})`
  );

  //VVIK
  pool.query(
    `INSERT INTO racuni (Naziv, Datum, Cena) VALUES ("VVIK", "${req.body.date}", ${req.body.vvik})`
  );

  //MTS
  pool.query(
    `INSERT INTO racuni (Naziv, Datum, Cena) VALUES ("MTS", "${req.body.date}", ${req.body.mts})`
  );

  //H
  pool.query(
    `INSERT INTO racuni (Naziv, Datum, Cena) VALUES ("H", "${req.body.date}", ${req.body.h})`
  );

  res.send();
});

// app.post("/racuni.html", (req, res) => {
// pool.query(
//   `SELECT "${datum}", SUM(Cena) AS "Rashod" FROM Racuni GROUP BY Datum ORDER BY Datum`,
//   (error, result, data) => {
//     res.send(`response`);
//   }
//   );
// });

app.post("/racuni.html", (req, res) => {
  datum = req.body;
  pool.query(
    `SELECT Datum, SUM(Cena) AS "Rashod" FROM Racuni GROUP BY Datum ORDER BY Datum`,
    (error, data) => {
      console.log(data);
      res.send(data);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
