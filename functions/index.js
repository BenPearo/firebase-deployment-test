const functions = require('firebase-functions');
const admin = require('firebase-admin');

// backend can bypass security roles
admin.initializeApp(functions.config().firebase);


// creates a document.create triggered function
// adds a message field from name to new document
exports.sendMessage = functions.firestore
    .document('products/{productId}')
    .onCreate((snapshot, context) => {
 
        // gets data from snapshot
        const newProduct = snapshot.data();
 
        // gets name from data
        const name = newProduct.name;

        // gets id of changed product from context
        const docId = context.params.productId;

        const productRef = admin.firestore().collection('products').doc(docId);

        return productRef.update({ message: `Nice ${name}! - Love Cloud Functions`});
    });