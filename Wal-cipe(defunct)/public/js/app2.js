function scrollFooter(scrollY, heightFooter) {
  console.log(scrollY);
  console.log(heightFooter);

  if (scrollY >= heightFooter) {
    $("footer").css({
      bottom: "0px"
    });
  } else {
    $("footer").css({
      bottom: "-" + heightFooter + "px"
    });
  }
}

$(window).load(function() {
  var windowHeight = $(window).height() - 500,
    footerHeight = $("footer").height() - 500,
    heightDocument =
      windowHeight + $(".content").height() + $("footer").height() - 20;

  $("#scroll-animate, #scroll-animate-main").css({
    height: heightDocument + "px"
  });

  $("header").css({
    height: windowHeight + "px",
    "line-height": windowHeight + "px"
  });

  $(".wrapper-parallax").css({
    "margin-top": windowHeight + "px"
  });

  scrollFooter(window.scrollY, footerHeight);

  window.onscroll = function() {
    var scroll = window.scrollY;

    $("#scroll-animate-main").css({
      top: "-" + scroll + "px"
    });

    $("header").css({
      "background-position-y": 50 - (scroll * 100) / heightDocument + "%"
    });

    scrollFooter(scroll, footerHeight);
  };

  /*!
 * Sign Up/Login Box v0.0.1 (https://codepen.io/koheishingai/FLvgs)
 * Copyright 2014 Kohei Shingai.
 * Licensed under MIT 
 */
});

// Password Box
$("#username, #password").on("input", function() {
  if ($("#username").val() && $("#password").val()) {
    $(".login").addClass("buttonafter");
  } else {
    $(".login").removeClass("buttonafter");
  }
});
