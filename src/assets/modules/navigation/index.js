
function moving() {
    var body = document.querySelector('body');
    var currentTop = 0;
    var oldTop = 0;
    var headerTop = document.querySelector('#header').offsetHeight;

    body.setAttribute('data-scrolling', false);
    body.setAttribute('data-scrolling-mode', 'none');

    window.addEventListener('scroll', () => {
        currentTop = window.pageYOffset;

        if (currentTop == 0) body.setAttribute('data-scrolling', false);
        else body.setAttribute('data-scrolling', true);

        if (currentTop > headerTop) {
            if (oldTop > currentTop) {
                body.setAttribute('data-scrolling-mode', 'up');
            } else if (oldTop < currentTop) {
                body.setAttribute('data-scrolling-mode', 'down');
            } else {
                body.setAttribute('data-scrolling-mode', 'none');
            }
            oldTop = currentTop;
        } else body.setAttribute('data-scrolling-mode', 'none');
    });
}

moving()

/* Filter Mobile */

if (window.matchMedia("(max-width:993px)").matches) {
    var buttonFilter = document.querySelector('.button__filter')
    console.log('Botao do filtro: ', buttonFilter);

    if (buttonFilter) {
        jQuery(buttonFilter).click(function (e) {
            console.log('Entrei no botao');

            e.preventDefault();
            $(this).parent().find('.page-catalog__filters').toggleClass('showFilter')
        });
    }
}
