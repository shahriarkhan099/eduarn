
const express = require('express');
const cors = require('cors');
const fs = require('fs');
import mongoose from 'mongoose';
const morgan = require('morgan');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log("DB CONNECTION ERR => ", err));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

fs.readdirSync("./routes").map((r) => 
   app.use("/api", require(`./routes/${r}`))
);

app.get('/', (req, res) => {
    res.send('ok');
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
