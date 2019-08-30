$(document).ready(readyNow);

const listOfEmployees = [];

function readyNow(){
    console.log('in JS');
    $('#submitBtn').on('click', handleSubmit);
}

function appendToDom(){
    $('.employeeInfoRow').empty();
    for (employee of listOfEmployees){
        let row = $("<tr class='employeeInfoRow></tr>");
        let $data = $(`
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.id}</td>
            <td>${employee.title}</td>
            <td>${employee.salary}</td>
            <td>Delete Button Placeholder</td>
        `);
        row.append($data);
    }
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
    appendToDom();
}


function Employee(_firstName, _lastName, _id, _title, _salary){
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.id = _id;
    this.title = _title;
    this.salary = _salary;
}