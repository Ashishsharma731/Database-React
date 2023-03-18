const express = require('express');
const cors = require('cors');
let mysql = require('mysql2'); //this is to connect to mysql database Step1


//******************Step2****************************
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'ecommerce'
});
//******************************************************/
//********************Step3************************** */
connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});
// *****************************************************


const app = express();
app.use(cors());
app.use(express.json());

//add new user
app.post('/api/users', (req, res) => {
  console.log("data", req.body)
  let data = { name: req.body.name, dob_place: req.body.dobPlace };
  let sql = "INSERT INTO users  SET?";
  let query = connection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
  });
})

//*********This will just show or get the data which is already in mysql****** */
app.get("/api/users", (req, res) => {
  const q = "select * from users";
  connection.query(q, (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
});

// ****************************************************************************
//*************************This will be for the delete of data************** */
app.delete('/api/users/:id', (req, res) => {

  const id = req.params.id;
  connection.query("DELETE FROM users WHERE id= ?", id, (err, result) => {
    if (err) {
      console.log(err)
    }
  })
})
//*************************************************************************** */
//****************This api will be for editing the data in the database********/
app.put(`/api/users:id`, (req, res) => {
  console.log(id)
  const id = getUser(req.params.id)
  const name = req.body.name;
  const dob_place =req.body.dob_place
  connection.query("UPDATE users SET name = ?, dob_place = ? WHERE id = ?", [name,dob_place,id], (err, result) => {
    if (err) {
      console.log(err)
    }
    else{
      res.send("UPDATED")
    }
  })
  // if (!user) return res.status(404).json({})

  // user.name = req.body.name
  // res.json(user)
})

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});