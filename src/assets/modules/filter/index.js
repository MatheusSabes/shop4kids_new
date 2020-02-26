/* Filter Mobile */
if (window.matchMedia("(max-width:993px)").matches) {
    var buttonFilter = document.querySelector('.button__filter'),
        fecharFiltro = document.querySelector('.fechar-filtros')

    if (fecharFiltro) {
        jQuery(fecharFiltro).click(function (e) {

            e.preventDefault();
            $(this).parents('.showFilter').toggleClass('showFilter')
        });
    }

    if (buttonFilter) {
        jQuery(buttonFilter).click(function (e) {

            e.preventDefault();
            $(this).parent().find('.page-catalog__filters').toggleClass('showFilter')
        });
    }
}