// Activate jQuery
$(() => {
    console.log('JQ JS');

    // Click handlers.

    // Add task click handler.
    $('#addTask').on('click', addTaskButton);
    // Complete task button handler.

    // Delete task button handler.

    // END Click handlers

    // Preperations for page load.

    // Display items.
    callDisplay();
})


// START Functions

// Function for add task click handler.
function addTaskButton() {
    // Validate that name has been properly filled in.
    if (checkEmptyForms($('#nameIn').val())) {
        // TODO: Replace with sweet alert.
        // Program is mad at user. Quits.
        alert('Git gud fool!');
        return;
    }

    // Calling server to POST new task name.
    $.ajax({
        method: 'POST',
        url: '/task',
        data: {
            name: $('#nameIn').val()
        }
    }).then(response => {
        // Success, clear inputs and display new item.
        clearInput();
        callDisplay();
    }).catch(err => alert('Fail'));
}

function clearInput() {
    $('#nameIn').val('');
}

function callDisplay() {
    // Calling server to get objects    {id, name, complete}
    $.ajax({
        method: 'GET',
        url: '/task',

    }).then(response => {
        // Empty list before appendation.
        $('#taskTable').empty();

        // Appending to DOM.
        for (let item of response) {
            appendToTable(item);
        }
    })
}

function appendToTable(item) { // Should be an object {id, name, done, timestamp}
    // Variable holds string that, if item is complete, displays a checkmark emoji.
    let check = '';
    // String for constructor, it gets blanked out if the item is complete signaling it is done.
    let doItButtonConstructor = '<button class="doItButton">Done</button>';
    if (item.done === true) {
        // Modifications for already complete items.
        check = '✔️';
        doItButtonConstructor = '';
    }

    $('#taskTable').append(`
    <tr data-id="${item.id}">
        <td>${check}</td>
        <td>${item.name}</td>
        <td>${item.timestamp}</td>
        <td>${doItButtonConstructor}</td>
        <td><button class="deleteItem">Remove</button></td>
    </tr>`);
}
