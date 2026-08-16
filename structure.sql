CREATE DATABASE IF NOT EXISTS lexstore_db;
USE lexstore_db;

CREATE TABLE categories (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE users (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255),
    category_id INT UNSIGNED,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE products (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    category_id INT UNSIGNED,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
