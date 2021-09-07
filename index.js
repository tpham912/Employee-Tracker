const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "work_db"
})

connection.connect(function(err) {
    if (err) throw err;
    start()
})
// inquirer
//     .prompt([
//     {
//         type: "rawlist",
//         message: "What would you like to do?",
//         name: "options",
//         choices: ["View All Employees", "View All Departments", "View All Roles", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Quit"],
//     }, //if user chooses view all departments, present with a format table showing department names and department ids

//     //if user chooses view all roles, 
//         { 
//             type: "input",
//             message: "What's the job title?",
//             name: "title",
//         },
//         { 
//             type: "input",
//             message: "What's the role ID of this job?",
//             name: "roleId",
//         },
//         {
//             type: "list",
//             message: "Which department does the role belong to?",
//             name: "departmentRole",
//             choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
//         },
//         {
//             type: "input",
//             message: "What's the salary of the role?",
//             name: "salary",
//         },

//         {//
//             type: "input", //when user adds role
//             message: "What is the name of the role",
//             name: "roleName",
//             choices: ["Engineering", "Finance", "Legal", "Sales", "Services"],
//         },
//         {
//             type: "input",
//             message: "What's the employee first name?",
//             name: "firstName",
//         },
//         {
//             type: "input",
//             message: "What's the employee last name?",
//             name: "lastName",
//         }

//     ])
//     .then((response))
function viewDept(){
    const queryString = `
    SELECT *
    FROM department`

    connection.query(queryString, (err, data) => {
        if(err) throw err;
        console.log("\n")
        console.table(data)
        console.log("\n")

        start()
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
            console.log("added")

            start()
        })
    })
}

function start(){
    inquirer.prompt([
        {
            message: "What would you liike to do?",
            name: "choice",
            choices: ["View Departments", "Add Department", "Exit"],
            type: "list"
        }
    ]).then(({choice}) => {
        if(choice == "View Departments") {
            viewDept()
        } else if(choice =="Add Department"){
            addDept()
        }
    })
}