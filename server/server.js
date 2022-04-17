
const express = require('express');
const cors = require('cors');
import { readdirSync } from "fs";
import mongoose from 'mongoose';
import csrf from "csurf";
import cookieParser from "cookie-parser";
const morgan = require('morgan');
require('dotenv').config();

const csrfProtect = csrf({ cookie: true });

const app = express();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log("DB CONNECTION ERR => ", err));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

readdirSync("./routes").map((r) => 
   app.use("/api", require(`./routes/${r}`))
);

app.use(csrfProtect)

app.get('/api/csrf-token', (req, res) => {
   res.json({ csrfToken: req.csrfToken() });
});

// app.get('/', (req, res) => {
//     res.send('ok');
// });

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
