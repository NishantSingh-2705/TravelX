const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require("cors");
const nodemailer = require('nodemailer');
const connectionString = 'postgres://postgres:test@localhost:5432/Mydb';
//"postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";
const client = new Client({
    connectionString: connectionString
});

client.connect();
var app = express();
app.use(bodyParser.json());
app.use(cors());
//app.use(nodemailer);
app.set('port', process.env.PORT || 4000);

app.get('/getUserById/:id', function(req, res, next) {
    //client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {
    id = req.params.id;
    console.log(req.params);
    //res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    client.query("SELECT * FROM mydb WHERE id = '" + id + "'", function(err, result) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(200).send({ "username": result.rows[0].email });
    });
});

app.post('/users', (req, res, next) => {
    const { email, password } = req.body
    let randNumber = Math.floor(Math.random() * 10);
    client.query('INSERT INTO mydb (id ,email, password) VALUES ($1, $2, $3) RETURNING *', [randNumber, email, password], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    });
});

app.post('/submit-feedback', (req, res, next) => {

    use_nodemailer(req.body);
    res.status(200).send({ "res": "Response submitted Successfully!" })
});

app.post('/login-user', (req, res, next) => {
    let email = req.body.email;
    resObj = {}
    try {
        client.query("SELECT * FROM mydb WHERE email = '" + email + "'", function(err, result) {
            if (err) {
                console.log(err);
                res.status(400).send({ "status": "400", "res": "User doesn't exist!" });
                return;
            }
            resObj['id'] = result.rows[0].id;
            resObj['email'] = result.rows[0].email;
            let password = result.rows[0].password;
            if (password != req.body.password) {
                res.status(200).send({ "status": "400", "res": "Incorrect password" });
                return;
            }
            res.status(200).send(resObj);
        });
    } catch (err) {
        res.status(400).send({ "res": err });
    }

});



function use_nodemailer(req) {
    const { fullname, email, subject, message } = req
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'travelx121@gmail.com',
            pass: 'xavjznaqgchinuzr'
        }
    });

    let mailDetails = {
        from: 'travelx121@gmail.com',
        to: email,
        subject: subject,
        text: 'Hi ' + fullname + ', your feedback has been received successfully!'
    };

    mailTransporter.sendMail(mailDetails, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
}

app.listen(4000, function() {
    console.log('Server is running.. on Port 4000');
});