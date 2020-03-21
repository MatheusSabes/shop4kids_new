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

    if ($('.product__variants--item').length) {
        $(document).on('click', '.product__variants--item', function () {
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