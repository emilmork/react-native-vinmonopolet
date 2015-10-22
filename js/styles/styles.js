var { StyleSheet } = require('react-native');

module.exports = StyleSheet.create({
    categories_container : {
        marginTop: 70,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    category_container: {
        marginTop: 10,
        marginBottom: 10,
        width: 115,
        height: 155,
    },
    category_title: {
        alignSelf: 'center',
        fontSize: 14, 
        marginTop: 5, 
        fontWeight: 'bold'
    },
    category_image: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        
    },
    product_list_item: {
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#686868'
    },
    product_list_title: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 15
    },
    details_row: {
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#cacaca'
    }
});
