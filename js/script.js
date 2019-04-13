/* Treehouse FSJS Techdegree
 * Project 5 - Public API Request
 */




 $.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
    data.results.forEach(function(randomUser) {
      let employee = '<div class="card"><div class="card-img-container">';
      employee += '<img class="card-img" src="' + randomUser.picture.large + '" alt="profile picture"></div></div>';
      $('.gallery').append(employee);
      employee = '';
      console.log(randomUser.picture.large);

    });
    //console.log(data.results);
  }
});

/*
$.each( obj, function( key, value ) {
  alert( key + ": " + value );
});
Once again, this
*/
