const express = require('express');
const sqlite3 = require('sqlite3').verbose();  
const DBPATH = 'database.db';
const app = express();
const port = 9696;
const hostname = 'localhost';
const db = new sqlite3.Database((DBPATH), (err) => {
if (err){
	console.error(err.message);
} else{
	console.log('Connected to the Database. ');
}});
   
app.use(express.static("../frontend/main"));


app.use(express.json());
app.listen(port, hostname, () => { // Aqui estabeleço a ligação com o servidor
	console.log(`Server listening on http://${hostname}:${port}/`);
	});
	  app.post('/inserirChoque', (req, res) => { // Aqui realizo a inserção de um novo choque
		const insert = 'INSERT INTO choque (id_choque, velocidade, pg, forca_maxima, act, placa, id_ponto, tipo_choque, hora, dia) VALUES (?,?,?,?,?,?,?,?,?,?)';
		db.run(insert, [req.body.id_choque, req.body.velocidade, req.body.pg, req.body.forca_maxima, req.body.act, req.body.placa, req.body.id_ponto, req.body.tipo_choque, req.body.hora, req.body.dia], (err) => {
		  if (err) {
			console.error(err.message);
			res.status(500).json({ error: 'Failed to insert row' });
		  } else {
			res.status(201).json({ message: 'Row inserted successfully' });
		  }
		});
	  });
		app.post('/choqueVagao', (req, res) => {  // Aqui realizo a consulta para obter todos os choques a partir da placa de um vagão (tipo de filtragem)
			const select = 'SELECT * FROM choques WHERE placa = ?'; 
			db.all(select, [req.body.placa], (err, rows) => {
				if (err) {
					console.error(err.message);
				} else {
					if (rows.length > 0) {
						console.log(rows);
						res.status(200).json({rows});
					} else {
						res.status(401).json({ message: 'Login failed' });
					}
				}
			});
		});
		app.post('/choqueTipo', (req, res) => {  // Aqui realizo a consulta para obter todos os choques a partir do tipo de choque (tipo de filtragem)
			const select = 'SELECT * FROM choques WHERE tipo_choque = ?';
			db.all(select, [req.body.tipo_choque], (err, rows) => {
				if (err) {
					console.error(err.message);
				} else {
					if (rows.length > 0) {
						console.log(rows);
						res.status(200).json({rows});
					} else {
						res.status(401).json({ message: 'Não existem choques!' });
					}
				}
			});
		});
		app.post('/choqueEngate', (req, res) => {  // Aqui realizo a consulta para obter todos os choques a partir do tipo de choque (tipo de filtragem)
			const select = 'SELECT * FROM choques WHERE tipo_engate = ?';
			db.all(select, [req.body.tipo_choque], (err, rows) => {
				if (err) {
					console.error(err.message);
				} else {
					if (rows.length > 0) {
						console.log(rows);
						res.status(200).json({rows});
					} else {
						res.status(401).json({ message: 'Não existem choques!' });
					}
				}
			});
		});
		app.post('/choqueViagem', (req, res) => {  // Aqui realizo a consulta para obter todos os choques a partir do tipo de viagem (tipo de filtragem)
			const select = 'SELECT * FROM choques WHERE tipo_viagem = ?';
			db.all(select, [req.body.tipo_choque], (err, rows) => {
				if (err) {
					console.error(err.message);
					} else {
						if (rows.length > 0) {
							console.log(rows);
							res.status(200).json({rows});
							} else {
								res.status(401).json({ message: 'Não existem choques!' });
							}
						}
					});
				});
				app.get('/picos', (req, res) => { // Aqui realizo a consulta para obter todos os choques
					const get2 = 'SELECT * FROM picos';
					db.all(get2, [], (err, rows) => { 
					  if (err) {
							console.error(err.message);
						}
						res.json(rows);
						
						});
					});
				app.post('/picoVagao', (req, res) => {  // Aqui realizo a consulta para obter todos os choques a partir da placa de um vagão (tipo de filtragem)
					const select = 'SELECT * FROM picos WHERE placa = ?'; 
					db.all(select, [req.body.placa], (err, rows) => {
						if (err) {
							console.error(err.message);
						} else {
							if (rows.length > 0) {
								console.log(rows);
								res.status(200).json({rows});
							} else {
								res.status(401).json({ message: 'Login failed' });
							}
						}
					});
				});
				app.post('/picoEngate', (req, res) => {  // Aqui realizo a consulta para obter todos os choques a partir do tipo de choque (tipo de filtragem)
					const select = 'SELECT * FROM picos WHERE tipo_engate = ?';
					db.all(select, [req.body.tipo_choque], (err, rows) => {
						if (err) {
							console.error(err.message);
						} else {
							if (rows.length > 0) {
								console.log(rows);
								res.status(200).json({rows});
							} else {
								res.status(401).json({ message: 'Não existem choques!' });
							}
						}
					});
				});
				app.post('/picoViagem', (req, res) => {  // Aqui realizo a consulta para obter todos os choques a partir do tipo de viagem (tipo de filtragem)
					const select = 'SELECT * FROM picos WHERE tipo_viagem = ?';
					db.all(select, [req.body.tipo_choque], (err, rows) => {
						if (err) {
							console.error(err.message);
							} else {
								if (rows.length > 0) {
									console.log(rows);
									res.status(200).json({rows});
									} else {
										res.status(401).json({ message: 'Não existem choques!' });
									}
								}
							});
						});
				