//return a formatted date to be used in the notification email to the users

module.exports = function() {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


  var newDate = new Date();
  var day = convertToString(newDate.getDay(), days);
  var month = convertToString(newDate.getMonth(), months);
  var date = zeroPad(newDate.getDate());
  var year = newDate.getFullYear();
  var hours = zeroPad(newDate.getHours());
  var minutes = zeroPad(newDate.getMinutes());

  //append 0's to hours/ minutes if single digits
  function zeroPad(num) {
    while(String(num).length < 2) { num = "0" + String(num); }
    return num;
  }//zero padding 

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = zeroPad(hours) + ':' + zeroPad(minutes) + ' ' + ampm;
    return strTime;
  }//AMPM convert


  function convertToString(num, array) {
    return array[num];
  }//month/day in number to String

    var html =  '<i>'+ day + ' ' + month + ' ' +  date  + ', ' + year  + ' <b>' + formatAMPM(newDate)  + '.</b></i>';

  return html;

}
