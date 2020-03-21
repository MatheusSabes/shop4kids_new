

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    var body = document.querySelector('body');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        body.setAttribute('data-scrolling-mode', 'down');
    } else {
        body.setAttribute('data-scrolling-mode', 'none');
    }
}

/* Filter Mobile */

if (window.matchMedia("(max-width:993px)").matches) {
    var buttonFilter = document.querySelector('.button__filter')

    if (buttonFilter) {
        jQuery(buttonFilter).click(function (e) {
            e.preventDefault();
            $(this).parent().find('.page-catalog__filters').toggleClass('showFilter')
        });
    }
}
