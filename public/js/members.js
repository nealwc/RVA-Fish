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
      let tempEmail = usernameData[i].email; //will not work if undefined...
      let tempId = usernameData[i].id;
      let myUser = {
        id: tempId,
        email: tempEmail
      }
      userArray.push(myUser);
      console.log("array:");
      console.log(userArray[i]); //works, array exists with data in it...

    }
    // up to here seems to work
    // userArray updates and has proper amount of objects



    // console.log("reached here");
    $.get("/api/comments").then(function (data) {   //main api call
      console.log(data);
      // console.log(data.user.id);


      //for loop -  I need to figure out how to get the length of comments/ the array of data...
      for (i = 0; i < data.length; i++) {   //for loop cycles through ech comment returned from api data!
        //userArray is available
        console.log("***** " + i);   // this shows that i definitely goes up
        let myUserId = parseInt(data[i].UserId);
        let myTitle = data[i].title;
        let myComment = data[i].comment;
        let createdAt = data[i].createdAt;
        if (myUserId === null || myUserId === undefined || myUserId === NaN) { 
          myUserId = "Anonymous"; 
        console.log("user is Anonymous");
        } //username = Anonymous if no data returned ^s
        else {
          console.log("user exists");
          for (let j = 0; j < userArray.length; j++) {  //why is this not iterating if there is 1 comment?

            console.log("===" + j);
            console.log("userArray length: " + userArray.length);
            console.log(userArray[j]); //error is here; not updating!
            console.log("myUserId"+myUserId);
            if (userArray[j].id === data[i].UserId) {
              myUserId = userArray[j].email;
              activeNumber = j;
              //this variable holds desired location in userAray - which is usually but not always the desired userId
            }
          } 

        } //need to perform a join to get username!?!
        //test
        let testProfilePic = usernameData[activeNumber].gravatar_url;    // !! gravatar
        // console.log(usernameData[0]);
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

      } //current bugs:
      // comments not allowing line breaks within...
      //...and page needs to be reloaded to register the changes
      // console.log(userArray[1]);
    }); // this closes the api/commets ajax call

  }); //this closes the api/users ajax call





  //notes; user ID seems to be correct
  //example, or perhaps first user, shows email properly!












});
