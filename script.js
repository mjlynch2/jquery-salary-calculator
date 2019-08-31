$(document).ready(readyNow);

const listOfEmployees = [];
let totalMonthly = 0;



function readyNow(){
    console.log('in JS');
    $('#submitBtn').on('click', handleSubmit);
}

function appendToDom(employee){
    let deleteBtn = `<button class='deleteBtn'>Delete</button>`;
    let $data = $(`<tr>
        <td>${employee.firstName}</td>
        <td>${employee.lastName}</td>
        <td>${employee.id}</td>
        <td>${employee.title}</td>
        <td>${employee.salary}</td>
        <td>${deleteBtn}</td>
    </tr>`);
    $('#employeeInfo').append($data);
    $('.deleteBtn').on('click', handleDelete);
}

function handleSubmit(){
    console.log('clicked');
    let firstName = $('#firstNameInput').val();
    let lastName = $('#lastNameInput').val();
    let id = $('#idInput').val();
    let title = $('#titleInput').val();
    let salary = $('#salaryInput').val();
    let newEmployee = new Employee(firstName, lastName, id, title, salary);
    listOfEmployees.push(newEmployee);
    appendToDom(newEmployee);
    calculateTotalMonthly(salary);
    // $('#addEmployeeContainer>input').val('');
}

function handleDelete(){
    $(this).parent().parent().remove();
}

function calculateTotalMonthly(salary) {
    let monthlySal = (salary / 12);
    let el = $('#totalMonthly');
    totalMonthly += monthlySal;
    el.empty();
    el.append(totalMonthly);
}

function Employee(_firstName, _lastName, _id, _title, _salary){
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.id = _id;
    this.title = _title;
    this.salary = _salary;
}