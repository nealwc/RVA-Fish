$(document).ready(function () {
    // Getting references to our form and input
    var postForm = $("form.post");
    var titleInput = $("#title-input");
    var commentInput = $("#comment-input");

    $(document).on("submit", "#fish-form", function (event) {
        event.preventDefault();
        var postData = {
            title: titleInput.val().trim(),
            comment: commentInput.val().trim()
        };
        newPost(postData);
    });
    function newPost(postData) {
        $.post("/api/comments", postData)
            .then(function (data) {
                window.location.replace("/members");

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