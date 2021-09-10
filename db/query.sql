SELECT employee.firstName, employee.lastName, role_title, salary, name AS department, CONCAT(manager.firstName, ' ', manager.lastName) AS manager FROM employee 
JOIN roles ON role_id = roles.id 
JOIN department ON department_id = department.id 
LEFT JOIN employee manager on manager.id = employee.manager_id;


SELECT manager_id, CONCAT(employee.firstName, ' ', employee.lastName) AS manager FROM employee
JOIN employee ON employee.role_id = roles.id 
WHERE manager_id = NULL;

