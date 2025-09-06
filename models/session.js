const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(session({
  secret: "ecoFindsSecretKey", // put in .env in real app
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/ecofinds" }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));
