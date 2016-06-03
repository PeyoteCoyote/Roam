//user clicks ROAM
  //Location sent to DB
    //DB Matches other users in 20m radius
      //DB Matches based on common interests
      //store the common interest to be used for Yelp API
      //DB assigns a match score (# of interests common / total interests)
      //Select highest score
      //If score is a tie
      //selects 1 user randomly out of the # of possible matches

      //Send confirmation to both people

    //Search Yelp API based on the common user Interests
      //function search yelp for (common user interests)
        //returns 20 results within the 20m radius
        //function will randomly select 1 result and show on confirmation pg
    //DB Matches interests in 20m radius


  //Show Confirmation
  //Otherwise Notification




//
  //Bars in SF

  //A User clicks roam
    //db checks other outstanding roams based on user coords
      //if another user is available
        //match user
        //yelp query
        //show confirmation pg
      //else
        //Tell user no roams available right now we will notify as soon as you are matched with a roam


  //Based on 2 people's interest find a bar in the inner radius
    //When second person is matched
      //Search Yelp for (predefined wine query updated with the coordinates of 2nd user) {This has to be refined to included area between the 2 users}

  //Send confirmation to head to the location
