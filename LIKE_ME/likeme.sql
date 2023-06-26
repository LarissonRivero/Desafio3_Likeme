CREATE DATABASE likeme;

CREATE TABLE posts (
	id serial primary key,
	usuario varchar(25), 
	url varchar(1000), 
	descripcion varchar(255), 
	likes INT
);

select * from posts;