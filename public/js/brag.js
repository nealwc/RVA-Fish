
//psuedocode
// send data on post...

$(document).ready(function () {

    //define variables

    // let myTitle = $("#title-input").val().trim();
    let myLocation = $("#location-input").val().trim();
    // let myLength = $("#length-input").val().trim();
    // need to make this validate 2 decimal spaces..
    let myLength = 3.01;
    let mySpecies = $("#species-input").val().trim();
    let myComment = $("#comment-input").val().trim();
    let myUserId = 0; // need to find way to get userId...


    //title and weight do not exist...

    let postData = {
        location: myLocation,
        length: myLength,
        species: mySpecies,
        comment: myComment,
        UserId: myUserId
    }

    //this needs to be on sumbit!
    //define functions
    function newPost(postData) {    //this post works... but data does not come through...
        $.post("api/fish", postData)
            .then(function (data) {
                console.log("posting...");
                res.redirect(303, "/");
            })
            
    }


    //call functions
    // $(document).on("submit", "#submit-brag", function (event) {
    $("#submit-brag").on("click", function () {
        console.log("test me");
        console.log(postData);
        newPost(postData);
    });


    $("#cancel-brag").on("click", function () {
        //redirect to bragboard
        // window.location.href = redirectUrl;
        window.location.href = "/bragboard";

    });





    $.get("/api/user_data").then(function(data) {
        $("#username").text(data.email);
      });

}); //end document ready