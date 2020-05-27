$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (firstdata) {
    $(".member-name").text(firstdata.email);
  });

  $.get("/api/users").then(function (usernameData) {        //gets username and email... instead of sequelize doing it...
    let userArray = [];
    let activeNumber; //this will be the userId of active user
    // add a new user to userArray, including null users...
    for (i = 0; i < usernameData[usernameData.length - 1].id; i++) {
      if (usernameData[i] !== undefined) {
        let tempEmail = usernameData[i].email; //will not work if undefined... causes bug if bad email passes validation
        let tempId = usernameData[i].id;
        let myUser = {
          id: tempId,
          email: tempEmail
        }
        userArray.push(myUser);
      } //if statement catches bug where user data is not defined. Needed if we are to implement deleting user accounts...
      //.. should update this to use a more direct sequelize join...
    }

    $.get("/api/comments").then(function (data) {   //main api call
      for (i = 0; i < data.length; i++) {   //for loop cycles through ech comment returned from api data!
        let myUserId = parseInt(data[i].UserId);
        let myTitle = data[i].title;
        let myComment = data[i].comment;
        let createdAt = data[i].createdAt;
        if (myUserId === null || myUserId === undefined || myUserId === NaN) {
          myUserId = "Anonymous";
        } //username = Anonymous if no data returned ^s
        else {
          for (let j = 0; j < userArray.length; j++) {  //this should work when there is a gap between user ids because its pullign from the array created from existing users
            if (userArray[j].id === data[i].UserId) {
              myUserId = userArray[j].email;
              activeNumber = j;
              //this variable holds desired location in userAray - which is usually but not always the desired userId
            }
          }

        } //need to perform a join to get username!?!

        //test
        let testProfilePic = usernameData[activeNumber].gravatar_url;    // !! gravatar

        let testuserName = "test Name";                       // !! email!
        // create html here
        myHtml = $("<div>");
        myHtml.addClass("card");
        myHtml.html(
          `<img src="${testProfilePic}" alt="${testuserName}" style="width:80px;"/> User: ${myUserId}
      <p> ${myTitle} </p>      
      <p> ${myComment}</p>
      <p> ${createdAt} </p>`);

        $(".comment-section").append(myHtml);   //attaches the html to the page

      } 


    }); // this closes the api/commets ajax call

  }); //this closes the api/users ajax call





  //notes; user ID seems to be correct
  //example, or perhaps first user, shows email properly!












});
