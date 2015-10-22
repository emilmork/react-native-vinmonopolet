var http = require('http'),
    express = require('express'),
    app = module.exports.app = express(),
    router = express.Router(),
    server = http.createServer(app),
    Immutable = require('immutable'),
    async = require('async');

var vinmonopolet = require('vinmonopolet');

var productCatalog = Immutable.Map();

var categories;

var getProductsForCategory = function(category) {
    vinmonopolet.getProductsByCategoryName(category, function(err, products) {
        productCatalog = productCatalog.set(category, products);
    });
}

async.map(['Øl','Rødvin','Hvitvin','Rosévin','Musserende vin','Fruktvin','Sterkvin','Brennevin','Alkoholfritt'], getProductsForCategory);


router.get('/categories', function(req, res) {
    if(categories) res.json(categories);

    vinmonopolet.getCategories(function(err, categories) {
      if(!categories) categories = categories;
      res.json(categories);
    });
});


var searchResults = Immutable.Map();

router.get('/categories/:name/:page', function(req, res) {
    var fromPos = (50*(req.params.page-1));
    var toPos = (50*req.params.page);

    console.log("Getting products for: " + req.params.name);
    var name = req.params.name;
    
    if(!name || name == '' || name == undefined) {
        console.log("Returning empty list");
        res.json([]);
    }

    if(!productCatalog.has(name)) {
        if(searchResults.has(name)) {
            res.json(searchResults.get(name).slice(fromPos, toPos));
            return;
        }

        vinmonopolet.searchProducts({
            query: name,
            detailed: false // Default is false - faster, but limited data set 
        }, function(err, results) {
            searchResults = searchResults.set(name, results);

            res.json(results.slice(fromPos, toPos));
        }); 
    } else {
        console.log("Returning products for cateogry " + req.params.name);

        res.json(productCatalog.get(req.params.name).slice(fromPos, toPos)); 
    }
});

router.get('/product/:sku', function(req, res) {
    vinmonopolet.getProduct(req.params.sku, function(err, product) {
        res.json(product);
    });
});


server.listen(process.env.PORT || 4000);
app.use('/api', router);

console.log("Server started on port 4000");






