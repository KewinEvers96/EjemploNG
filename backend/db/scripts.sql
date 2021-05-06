CREATE TABLE empleado(
    id SERIAL PRIMARY KEY,
    nombres VARCHAR(200) NOT NULL,
    apellidos VARCHAR(200) NOT NULL,
    sueldo NUMERIC(10, 2) NOT NULL,
    imageUrl VARCHAR
);

CREATE TABLE producto(
    codigo SERIAL PRIMARY KEY,
    nombre VARCHAR NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    cantidad INTEGER NOT NULL
);

CREATE TABLE venta(
    codigo SERIAL PRIMARY KEY,
    empleado_id SERIAL REFERENCES empleado(id),
    producto_cod SERIAL REFERENCES producto(codigo)
);