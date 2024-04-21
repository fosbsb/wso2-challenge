### Databases Scripts

````
CREATE TABLE citizen (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  phone varchar(20) NOT NULL,
  country varchar(3) NOT NULL,
  document_number varchar(30) NOT NULL,
  attachment text,
  profile enum('ADMIN','CITIZEN','PROVIDER') NOT NULL DEFAULT 'CITIZEN',
  active tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  UNIQUE KEY citizen_unique ('email')
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

````

### Insert data samples

````
INSERT INTO citizen (id, name, email, phone, country, document_number, attachment, profile, active) VALUES(1, 'Flaviano O. Silva', 'fosbsb@gmail.com', '+5561986235586', 'br', '72240822104', NULL, 'ADMIN', 1);
INSERT INTO citizen (id, name, email, phone, country, document_number, attachment, profile, active) VALUES(2, 'Janaína de Paula Campos', 'janaina.p.c@hotmail.com', '+5561986235587', 'br', '72106107153', NULL, 'CITIZEN', 0);
INSERT INTO citizen (id, name, email, phone, country, document_number, attachment, profile, active) VALUES(3, 'Sabrina de Paula Oliveira', 'sabrinatatapaula@gmail.com', '+556199999999', 'br', '08410000000', NULL, 'CITIZEN', 0);
INSERT INTO citizen (id, name, email, phone, country, document_number, attachment, profile, active) VALUES(4, 'Samantha de Paula Oliveira', 'spoliveira2014@gmail.com', '+556199999999', 'br', '08420000000', NULL, 'CITIZEN', 0);
````