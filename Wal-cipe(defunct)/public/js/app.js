// Slider
range = $(".range-slider > .input-range");
value = $(".range-slider > .range-value");

value.val(range.attr("value"));

// var val2 = $(".range-value".slider("option", "value"));
// console.log(val2);

// $(".cost-amount").text("this.value");

range.on("input", function() {
  //monparent=$(this).parent();
  monparent = this.parentNode;

  value = $(monparent).find(".range-value");
  $(value).val(this.value);
  //   costAmount = $(value).val(this.value);
  //   console.log(costAmount);
  //   $(".input-range").attr("value", $(value).val(this.value));
});

value.on("input", function() {
  monparent = this.parentNode;
  range = $(monparent).find(".input-range");
  $(range).val(this.value);

  //   console.log(range);
});


//allows for only Numeric Values on text box
$(document).ready(function() {
  $("#main-cost").keydown(function(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if (
      $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
      // Allow: Ctrl/cmd+A
      (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: Ctrl/cmd+C
      (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: Ctrl/cmd+X
      (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  });
});



// Template.cost-container.rendered = function() {
//   document.getElementById("test").oninput = function() {
//     myFunction();
//   };
// };

// function myFunction() {
//   var val = document.getElementById("test").value; //gets the oninput value
//   document.getElementById("cost-amount").innerHTML = val; //displays this value to the html page
//   console.log(val);
// }

// Parralax Effect
function scrollFooter(scrollY, heightFooter) {
  //   console.log(scrollY);
  //   console.log(heightFooter);

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
  var windowHeight = $(window).height(),
    footerHeight = $("footer").height(),
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

// INGREDIENTS dropdown menu
var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
      /*when an item is clicked, update the original select box,
        and the selected item:*/
      var y, i, k, s, h;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      h = this.parentNode.previousSibling;
      for (i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          for (k = 0; k < y.length; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x,
    y,
    i,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

//INGREDIENT Buttons

var ingredients = [];

//allows buttons to populate, stemming from the ingredients array
function renderButtons() {
  $(".ingredient-list").empty();
  for (var i = 0; i < ingredients.length; i++) {
    var a = $("<button>");
    a.addClass("category");
    a.addClass("btn btn-outline-info");
    a.attr("data-name", ingredients[i]);
    a.text(ingredients[i]);
    $(".ingredient-list").append(a);
  }
}

// allows user to intput their own category & crafts a clickable search button

$(function() {
  $("#selected-ingredient : selected").each("click", function() {
    console.log("test");
    // $(".colors").hide();
    var a = $("<button>");
    var b = $("#" + $(this).val());
    a.addClass("category");
    a.addClass("btn btn-outline-info");
    // a.attr("data-name", ingredients[i]);
    a.text(b);
  });
});

var foo = [];

$("#selected-ingredient :selected").each(function(i, selected) {
  foo[i] = $(selected).text();
  ingredients.push(foo);
  console.log(foo);

  renderButtons();
});
console.log(ingredients);

// var fruits = [];
// $("#selected-ingredients")
//   .find("selected")
//   .children()
//   .each(function() {
//     fruits.push({
//       optionValue: $(this).attr("value") // all the options value
//     });
//   });
// console.log(fruits);
