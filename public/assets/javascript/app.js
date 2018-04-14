// Grab the articles as a json
//when scrape button is clicked
$('#scrape').on("click", function() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/scrape",
    success: function(response){
      // $("#display_results").html("toggle");
      // $("#display_results").modal("toggle");
      alert("this works");
      console.log("works");
    }
    // error: function(httpRequest, status, err) {
    //   alert("this did not work")
    //   console.log(status);
    //   console.log(err)
    // }
  
});
  });
// $('.scrape').click(function() {
//   window.location.href = '/scrape/';
//   return false;
// });

// Display the articles as a json
//when the button is clicked
$('#show').click(function() {
  $("#articles").empty();
  $.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].summary + "</p>" + "<button id='save'" + " save-button='" + data[i]._id + "'>" + 'Save Article' + "</button>");
  }
});
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
  // With that done, add the note information to the page
  .then(function(data) {
    console.log(data);
    // The title of the article
    $("#notes").append("<h3>" + data.title + "</h3>");
    // An input to enter a new title
    $("#notes").append("<input id='titleinput' name='title' >");
    // A textarea to add a new note body
    $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    // A button to submit a new note, with the id of the article saved to it
    $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
    // A button to delete the note, with the id of the article saved to it
    $("#notes").append("<button data-id='" + data._id + "' id='deletenote'>Delete Note</button>");
    
    // If there's a note in the article
    if (data.note) {
      // Place the title of the note in the title input
      $("#titleinput").val(data.note.title);
      // Place the body of the note in the body textarea
      $("#bodyinput").val(data.note.body);
    }
  });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
  // With that done
  .then(function(data) {
    // Log the response
    console.log(data);
    alert("Your note is saved in the database!")
    // Empty the notes section
    $("#notes").empty();
  });
  
  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#deletenote", function() {
  // Grab the id associated with the article from the delete button
  var thisId = $(this).attr("data-id");
  
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "GET",
    url: "/delete/" + thisId,

    // On successful call
    success: function(response) {
      // Remove the p-tag from the DOM
      thisId.remove();
      // Clear the note and title inputs
      $("#titleinput").val("");
      $("#bodyinput").val("");
      console.log(response);
      // Empty the notes section
      $("#notes").empty();
    }
  });

  });
   
//save an article
$(document).on("click", "#save", function() {
  // Grab the id associated with the article from the save button
  var thisId = $(this).attr("save-button");
  
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/save/" + thisId,
  })
  // With that done
  .then(function(data) {
    // Log the response
    console.log("save button was clicked" + data);
    alert("Your article is saved in the database!")
  });
  
  // Also, remove the values entered in the input and textarea for note entry
}); 
