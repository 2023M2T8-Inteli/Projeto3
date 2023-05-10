const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'database.db';
const db = new sqlite3.Database(DBPATH)
const port = 9696;
app.use(express.json());