--
-- Alter owner of database
-- !%schema-manage apply-placement
--
GRANT ALL ON *.* TO '%USERLOGIN%'@'%REMOTEHOST%' IDENTIFIED BY '%DBPASSWORD%';
FLUSH PRIVILEGES;
