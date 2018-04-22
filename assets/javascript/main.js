$(document).ready(function() {

  //create initial giphy array
  var bands = ['Selena y los Dinos', 'The Beatles', 'Red Hot Chili Peppers','Grateful Dead', 'Pink Floyd', 'OutKast', 'Twenty One Pilots', 'Foster the People', 'Panic at the Disco'];
  //create function to display gifs
  //display buttons
  function createButton() {
    $("#bands-view").empty();
    //create a for loop for gifs and create the buttons 
    for (var i = 0; i < bands.length; i++) {
      
      var a = $("<button>");              //create button tag
        a.addClass("gif");                 //add class
        a.attr("data-name", bands[i]);      
        a.text(bands[i]);
        $("#bands-view").append(a);        //add button to html 
    };
    
  };
  createButton();

  // when gif button is clicked
  $('#band-submit').on('click', function(event) {
    console.log("this works");
    event.preventDefault();  

    var newBands = $("#giphy-input").val().trim();
    bands.push(newBands);
    $("#giphy-input").val("");
    createButton();
    //this will reset the form when cliked
    // $("#giphy-input")[0].reset();
    console.log(bands);
  });
  
  function displayBands()  {
    
    console.log("working");
    var band = $(this).attr("data-name");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + band + "&api_key=WOlO7OgqhRWZhO7IiQeOdXwQ7wyQ4qlo&limit=10";
    
    $.ajax ({
      url: queryURL,
      method: "GET"
      
    }).then(function(response) {
      var results = response.data;
      //loops over result item
      for (var i = 0; i < results.length; i++) {
        
        if (results[i].rating !== "r" && results [i].rating !== "pg-13")
        //creates div with class "item"
        var bandDiv = $("<div class = 'item'>");
        //stores gifs rating
        var rating = results[i].rating;
        // creates paragraph tag with rating
        var p = $("<p>").text("Rating: " + rating);
        //creates image tag for gif
        var bandimg = $("<img>");
        // animated source
        var animated = results[i].images.fixed_height.url;
        // static source
        var static = results[i].images.fixed_height_still.url;
        
        bandimg.addClass("bandGiphy");
        //gives gif a source attribute pulled off result item
        bandimg.attr("src", static);
        //still
        bandimg.attr('data-state', 'still');
        // animated
        bandimg.attr('data-animate', animated);
        bandimg.attr('data-still', static);
        //appending paragraph and image to the div created
        bandDiv.append(p);
        bandDiv.append(bandimg);
        //prepends gif to HTML
        $("#bandgifs-here").prepend(bandDiv);
        
        
        
      }
      
    })
    
  };
    
    $(document).on("click", ".gif", displayBands);
    $(document).on("click", ".bandGiphy", playpause); 

    function playpause() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate")
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

    }


  });
  