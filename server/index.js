const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cryptoval = 10;
const jwt = require("jsonwebtoken");
const { response } = require("express");

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
    db.query(
        "INSERT INTO students (reg, name, dept, merit, email, hostel_id,room_id,phone, role_id) VALUES (?,?,?,?,?,?,?,?,?)",
        [reg, name, dept, merit, email, hostel_id, room_id, phone, role_id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
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
        "INSERT INTO login (email, role_id, password) VALUES (?,?,?)",
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
                res.send(result);
            }
        }
    );
});

app.post("/add/complain",(req,res)=>{
    const data = req.body;
    const datetime = data.timestamp;
    const std_reg = data.std_reg;
    const tag = data.tag;
    const image= data.photo;
    const description = data.description;
    db.query(
        "INSERT INTO complains (datetime, std_reg, tag, image, description) VALUES (?,?,?,?,?)",
        [datetime,std_reg, tag, image, description],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
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
            } else {
                res.send(result);
            }
        }
    );
});

app.post("/add/notice", (req, res) => {
    const data = req.body;

    const hostel_id = data.hostel_id;
    const date_time = data.date_time;
    const title = data.title;
    const description = data.description;
    const priority = data.priority;

    db.query(
        "INSERT INTO notice_board (Title, Hostel_ID, Description, Priority) VALUES (?,?,?,?)",
        [title, hostel_id, description, priority],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                res.send(result);
            }
        }
    );
});

app.post("/add/room", (req, res) => {
    const data = req.body;

    const hostel_id = data.hostel_id;
    const room_id = data.room_id;

    db.query(
        "INSERT INTO rooms (Hostel_ID,Room_ID) VALUES (?,?)",
        [hostel_id, room_id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                res.send(result);
            }
        }
    );
});


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
    console.log(reg+" "+hostel_id+" "+room_id);

    db.query(
        "UPDATE students SET hostel_id = ? , room_id = ? WHERE reg = ?",
        [hostel_id, room_id, reg],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                console.log(result);
                res.send("ok");
            }
        }
    );

});


app.put("/update/guardian", (req, res) => {
    const data = req.body;
    const reg = data.reg;
    const phone = data.phone;


    db.query(
        "UPDATE guardian SET Std_reg = ? , Phone = ? WHERE Std_reg = ?",
        [reg, phone, reg],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                console.log(result);
                res.send("ok");
            }
        }
    );

});
app.put("/update/guardian_info", (req, res) => {
    const data = req.body;
    const phone = data.phone;
    const address = data.address;
    const name = data.name;
    const prev_phone = data.prev_phone;

    console.log(data);

    db.query(
        "UPDATE guardian_info SET Phone = ? , Address = ?, Name = ? WHERE Phone = ?",
        [phone, address, name, prev_phone],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                console.log(result);
                res.send("ok");
            }
        }
    );

});

app.put("/update/hostel", (req, res) => {
    const data = req.body;
    const hostel_id = data.hostel_id;
    const type = data.type;
    const name = data.name;
    const address = data.address;
    const contact = data.contact;
    const total_seats = data.total_seats;
    const occupied_seats = data.occupied_seats;

    console.log("updating hostel info?");

    db.query(
        "UPDATE hostel SET Type = ? , Name = ? , Address = ? , Contact = ? , Total_Seats = ? , Occupied_Seats = ? WHERE Hostel_ID = ?",
        [type, name, address, contact, total_seats, occupied_seats, hostel_id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                console.log(result);
                res.send(result);
            }
        }
    );

});

app.put("/update/notice", (req, res) => {
    const data = req.body;
    const hostel_id = data.hostel_id;
    const date_time = data.date_time;
    const title = data.title;
    const description = data.description;
    const priority = data.priority;
    const old_title = data.old_title;

    console.log(date_time);
    db.query(
        "UPDATE notice_board SET Hostel_ID = ? , Title = ? , Description = ? , Priority = ? WHERE DateTime = ? AND Title = ?",
        [hostel_id, title, description, priority, date_time, old_title],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                console.log(result);
                res.send(result);
            }
        }
    );

});
app.put("/update/student", (req, res) => {
    const data = req.body;
    const reg = data.reg;
    const name = data.name;
    const dept = data.dept;
    const merit = data.merit;
    const email = data.email;
    const hostel_id = data.hostel_id;
    const room_id = data.room_id;
    const phone = data.phone;
    const role_id= data.role_id;

    console.log(data);
    db.query(
        "UPDATE students SET Reg = ? , Name = ? , Dept = ? , Merit = ?, Email =?, Hostel_ID=?, Room_ID =?, Phone =?, Role_ID=? WHERE Email = ?",
        [reg, name, dept, merit, email, hostel_id, room_id, phone, role_id, email],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                console.log("PREITY UPDATED");
                res.send(result);
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
app.delete("/delete/hostel/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM hostel WHERE Hostel_ID = ?", id, (err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            console.log("hostel deleted");
            res.send("ok");
        }
    });
});

app.delete("/delete/notice/:date&:title", (req, res) => {
    const date_time = req.params.date;
    const title = req.params.title;
    //0000-00-00 00:00:00

    console.log(date_time+" ?? "+title);
    db.query("DELETE FROM notice_board WHERE DateTime = ? AND Title = ?", [date_time, title], (err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            console.log("notice deleted");
            res.send("ok");
        }
    });
});
app.delete("/delete/room/:hostel_id&:room_id", (req, res) => {
    const hostel_id = req.params.hostel_id;
    const room_id = req.params.room_id;

    db.query("DELETE FROM rooms WHERE Hostel_ID = ? AND Room_ID = ?", [hostel_id, room_id], (err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            console.log(result.affectedRows);
            if(result.affectedRows != 0)
                res.send("ok");
            else
                res.send("invalid");
        }
    });
});

app.get("/getData", (req, res) => {
    console.log("now in get Data");
    let table = req.query.table;

    db.query(`SELECT * FROM ${table}`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.get("/getData/hostel", (req, res) => {
    let id = req.query.hostel_id;
    db.query(`SELECT * FROM hostel WHERE Hostel_ID = ?`, id ,(err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            
            if(result.length == 0){
                res.send("error");
            } else {
                res.send(result);
            }
        }
    });
});

app.get("/getData/student/", (req, res) => {
    let reg = req.query.reg;
    db.query(`SELECT * FROM students WHERE Reg = ?`, reg ,(err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            console.log(result);
            if(result.length == 0){
                res.send("notRegistered");
            } else {
                res.send("Registered");
            }
        }
    });
});


app.get("/getData/user/", (req, res) => {
    console.log("preityyy");
    console.log(req.query);
    let mail = req.query.mail;
    let role = req.query.role;
    console.log(role-0);
    if(role == "2")
    {
        console.log("DHUKCHEEEE");
        db.query(`SELECT * FROM students WHERE Email = ?`, mail ,(err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                res.send(result);
            }
        });
    }
    else
    {
        db.query(`SELECT * FROM administration WHERE Email = ?`, mail ,(err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                res.send(result);
            }
        });
    }
    
});


app.get("/getData/login", (req, res) => {
    console.log("NOW IN QUERY")
    let mail = req.query.mail;
    db.query(`SELECT * FROM login WHERE Email = ?`, mail ,(err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            console.log(result);
            if(result.length == 0){
                res.send("notRegistered");
            } else {
                console.log("pathabo je registerd");
                res.send("Registered");
            }
        }
    });
});


app.get("/getData/student/room", (req, res) => {
    let hostel_id = req.query.hostel_id;
    let room_id = req.query.room_id;
    db.query(`SELECT * FROM students WHERE Hostel_ID = ? AND Room_ID = ?`, [hostel_id, room_id] ,(err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            res.send(result);
        }
    });
});

app.get("/getData/guardian", (req, res) => {
    let reg= req.query.reg;
    console.log("here "+reg);
    db.query(`SELECT * FROM guardian WHERE Std_reg = ?`, [reg] ,(err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            res.send(result);
        }
    });
});

app.get("/getData/guardian_info", (req, res) => {
    let phone= req.query.phone;
    console.log("here "+phone);
    db.query(`SELECT * FROM guardian_info WHERE Phone = ?`, [phone] ,(err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            res.send(result);
        }
    });
});

app.get("/getData/rooms", (req, res) => {
    let id = req.query.hostel_id; 
    db.query(`SELECT Room_ID FROM rooms WHERE Hostel_ID = ?`, id ,(err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            res.send(result);
        }
    });
});

app.put("/update/administration", (req, res) => {
    const data = req.body;
    const phone = data.phone;
    const email = data.email;
    const name = data.name;
    const hostel_id = data.hostel_id;
    const designation = data.designation;
    const role_id = data.role_id;

    console.log(data);
    console.log("Sohan khay biri");

    db.query(
        "UPDATE administration SET email = ?, name = ?, phone = ?, hostel_id = ?, designation = ?, role_id = ? WHERE email = ?",
        [email, name, phone, hostel_id, designation, role_id,email],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/getData/notice", (req, res) => {
    let sortBy = req.query.name;
    let type = req.query.type;
    
    //db.query(`SELECT * FROM notice_board ORDER BY ? ?`, [sortBy, type] ,(err, result) => {
    let sql = "SELECT * FROM notice_board ORDER BY "+sortBy+" "+type;
    db.query(sql,(err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            console.log(result);
            res.send(result);
        }
    });
});


app.get("/getData/admin", (req, res) => {
    let email = req.query.email;
    db.query(`SELECT * FROM administration WHERE Email = ?`, [email] ,(err, result) => {
        if (err) {
            console.log(err);
            res.send("error");
        } else {
            console.log(result);
            res.send(result);
        }
    });
});



app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
