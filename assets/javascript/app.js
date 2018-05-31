// Initial array of topics
var allTopics = ["bts", "lakers", "sting", "jogging","islands","drone"];

// Function creating the topic buttons
function renderButtons() {

    // Deleting the topic buttons prior to adding new topic buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < allTopics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("buttons");
        // Adding a data-attribute with a value of the topic at index i
        a.attr("data-name", allTopics[i]);
        // Providing the button's text with a value of the topic at index i
        a.text(allTopics[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(a);
    }
};

// This function creates a new button with the new topic added in the input field
$("#add-gif").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var gif = $("#gif-input").val().trim();
    // The topic from the textbox is then added to our array
    allTopics.push(gif);

    // calling renderButtons which handles the processing of our topic array
    renderButtons();
});




// Function to pull 10 GIFs from Giphy when clicking a topic button
$(document.body).on('click', '.buttons', function () {
    console.log("Hello, Fletcher");
    // Empty out the previous set of GIFs
    $("#gifs-view").empty();

    // In this case, the "this" keyword refers to the button that was clicked
    var topic = $(this).attr("data-name");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topic + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div with the class "item"
            // var gifOn = response.data.data[i].images.original_still.url;
            // var gifOff = response.data.data[i].images.downsized_large.url;
            var gifOff = results[i].images.original_still.url;
            var gifOn = results[i].images.downsized_large.url;
            console.log("Below are gifOn");
            console.log(gifOn);
            console.log("Below are gifOFF");
            console.log(gifOff);

            var gifDiv = $("<div class='gif'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var stillImage = $("<img>");

            // Giving the image tag an src attribute of a property pulled off the
            // result item
            // personImage.attr("src", results[i].images.fixed_height.url);
            stillImage.attr("src", gifOff);
            stillImage.attr("data-state","still");
            stillImage.attr("data-play",gifOn);
            stillImage.attr("data-still",gifOff);


            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(stillImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-view").prepend(gifDiv);
          }
        }
      });
  });

// This function will play/pause GIFs



$(document.body).on('click', '.gif img', function () {
    var state = $(this).attr('data-state');

    if (state === 'still') {
        $(this).attr('data-state', 'play');
        $(this).attr('src', $(this).attr('data-play'));
    } else {
        $(this).attr('data-state', 'still');
        $(this).attr('src', $(this).attr('data-still'));
    }
});


// Calling the renderButtons function at least once to display the initial list of topics
renderButtons();