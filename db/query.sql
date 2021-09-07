SELECT employee.firstName, employee.lastName, role_title, salary, name AS department, CONCAT(manager.firstName, ' ', manager.lastName) AS manager FROM employee 
JOIN roles ON role_id = roles.id 
JOIN department ON department_id = department.id 
LEFT JOIN employee manager on manager.id = employee.manager_id;