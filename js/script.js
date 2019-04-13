/* Treehouse FSJS Techdegree
 * Project 5 - Public API Request
 */



//get 12 results from JSON object from randomuser site
 $.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
    /*loop through each random user obtained from the request
    and format the html that will contain the necessary data */
    data.results.forEach(function(randomUser) {
      let employee = '<div class="card"><div class="card-img-container">';
      employee += '<img class="card-img" src="' + randomUser.picture.large + '" alt="profile picture"></div>';
      employee += '<div class="card-info-container">'
      employee += '<h3 id="name" class="card-name cap">' + randomUser.name.first + ' ' + randomUser.name.last + '</h3>';
      employee += '<p class="card-text">' + randomUser.email + '</p>';
      employee += '<p class="card-text cap">' + randomUser.location.city + ',' + randomUser.location.state + '</p></div>';
      $('.gallery').append(employee);
      employee = '';
      console.log(randomUser);
    });
  }
});
