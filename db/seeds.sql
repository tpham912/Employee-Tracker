USE work_db

INSERT INTO department (name)
VALUES
    ( "Sales"),
    ( "Engineering"),
    ( "Finance"),
    ( "Legal");

INSERT INTO roles (role_title, salary, department_id)
VALUES
    ( "Sales Lead", 100.00, 1),
    ( "Salesperson", 80.00, 1),
    ( "Lead Engineer", 150.00, 2),
    ( "Software Engineer", 120.00, 2),
    ( "Account Manager", 160.00, 3),
    ( "Accountant", 125.00, 3),
    ( "Legal Team Lead", 250.00, 4),
    ( "Lawyer", 190.00, 4);

-- INSER INTO manager (name)
-- VALUES
--     ("John Doe")
--     ("Ashley Rodriguez")
--     ("Kunal Singh")
--     ("Sarah Lourd")

INSERT INTO employee (firstName, lastName, role_id, manager_id)
VALUES
    ( "John", "Doe", 1, NULL),
    ( "Mike", "Chan", 2, 1),
    ( "Ashley", "Rodriguez", 3, NULL),
    ( "Kevin", "Tupik", 4, 3),
    ( "Kunal", "Singh",5 , NULL),
    ( "Malia", "Brown",6, 5),
    ( "Sarah", "Lourd",7, NULL),
    ( "Tom", "Allen",8, 7);
    
