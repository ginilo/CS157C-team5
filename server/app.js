//express dependency
const express = require('express');
const cors = require('cors');

const app = express();

const session = require('express-session');
const RedisStore = require("connect-redis").default

//redis client
const client = require('./redisClient')


let redisStore = new RedisStore({
    client: client,
  })

app.use(session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: "wow a secret",
    cookie: { maxAge: 36000000}
}));

app.use(cors({origin: 'http://localhost:3000', methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"], optionsSuccessStatus: 200, credentials: true}));

//listening port number
const PORT_NUMBER = 5000;

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

app.get("/", (req, res) => {
    //console.log("profile: "+ req.sessionID)
    res.send('hello');
})


//routes
const products = require('./routes/products_route');
const orders = require('./routes/orders_route');
const carts = require('./routes/carts_route');
const accounts = require('./routes/accounts_route')


//use the routes
app.use("/products", products)
app.use("/orders", orders)
app.use("/cart", carts)
app.use("/account", accounts)

app.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    
    if (username && password) {
        try {
            const corrPassword = await client.hGet(username, 'password');
            if (corrPassword == password) {
                const user = {};
                const account_id = await client.hGet(username, 'account_id')
                const account_type = await client.hGet(username, 'account_type');

                user['username'] = username;
                user['account_id'] = account_id;
                user['account_type'] = account_type;
                req.session.user = user;
                res.send("logged in");
                //console.log("login: " + req.sessionID)
            }
            else {
                res.send('Incorrect Password');
            }
        } catch (err) {
            res.status(500).send(err.message)
        }
    } else {
        res.send('Please enter username and password');
        res.end();
    }
})


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect("/");
})


app.get('/login', (req, res) => {  
    
    //console.log("profile: "+ req.sessionID)
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user});
    } else {
        res.send({loggedIn: false});
    }
})

app.get('/profile', async (req, res) => {
    const user = req.session.user;
    const username = user.username

    const data = await client.HGETALL(username);

    data['username'] = username;
    data['password'] = '';
    
    res.send(data);
})

app.listen(PORT_NUMBER, () => {
    console.log(`Listening at port ${PORT_NUMBER}`);
});



