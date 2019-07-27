document.addEventListener("DOMContentLoaded", e => {
    
    const app = firebase.app();
    
    const db = firebase.firestore();

    const myPost = db.collection('posts').doc('firstpost');

    // on myPost value changed
    myPost.onSnapshot(doc => {

            const data = doc.data();

            console.log(data);
            console.log(data.title);
            console.log(data.name);

        });

    const productsRef = db.collection('products');

    // searching for item with predicate
    const query = productsRef.where('price', '>=', 10);

    query.get()
    .then(products => {
        products.forEach(doc => {
            data = doc.data();
            console.log(`${data.name} at $${data.price}`);
        });
    });

});

function updatePost(e) {
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');
    myPost.update({ title: e.target.value });
}

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result => {
        const user = result.user;
        document.write(`Hello ${user.displayName}`);
    });
}