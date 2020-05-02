function get_home_url() {
  var url = window.location;

  return url.origin + '/';
}

function get_url_path() {
  var url = window.location;

  var url_path_array = url.pathname.split('/');

  var url_path = "";

  for (var i = 0; i < url_path_array.length; i++) {
    if (url_path_array[i]) url_path = url_path + '/' + url_path_array[i];
  }

  return url_path;
}

$('.drawer').on('click', function (event) {
  event.stopPropagation();

  var side_nav = $('.side-nav-base');

  if (side_nav.hasClass('active')) {
    side_nav.removeClass('active');
    $('body').removeClass('faded');
  } else {
    side_nav.addClass('active');
    $('body').addClass('faded');
  }
});

$('.top-nav-bar, .full-screen-header, .body-container,  .close-drawer').on('click', function () {
  var side_nav = $('.side-nav-base');

  if (side_nav.hasClass('active')) {
    side_nav.removeClass('active');
    $('body').removeClass('faded');
  }
});

$('[data-linked]').on('click', function () {
  var linker = $(this)
  var linked_ele = $('#' + linker.data('linked'));

  if (linked_ele.hasClass('active')) {
    $("#transparent-bar").removeClass("opaque");
    linker.parent('li').removeClass('active');
    linked_ele.removeClass('active');
  } else {
    $('.mega-menu').removeClass('active');
    $("#transparent-bar").addClass("opaque");
    linker.parent('li').addClass('active');
    linked_ele.addClass('active');
  }
});

// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: (target.offset().top - 50)
      }, 500);
      return false;
    }
  }
});

$('.back-to-top').on('click', function () {
  $('html, body').animate({
    scrollTop: 0
  }, 500);
  return false;
});

// Collapse Navbar
function navbar_collapse() {
  if ($("#transparent-bar").offset().top > 200) {
    $("#transparent-bar").addClass("page-scrolled");
  } else {
    $("#transparent-bar").removeClass("page-scrolled");
  }

  if ($(".back-to-top").offset().top > 1000) {
    $(".back-to-top").addClass("active");
  } else {
    $(".back-to-top").removeClass("active");
  }
};

function load_side_menu() {
  $('.side-nav-base > ul').html(function () {
    return $('.top-navigation').html();
  });
}

function stag_load_template() {
  var d = new Date();

  $('[data-load-template]').each(function (index, element) {
    let $element = $(element);

    $.ajax({
      url: get_home_url() + '/' + $element.data('load-template') + '.data?time=' + d.getSeconds(),
    }).done(function (result) {
      $element.html(result);

      if ('notify' == $element.data('load-template')) {
        stagNotification();
      }
    });
  });
}

function stagAlertNotification(){
  var cookieValue = Cookies.get('stagAlertNotification');

  if(undefined == cookieValue){
    Swal.fire({
      title: '<span class="py-3">Your Contribution Required!</span>',
      html: '<p class="text-justify">Currently, StagPHP Framework is in the beta version. Join us on discord and be a part of our development team. Participate in beta testing and hare your feedback with our community.</p>' + '<p class="text-center py-3">' +
        '<a target="_blank" href="https://twitter.com/StagPHP" class="btn btn-secondary mr-3"><span class="stag-icon stag-icon-twitter"></span> Twitter</a>' +
        '<a target="_blank" href="https://discord.gg/nhtwy4C" class="btn btn-secondary"><span class="stag-icon stag-icon-discord"></span> Discord</a>' + '</p>',
      showCloseButton: true,
      showConfirmButton: false,
      scrollbarPadding: false,
      heightAuto: false,
    });

    Cookies.set('stagAlertNotification', 'notified', { expires: 7, path: '' });
  }
}

function stagNotification() {
  var cookieValue = Cookies.get('stagNotification');

  if(undefined == cookieValue){
    $('.notification').css('display', '');

    var notificationHeight = $('.notify').height();

    $('.notification').css('height', notificationHeight);
    $('.top-nav-bar').css('top', notificationHeight);
  }
}

function closeNotification(){
  $('.notify').remove();

  $('body').removeClass('notification-active');
  $('.notification').css('height', '');
  $('.top-nav-bar').css('top', '');

  Cookies.set('stagNotification', 'notified', { expires: 7 });
}

function functionSequence() {
  stag_load_template();
  load_side_menu();

  // Collapse now if page is not at top
  navbar_collapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbar_collapse);

  setTimeout(() => {
    stagAlertNotification();
  }, 1000);
}

// =========================================================
// On Load
// =========================================================
if (window.addEventListener) {
  window.addEventListener('load', function () {
    functionSequence();
  });
} else {
  window.attachEvent('onload', function () {
    functionSequence();
  });
}