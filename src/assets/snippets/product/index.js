


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
