/* Filter Mobile */


if ((jQuery('.page-catalog').length > 0) || (jQuery('.page-search').length > 0)) {

    jQuery(".button__filter").click(function () {
        jQuery(".page-catalog__left").addClass("showFilter");
    });

    jQuery(".fechar-filtros").click(function () {
        jQuery(".page-catalog__left").removeClass("showFilter");
    });
    
}
