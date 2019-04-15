/* Treehouse FSJS Techdegree
 * Project 5 - Public API Request
 */


function createModalMockup (randomUser) {
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

}



//get 12 results from JSON object from randomuser site and display them on the page
 $.ajax({
  url: 'https://randomuser.me/api/?results=12',
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


    //store the list of the username: used to get the next/prev buttons to work
    let usernameList = [];
    /*add a click event on every div of the page to display the modal of the chosen employee*/
    $('.card').each(function () {
      usernameList.push(this.id);
      //Event handler for click on employee to display modal
      this.addEventListener('click', function (){
        //store the username of the selected employee to display the modal
        var selectedEmployee = this.id;
        /*loop trhough each employee and, when the one chosen has been found
        display his modal stats*/
        data.results.forEach(function(randomUser, index) {
          console.log(index);
          if (randomUser.login.username === selectedEmployee) {
            //set the html page format to display the chosen employee
            createModalMockup(randomUser);

            $('#modal-prev').click(function() {
              createModalMockup(randomUser);

            });

            $('#modal-next').click(function() {


            });




            //activate the closing button on the modal element
            $('#modal-close-btn').click(function() {
              $('.modal-container').remove();
            });
          }
        });
      });
    });
  }
});
