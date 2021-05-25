(function (global) {
    var ns = {};
    var categoriesName = ["Adidas", "Nike", "Puma", "Reebok"];
    var categoriesHtml = "snippets/home.html";
    var specialsHtml = "snippets/specials.html";
    var allCategoriesUrl = "data/categories.json";
    var allItemUrl = "data/";
    var itemHtml = "snippets/catalog.html";

    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };
    var insertAllHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML += html;
    };
    var showAllLoading = function (selector) {
       var html = "";
        insertHtml(selector, html)
    };
    var showLoading = function (selector) {
        var html = "<div class='centered'>";
        html += "<img src='Fidget-spinner.gif' alt='loading'></div>";
        insertHtml(selector, html)
    };
    var insertProperty = function (string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    };

    document.addEventListener("DOMContentLoaded", function (event) {

        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            categoriesHtml,function (responseText) {
                document.querySelector("#main-content").innerHTML = responseText;
            }
           ,false
        );
        ns.loadCatalogCategories();
    });
    ns.loadCatalogCategories = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);

    };


    function buildAndShowCategoriesHTML(categories) {

            // Retrieve single category snippet
            $ajaxUtils.sendGetRequest(categoriesHtml, function (itemHtml) {

                var categoriesViewHtml = buildCategoriesViewHtml(categories,itemHtml);
                insertHtml("#main-content", categoriesViewHtml);
            }, false);

    }

    function buildCategoriesViewHtml(categories, itemHtml) {

      var finalHTML = "<div class='container'>";
        finalHTML += "<section class='row'>";

        // Loop over categories
        for (var i = 0; i < categories.length; i++) {
            // Insert category values
            var html = itemHtml;
            var name = "" + categories[i].name;
            var img = ""+categories[i].img;
            html = insertProperty(html, "name", name);
            html = insertProperty(html, "img", img);
            finalHTML += html;
        }

        finalHTML += "</section>";
        finalHTML += "</div>";
        return finalHTML;
    }
    ns.loadCatalogItems = function (categoryName) {
        if(categoryName==='Specials'){
        ns.loadSpecials();
        }else{
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(allItemUrl + categoryName + ".json", buildAndShowCatalogItemsHTML);
        }
    };
    ns.loadCatalog = function(){
        showAllLoading("#main-content");
        for(var i=0;i<categoriesName.length;i++){
            $ajaxUtils.sendGetRequest(allItemUrl + categoriesName[i] + ".json", buildAndShowAllItemsHTML);
        }
    };

    // Builds HTML for the single category page based on the data
    // from the server
    function buildAndShowCatalogItemsHTML(categoryCatalogItems) {
        // Load title snippet of catalog items page

            // Retrieve simple catalog item snippet
            $ajaxUtils.sendGetRequest(itemHtml, function (itemHtml) {


                var catalogItemsViewHtml = buildCatalogItemsViewHtml(categoryCatalogItems, itemHtml);
                insertHtml("#main-content", catalogItemsViewHtml);
            }, false);

    }
    function buildAndShowAllItemsHTML(categoryCatalogItems) {
        // Load title snippet of catalog items page

        // Retrieve simple catalog item snippet
        $ajaxUtils.sendGetRequest(itemHtml, function (itemHtml) {


            var catalogItemsViewHtml = buildCatalogItemsViewHtml(categoryCatalogItems, itemHtml);
            insertAllHtml("#main-content", catalogItemsViewHtml);
        }, false);

    }
    // Using category and catalog items data and snippets html
    // build catalog items view HTML to be inserted into page
    function buildCatalogItemsViewHtml(categoryCatalogItems, itemHtml) {

        var  finalHtml = "";

        // Loop over catalog items

        for (var i = 0; i < categoryCatalogItems.length; i++) {
            //Insert catalog item values
            var html = itemHtml;

            html = insertProperty(html, "name", categoryCatalogItems[i].name);

            html = insertProperty(html, "category", categoryCatalogItems[i].category);

            html = insertProperty(html, "size", categoryCatalogItems[i].size);

            html = insertProperty(html, "price", categoryCatalogItems[i].price);

            html = insertProperty(html, "img", categoryCatalogItems[i].img);

            finalHtml += html;
        }


        return finalHtml;
    }

    //Завантаження випадкової категорії з товарами
    ns.loadSpecials = function (categoryShort) {
        showLoading("#main-content");
        var randomCategoriesJSON = categoriesName.find((_, i, ar) => Math.random() < 1 / (ar.length - i));//ES6
        $ajaxUtils.sendGetRequest(allItemUrl + randomCategoriesJSON + ".json", buildAndShowCatalogItemsHTML);
    };




    global.$ns = ns;
})(window);
