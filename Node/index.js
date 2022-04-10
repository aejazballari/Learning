const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./src/utils/db-connection');
const todoRoutes = require('./src/resources/todos/todos.route')
const app = express();

app.get('/', (req, res) => {
    res.json({"name": 'Aejaz'})
});

app.use(bodyParser.json());

app.options('*', cors())

app.use('/api/todos', todoRoutes);

const startServer = async () => {
    try {
        await sequelize.sync();
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }    
}

  

startServer();
app.listen(4000, ()=>console.log('listening at port 4000'))