var newsObj;
// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  newsObj = data;

  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    var eachNews = data[i];
    //  var eachArticle = $('#articles').append('<div class="each-article alert alert-warning alert-dismissible fade show" role="alert" data-id=' + eachNews._id + '><a class="alert-link" href="' + eachNews.link + '">' + eachNews.title + '</a><br />' + eachNews.desc + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
    var eachArticle = $('#articles').append('<div class="each-article alert alert-warning alert-dismissible fade show" role="alert" data-id=' + eachNews._id + '><a class="alert-link" href="' + eachNews.link + '">' + eachNews.title + '</a><br />' + eachNews.desc + '</div>');
    // '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
  }
  if (data.length < 1) {
    $('#articles').text("Let's Scape some articles!")
  }

  var howManyArticles = $('#articles > div').length;
  $('#number-articles').text(howManyArticles)
});

// Whenever someone clicks a p tag
$(document).on("click", ".each-article", function () {
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
    .then(function (data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h5>" + data.title + "</h5>");
      // An input to enter a new title
      $("#notes").append("<input class='m-1 form-control' id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea class='form-control m-1' id='bodyinput' name='body' rows='5'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button class='btn btn-warning' data-id='" + data._id + "' id='savenote'>Save Note</button>");
      // A add button to delete comment
      // $("#notes").append('</br><button class="btn btn-light" type="button">Clear Comment</button>');


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
$(document).on("click", "#savenote", function () {
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
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", "#scrape", function () {
  // Now make an ajax call to scrape
  console.log('Clicked');

  // var nowScrape = function () {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    // With that done, add the note information to the page
    .then(function (newData) {

      $.getJSON("/articles", function (data) {
        console.log(newsObj.length, data.length);
        // if any new articles are added then the page reloads
        if (newsObj.length < data.length) {
          location.reload();
        }
        else{
          console.log('no added articles')
        }
        // location.reload();
      })
    })

});