const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "hostel_management",
});

app.post("/add/students", (req, res) => {
    const data = req.body;
    const name = data.name;
    const reg = data.reg;
    const dept = data.dept;
    const merit = data.merit;
    const phone = data.phone;
    const hostel_id = data.hostel_id;
    const room_id = data.room_id;
    const role_id = data.role_id;
    const email = data.email;

    console.log("std adding");
    console.log(data);

    db.query(
        "INSERT INTO students (reg, name, dept, merit, email, hostel_id,room_id,phone, role_id) VALUES (?,?,?,?,?,?,?,?,?)",
        [reg, name, dept, merit, email, hostel_id, room_id, phone, role_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.post("/add/login", (req, res) => {
    const data = req.body;
    const password = data.password;
    const role_id = data.role_id;
    const email = data.email;

    console.log("login adding");
    db.query(
        "INSERT INTO login (email, role_id, password) VALUES (?,?,?)",
        [email, role_id, password],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("login data Inserted");
            }
        }
    );
});
app.post("/add/guardian", (req, res) => {
    const data = req.body;
    const std_reg = data.ste_reg;
    const phone = data.phone;

    db.query(
        "INSERT INTO guardian (std_reg, phone) VALUES (?,?)",
        [std_reg, phone],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Guardians' data Inserted");
            }
        }
    );
});

app.post("/add/guardian_info", (req, res) => {
    const data = req.body;
    const phone = data.phone;
    const name = data.name;
    const address = data.address;

    db.query(
        "INSERT INTO guardian_info (phone, name, address) VALUES (?,?,?)",
        [phone, name, address],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Guardians' info Inserted");
            }
        }
    );
});
app.post("/add/administration", (req, res) => {
    const data = req.body;

    const phone = data.phone;
    const email = data.email;
    const name = data.name;
    const hostel_id = data.hostel_id;
    const designation = data.designation;
    const role_id = data.role_id;

    db.query(
        "INSERT INTO administration (email, name, phone, hostel_id, designation, role_id) VALUES (?,?,?,?,?,?)",
        [email, name, phone, hostel_id, designation, role_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        }
    );
});

app.post("/add/hostel", (req, res) => {
    const data = req.body;

    const hostel_id = data.hostel_id;
    const type = data.type;
    const name = data.name;
    const address = data.address;
    const contact = data.contact;
    const total_seats = data.total_seats;
    const occupied_seats = data.occupied_seats;

    db.query(
        "INSERT INTO hostel (hostel_id, type, name, address, contact, total_seats, occupied_seats) VALUES (?,?,?,?,?,?,?)",
        [hostel_id, type, name, address, contact, total_seats, occupied_seats],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        }
    );
});


/*
app.post("/add/", (req, res) => {
    const data = req.body;

    const phone = data.phone;

    db.query(
        "INSERT INTO table (phone, name, address) VALUES (?,?,?)",
        [phone, name, address],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        }
    );
}); */
app.get("/hostel", (req, res) => {
    db.query("SELECT * FROM hostel", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/update/students", (req, res) => {
    const data = req.body;
    const reg = data.reg;
    const hostel_id = data.hostel_id;
    const room_id = data.room_id;

    console.log("updating std info?");

    db.query(
        "UPDATE students SET hostel_id = ? , room_id = ? WHERE reg = ?",
        [hostel_id, room_id, reg],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                //res.send(result);
            }
        }
    );

});

app.delete("/delete/students/:reg", (req, res) => {
    const reg = req.params.reg;
    db.query("DELETE FROM students WHERE reg = ?", reg, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/getData", (req, res) => {
    //why auto refreshing?
    console.log("now in get Data");
    let table = req.query.table;
    //console.log(req);
    //console.log(table);

    db.query(`SELECT * FROM ${table}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});