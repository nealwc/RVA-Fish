$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });


  $.get("/api/comments").then(function (data) {

    //it seems that this data is not appearing in the below console log
    //upon loading page... but it appears if I reload

    //for loop -  I need to figure out how to get the length of comments/ the array od data...
    for (i = 0; i < data.length; i++) {
     let myId;
     let myTitle = data[i].title;
     let myComment = data[i].comment;
     let createdAt = data[i].createdAt;
      if (data[i].UserId === null) {myId = "Anonymous"}
      else {} //need to perform a join to get username!?!

      // create html here
      myHtml = $("<div>");
      myHtml.addClass("card");
      myHtml.html(`User: ${myId} 
      <p> ${myTitle} </p>      
      <p> ${myComment}</p>
      <p> ${createdAt} </p>`);
      //may need to convert from json...

      $(".comment-section").append(myHtml);

    } // usernames not showing and comments not allowing line breaks within...
    //...and page needs to be reloaded to register the changes


  });

















});
