const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require('mysql2');
const { connect } = require("http2");

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
    inquirer.prompt([
        {
            message: "What would you like to do?",
            name: "choice",
            choices: ["View All Employees", "Add Employees", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Exit"],
            type: "list"
        }
    ]).then(({choice}) => {
        if(choice == "View Departments") {
            viewDept()
        } else if(choice =="Add Department"){
            addDept()
        } else if(choice =="View All Employees"){
            viewAllEmployees()
        }else if(choice =="Add Employees"){
            addEmployees()
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

function addEmployees(){
    inquirer.prompt([
        {
            nessage: "What is the employee's first name?",
            name: "firstName",
            type: "input",
        },
        {
            nessage: "What is the employee's last name?",
            name: "lastName",
            type: "input",
        },
    ]).then(({firstName, lastName}) => {
        const queryString =`
        INSERT INTO employee (firstName, lastName)
        VALUES (?,?)`

        connection.query(queryString, [firstName, lastName], (err, data) => {
            if (err) throw err;
            console.log("Added")

            showFirstQuestion()

        })
    })
}
