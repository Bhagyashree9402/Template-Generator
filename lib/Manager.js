// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee")
const renderer = require("../lib/htmlRenderer")

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    get getOfficeNumber() {
        return this.officeNumber;
    }

    get getRole() {
        return "Manager";
    }
}





module.exports = Manager;