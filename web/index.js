const express = require('express');
const mysql = require('mysql');
const bodyParse = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParse.json());

const db = mysql.createConnection({
	host: process.env.MYSQL_HOST || 'localhost',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'password',
	database: process.env.MYSQL_DATABASE || 'test'
});

db.connect((err) => {
	if(err){
		console.log(err);
	}
	else{
		console.log('Connected to the database');
	}
});

// app.post('/login', (req, res) => {
// 	const {username, password} = req.body;
// 	db.query('SELECT * FROM user WHERE user = ? AND password = ?', [username, password], (err, rows) => {
// 		if(err){
// 			res.json({
// 				success: false,
// 				err
// 				});
// 		}
// 		else{
// 			if(rows.length > 0){
// 				res.json({
// 					success: true,
// 					rows
// 					});
// 			}
// 			else{
// 				res.json({
// 					success: false,
// 					message: 'Invalid username or password'
// 					});
// 			}
// 		}
// 	});
// });

app.get('/meeting', (req, res) => {
	db.query(`
	  SELECT meeting.*, user.name as organizer_name, room.name as room_name 
	  FROM meeting 
	  LEFT JOIN user ON meeting.organizer_id = user.id
	  LEFT JOIN room ON meeting.room_id = room.id
	`, (err, rows) => {
	  if(err){
		res.json({
		  success: false,
		  err
		});
	  }
	  else{
		res.json({
		  success: true,
		  data: rows
		});
	  }
	});
  });

app.post('/meeting', (req, res) => {
	const { booking_date, start_time, end_time, description, organizer_id, room_id } = req.body;
	// console.log(req.body);
	// console.log(booking_date);
	const query = `
		INSERT INTO meeting (booking_date, start_time, end_time, description, organizer_id, room_id) 
		VALUES (?, ?, ?, ?, ?, ?)
	`;
	db.query(query, [booking_date, start_time, end_time, description, organizer_id, room_id], (err, result) => {
		if (err) {
			res.json({
				success: false,
				err
			});
		} else {
			res.json({
				success: true,
				message: 'Meeting created successfully',
				data: result
			});
		}
	});
});
// app.get('/', (req, res) => {
// 	connection.query('SELECT * FROM user' , (err, rows) => {
// 		if(err){
// 			res.json({
// 				success: false,
// 				err
// 				});
// 		}
// 		else{
// 			res.json({
// 				success: true,
// 				rows
// 				});
// 		}
// 	});
// });

app.listen(5000, () => console.log('listining on port 5000'));
