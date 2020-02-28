document.querySelectorAll('a[href^="#ProdAbas"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector('#ProdAbas').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

if (jQuery('.related__list')) {
    jQuery('.related__list').each(function () {
        jQuery(this).find('.showcase__item--empty').remove();
        jQuery(this).not('.slick-initialized').slick({
            mobileFirst: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            prevArrow: `<button aria-label="prev" type="button" class="slick-prev"><</button>`,
            nextArrow: `<button aria-label="prev" type="button" class="slick-next">></button>`,
            responsive: [
                {
                    breakpoint: 426,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        arrows: false,
                        dots: true,
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }
            ]
        });
    });
}

jQuery(document).ajaxStop(function (event, xhr, settings) {


    if (jQuery('.page-product').length > 0) {
        jQuery('#plus').remove()
        jQuery('#minus').remove()
        jQuery('#quantidade').append('<button type="button" id="minus" > - </button> ');
        jQuery('#quantidade').append('<button type="button" id="plus"   > + </button> ');

    }
});

jQuery(document).on('click', '#plus', function () {
    var qtd = jQuery('#quant');
    var val = parseInt(qtd.val());

    if (val) {
        qtd.val(val + 1);
    }
})

jQuery(document).on('click', '#minus', function () {
    var qtd = jQuery('#quant');
    var val = parseInt(qtd.val());

    if ((val - 1) > 0) {
        qtd.val(--val);
    }
})
