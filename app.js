const express = require('express');
const app = express();
const userModel = require("./models/user");
const cookieParser = require('cookie-parser');
const bcryt = require('bcrypt');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index');
});


app.post('/register', async (req, res) => {
    let {name, username, email, password} = req.body;

    let user = await userModel.findOne({email});
    if(user){
        return res.status(500).send("User already exists");
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                name,
                username,
                age,
                email,
                password: hash
            });
        });
    });
});


app.listen(3001);