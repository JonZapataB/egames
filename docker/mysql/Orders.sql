USE egames;
INSERT INTO orders (iduser, idstatus) VALUES
('1','1'),
('1','4'),
('2','2');

INSERT INTO orders_has_stock (idorder, quantity, idgame) VALUES
('1','1','18'),
('2','1','25'),
('3','4','8');

select * from users;