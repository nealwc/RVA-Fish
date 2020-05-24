$(document).ready(function () {
    //define variables
    let titleInput = $("#title-input");
    let speciesInput = $("#species-input");
    let locationInput = $("#location-input");
    let lengthInput = $("#length-input");
    let weightInput = $("#weight-input");
    let commentInput = $("#comment-input");

    $(document).on("submit", "#brag-form", function (event) {
        event.preventDefault();
        console.log("submit clicked");
        let bragData = {
            title: titleInput.val().trim(),
            species: speciesInput.val().trim(),
            location: locationInput.val().trim(),
            length: lengthInput.val().trim(),
            weight: weightInput.val().trim(),
            comment: commentInput.val().trim()
        };
        console.log(bragData)

        newBrag(bragData)
    });

    function newBrag(bragData) {
        $.post("/api/fish", bragData)
            .then(function (data) {
                console.log("posting...");
                window.location.replace("/bragboard")
            })
            .catch(handleLoginErr);

    };

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
}); //end document ready