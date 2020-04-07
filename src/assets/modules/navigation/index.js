

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

