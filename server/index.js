const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cryptoval = 10;
const jwt = require("jsonwebtoken");

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
        "INSERT INTO students (reg, name, dept, merit, email, hostel_id,roomid,phone, role_id) VALUES (?,?,?,?,?,?,?,?,?)",
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

    console.log(data);
    bcrypt.hash(password, cryptoval, (err,hash)=>{
        if(err) {
            console.log(err);
        }
        db.query(
        "INSERT INTO login (email, roleid, password) VALUES (?,?,?)",
        [email, role_id, hash],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("login data Inserted");
            }
        });
    })

    
});
app.post("/add/guardian", (req, res) => {
    const data = req.body;
    const std_reg = data.std_reg;
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

    console.log("i'm in hostel page");

    //const hostel_id = data.hostel_id; auto increment
    const type = data.type;
    const name = data.name;
    const address = data.address;
    const contact = data.contact;
    const total_seats = data.total_seats;
    const occupied_seats = data.occupied_seats;

    db.query(
        "INSERT INTO hostel (type, name, address, contact, total_seats, occupied_seats) VALUES (?,?,?,?,?,?)",
        [type, name, address, contact, total_seats, occupied_seats],
        (err, result) => {
            if (err) {
                console.log(err);
                console.log("hostel errrr");
            } else {
                console.log(result);
                res.send(result);
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


app.post("/authMail",(req,res) =>{
    const data = req.body;
    const email= data.email;
    console.log(email);

    db.query(
        "SELECT * FROM login WHERE Email=?",
        [email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else if(result.length > 0){
                 
                res.send(result);
            }
            else {
                res.send({messege: "Invalid Email!"});
            }
        }
    );
});


app.post("/auth",(req,res) =>{
    const data = req.body;
    const email= data.email;
    const password = data.password;
    console.log(email);

    db.query(
        "SELECT * FROM login WHERE Email=?",
        [email],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                bcrypt.compare(password,result[0].Password,(err, response)=> {
                    console.log(result);
                    if(response)
                    {
                        const id = result[0].Email;
                        console.log("hiii" + id);
                        const token = jwt.sign({id}, "jwtSecret", {
                            expiresIn:3000,
                        } );
                        res.json({auth: true, token: token, result: result}); 
                    } 
                    else res.send({messege: "Wrong password"});
                })
                
            }
        }
    );
});

const verifyJWT =(req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token)
    {
        res.send("NO TOKEN HERE inside verifyJWT");
    }
    else {
        jwt.verify(token, "jwtSecret", (err, decoder) => {
            if(err) {
                res.json({auth : false, messege: "NO AUTH, token bhul lage"});
            }
            else {
                req.userID = jwt.decode.id;
                next();
            }
        })
    }
}


app.get('/isAuth', verifyJWT , (req,res) => {
    res.send("AUthenticated buddy");
});


/*
app.get("/loginCred",(req,res) =>{
    let table = req.query.table;
    let email= req.query.email;
    console.log('preityyyy');

    db.query( `SELECT * FROM ${table} where email=${email}`,
    (err, result) => {
        if (err) {
            console.log(err);
            console.log("login info ashe nai");
        } else {
            console.log(result);
            res.send(result);
        }
    } )
} );
*/


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
    // koi kila use korsos bujhram na, preventDefault() use korte paros, kichu component or default behaviour oilo refresh kora
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
    console.log("Server is running on port 5000");
});