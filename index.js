const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require('mysql2');
let roleArr = [];
let empArr = [];

//create connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "work_db"
})

connection.connect(function(err) {
    if (err) throw err;
    showFirstQuestion()
})

function viewDept(){
    const queryString = `
    SELECT *
    FROM department`

    connection.query(queryString, (err, data) => {
        if(err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")

        showFirstQuestion()
    })
}

function addDept() {
    inquirer.prompt([
        {
            nessage: "What is the name of the new department?",
            name: "newDept"
        }
    ]).then(({newDept}) => {
        const queryString =`
        INSERT INTO department (name)
        VALUES (?)`

        connection.query(queryString, [newDept], (err, data) => {
            if (err) throw err;
            console.log("Added")

            showFirstQuestion()
        })
    })
}

function showFirstQuestion(){
    loadRoles()
    loadEmployees()
    inquirer.prompt([
        {
            message: "What would you like to do?",
            name: "choice",
            choices: ["View All Employees", "Add Employees", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Exit"],
            type: "list"
        }
    ]).then(({choice}) => {
        if(choice == "View All Departments") {
            viewDept()
        } else if(choice =="Add Department"){
            addDept()
        } else if(choice =="View All Employees"){
            viewAllEmployees()
        }else if(choice =="Add Employees"){
            addEmployees()
        }else if(choice =="Add Role"){
            addRole()
        }else if(choice =="Update Employee Role"){
            updateEmployeeRole()
        }else if (choice =="View All Roles"){
            viewAllRoles()
        }
    })
}

function viewAllEmployees(){
    const queryString = `
    SELECT *
    FROM employee`

    connection.query(queryString, (err, data) => {
        if(err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")

        showFirstQuestion()
    })

}

function loadRoles() {
    roleArr =[]
    connection.query("SELECT * FROM roles", (err, data) => {
        if(err) throw err;
        for (i=0;i< data.length; i ++){
            roleArr.push(data[i].role_title)
        }
    })
}

function loadEmployees(){
    empArr =[]
    connection.query("SELECT * FROM employee", (err, data) => {
        if(err) throw err;
        for (i=0;i< data.length; i ++){
            empArr.push(data[i].firstName + ' ' + data[i].lastName)
        }
        empArr.push('No Manager')
    })
}

function addEmployees(){
    inquirer.prompt([
        {
            message: "What is the employee's first name?",
            name: "firstName",
            type: "input",
        },
        {
            message: "What is the employee's last name?",
            name: "lastName",
            type: "input",
        },
        {
            message: "What is the employee's role?",
            name: "employeeRoles",
            type: "list",
            choices: roleArr
        },
        {
            message: "What is the employee's manager name?",
            name: "employeeManager",
            type: "list",
            choices: empArr
        },

    ]).then(({firstName, lastName, employeeRoles, employeeManager }) => {
        const roleIndex = roleArr.indexOf(employeeRoles) + 1;
        console.log(roleIndex)
        let empIndex;
        if(employeeManager === "No Manager"){
            empIndex = null
        }else{
            empIndex = empArr.indexOf(employeeManager) + 1;
        }

        const queryString =`
        INSERT INTO employee (firstName, lastName, role_id, manager_id)
        VALUES (?, ?, ?, ?);`

        connection.query(queryString, [firstName, lastName, roleIndex, empIndex], (err, data) => {
            if (err) throw err;
            console.log("Added to the database")

            showFirstQuestion()

        })
    })
}

function addRole(){
    inquirer.prompt([
        {
            nessage: "What is the name of the role?",
            name: "addRole",
            type: "input",
        },
        {
            nessage: "What is the salary of the role?",
            name: "roleSalary",
            type: "input",
        },
        {
            nessage: "What department does the role belong to?",
            name: "employeeRole",
            type: "checkbox",
            choices: ["Sales", "Engineering", "Finance", "Legal"]
        },

    ]).then(({addRole, roleSalary}) => {
        const queryString =
        `INSERT INTO roles (role_title, salary) 
        VALUES (?, ?)`

        connection.query(queryString, [addRole,roleSalary], (err, data) => {
            if (err) throw err;
            console.log("Added to the database")

            showFirstQuestion()
        })
    })
}

function updateEmployeeRole(){
    inquirer.prompt([
        {
            message: "Which employee's role do you want to update?",
            name: "updateEmployee",
            type: "list",
            choices: empArr
        },
        {
            message: "Which role do you want to assign the selected employee?",
            name: "employeeRoles",
            type: "list",
            choices: roleArr
        },
    ]).then(({updateEmployee, employeeRoles}) => {
        const roleIndex = roleArr.indexOf(employeeRoles) + 1;
        // console.log(roleIndex)
        const empIndex = empArr.indexOf(updateEmployee) + 1;
        const sqlString = `
        UPDATE employee
        SET role_id = ?
        WHERE employee.id = ?`
        connection.query(sqlString, [roleIndex, empIndex], (err, data) => {
            if(err) throw err;
            console.log("Updated!")
            showFirstQuestion()
        })
    })
}

function viewAllRoles(){
    const queryString = `
    SELECT *
    FROM roles`

    connection.query(queryString, (err, data) => {
        if(err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")

        showFirstQuestion()
    })
}

``