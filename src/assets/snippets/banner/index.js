
if ($('.banner--javascript .banner__list')) {
    $('.banner--javascript .banner__list').not('.slick-initialized').slick({
        mobileFirst: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: `<button aria-label="prev" type="button" class="slick-prev"><</button>`,
        nextArrow: `<button aria-label="next" type="button" class="slick-next">></button>`,
        responsive: [
            {
                breakpoint: 424,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
}

if ($('.banner--grid .banner__list')) {
    $('.banner--grid .banner__list').not('.slick-initialized').slick({
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: `<button type="button" aria-label="prev" class="slick-prev"><</button>`,
        nextArrow: `<button type="button" aria-label="next" class="slick-next">></button>`,
        responsive: [
            {
                breakpoint: 424,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            }
        ]
    });
}


if ($('.page-home__mobile--list')) {
    $('.page-home__mobile--list').not('.slick-initialized').slick({
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        prevArrow: `<button type="button" aria-label="prev" class="mobile-slick-next slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></button>`,
        nextArrow: `<button type="button" aria-label="next" class="mobile-slick-prev slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></button>`,
        autoplaySpeed: 5500,
    });
}