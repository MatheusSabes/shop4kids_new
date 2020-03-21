
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
