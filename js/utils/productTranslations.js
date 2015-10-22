module.exports = {
    'title': { name: 'Tittel'},
    'method': { name: 'Metode' },
    'containerSize': { name: 'Mengde', getVal: val => `${val}l` },
    'ingredients': { name: 'Ingredienser'},
    'color': { name: 'Farge' },
    'freshness': { name: 'Friskhet' },
    'fullness': { name: 'Fyldighet' },
    'distributor': { name: 'Distributør' },
    'productType': { name: 'Type' },
    'storable': { name: 'Lagring'},
    'foodPairings': {name: 'Passer til', getVal: val => val.join(", ") },
    'price': { name: 'Pris', getVal: val => `Kr. ${val} ,-` },
    'bitterness': { name: 'Bitterhet' }
};