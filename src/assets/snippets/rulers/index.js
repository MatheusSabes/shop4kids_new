jQuery(document).ready(function ($) {
    if (jQuery('.rulers__list')) {
        jQuery('.rulers__list').not('.slick-initialized').slick({
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            prevArrow: ``,
            nextArrow: ``,
            autoplay: true,
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
});