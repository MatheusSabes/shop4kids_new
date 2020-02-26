if (jQuery('.rulers__list')) {
    jQuery('.rulers__list').not('.slick-initialized').slick({
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        prevArrow: `<button type="button" aria-label="prev" class="slick-prev"><</button>`,
        nextArrow: `<button type="button" aria-label="next" class="slick-next">></button>`,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }
        ]
    });
}

console.log('Botao do filtro: ');
if (window.matchMedia("(max-width:993px)").matches) {
    var buttonFilter = document.querySelector('.button__filter')

    if (buttonFilter) {
        jQuery(buttonFilter).click(function (e) {
            console.log('Entrei no botao');

            e.preventDefault();
            $(this).parent().find('.page-catalog__filters').toggleClass('showFilter')
        });
    }
}