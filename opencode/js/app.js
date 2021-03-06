/* Filter Mobile */


if ((jQuery('.page-catalog').length > 0) || (jQuery('.page-search').length > 0)) {

    jQuery(".button__filter").click(function () {
        jQuery(".page-catalog__left").addClass("showFilter");
    });

    jQuery(".fechar-filtros").click(function () {
        jQuery(".page-catalog__left").removeClass("showFilter");
    });
    
}

jQuery('document').ready(function ($) {
    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    $(document).on('click', '.uptodate', function (del) {
        ///web_api/carts/{session_id}/{product_id}
        var dataSession = $("html").attr("data-session");
        var productID = parseInt($(this).data('id'))
        var VariantId = $(this).data('variationId')
        $.ajax({
            method: "DELETE",
            url: "/web_api/carts/" + dataSession + "/" + productID + '/' + VariantId
        }).done(function (response, textStatus, jqXHR) {
            $(document).trigger('cart_update')
        })
    })



    $(document).on('cart_update', function (response) {
        var dataSession = $("html").attr("data-session");
        $.ajax({
            method: "GET",
            url: "/web_api/cart/" + dataSession
        }).done(function (response, textStatus, jqXHR) {
            console.log(response);
            if (response) {
                if ($('.minicart__list').length) {
                    $('.minicart__list').html('')
                }

                var AmountItens = 0

                var NMount = response.map(item => {
                    AmountItens = AmountItens + parseInt(item.Cart.quantity)
                })

                $('.cart__amount').html(pad(AmountItens))
                for (const i in response) {
                    if (response.hasOwnProperty(i)) {
                        const item = response[i];

                        var ItemCart = '<li class="minicart__item">\
                            <a class="minicart__link" href="'+ item.Cart.product_url.https + '">\
                                <figure class="minicart__image">\
                                    <img src="'+ item.Cart.product_image.thumbs[90].https + '" alt="' + item.Cart.product_name + '">\
                                </figure>\
                                <span class="minicart__info">\
                                    <h2 class="minicart__name">'+ item.Cart.product_name + '</h2>\
                                    <span class="minicart__details">\
                                        <span class="minicart__price">R$ &nbsp;'+ item.Cart.price + '</span>\
                                        <span class="minicart__qty">'+ item.Cart.quantity + ' Un.</span>\
                                    </span>\
                                    <button class="minicart__delete uptodate" type="button" data-id="'+ item.Cart.product_id + '" data-variation-id="' + item.Cart.variant_id + '">\
                                        X\
                                    </button>\
                                </span>\
                            </a>\
                        </li>'
                        if (response.length <= 1) {
                            $('.minicart__main').append('<ul class="minicart__main">' + ItemCart + '</ul>')
                            $('.minicart__empty').remove()
                        } else {

                            $('.minicart__list').append(ItemCart)
                        }
                    }
                }

                $('.header__minicart--popup').addClass('show')

                setTimeout(() => {
                    $('.header__minicart--popup').removeClass('show')
                }, 5000);
            }
        }).fail(function (jqXHR, status, errorThrown) {
            var response = $.parseJSON(jqXHR.responseText);
            console.log(response);
        });
    })

    if (jQuery('.buy__button').length) {

        jQuery('.buy__button').on('click', function (e) {
            e.preventDefault()

            var dataSession = jQuery("html").attr("data-session");
            var dataProdutoId = jQuery(this).parent().attr("data-product"),
                dataVariant = jQuery(this).parent().data('variantId')

            if (!dataVariant) {
                $(this).parent().prepend('<div class="product__actions--status">Selecione uma Variação</div>')
                setTimeout(() => {
                    $('.product__actions--status').remove()
                }, 3000);
                return false
            }

            console.log('ID do produto', dataProdutoId);

            var dataQuantity = jQuery(this).closest('.product__actions').find('.product__quantity--input').val() || 0;

            jQuery.ajax({
                method: "POST",
                url: "/web_api/cart/",
                contentType: "application/json; charset=utf-8",
                data: '{"Cart":{"session_id":"' + dataSession + '","product_id":"' + dataProdutoId + '", "quantity":"' + dataQuantity + '" ,"variant_id":"' + dataVariant + '"}}'

            }).done((response, textStatus, jqXHR) => {

                setTimeout(function () {
                    jQuery('.buy__button--ok').remove();
                    $(document).trigger('cart_update')
                }, 2000);

                //dispatchEvent(CART_UPDATE)

            }).fail(function (jqXHR, status, errorThrown) {

                var response = jQuery.parseJSON(jqXHR.responseText);
            });
        });
    }

    if ($('.product__variant--item').length) {
        $(document).on('click', '.product__variant--item:not(.inactive)', function () {
            var dataVariant = $(this).data('id')
            if (dataVariant) {
                $(this).parents('.product__actions').data('variantId', dataVariant)
                $(this).toggleClass('select')
            }
        })
    }
})

if (window.matchMedia("(max-width:991px)").matches) {
    jQuery(document).on('click', '.header__minicart', function () {
        document.querySelector('.cart__dropdown').classList.add('show')
    })
}
 


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



if (jQuery('.showcase__list[data-carousel=true]')) {
    jQuery('.showcase__list[data-carousel=true]').each(function () {
        jQuery(this).find('.showcase__item--empty').remove();
        jQuery(this).not('.slick-initialized').slick({
            mobileFirst: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
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
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }
            ]
        });
    });
}

if (jQuery('.showcase__item')) {
    jQuery('.showcase__item').each(function () {
        jQuery(this).find('.product__variants').not('.slick-initialized').slick({
            mobileFirst: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            prevArrow: `<button aria-label="prev" type="button" class="slick-prev"><</button>`,
            nextArrow: `<button aria-label="prev" type="button" class="slick-next">></button>`,
            responsive: [
                {
                    breakpoint: 426,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2
                    }
                }
            ]
        });
    });
}

console.log('Testes na variação');
 
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



if ($('.banner--javascript .banner__list')) {
    $('.banner--javascript .banner__list').not('.slick-initialized').slick({
        mobileFirst: false,
        infinite: true,
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

 



var button = $('#bt-submit-comments');

if(button) {
    var buttonAction = $(`<button class="comments__button" type="button">Avaliar</button>`);
    button.after(buttonAction);

    buttonAction.click(() => {
        button.trigger('click');
    });
}



// function FakeSelect() {
//     $('select').each(function(){
//         if($(this).closest('.fake-select').length === 0) {
//             var text = $(this).find('option:selected').text();
//             var fake = $('<div class="fake-select">');
//             var label = $('<span class="fake-select__label">').text(text);
//             var cssClass = $(this).attr('class').split(' ');

//             cssClass.forEach((item) => {
//                 if(item !== '') {
//                     fake.addClass(item);
//                 }
//             })

//             fake.prepend(label);
//             $(this).after(fake);
//             fake.append(this);

//             $(this).change(() => { label.text($(this).find('option:selected').text()) });
//         }
//     });
// }

// FakeSelect();

// document.addEventListener('FAKESELECT', () => { FakeSelect() }, false);



function debounce(func) {
    var timer;
    return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 200, event);
    };
}

function navigationHiddenResize() {
    var widthNavigation = $('.menu--navigation .menu__ul--nv1').outerWidth();
    var widthCurrent = 0;
    $('.menu--navigation .menu__item--nv1').removeClass('menu__item--hidden');
    $('.menu--navigation .menu__item--nv1').each(function () {
        widthCurrent += $(this).outerWidth();
        if (widthCurrent > widthNavigation) {
            $(this).addClass('menu__item--hidden');
        }
    });
}

function navigationAlign() {
    $('.menu--navigation').each(function () {
        $(this).find('.menu--nv2').removeClass('menu--rtl');
        $(this).find('.menu--nv2').each(function () {
            var nav = $(this).closest('.menu--nv1').outerWidth();
            var left = $(this).offset().left + $(this).outerWidth();

            if (left > nav) {

                $(this).addClass('menu--rtl');
            }
        });
    })
}


$('.set').click(function (e) {
    e.preventDefault();
    console.log('Nivel 1: ', this);

    if ($(this).parent().hasClass('menu__item--has-child')) {
        var expanded = $(this).parent().attr('aria-expanded');
        $(this).parent().attr('aria-expanded', expanded === 'true' ? false : true)
        $(this).parent().find('> .menu--sub').slideToggle();
    }
});


/* childs.forEach((child) => {
    child.addEventListener('click', (evt) => {
        var target = evt.target;
        console.log('Target Menu: ', evt);

        if (target.classList.contains('menu__item--has-child')) {
            var expanded = target.getAttribute('aria-expanded');
            target.setAttribute('aria-expanded', expanded === 'true' ? false : true);
            $(target).find('> .menu--sub').slideToggle();
        }
    }, false);
}); */

// window.addEventListener('resize', debounce(function(e){
//     navigationHiddenResize();
//     navigationAlign();
// }));

// navigationHiddenResize();
// navigationAlign();

//Blur menu



jQuery('nav.navigation').click(function (e) {
    e.stopPropagation();
})

jQuery('.button--menu').click(function (e) {
    e.stopPropagation();
    jQuery('body').addClass('menu__open')
    jQuery('.navigation__bg').addClass('show')
});

jQuery('.button__close--navigation').click(function () {
    jQuery('body').removeClass('menu__open')
    jQuery('.navigation__bg').removeClass('show')
});

jQuery('.navigation__bg').click(function (e) {
    jQuery('body').removeClass('menu__open')
    jQuery(this).removeClass('show')
});

/* Menu Mobile */
if (window.matchMedia("(max-width:993px)").matches) {
    var attendance = document.querySelector('.header__attendance')

    if (attendance) {
        jQuery('.navigation__main').append(attendance)
    }
}




window.quantityCart = quantityCart;

function quantityCart(quantity, button) {
    var inputQuantity = jQuery(button).closest('.product__quantity').find('.product__quantity--input')
    var valueQuantity = parseInt(inputQuantity.val());

    if (valueQuantity > 0) {
        if (valueQuantity == 1 && jQuery(button).is('#minus')) {
            inputQuantity.val(1)
        } else {
            inputQuantity.val(valueQuantity + quantity)
        }
    }
}


jQuery('.page-catalog .product__variant').not('.slick-initialized').slick({
    mobileFirst: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
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
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ]   
});
if(document.querySelector('.page-catalog .product__variant')){
}

// import axios from 'axios';

// document.addEventListener("DOMContentLoaded", function(){

//     var tabs = document.querySelector('.product-tabs');
//     if(tabs){
//         var urls = Array.from(tabs.querySelectorAll('[data-url]'));

//         urls.forEach((element) => {
//             var url = element.getAttribute('data-url');
//             axios.get(url)
//                 .then((data) => data.data)
//                 .then((data) => element.innerHTML = data);
//         });

//         var customTabs = Array.from(document.querySelectorAll('.product-tabs--custom .product-tabs__link'));

//         customTabs.forEach((customTab) => {
//             customTab.addEventListener('click', (evt) => {
//                 var href = evt.currentTarget.getAttribute('href');
//                 var hash = href.match(/^[^#]*#(.*)/)[1];

//                 if(hash) {
//                     var contents = Array.from(document.querySelectorAll('.prodBox'));
//                     var current = document.querySelector(`#${ hash }`);

//                     contents.forEach((content) => content.setAttribute('style', 'display:none'));
//                     if(current) current.setAttribute('style', 'display: block');

//                     customTabs.forEach((customTab) => customTab.classList.remove('on'));
//                     evt.currentTarget.classList.add('on');

//                 }

//                 evt.preventDefault();
//             });
//         });

//         if(customTabs.length) {
//             customTabs[0].classList.add('on');
//         }
//     }
// });


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


});


// var $ = $tray;
// if( typeof $ == 'function') {
//     $(document).ready(function(){
//         $(window).ajaxComplete(function( event, xhr, settings ){
//             if(settings) {
//                 if(settings.url.indexOf('variant_gallery') !==  -1) {
//                     loadThumb();
//                 }
//             }
//         });
//         loadThumb();
//     });

//     function  loadThumb() {
//         var  thumbs  =  $('.produto-imagem-miniaturas');

//         if(thumbs.length) {
//             thumbs.hide();

//             var   images  =  thumbs.find('img, .icon-video');
//             let     html;
            
//             if($('.thumbs').length) $('.thumbs').remove();

//             if(images.length) {
//                 html  =  `<div class="thumbs">`;
//                 html  +=  `<ul class="thumbs__list">`;
                
//                 images.each((index, item) => {
//                     html  +=  createThumb($(item).attr('src'), index);
//                 });
            
//                 html  +=  `</ul>`;
//                 html  +=  `</div>`;
//                 thumbs.after(html);

//                 $(document).trigger("thumbs:start");
                
//                 $('.thumbs a').click((evt) => {
//                     let index = $(evt.currentTarget).attr('data-index');

//                     selectThumb(index);
                    
//                     if ($(evt.currentTarget).find('.thumb__video').length) { 
//                         $('#colVideo').show();
//                     } else {
//                         $($('a', thumbs).eq(index)).mouseover().click();
//                         $('#colVideo').hide();
//                     }
//                     evt.preventDefault();
//                 });			
                
//                 selectThumb('0');
//             }
//         }
//     }
    
//     function selectThumb(index) {
//         $(`.thumbs li`).removeClass('thumbs__item--actived');
//         $(`.thumbs [data-index=${index}]`).closest('li').addClass('thumbs__item--actived');
//     }

//     function  createThumb(src,index) {
//         if (src) {
//             return  `<li class="thumbs__item"><a class="thumbs__link" data-index="${index}" href="#${index}"><img class="thumbs__image" src="${src}" /></a></li>`;
//         }else{
//             return `<li class="thumbs__item"><a class="thumbs__link" data-index="${index}" href="#${index}"><span class="thumb__video"></span></a></li>`;
//         }
//     }
// }
 