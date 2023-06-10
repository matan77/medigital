import express from "express";
import dotenv from "dotenv";
import database from './models/database.js';
import actionRoutes from './controller/actions.js';
import tasksRoutes from './controller/tasks.js';
dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.use("/", actionRoutes);
app.use("/functions/", tasksRoutes);


database.sync()
    .then(res => {
        app.listen(process.env.PORT, () => { console.log(`Server is running via port ${process.env.PORT}`) });
    })

    .catch(err => {
        console.log(err);

    });