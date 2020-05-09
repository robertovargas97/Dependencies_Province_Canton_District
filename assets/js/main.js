//Module to avoid that the data can be viewed externally
$(document).ready(function () {

    //HTML ELEMENTS
    const provincesCR = $('#provincias');
    const cantonsCR = $("#cantones");
    const districtsCR = $("#distritos");

    /**
     * Creates a new <option> tag for a <select> element in the HTML and appends it to the specified container
     * @param  {Object} geographicData
     * @descriptor An object that contains name and id of provinces,cantons or districts 
     * @param  {Object} container
     * @descriptor Element that going to contain the new option tag
     */
    const appendOptionElement = (geographicData, container) => {
        const quantityOfLocations = Object.keys(geographicData).length;

        for ( let i = 1 ; i <= quantityOfLocations; i++) {
            let newElement = document.createElement('option');
            newElement.text = geographicData[i];
            newElement.value = i;
            container.append(newElement);
        }
    };

    /**
        * Gets the names and identifiers of provinces,cantons or districts from a CDN through an AJAJ request if the request is OK , show an error otherwise
        * @param  {Function reference} fuctionToUse
        * @descriptor The fuction to fill the select HTML element with either provinces,cantons or districst
        * @param  {number} provinceId
        * @descriptor The province identifier
        * @param  {number} cantonId
        * @descriptor The canton identifier
        */
    const getGeographicData = (fuctionToUse, provinceId = 0, cantonId = 0) => {
        let url = "";
        url = (provinceId === 0 && cantonId === 0) ? 'https://ubicaciones.paginasweb.cr/provincias.json'
            : (provinceId > 0 && cantonId === 0) ? `https://ubicaciones.paginasweb.cr/provincia/${provinceId}/cantones.json`
                : (provinceId > 0 && cantonId > 0) ? `https://ubicaciones.paginasweb.cr/provincia/${provinceId}/canton/${cantonId}/distritos.json`
                    : "";
        $.ajax({
            dataType: "json",
            url: url,

            success: function (data) {
                fuctionToUse(data);
            },

            error: function (xhr, status) {
                console.log('Error : ', status);
            }
        });
    };

    /**
       * Fills the <select> element with provinces
       * @param  {Object} provinces
       * @descriptor An object that contains name and id of provinces
       */
    const fillProvinces = (provinces) => {
        appendOptionElement(provinces, provincesCR);
    };

    /**
       * Fills the <select> element with cantons
       * @param  {Object} cantons
       * @descriptor An object that contains name and id of cantons
       */
    const fillCantons = (cantons) => {
        cantonsCR.empty();
        appendOptionElement(cantons, cantonsCR);
    };

    /**
       * Fills the <select> element with districts
       * @param  {Object} districts
       * @descriptor An object that contains name and id of districts
       */
    const fillDistricts = (districts) => {
        districtsCR.empty();
        appendOptionElement(districts, districtsCR);
    };

    /**
     * Fills for firs time the <select> elements in the HTML with provinces, cantons and districts
     * @param  {Object} districts
     * @descriptor An object that contains name and id of districts
     */
    const startSelectDependencies = () => {
        getGeographicData(fillProvinces);
        getGeographicData(fillCantons, 1);
        getGeographicData(fillDistricts, 1, 1);
    };


    //EVENTS (They must be very simple)

    provincesCR.change(() => {
        getGeographicData(fillCantons, provincesCR.val());
        getGeographicData(fillDistricts, provincesCR.val(), cantonsCR.val());
    });

    cantonsCR.change(() => {
        getGeographicData(fillDistricts, provincesCR.val(), cantonsCR.val());
    });


    startSelectDependencies();
});
