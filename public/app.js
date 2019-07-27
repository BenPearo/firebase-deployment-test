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

    // order by price descending limit 5
    // const query = productsRef.orderBy('price', 'desc').limit(5);

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
        console.log(`Hello ${user.displayName}`);
    });
}

function uploadFile(files) {
    const storageRef = firebase.storage().ref();
    const file = files.item(0);
    const horseRef = storageRef.child(`images/${file.name}`);


    const task = horseRef.put(file);

    task.then(snapshot => {
        console.log(snapshot);
        snapshot.ref.getDownloadURL()
        .then(url => {
            document.querySelector('#imgUpload').setAttribute('src', url);
        });
    });
}