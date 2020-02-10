function get_home_url() {
    var url = window.location;

    return url.origin+'/';
}

function get_url_path(){
    var url = window.location;

    var url_path_array = url.pathname.split('/');

    var url_path = "";

    for (var i = 0; i < url_path_array.length; i++) {
        if (url_path_array[i]) url_path = url_path + '/' + url_path_array[i];
    }

    return url_path;
}

function stag_activate_menu(){
    $('.nav-menu a').each(function (index, element){
        var $nav_link = $(element);

        var slug = get_url_path();

        if('' == slug || '/index.html' == slug){
            $('#home').addClass('active');
        }
        else if($nav_link.attr('href') == slug) {
            $nav_link.addClass('active');
        }
        else{
            var parent_slug = slug.split('/');
            $('#'+parent_slug[1]).addClass('active');
        }
    });
}

function stag_load_template(){
    var d = new Date();

    $('[data-load-template]').each(function (index, element) {
        let $element = $(element);

        $.ajax({
            url: get_home_url() + '/' + $element.data('load-template') + '.data?time=' + d.getSeconds(),
        }).done(function (result) {
            $element.html(result);

            if('navigation' == $element.data('load-template')){
                stag_activate_menu();
            }
        });
    });
}

function functionSequence() {
    stag_load_template();
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