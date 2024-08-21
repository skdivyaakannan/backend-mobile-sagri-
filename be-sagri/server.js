const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// SQL Server configuration
var config = {
    "user": "Sagri", // Database username
    "password": "Ananth1986*", // Database password
    "server": "SG2NWPLS19SQL-v05.mssql.shr.prod.sin2.secureserver.net", // Server IP address
    "database": "NIVA", // Database name
    "options": {
        "encrypt": false // Disable encryption
    }
}

let db = sql.connect(config, err => {
    if (err) {
        throw err;
    }
    console.log("Connection Successful!");
});

// Define route for fetching data from SQL Server
app.post('/farmers', async (req, res) => {
  const { sno, name, address, village, sub_district, district, pin, aaddhar_no, mobile, daeo, type, oid } = req.body;

  try {
      const request = new sql.Request();
      request.input('sno', sql.Int, sno);
      request.input('name', sql.NVarChar, name);
      request.input('address', sql.NVarChar, address);
      request.input('village', sql.NVarChar, village);
      request.input('sub_district', sql.NVarChar, sub_district);
      request.input('district', sql.NVarChar, district);
      request.input('pin', sql.NVarChar, pin);
      request.input('aaddhar_no', sql.NVarChar, aaddhar_no);
      request.input('mobile', sql.NVarChar, mobile);
      request.input('daeo', sql.NVarChar, daeo);
      request.input('type', sql.NVarChar, type);
      request.input('oid', sql.NVarChar, oid);

      const query = `
          INSERT INTO Sagri.farmer (sno, name, address, village, sub_district, district, pin, aaddhar_no, mobile, daeo, type, oid)
          VALUES (@sno, @name, @address, @village, @sub_district, @district, @pin, @aaddhar_no, @mobile, @daeo, @type, @oid);
      `;

      const result = await request.query(query);
      res.json({ message: 'User added successfully' });
      console.log("user added successfully");
  } catch (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: 'An error occurred while adding the user' });
      console.log("error occured");
  }
});

app.get('/', (req, res) => {
    
    db.query('SELECT * FROM Sagri.farmer', (err, results) => {
      if (err) console.log(err);
      console.log("good");
      res.json(results);
    });
  });


// Start the server on port 3000
app.listen(3001, () => {
    console.log("Listening on port 3001...");
});


// app.get('/', (req, res) => {
//     res.send('hello world')
//   })

// app.get("/Divyaa", (request, response) => {
//     // Execute a SELECT query
//     new sql.Request().query("SELECT * FROM Sagri.farmer", (err, result) => {
//         response.send("Hello");
//         console.log("Hello");
//         if (err) {
//             console.error("Error executing query:", err);
//             console.log("Hello");
//             response.send("Hello");
//         } else {
//             response.send(result.recordset); // Send query result as response
//             console.dir(result.recordset);
//         }
//     });
// });

// Start the server on port 3000
// sno, name, address, village, sub_district, district, pin, aaddhar_no, mobile, daeo, type, oid