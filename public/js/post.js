$(document).ready(function () {
    // Getting references to our form and input
    var postForm = $("form.post");
    var titleInput = $("#title-input");
    var commentInput = $("#comment-input");

    // When the signup button is clicked, we validate the email and password are not blank
    $(document).on("submit", "#fish-form", function (event) {
        event.preventDefault();
        console.log("HI GORM")
        var postData = {
            title: titleInput.val().trim(),
            comment: commentInput.val().trim()
        };
        console.log(postData);

        newPost(postData);

    });

    function newPost(postData) {
        console.log("ajax call to comments");
        $.post("/api/comments", postData)
            .then(function (data) {
                window.location.replace("/members");
                // If there's an error, handle it by throwing up a bootstrap alert
                //not redirecting at all...
                console.log(title);
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }








    $.get("/api/user_data").then(function(data) {
        $("#username").text(data.email);
      });






});