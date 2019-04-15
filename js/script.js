/* Treehouse FSJS Techdegree
 * Project 5 - Public API Request
 */

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

  /* check if modal is being displayed on search mode or not and set next/prev
  buttons accordingly*/
  if($('#search-input').val() === '') {
    //attach click event handler to next/prec buttons
    nextPrevButtons(users, index)
  }
  else {
    //nextPrevButtonsWithSearch(users, index);
    console.log('BBB')
  }
}


//function to add click events to next/prev buttons
function nextPrevButtons(users, index) {
  let numberOfEmployees = $('.card:visible').length;
  $('#modal-prev').click(function() {
    $('.modal-container').remove();
    if (index - 1 < 0) {
      createModalMockup(users[numberOfEmployees-1], users, numberOfEmployees-1);
    }
    else {
      createModalMockup(users[index-1], users, (index-1));
    }
  });
  $('#modal-next').click(function() {
    $('.modal-container').remove();
    if (index + 1 > numberOfEmployees-1) {
      createModalMockup(users[0], users, 0);
    }
    else {
      createModalMockup(users[index+1], users, (index+1));
    }
  });
}

/*
function returnNextIndex (index) {
  let visibleIds = getVisibleId();
  $('.card').each(function (i) {
    if(i > index) {
      if (visibleIds.includes($(this)[0].id)){
        return i;
      }
    }
    //console.log($(this)[0].id);
    //console.log($('.card:visible'));

  });
}

//return an array of all ids that are visible. Need it for next/prev buttons on search results
function getVisibleId () {
  let visibleIds = []
  $('.card:visible').each(function () {
    visibleIds.push($(this)[0].id);

  });
  return visibleIds;
}


//function to add click events to next/prev buttons
function nextPrevButtonsWithSearch(users, index) {
  $('#modal-prev').click(function() {
    $('.modal-container').remove();
    createModalMockup(users[index-1], users, (index-1));
    checkEndOfList(index-1);
  });
  $('#modal-next').click(function() {
    $('.modal-container').remove();
    createModalMockup(users[index+1], users, returnNextIndex(index));
    checkEndOfList(index+1);
  });
}
*/

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
      showSearchedEmployee(userInput, data.results);
    });

    //search employees when button is clicked
    $('#search-submit').click(function (e) {
      //prevent get request to be re submitted again
      e.preventDefault();
      //get user input
      let userInput = $('#search-input').val().toLowerCase();
      showSearchedEmployee(userInput, data.results);
    });
  }
});
