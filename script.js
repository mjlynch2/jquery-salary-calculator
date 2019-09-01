$(document).ready(readyNow);
// array of employees. I dont end up using this for the assignment, but it seems like a good idea to hang on to them
const listOfEmployees = [];
// total monthly expenses based on annual salary of each employee
let totalMonthly = 0;

// initialize our buttons, and check inputs on keyup
function readyNow(){
    $('input').keyup(validateInputs);
    $('#submitBtn').on('click', handleSubmit);
    $('#employeeInfo').on('click', '.deleteBtn', handleDelete);
}

// function gets an employee object, then writes the info to the DOM
function appendToDom(employee){
    let deleteBtn = `<button class='deleteBtn'>Delete</button>`;
    let $td = $(`<tr data-sal=${employee.salary}>
        <td>${employee.firstName}</td>
        <td>${employee.lastName}</td>
        <td>${employee.id}</td>
        <td>${employee.title}</td>
        <td>$${employee.salary}</td>
        <td>${deleteBtn}</td>
    </tr>`);
    $('#employeeInfo').append($td);
}

// Function runs when submit is clicked. It gets the values from the inputs and sends them to the Employee constructor. 
// Then it pushes that new employee into the array of employees, and calls the appendToDom function on the employee
// Finally, it calls the calculateTotalMonthly function on the employee's salary, and clears the inputs
function handleSubmit(){
    let firstName = $('#firstNameInput').val();
    let lastName = $('#lastNameInput').val();
    let id = $('#idInput').val();
    let title = $('#titleInput').val();
    let salary = Number($('#salaryInput').val()).toFixed(2);
    let newEmployee = new Employee(firstName, lastName, id, title, salary);
    listOfEmployees.push(newEmployee);
    appendToDom(newEmployee);
    calculateTotalMonthly(salary);
    $('input').val('').keyup();
}

// When delete is clicked, this function will grab the employee salary data stored in the button's row, 
// call the calculateTotalMonthly on the negative of that value(since we want to remove it), and then delete the row.
function handleDelete(){
    let el = $(this).parent().parent();
    calculateTotalMonthly(-(el.data("sal")));
    el.remove();
}

// Given some salary value, divide by 12 to get the monthly amount, update the total, make it look like a dollar amount, then append it to the dom
// Then call the checkTotal function to see if it's over a given amount
function calculateTotalMonthly(salary) {
    let monthlySal = (salary / 12);
    let el = $('#totalMonthly');
    totalMonthly += monthlySal;
    if (totalMonthly < 0) {
        totalMonthly = 0;
    };
    let numToDisplay = '$' + Number(totalMonthly).toFixed(2);
    el.empty();
    el.append(numToDisplay);
    checkTotal();
}

// Disable the submit button if any of the inputs are empty
function validateInputs(){
    let valid = true;
    $('input').each(function () {
        if ($(this).val() === "") {
            valid = false;
        }
    });
    $("#submitBtn").prop("disabled", !valid);
}

// Give the total a red background if it's above a certain amount, or get rid of it if it's below.
function checkTotal(){
    if(totalMonthly > 20000){
        $('#totalMonthly').addClass('invalid');
    } else {
        $('#totalMonthly').removeClass('invalid');
    }
}

// Employee constructor
function Employee(_firstName, _lastName, _id, _title, _salary){
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.id = _id;
    this.title = _title;
    this.salary = _salary;
}