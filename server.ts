const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();

//Connect Database
connectDB();

app.use(cors());

//Init Middleware

app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/users', require('./src/server/routes/users'));
app.use('/api/auth', require('./src/server/routes/auth'));
app.use('/book-ticket', require('./src/server/routes/movie'));
app.use('/screenings', require('./src/server/routes/screenings'));
app.use('/tickets', require('./src/server/routes/tickets'));
app.use('/rating', require('./src/server/routes/rating'));
app.use('/', require('./src/server/routes/movie'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client'));

    app.get('*', (req: any, res: any) => res.sendFile(path.resolve(__dirname, 'client', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
