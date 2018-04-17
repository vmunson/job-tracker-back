require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bp = require('body-parser');

app.use(bp.json());
app.use(require('./middleware/headers'));
app.use(require('./middleware/valldate-session'));
app.use('/api/user', require('./controllers/user'));
app.use('/api/login', require('./controllers/sessions'));
app.use('/api/jobinfo', require('./controllers/jobInfo'))


console.log(process.env.TEST)

http.listen(process.env.PORT, () => {
    console.log(`app is running on ${process.env.PORT}`)
})