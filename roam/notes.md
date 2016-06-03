
##Brainstorm / Pseudocode 

###What happens when a user presses Roam? 

####Scenario 1: If our app handled various kinds of activities
user presses ROAM
  Location sent to DB
    DB Matches other users in 20m radius
      DB Matches based on common interests
      store the common interest to be used for Yelp API
      DB assigns a match score (# of interests common / total interests)
      Select highest score
      If score is a tie
      selects 1 user randomly out of the # of possible matches

      Send confirmation to both people

    Search Yelp API based on the common user Interests
      function search yelp for (common user interests)
        returns 20 results within the 20m radius
        function will randomly select 1 result and show on confirmation pg
    DB Matches interests in 20m radius


  Show Confirmation
  Otherwise Notification




####Scenario 2: If our app only handeled 1 activity: Bars
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


###How does Matching work if we go with Scenario 2? 

  BoundingBox Function determines the bounding box area. Our matches
  have to be inside this area
    

    matchingAlgo(user, coordinates)
      take user1 location 
      use bounding box function to create a boundary


      Add property:STATUS to ROAM NODE: 
        PENDING
        have been matched
        Concluded
        Expired
      Add property: COORDINATES to ROAM NODE
        Max: lat
        Min: lat
        Max: long
        Min: long


      write qurey to check for all ACTIVE ROAM USERS who 
      fit in the bounding box



      Add property user ROAM: ACTIVE



####Scenario1: First user signs up & seeks a roam. What happens?  
    presses roam
      No roam nodes right now in neo4j
        new roam node created 
          {status: pending, coords:userloc}
          create a xship b/w user and his roam node

    WHERE TO FROM HERE? HOW DOES HE GET NOTIFIED???      

####Scenario 2: Users exist and a new user seeks a roam. What happens? 
      presses roam 
        search roam nodes WHERE STATUS:PENDING 
        
        Use matchingAlgo to determine if the user's coords are 
        in the bounding box of that roam node
          if yes
            create relationship b/w user's node and the roam node
            set roam STATUS:ACTIVE 
            show match conf screen
          else 

