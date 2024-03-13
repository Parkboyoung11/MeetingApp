CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30),
  user VARCHAR(30),
  password VARCHAR(30),
  role SMALLINT
);

CREATE TABLE room (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);

CREATE TABLE meeting(
	id INT PRIMARY KEY AUTO_INCREMENT,
	booking_date DATE,
	start_time TIME,
	end_time TIME,
	description TEXT,
	organizer_id INT,
	room_id INT,
	FOREIGN KEY (organizer_id) REFERENCES user(id),
	FOREIGN KEY (room_id) REFERENCES room(id)
);

CREATE TABLE meeting_member (
  user_id INT,
  meeting_id INT,
  PRIMARY KEY (user_id, meeting_id),
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (meeting_id) REFERENCES meeting(id)
);

INSERT INTO user(name, user, password, role) VALUES("Admin", 'admin', 'admin', 1);
INSERT INTO user(name, user, password, role) VALUES("Member", 'member', 'member', 0);

INSERT INTO room(name) VALUES("Hoang Sa");
INSERT INTO room(name) VALUES("Truong Sa");

INSERT INTO meeting(booking_date, start_time, end_time, description, organizer_id, room_id) VALUES("2024-02-28", '2024-02-28 08:29:47', '2024-02-28 10:29:47', 'test meeting', 1, 1);
INSERT INTO meeting_member(user_id, meeting_id) VALUES(2, 1);

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;
