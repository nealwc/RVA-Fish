
$.get("/api/fish").then(function(data){

for (i = 0; i < data.length; i++) {
    let myUserId;
    let myTitle = data[i].title;
    let mySpecies = data[i].species;
    let myLocation = data[i].location;
    let myLength = parseFloat(data[i].length).toFixed(2);
    //parsefloat...  .toFixed(2)
    let myWeight = parseFloat(data[i].length).toFixed(2);
    //parse
    let myDescription = data[i].comment;
    let createdAt = data[i].createdAt;
     if (data[i].UserId === null) {myUserId = "Anonymous"}
     else {} //need to perform a join to get username!?!

     // create html here
     myHtml = $("<div>");
     myHtml.addClass("card");
     myHtml.html(`User: ${myUserId} 
     <p> ${myTitle} </p>      
     <p>Type of Fish: ${mySpecies}</p>
     <p>Caught at: ${myLocation} </p>      
     <p> Length of ${myLength} inches</p>
     <p> Wieghing ${myWeight} lbs</p>      
     <p> ${myDescription}</p>
     <p> ${createdAt} </p>`);

     $(".comment-section").append(myHtml);

   }

});
