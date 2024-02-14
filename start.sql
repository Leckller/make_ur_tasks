USE tasksDB;

CREATE DATABASE tasksDB;

CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT, task_name VARCHAR(20) NOT NULL, started DATE DEFAULT(CURRENT_TIMESTAMP)
);