// roamOffGenerator.js
//

module.exports = function(req) {

  var startRoam = Number(req.body.coordinates.timestamp); //time when user clicks the roam button in milliseconds
  var roamOffAfter = Number(startRoam); //time when the user is not available after in milliseconds
  

  if(req.body.time === '1 hour') {
    roamOffAfter +=   3600000; 
  }

  if(req.body.time === '2 hours') {
    roamOffAfter +=   7200000;
  }

  if(req.body.time === '4 hours') {
    roamOffAfter +=   14400000;
  }

  if(req.body.time === 'Anytime today') {
    var today = new Date();
    var millisecondsUntilMidnight = (24 - today.getHours()) * 3600000;
    roamOffAfter +=   millisecondsUntilMidnight;
  }

  return {startRoam: startRoam, roamOffAfter: roamOffAfter};  
}

