// Email Generator
//Email notification to the users after the match has been made & 
//the location has been set

module.exports = function(venueName, venueLocation, time) {
  var html =   
  '<div style="padding:100px;">' +
      '<h1 style="padding-bottom: 20px; border-bottom: 1px solid #893AC1; font-family: helvetica; color:#893AC1">' +
      'Greetings Roamer! </h1>' +
      '<h2 style= "font-weight:100; font-family: helvetica; color:#636363;">' +
     'Your next Roam is ready. See below for details.' + 
    '</h2>' +
      '<h3 style="font-family: helvetica;color:#a73fbc;">Roam Venue: </h3>' +
      '<h2 style="font-weight:100; color:#636363; font-family: helvetica;">' + venueName + '</h2>' +

      '<h3 style="font-family: helvetica; color:#a73fbc;">Roam Address:</h3>' +
      '<h2 style="font-weight:100; font-family: helvetica; color:#636363;">' + 
      venueLocation + '</h2>' +
    '<hr>' +
    '<h3 style="font-weight:100; font-family: helvetica;color:#636363;">Please arrive at the venue by <span id="date" style="font-weight: bold; color:#893AC1">'+ time +'</span></h3>' +
  '</div>';

  return html;
}