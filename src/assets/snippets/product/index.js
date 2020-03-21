


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

console.log('Testando')
//Slick Variants
jQuery( document ).ajaxComplete(function( event, xhr, settings ) {
    if ( settings.url.indexOf("snippet=snippets/product-payment") != -1 ) {
      console.log("Triggered ajaxComplete handler. The result is " +
        xhr.responseText);
    }
})

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