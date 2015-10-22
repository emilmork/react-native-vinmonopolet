const images = {
    'Øl': require('image!category_ol'),
    'Rødvin': require('image!category_rodvin'),
    'Hvitvin': require('image!category_hvitvin'),
    'Rosévin': require('image!category_rosevin'),
    'Musserende vin': require('image!category_musserende_vin'),
    'Fruktvin': require('image!category_fruktvin'),
    'Sterkvin': require('image!category_sterkvin'),
    'Brennevin': require('image!category_brennevin'),
    'Alkoholfritt': require('image!category_alkoholfritt')
}

module.exports = {
    forCategory(category) {
        return images[category];
    }
}