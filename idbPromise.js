class IdbPromise {
  constructor(request, objectArray) {
    this.request = request;
    this.objectArray = objectArray;
  }

  getRequest() {
    return this.request;
  }

  getObjectArray() {
    return this.objectArray;
  }

  idbPromise(storeName, method, object) {
    const store = this.request;
    const request = window.indexedDB.open(store, 1);
    const objectArray = this.getObjectArray();

    return new Promise((resolve, reject) => {
      // create variables to hold reference to the database, transaction (tx), and object store
      let db, tx, store;

      // if version has changed (or if this is the first time using the database), run this method and create the object stores
      request.onupgradeneeded = function (e) {
        const db = request.result;

        // create object store for each type of data and set "primary" key index to be the `id` of the data
        objectArray.forEach((object) => {
          db.createObjectStore(object.name, { keyPath: object.oid });
        });
      };

      // handle any errors with connecting
      request.onerror = function (e) {
        console.log('There was an error');
      };

      // on database open success
      request.onsuccess = function (e) {
        // save a reference of the database to the `db` variable
        db = request.result;
        // open a transaction do whatever we pass into `storeName` (must match one of the object store names)
        tx = db.transaction(storeName, 'readwrite');
        // save a reference to that object store
        store = tx.objectStore(storeName);

        // if there's any errors, let us know
        db.onerror = function (e) {
          console.log('error', e);
        };

        switch (method) {
          case 'put':
            store.put(object);
            resolve(object);
            break;
          case 'get':
            const all = store.getAll();
            all.onsuccess = function () {
              resolve(all.result);
            };
            break;
          case 'delete':
            store.delete(object.id);
            break;
          default:
            console.log('No valid method');
            break;
        }

        // when the transaction is complete, close the connection
        tx.oncomplete = function () {
          db.close();
        };
      };
    });
  }
}

export default IdbPromise;
