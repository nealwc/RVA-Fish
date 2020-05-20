$(document).ready(function () {
    // Getting references to our form and input
    var postForm = $("form.post");
    var titleInput = $("input#title-input");
    var commentInput = $("input#comment-input");

    // When the signup button is clicked, we validate the email and password are not blank
    postForm.on("submit", function (event) {
        event.preventDefault();
        var postData = {
            title: titleInput.val().trim(),
            comment: commentInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        newPost(postData.title, postData.comment);
        emailInput.val("");
        passwordInput.val("");
    });

    function newPost(title, comment) {
        $.post("/api/comment", {
            title: title,
            comment: comment
        })
            .then(function (data) {
                window.location.replace("/brag");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});