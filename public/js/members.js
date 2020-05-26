$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });

  // I need to call api/users and get the email that correllates with the UserId; 
  // only then should I call the api/comments and load the data!
  $.get("/api/users").then(function (usernameData) {        //gets username and email... insteadof sequelize doing it...
    //create an array of usernames... with emails...
    // I need to grab usernameData[x].user.id  and usernameData[x].user.email
    ///... 

    userArray = [];
    // add a new user to userArray, including null users...

    console.log(usernameData[usernameData.length - 1]);

    for (i = 0; i < usernameData[usernameData.length - 1].id; i++) {
      let tempEmail = usernameData[i].email;
      let tempId = usernameData[i].id;
      let myUser = {
        id: tempId,
        email: tempEmail
      }
      userArray.push(myUser);
      // console.log(userArray[i]); //works, array exists with data in it...

    } //might need to be a forEach...
    // use an array!

    console.log("reached here");
    $.get("/api/comments").then(function (data) {   //main api call
      console.log(data);
      // console.log(data.user.id);
      //it seems that this data is not appearing in the below console log
      //upon loading page... but it appears if I reload

      //for loop -  I need to figure out how to get the length of comments/ the array of data...
      for (i = 0; i < data.length; i++) {
        //userArray is available

        let myUserId = parseFloat(data[i].UserId);
        let myTitle = data[i].title;
        let myComment = data[i].comment;
        let createdAt = data[i].createdAt;
        if (data[i].UserId === null) { myUserId = "Anonymous" }
        else {
          for (j = 0; j < userArray.length - 1; j++) {
            console.log(userArray[j]);
            if (userArray[j].id === data[i].UserId) {
              myUserId = userArray[j].email;
            }
          }

        } //need to perform a join to get username!?!
        //test
        let testProfilePic = usernameData[0].gravatar_url;    // !! gravatar
        console.log(usernameData[0]);
        let testuserName = "test Name";                       // !! email!
        // create html here
        myHtml = $("<div>");
        myHtml.addClass("card");
        myHtml.html(
          `<img src="${testProfilePic}" alt="${testuserName}" style="width:80px;"/> User: ${myUserId}
      <p> ${myTitle} </p>      
      <p> ${myComment}</p>
      <p> ${createdAt} </p>`);
        //may need to convert from json...

        $(".comment-section").append(myHtml);

      } // usernames not showing and comments not allowing line breaks within...
      //...and page needs to be reloaded to register the changes

    }); // this closes the api/users ajax call!

  });

















});
