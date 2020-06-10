const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let employees = [];

//callback function
const callback = cb => {

    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "Would you like to continue",
        choices: ["Yes", "No"],

    }).then(function (res4) {
        if (res4.choice === "No") {
            // console.log(render(employees))
            if (fs.existsSync("./output/team.html")) {
                fs.unlinkSync("./output/team.html");
            }

            fs.writeFile("./output/team.html", render(employees), function (err) {
                if (err) {
                    console.log(error);
                }
                else {
                    console.log("success");
                }
            })
            return;

        } else if (res4.choice === "Yes") {
            promptme(callback);
        }
    })
}

promptme(callback);

//user inputs prompted inside the callback function
function promptme(cb) {

    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "Enter employee name",
        //proper validating code for employee name
        validate: async (input) => {
            var letters = /^[A-Za-z]+$/;
            if (!input.match(letters)) {
                return "Incorrect input for employee name";
            }
            return true;
        }

    },
    {
        type: "input",
        name: "id",
        message: "Enter employee Id",
        validate: async (input) => {
            //proper validating code for employee id
            if (isNaN(input)) {
                return "Incorrect input for employee id";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: "Enter employee's valid email",
        //proper validating code for email 
        validate: async (input) => {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!input.match(mailformat)) {
                return "Incorrect input for employee email";
            }
            return true;
        }
    },
    {
        type: "list",
        name: "role",
        message: "Enter role of employee",
        choices: ["Manager", "Engineer", "Intern"],

    },
    ]).then(function (response) {
        //console.log(response);
        if (response.role === "Manager") {
            inquirer.prompt({
                type: "input",
                name: "OfficeNumber",
                message: "Enter office number",
                validate: async (input) => {
                    if (isNaN(input)) {
                        return "Incorrect input for office number";
                    }
                    return true;
                }
            }).then(function (res1) {
                let manager = new Manager(response.name, response.id, response.email, res1.OfficeNumber);
                employees.push(manager);
                cb();
            })
        } else if (response.role === "Engineer") {
            inquirer.prompt({
                type: "input",
                name: "GitHub",
                message: "Enter github username",

            }).then(function (res2) {
                let engineer = new Engineer(response.name, response.id, response.email, res2.GitHub);
                employees.push(engineer);
                cb();
            })
        } else if (response.role === "Intern") {
            inquirer.prompt({
                type: "input",
                name: "School",
                message: "Enter school",
            }).then(function (res3) {
                let intern = new Intern(response.name, response.id, response.email, res3.School);
                employees.push(intern);
                cb();
            })
        }

    })
}




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
