drop database DBProyecto;
create database DBProyecto;
use DBProyecto;

CREATE TABLE Pais
(
  idPais INT NOT NULL auto_increment,
  descripcion VARCHAR(250) ,
  idUsuarioRegistro INT ,
  fechaRegistro DATE ,
  idUsuarioActualizacion INT ,
  fechaActualizacion DATE ,
  PRIMARY KEY (idPais)
);

CREATE TABLE Departamento
(
  idDepartamento INT NOT NULL auto_increment,
  descripcion VARCHAR(250) ,
  idUsuarioRegistro INT ,
  fechaRegistro DATE ,
  idUsuarioActualizacion INT ,
  fechaActualizacion DATE ,
  idPais INT ,
  PRIMARY KEY (idDepartamento),
  FOREIGN KEY (idPais) REFERENCES Pais(idPais)
);

CREATE TABLE TipoEmpresa
(
  idTipoEmpresa INT NOT NULL auto_increment,
  idUsuarioRegistro INT ,
  fechaRegistro DATE ,
  idUsuarioActualizacion INT ,
  fechaActualizacion DATE ,
  idDepartamento INT,
  PRIMARY KEY (idTipoEmpresa),
  FOREIGN KEY (idDepartamento) REFERENCES Departamento(idDepartamento)
);

CREATE TABLE Empresa
(
  idEmpresa INT NOT NULL auto_increment,
  nombre varchar(255),
  direccion VARCHAR(255) ,
  numeroTelefono VARCHAR(25),
  correo VARCHAR(255) ,
  idUsuarioRegistro INT ,
  fechaRegistro DATE ,
  idUsuarioActualizacion INT ,
  fechaActualizacion DATE ,
  estado INT ,
  idTipoEmpresa INT ,
  PRIMARY KEY (idEmpresa),
  FOREIGN KEY (idTipoEmpresa) REFERENCES TipoEmpresa(idTipoEmpresa)
);
insert into Empresa(nombre,direccion,numeroTelefono,correo) values ('Coderland By Dominion','Cuidad del saber, Panama',50735202402,'douglaslemusm@hotmail.es');

drop table Empresa;

CREATE TABLE Servicios
(
  idServicio INT NOT NULL auto_increment,
  Descripcion VARCHAR(255) ,
  costoServicio INT ,
  idUsuarioRegistro INT ,
  fechaRegistro DATE ,
  idUsuarioActualizacion INT ,
  fechaActualizacion DATE ,
  PRIMARY KEY (idServicio)
);


insert into Servicios (Descripcion,costoServicio) values ('Servicio de Mensajeria',500);

CREATE TABLE RutasdeTransporte
(
  idRuta INT NOT NULL auto_increment,
  descripcion VARCHAR(255) ,
  direccionOrigen VARCHAR(255) ,
  direcciondestino VARCHAR(255) ,
  idMaquina INT ,
  idUsuarioRegistro INT ,
  fechaRegistro DATE ,
  idUsuarioActualizacion INT ,
  fechaActualizacion DATE ,
  PRIMARY KEY (idRuta)
);

insert into RutasdeTransporte (descripcion,direccionOrigen,direcciondestino,idMaquina) values ('Envio de Materia Prima Peru','Guatemala, Guatemala','Lima, Peru',2); 

CREATE TABLE Cliente
(
  idCliente INT NOT NULL auto_increment,
  nombre VARCHAR(255) ,
  apellido VARCHAR(255) ,
  direccion VARCHAR(255) ,
  nit  VARCHAR(255) ,
  telefono VARCHAR(20) ,
  email VARCHAR(255) ,
  idUsuarioRegistro INT ,
  fechaRegistro DATE ,
  idUsuarioActualizacion INT ,
  fechaActualizacion DATE ,
  PRIMARY KEY (idCliente)
);

drop table Cliente;

insert into Cliente (nombre,apellido,direccion,nit,telefono,email)values ('Douglas','Lemus','Cuidad','7402588-0','35202402','douglaslemusm@gmail.com');

CREATE TABLE Factura
(
  idFactura INT NOT NULL auto_increment,
  idCliente INT ,
  fecha DATE ,
  metodoPago INT ,
  idSucursal INT ,
  idUsuarioRegistro INT ,
  fechaRegistro DATE ,
  idUsuarioActualizacion INT ,
  fechaActualizacion DATE ,
  PRIMARY KEY (idFactura)
);

CREATE TABLE MetodoPago
(
  metodoPago INT NOT NULL auto_increment,
  nombre VARCHAR(255) ,
  otrosDetalles VARCHAR(255) ,
  idUsuarioRegistro INT ,
  fechaRegistro DATE ,
  idUsuarioActualizacion INT ,
  fechaActualizacion DATE ,
  PRIMARY KEY (metodoPago)
);

CREATE TABLE Detalle
(
  idDetalle INT NOT NULL auto_increment,
  idFactura INT ,
  idProducto INT ,
  cantidad INT ,
  precio INT ,
  idServicio INT ,
  idMaquina INT ,
  idProveedor INT ,
  idUsuarioRegistro INT ,
  fechaRegistro DATE ,
  idUsuarioActualizacion INT ,
  fechaActualizacion DATE ,
  PRIMARY KEY (idDetalle),
  FOREIGN KEY (idFactura) REFERENCES Factura(idFactura)
);

CREATE TABLE contactoEmergencia
(
  idContactoEmergencia INT NOT NULL auto_increment,
  nombre VARCHAR(255) ,
  apellido VARCHAR(255) ,
  parentesco VARCHAR(255) ,
  numeroTelefono VARCHAR(20) ,
  idUsuarioRegistro INT ,
  fechaRegistro DATE ,
  idUsuarioActualizacion INT ,
  fechaActualizacion DATE ,
  PRIMARY KEY (idContactoEmergencia)
);



insert into contactoEmergencia (nombre,apellido,parentesco,numeroTelefono)values('Eduardo','Lemus','Padre','57049733');
drop table Proveedor;
CREATE TABLE Proveedor
(
  idProveedor INT NOT NULL auto_increment,
  descripcion VARCHAR(255) ,
  numeroTelefono VARCHAR(20) ,
  correoelectronico VARCHAR(255) ,
  personacontacto VARCHAR(255) ,
  logo VARCHAR(255),
  idSucursal INT ,
  idUsuarioRegistro INT ,
  fechaRegistro DATE ,
  idUsuarioActualizacion INT ,
  fechaActualizacion DATE ,
  PRIMARY KEY (idProveedor)
);
alter table Proveedor add  logo VARCHAR(255) ;
select * from Proveedor;

update Proveedor set logo = 'https://w7.pngwing.com/pngs/839/483/png-transparent-john-deere-logo-john-deere-decal-sticker-logo-tractor-baby-apparel-antler-leaf-grass-thumbnail.png' where idProveedor = 2;
insert into Proveedor (descripcion,idSucursal,idUsuarioRegistro,fechaRegistro,idUsuarioActualizacion,fechaActualizacion) values ('Vendedor de Maquinas caterpillar',1,1,sysdate(),1,sysdate());

CREATE TABLE Sucursal
(
  idSucursal INT NOT NULL auto_increment,
  descripcion VARCHAR(255) ,
  direccion VARCHAR(255) ,
  idGerente INT ,
  idUsuarioRegistro INT ,
  fechaRegistro DATE ,
  idUsuarioActualizacion INT ,
  fechaActualizacion DATE ,
  idDetalle INT ,
  PRIMARY KEY (idSucursal),
  FOREIGN KEY (idDetalle) REFERENCES Detalle(idDetalle)
);

CREATE TABLE MateriaPrima
(
  idUsuarioRegistro INT NOT NULL,
  fechaRegistro DATE ,
  idUsuarioActualizacion INT ,
  fechaActualizacion DATE ,
  estado INT ,
  idMateria INT ,
  idProveedor INT ,
  PRIMARY KEY (idMateria),
  FOREIGN KEY (idProveedor) REFERENCES Proveedor(idProveedor)
);

CREATE TABLE Producto
(
  idProcducto INT NOT NULL auto_increment,
  descripcion VARCHAR(255),
  imagen VARCHAR(255),
  cantidadDisponible INT,
  costoUnitario INT,
  fechaCreacion DATE,
  fechaModificacion DATE ,
  idUsuarioRegistro INT ,
  fechaRegistro INT ,
  idUsuarioActualizacion INT ,
  fechaActualizacion INT ,
  estado INT ,
  PRIMARY KEY (idProcducto)
  
);

CREATE TABLE Maquinas
(
  idMaquina INT NOT NULL auto_increment,
  descripcion VARCHAR(255) ,
  logo VARCHAR(255) ,
  costoHora INT ,
  cantidadDisponible INT ,
  costoHoraOperador INT ,
  horasdeUso INT ,
  idUsuarioRegistro INT,
  fechaRegistro DATE,
  idUsuarioActualizacion INT,
  fechaActualizacion DATE,
  estado INT ,
  costoVenta INT ,
  idProveedor INT ,
  PRIMARY KEY (idMaquina),
  FOREIGN KEY (idProveedor) REFERENCES Proveedor(idProveedor)
);

select * from maquinas;

insert into Maquinas 
(descripcion,logo,costoHora,cantidadDisponible,costoHoraOperador,horasdeUso,idUsuarioRegistro,fechaRegistro,idUsuarioActualizacion,fechaActualizacion,estado,costoVenta,idProveedor)
 values('Maquina caterpillar','https://cdn.motor1.com/images/mgl/OXWMy/s1/95-anos-de-caterpillar.jpg',5,5,5,2,1,sysdate(),1,sysdate(),1,10000,1);

drop table Maquinas;

CREATE TABLE Empleados
(
  idEmpleado INT NOT NULL auto_increment,
  idRol INT NOT NULL,
  nombre VARCHAR(255) ,
  apellido VARCHAR(255) ,
  numeroTelefono INT ,
  tipoDeSangre VARCHAR(5) ,
  idUsuarioRegistro INT,
  fotografia VARCHAR(255) ,
  fechaRegistro DATE,
  idUsuarioActualizacion INT,
  fechaActualizacion DATE,
  idContactoEmergencia INT,
  idJefe INT,
  PRIMARY KEY (idEmpleado)
);

insert into empleados (idRol,nombre,apellido,numeroTelefono,tipoDeSangre,idContactoEmergencia) values (1,'Douglas Eduardo','Lemus Mancilla',35202402,'A+',1);
commit;
drop table contactoEmergencia;
drop table Empleados;
drop table rol;
CREATE TABLE Rol
(
  idRol INT NOT NULL auto_increment,
  descripcionPuesto VARCHAR(255) ,
  accesos INT ,
  idUsuarioRegistro INT,
  fechaRegistro DATE,
  idUsuarioActualizacion INT,
  fechaActualizacion DATE,
  PRIMARY KEY (idRol)
);
insert into Rol (descripcionPuesto,accesos)value('Empleado',1);

create table users (
	idUser INT auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
	fotografia VARCHAR(255),
    primary key (idUser )
);

select * from users;