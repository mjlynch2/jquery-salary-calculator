$(document).ready(readyNow);

const listOfEmployees = [];
let totalMonthly = 0;

function readyNow(){
    console.log('in JS');
    $('#submitBtn').on('click', function(){
        validateInputs();
        handleSubmit();
    });
    $('#employeeInfo').on('click', '.deleteBtn', handleDelete);
    $('input').on('keyup', validateInputs);
}

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
    // $('#addEmployeeContainer>input').val('');
}

function handleDelete(){
    let el = $(this).parent().parent();
    calculateTotalMonthly(-(el.data("sal")));
    el.remove();
}

function calculateTotalMonthly(salary) {
    let monthlySal = (salary / 12);
    let el = $('#totalMonthly');
    totalMonthly += monthlySal;
    let numToDisplay = '$' + Number(totalMonthly).toFixed(2);
    el.empty();
    el.append(numToDisplay);
    checkTotal();
}

function validateInputs(){
    let valid = true;
    $('input').each(function () {
        if ($(this).val() === "") {
            valid = false;
        }
    });
    if(!valid) {
        $(this).addClass('invalid');
        $('#submitBtn').prop('disabled', true);
    } else {
        $(this).removeClass('invalid');
        $('#submitBtn').prop('disabled', false);
    }
}

function checkTotal(){
    if(totalMonthly > 20000){
        $('#totalMonthly').addClass('invalid');
    } else {
        $('#totalMonthly').removeClass('invalid');
    }
}

function Employee(_firstName, _lastName, _id, _title, _salary){
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.id = _id;
    this.title = _title;
    this.salary = _salary;
}