var lets_get_political = [];



$(document).ready(function () {

    $("#topic-submit").on("click", function (event) {
        event.preventDefault();

        var politician = $("#topic-input").val().trim(); //grab button text
        lets_get_political.push(politician); // push button to array

        $("#topic-input").val(''); // clear well


        addButton();  // for btn in array: dynamic create button,
        // assign text value
        // append to display

        // TO DO !!!!! 
        // inside addButton... create class to query API when clicked




    })

})

function addButton() {
    $("#topic-buttons").empty();
    for (var i = 0; i < lets_get_political.length; i++) {


        var politician_button = $("<button>");
        //set var = dynamically created button

        // politician_button.text(lets_get_political[i]);
        politician_button.text(lets_get_political[i]);
        //adds the text from the input box to the newly created button

        politician_button.addClass("gif-pull");

        $("#topic-buttons").append(politician_button);
        // dynamically append the button to the topic-buttons display

        console.log(politician_button.attr('class') + "identifier");



    }
}

$(document).on("click", ".gif-pull", function () {
    // clear the <div> here before appending new images
    console.log('working');
    
    var grab_button_info = $(this).text().split(' ').join('+');
    console.log(grab_button_info + "is this working? ");
    $("#image-field").empty();
    var baseURL = "https://api.giphy.com/v1/gifs/search?q=" + grab_button_info + "&limit=10&rating=pg&api_key=dc6zaTOxFJmzC";
    $.ajax({
        url: baseURL,
        method: "GET"
    }).done(function (response) {
        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            
            var single_result = results[i];

            var politician_div = $("<div>");
            
            var image = $("<img>");

            var pgraph = $("<p>").text(single_result.rating);
            
            image.attr({
                'src': single_result.images.fixed_height_still.url,
                'class': 'gif',
                'data-state': 'still',
                'data-still': single_result.images.fixed_height_still.url,
                'data-animate': single_result.images.fixed_height.url,
            });
            politician_div.append(image, pgraph);

            $("#image-field").prepend(politician_div);
        }

        
    })

})

$(document).on("click", ".gif", function () {
    console.log('click');
    var state = $(this).attr('data-state');

    var still = $(this).attr('data-still');
    var animate = $(this).attr('data-animate');

    if (state === 'still') {
        $(this).attr('src', animate)
        $(this).attr('data-state', 'animate');
    }

    else {
        $(this).attr('src', still);
        $(this).attr('data-state', 'still');
    }


})