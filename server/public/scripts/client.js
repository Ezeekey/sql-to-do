// A list of quotes for a very important feature for footer of page.
const quotes = [
    "Productivity is overrated. I'm working on perfecting the art of looking busy instead.",
    "My productivity is like a well-trained cat. It rarely shows up when I need it to.",
    "Productivity tip: Procrastinate today so you can panic tomorrow.",
    "I find that staring blankly into space really helps me visualize my productivity going down the drain.",
    "I'm not lazy; I'm just conserving energy for future bursts of unproductivity.",
    "My productivity levels are like a rollercoaster ride—lots of ups and downs, but mostly just going in circles.",
    "They say time is money, so I guess that makes me a millionaire in wasted hours.",
    "Productivity is a tricky thing. It's like trying to catch a unicorn—elusive and probably doesn't exist.",
    "I've mastered the art of pretending to be busy. I should win an Oscar for my performances.",
    "My productivity is like a rare species. Scientists have yet to discover any evidence of its existence."
]

const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];

// Variable to hold which direction the sort should be.
let reverse = false;

// Activate jQuery
$(() => {
    console.log('JQ JS');

    // Click handlers.

    // Add task click handler.
    $('#addTask').on('click', addTaskButton);
    // Complete task button handler.
    $('#taskTable').on('click', '.doItButton', doIt);
    // Delete task button handler.
    $('#taskTable').on('click', '.deleteItem', removeTask);
    // Click handler for reverse sort button.
    $('#reverseButton').on('click', changeSort)

    // END Click handlers

    // Preperations for page load.
    // Display selected quote.
    $('#importantQuote').text(selectedQuote);

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
        data: {reverse}
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
    let doItButtonConstructor = '<button class="doItButton  btn btn-success">Done</button>';
    // String for constructor of done class.
    let doneConstructor = '';
    // String for important spinny feature for complete tasks.
    let spinnyConstructor = '';
    if (item.done === true) {
        // Modifications for already complete items.
        check = '✔️';
        doItButtonConstructor = '';
        doneConstructor = 'class="done"';
        spinnyConstructor = 'class="spinnyCheck"'
    }

    $('#taskTable').append(`
    <tr ${doneConstructor} data-id="${item.id}">
        <td ${spinnyConstructor}>${check}</td>
        <td>${item.name}</td>
        <td>${item.timestamp}</td>
        <td>${doItButtonConstructor}</td>
        <td><button class="deleteItem btn btn-danger">Remove</button></td>
    </tr>`);
}


function doIt(event) {
    // Calling server to PUT to database.
    $.ajax({
        method: 'PUT',
        url: '/task/' + $(event.target).closest('tr').data('id')
    }).then(response => {
        // Display new table to show modifications.
        callDisplay();
    }).catch(err => {
        alert('Error doing it!');
    })
}


function removeTask(event) {
    // Summoning an alert to delete your task.
    swal({
        title: 'Sure about that?',
        text: 'Are you sure you want to remove this task from the list?',
        icon: 'warning',
        buttons: true,
        dangermode: true
    }).then(willDelete => {
        if (willDelete) {
            // Calling server to DELETE from database.
            $.ajax({
                method: 'DELETE',
                url: '/task/' + $(event.target).closest('tr').data('id')
            }).then(response => {
                // Display new table to show modifications.
                swal('Conglaturations! You don\'t need to do this anymore!');
                callDisplay();
            }).catch(err => {
                alert('Error doing it!');
            })
        } else {
            // No procrastinating here.
            swal('Well fine then!');
        }
    })
}

function changeSort() {
    // Changes reverse to the opposite of what it is, and changes text in button to what is appropriate.
    reverse = !reverse;
    reverse === true ? $('#reverseButton').text('Reverse') : $('#reverseButton').text('Forward');
    // Refresh display.
    callDisplay();
}
