
CREATE TABLE student
(  
	id numeric(5,0),  
	firstname character varying,  
	surname character varying,  
	birthday date
)	


ALTER TABLE student 
   ADD  std_code  character (10);

ALTER TABLE student 
   ALTER  Column std_code  character (50);

ALTER TABLE student 
	DROP  std_code;


DROP TABLE PRODUCT;
DROP TABLE EMPLOYEE;
DROP TABLE PROJECT;

SELECT column1, column2....columnN
FROM   table_name;

SELECT * FROM cm_vill_4326
SELECT vill_code FROM cm_vill_4326


SELECT column1, column2....columnN
FROM   table_name
WHERE  CONDITION;
 
SELECT * FROM cm_vill_4326 WHERE amp_code = '5001';
 

SELECT column1, column2....columnN
FROM   table_name
WHERE  column_name IN (val-1, val-2,...val-N);
 
SELECT tam_name, areashape FROM cm_tam_4326
WHERE tam_name IN ('ริมเหนือ','หางดง')


SELECT column1, column2....columnN
FROM   table_name
WHERE  column_name BETWEEN val-1 AND val-2;

SELECT tam_name, areashape FROM cm_tam_4326
WHERE areashape BETWEEN 5000000 AND 6000000

การเลือกข้อมูลโดยใช้ LIKE Clause
SELECT column1, column2....columnN
FROM   table_name
WHERE  column_name LIKE { PATTERN };

SELECT tam_name, areashape FROM cm_tam_4326
WHERE tam_name LIKE '%ก%'

การแสดงข้อมูลโดยใช้ ORDER BY Clause
SELECT column1, column2....columnN
FROM   table_name
WHERE  CONDITION
ORDER BY column_name {ASC|DESC};

SELECT tam_name, ROUND(areashape / 1000000, 2) as sqkm FROM cm_tam_4326
WHERE areashape BETWEEN 5000000 AND 6000000 
ORDER BY areashape

การแสดงข้อมูลโดยใช้ GROUP BY Clause
SELECT SUM(column_name)
FROM   table_name
WHERE  CONDITION
GROUP BY column_name;

SELECT amp_name,sum(areashape) as sqkm FROM cm_tam_4326
WHERE areashape BETWEEN 5000000 AND 6000000 
GROUP BY amp_name

การใช้ aggregate function
SELECT count(amp_name) as count FROM cm_tam_4326
SELECT AVG(shapearea) as count FROM cm_tam_4326
SELECT MAX (shapearea) as max FROM cm_tam_4326
SELECT MIN (shapearea) as max FROM cm_tam_4326


INSERT INTO table_name (column1,column2,column3,...) VALUES (value1,value2,value3,...);
Example
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country) VALUES ('Cardinal','Tom B. Erichsen','Skagen 21','Stavanger','4006','Norway');

DELETE FROM table_name WHERE some_column=some_value;

UPDATE table_name SET column1=value1,column2=value2,... WHERE some_column=some_value;


UPDATE Customers SET ContactName='Alfred Schmidt', City='Hamburg' WHERE CustomerName='Alfreds Futterkiste';


DELETE FROM table_name WHERE some_column=some_value;

DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste' AND ContactName='Maria Anders';


SELECT column_name(s) FROM table1 INNER JOIN table2 ON table1.column_name=table2.column_name;

SELECT column_name(s) FROM table1 JOIN table2 ON table1.column_name=table2.column_name;

Example
SELECT Customers.CustomerName, Orders.OrderID FROM Customers INNER JOIN Orders ON Customers.CustomerID=Orders.CustomerID ORDER BY Customers.CustomerName;

SELECT column_name(s) FROM table1 LEFT JOIN table2 ON table1.column_name=table2.column_name;

SELECT Customers.CustomerName, Orders.OrderID FROM Customers LEFT JOIN Orders ON Customers.CustomerID=Orders.CustomerID ORDER BY Customers.CustomerName;

SELECT column_name(s) FROM table1 FULL OUTER JOIN table2 ON table1.column_name=table2.column_name;

GRANT ALL ON employees TO smithj;
GRANT SELECT, INSERT, UPDATE, DELETE ON employees TO smithj;


CREATE TABLE geometries (name varchar, geom geometry);
INSERT INTO geometries VALUES
('Point', 'POINT(0 0)'),
('Linestring', 'LINESTRING(0 0, 1 1, 2 1, 2 2)'),
('Polygon', 'POLYGON((0 0, 1 0, 1 1, 0 1, 0 0))'),
('PolygonWithHole', 'POLYGON((0 0, 10 0, 10 10, 0 10, 0 0),(1 1, 1 2, 2 2, 2 1, 1 1))'),
('Collection', 'GEOMETRYCOLLECTION(POINT(2 0),POLYGON((0 0, 1 0, 1 1, 0 1, 0 0)))');
SELECT name, ST_AsText(geom) FROM geometries;


SELECT ST_X(geom), ST_Y(geom) FROM geometries WHERE name = 'Point';

SELECT ST_Area(geom) FROM geometries WHERE name LIKE 'Polygon%';

