window.onload = function () {
  // Getting references to the name, date and cost inputs and expense container, as well as the table body
  var nameInput = $('#expense-name');
  var costInput = $('#expense-cost');
  var dateInput = $('#expense-date');
  var sum = 0;
  var arr = [];
  var monthCycle = 30;
  var annCycle = 365;
  var first = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var firstLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var leap = [2020, 2024, 2028];
  var expenseList = $('tbody');
  var expenseContainer = $('.expense-container');
  var stats = document.getElementById('statsList');
  var income = document.getElementById('');
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Expense
  $(document).on('submit', '#expense-form', handleExpenseFormSubmit);
  $(document).on('click', '.delete-expense', handleDeleteButtonPress);

  // Getting the initial list of expenses
  getExpenses();

  // A function to handle what happens when the form is submitted to create a new Expense
  function handleExpenseFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim() || !costInput.val().trim() || !dateInput.val().trim()) {
      return;
    }
    // Calling the upsertExpense function and passing in the value of the name input
    upsertExpense({
      name: nameInput
        .val()
        .trim(),
      cost: costInput
        .val()
        .trim(),
      date: dateInput
        .val()
        .trim()
    });
  }

  // A function for creating an expense. Calls getExpenses upon completion
  function upsertExpense(expenseData) {
    $.post('/api/expenses', expenseData)
      .then(getExpenses);
  }



  // Function for creating a new list row for expenses
  function createExpenseRow(expenseData) {
    console.log(expenseData);
    var newTr = $('<tr>');
    newTr.data('expense', expenseData);
    newTr.append('<td>' + expenseData.name + '</td>');
    newTr.append('<td>' + expenseData.cost + '</td>');
    newTr.append('<td>' + expenseData.date + '</td>');
    // newTr.append('<td># of posts will display when we learn joins in the next activity!</td>');
    // newTr.append('<td><a href=\'/blog?expense_id=' + expenseData.id + '\'>Go to Posts</a></td>');
    // newTr.append('<td><a href=\'/cms?expense_id=' + expenseData.id + '\'>Create a Post</a></td>');
    newTr.append('<td><a style=\'cursor:pointer;color:red\' class=\'delete-expense\'>Delete Expense</a></td>');
    return newTr;
  }

  // Function for retrieving expenses and getting them ready to be rendered to the page
  function getExpenses() {
    $.get('/api/expenses', function (data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        var expNum = data[i].cost;
        sum += parseInt(expNum);
        rowsToAdd.push(createExpenseRow(data[i]));
      }
      renderExpenseList(rowsToAdd);
      nameInput.val('');
      costInput.val('');
      dateInput.val('');
      console.log(sum);
      console.log(sum / monthCycle);
      console.log(sum % monthCycle);
    });
  }

  // A function for rendering the list of expenses to the page
  function renderExpenseList(rows) {
    expenseList.children().not(':last').remove();
    expenseContainer.children('.alert').remove();
    if (rows.length) {
      console.log(rows);
      expenseList.append(rows);
    } else {
      renderEmpty();
    }
  }
  $.ajax({
    url: 'https://data.oregon.gov/resource/yid5-c4eq.json',
    method: 'GET',
    datatype: 'json',
    data: {
      '$where': "start_date_time > '" + moment().subtract(31, 'days').format('YYYY-MM-DDT00:00:00') + "'",
      'city': 'Portland',
      '$order': 'start_date_time DESC'
    }
  }).done(function (response) {
    // Parse our events into an event object for FullCalendar
    var events = [];
    $.each(response, function (idx, e) {
      events.push({
        start: e.start_date_time,
        end: e.end_date_time,
        title: e.meeting_title,
        url: e.web_link
      });
    });
    $('#calendar').fullCalendar({
      events: events
    });
  });
  // Function for handling what to render when there are no expenses
  function renderEmpty() {
    var alertDiv = $('<div>');
    alertDiv.addClass('alert alert-danger');
    alertDiv.text('You must create an Expense before you can create a Post.');
    expenseContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent('td').parent('tr').data('expense');
    var id = listItemData.id;
    $.ajax({
      method: 'DELETE',
      url: '/api/expenses/' + id
    })
      .then(getExpenses);
  }
};

