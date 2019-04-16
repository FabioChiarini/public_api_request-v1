/* Treehouse FSJS Techdegree
 * Project 5 - Public API Request
 */

 //global variable used to store the initial employee list
 var immutableUsersList;

/* Function to:
1) Create the mockup for the modal employees
2) call the function to add click event to next/prev buttons */
function createModalMockup (randomUser, users, index) {
  let modalEmployee = '';
  modalEmployee = '<div class="modal-container"><div class="modal">';
  modalEmployee += '<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>';
  modalEmployee += '<div class="modal-info-container">';
  modalEmployee += '<img class="modal-img" src="'+ randomUser.picture.large +'" alt="profile picture">';
  modalEmployee += '<h3 id="name" class="modal-name cap">' + randomUser.name.first + ' ' + randomUser.name.last + '</h3>';
  modalEmployee += '<p class="modal-text">' + randomUser.email + '</p>';
  modalEmployee += '<p class="modal-text cap">' + randomUser.location.city + '</p><hr>';
  modalEmployee += '<p class="modal-text">' + randomUser.cell + '</p>';
  modalEmployee += '<p class="modal-text">' + randomUser.location.street + ', ' + randomUser.location.city + ', ' + randomUser.location.postcode + ', ' + randomUser.location.state + '</p>';
  modalEmployee += '<p class="modal-text">Birthday: ' + randomUser.dob.date.substring(0,10) + '</p></div></div>';
  modalEmployee += '<div class="modal-btn-container">';
  modalEmployee += '<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>';
  modalEmployee += '<button type="button" id="modal-next" class="modal-next btn">Next</button>';
  modalEmployee += '</div></div>';
  $('.gallery').append(modalEmployee);

  //activate the closing button on the modal element
  $('#modal-close-btn').click(function() {
    $('.modal-container').remove();
  });
  //getUpdatedIndex(randomUser)
  nextPrevButtons(users, index);
}

/*function that return a subset of the employee list composed only by the
employee that are visible on the page after a search*/
function getVisibleEmployees () {
  let visibles = [];
  immutableUsersList.forEach(function (employee) {
    $('.card:visible').each(function (){
      //check if employee username matches one of the visible usernames
      if($(this)[0].id === employee.login.username) {
        visibles.push(employee);
      }
    });
  });
  return visibles;
}


//function to add click events to next/prev buttons
function nextPrevButtons(users, index) {
  console.log(index);
  let visibles = getVisibleEmployees();
  console.log(visibles);
  //get the numbers of cards the search has returned
  let numberOfEmployees = $('.card:visible').length;
  employeeUsername =  users[index].login.username;
  $('.card:visible').each(function (i){
    if($(this)[0].id === employeeUsername) {
      index = i;
    }
  });
  console.log('UPDATED: ' + index);
  $('#modal-prev').click(function() {
    $('.modal-container').remove();
    if (index - 1 < 0) {
      createModalMockup(visibles[numberOfEmployees-1], visibles, numberOfEmployees-1);
    }
    else {
      createModalMockup(visibles[index-1], visibles, (index-1));
    }
  });
  $('#modal-next').click(function() {
    $('.modal-container').remove();
    if (index + 1 > numberOfEmployees-1) {
      createModalMockup(visibles[0], visibles, 0);
    }
    else {
      createModalMockup(visibles[index+1], visibles, (index+1));
    }
  });
  }


//function to display only the employees that match the searched string
function showSearchedEmployee (userInput) {
  //hide all the cards and show only the ones that match (partial) user input
  $('.card').each(function () {
    $(this).hide();
    //check if user input partially match some employees and, if so, show the card
    if (($(this).children().children()[1].textContent).includes(userInput)) {
      $(this).show();
    }
  });
}


//get 12 results from JSON object from randomuser site and display them on the page
 $.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: function(data) {

    /*store the employee list in a global variable. This is need to get the
    modal next/prev buttons to work correctly after search*/
    immutableUsersList = data.results;

    /*loop through each random user obtained from the request
    and format the html that will contain the necessary data */
    /*username was added to the element in order to univocally distinguish the employees
    in the modal part of the project*/
    data.results.forEach(function(randomUser) {
      let employee = '<div class="card" id="' + randomUser.login.username + '"><div class="card-img-container">';
      employee += '<img class="card-img" src="' + randomUser.picture.large + '" alt="profile picture"></div>';
      employee += '<div class="card-info-container">'
      employee += '<h3 id="name" class="card-name cap">' + randomUser.name.first + ' ' + randomUser.name.last + '</h3>';
      employee += '<p class="card-text">' + randomUser.email + '</p>';
      employee += '<p class="card-text cap">' + randomUser.location.city + ',' + randomUser.location.state + '</p></div>';
      $('.gallery').append(employee);
      employee = '';
    });


    /*add a click event on every div of the page to display the modal of the chosen employee*/
    $('.card').each(function () {
      //Event handler for click on employee to display modal
      this.addEventListener('click', function (){
        //store the username of the selected employee to display the modal
        var selectedEmployee = this.id;
        /*loop trhough each employee and, when the one chosen has been found
        display his modal stats*/
        data.results.forEach(function(randomUser, index) {
          if (randomUser.login.username === selectedEmployee) {
            //set the html page format to display the chosen employee
            createModalMockup(randomUser, data.results, index);
          }
        });
      });
    });


    //add search bar to the page
    let searchBar = '<form action="#" method="get">';
    searchBar += '<input type="search" id="search-input" class="search-input" placeholder="Search...">';
    searchBar += '<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit"></form>';
    $('.search-container').append(searchBar);

    //dynamically search employees as user type
    $('#search-input').keyup(function (e) {
      //prevent get request to be re submitted again
      e.preventDefault();
      //get user input
      let userInput = $('#search-input').val().toLowerCase();
      showSearchedEmployee(userInput);
    });

    //search employees when button is clicked
    $('#search-submit').click(function (e) {
      //prevent get request to be re submitted again
      e.preventDefault();
      //get user input
      let userInput = $('#search-input').val().toLowerCase();
      showSearchedEmployee(userInput);
    });
  }
});
