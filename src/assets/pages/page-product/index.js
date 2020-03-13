document.querySelectorAll('a[href^="#ProdAbas"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector('#ProdAbas').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//produto-imagem-miniaturas
var $ = $tray;
if (typeof $ == 'function') {
    $(document).ready(function () {
        $(window).ajaxComplete(function (event, xhr, settings) {
            if (settings) {
                if (settings.url.indexOf('variant_gallery') !== -1) {
                    loadThumb();
                    slideimgproducts()
                }
            }
        });
        loadThumb();

        slideimgproducts()
    });

    function loadThumb() {
        var thumbs = $('.produto-imagem-miniaturas');

        if (thumbs.length) {
            thumbs.hide();

            var images = thumbs.find('img, .icon-video');
            let html;

            if ($('.thumbs').length) $('.thumbs').remove();

            if (images.length) {
                html = `<div class="thumbs">`;
                html += `<ul class="thumbs__list">`;

                images.each((index, item) => {
                    html += createThumb($(item).attr('src'), index);
                });

                html += `</ul>`;
                html += `</div>`;
                thumbs.after(html);

                $(document).trigger("thumbs:start");

                $('.thumbs a').click((evt) => {
                    let index = $(evt.currentTarget).attr('data-index');

                    selectThumb(index);

                    if ($(evt.currentTarget).find('.thumb__video').length) {
                        $('#colVideo').show();
                    } else {
                        $($('a', thumbs).eq(index)).mouseover().click();
                        $('#colVideo').hide();
                    }
                    evt.preventDefault();
                });

                selectThumb('0');
            }
        }
    }

    function selectThumb(index) {
        $(`.thumbs li`).removeClass('thumbs__item--actived');
        $(`.thumbs [data-index=${index}]`).closest('li').addClass('thumbs__item--actived');
    }

    function createThumb(src, index) {
        if (src) {
            return `<li class="thumbs__item"><a class="thumbs__link" data-index="${index}" href="#${index}"><img class="thumbs__image" src="${src}" /></a></li>`;
        } else {
            return `<li class="thumbs__item"><a class="thumbs__link" data-index="${index}" href="#${index}"><span class="thumb__video"></span></a></li>`;
        }
    }

    function slideimgproducts() {
        if (jQuery('.thumbs__list')) {
            jQuery('.thumbs__list').each(function () {
                jQuery(this).not('.slick-initialized').slick({
                    mobileFirst: false,
                    vertical: true,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    prevArrow: `<button aria-label="prev" type="button" class="slick-prev"><</button>`,
                    nextArrow: `<button aria-label="prev" type="button" class="slick-next">></button>`,
                    responsive: [
                        {
                            breakpoint: 426,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                vertical: false
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
    }
}

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

jQuery(document).ajaxComplete(function (event, xhr, settings) {

    if (jQuery('.page-product').length > 0) {
        if (settings.url.indexOf('/mvc/store/product/variant_form/') != -1 || settings.url.indexOf('/mvc/loja/loja/') != -1) {
            jQuery('#quantidade #plus').remove()
            jQuery('#quantidade #minus').remove()
            jQuery('#quantidade').append('<button type="button" id="minus" > - </button> ');
            jQuery('#quantidade').append('<button type="button" id="plus"   > + </button> ');
        }

        var buttonminus = '<button type="button" id="minus" class="product__quantity--button" data-cart="less" onclick="quantityCart(-1, this)" tabindex="0">-</button>',
            buttonplus = '<button type="button" id="plus" class="product__quantity--button" data-cart="more" onclick="quantityCart(1, this)" tabindex="0">+</button>'

        if (settings.url.indexOf('/mvc/loja/loja/') != -1) {
            $('.related__list  .product__quantity--button').remove()
            jQuery('.product__quantity').prepend(buttonminus);
            jQuery('.product__quantity').append(buttonplus);
        }

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

//Caracteristicas

