// Activate jQuery
$(() => {
    console.log('JQ JS');

    // Click handlers.

    // Add task click handler.
    $('#addTask').on('click', addTaskButton);
    // Complete task button handler.

    // Delete task button handler.

})


// START Functions

// Function for add task click handler.
function addTaskButton() {
    // Validate that name has been properly filled in.
    if(checkEmptyForms($('#nameIn').val())){
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
        // TODO: Add display function.
    }).catch(err => alert('Fail'));
}

function clearInput() {
    $('#nameIn').val('');
}
