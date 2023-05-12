const express = require('express');
const sqlite3 = require('sqlite3').verbose();  
const DBPATH = 'database.db';
const app = express();
const port = 9696;
const db = new sqlite3.Database((DBPATH), (err) => {
if (err){
	console.error(err.message);
} else{
	console.log('Connected to the Database. ');
}});
   
app.use(express.json());
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
	});
	app.get('/vagao', (req, res) => {
		db.all('SELECT * FROM vagao', [], (err, rows) => {
		  if (err) {
				console.error(err.message);
			}
			res.json(rows);
			});
	  });
	  app.get('/vagao/tipoE', (req, res) => {
		db.all('SELECT * FROM vagao WHERE tipo_vagao = "e"', [], (err, rows) => {
		  if (err) {
				console.error(err.message);
			}
			res.json(rows);
			});
			close(db);
	  });
	  app.get('/vagao/tipoF', (req, res) => {
		db.all('SELECT * FROM vagao WHERE tipo_vagao = "f"', [], (err, rows) => { 
		  if (err) {
				console.error(err.message);
			}
			res.json(rows);
			
			});
	  });
	  app.post('/inserirVagao', (req, res) => { 
		const xD = 'INSERT INTO vagao (placa, tipo_vagao) VALUES (?, ?)';
		db.run(xD, [req.body.placa, req.body.tipo_vagao], (err) => {
		  if (err) {
			console.error(err.message);
			res.status(500).json({ error: 'Failed to insert row' });
		  } else {
			res.status(201).json({ message: 'Row inserted successfully' });
		  }
		});
	  });