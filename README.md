# IndexedDB Promise

## What is it?

IndexedDB package, is another way to store data in the browser using the IndexedDB API. This package is a wrapper for the IndexedDB API, it is a promise based API that makes it easier to use IndexedDB. It is a great way to store data that you want to persist when the user closes the browser or refreshes the page. It is also a great way to store data when the user is offline.

## How do I use it?

### Installation

To install this package, run the following command in your terminal:

```bash
npm install indexeddbpromise
```

### Usage

Create a new directory in the react app inside of src folder called `utils`. Inside of that directory, create a new file called `helper.js`. Inside of that file, paste the following code:

```js
import { IdbPromise } from 'indexeddbpromise';

export const idb = new IdbPromise('store', [
  // store is the name of the database in the browser that will be created, you can change it to whatever you want.
  {
    oid: "id", // id is the name of the primary key, you can change it to whatever you want.
    name: 'products', // name of the Category that will be created in the browser storage. You can add as many as you want and change the name to whatever you want.
  },
]);
```

Now, you can import the `idb` object into any component that you want to use it in. You can use it to add, update, get and delete data from the browser database. To add or update you will use the `put` method. To get data you will use the `get` method. To delete data you will use the `delete` method.

```js
import { useState, useEffect } from 'react';
import { idb } from '../utils/helper';

function componentOne() {
  const storage = idb;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    storage.idbPromise('products', 'get').then((res) => {
      setProducts(res);
    });
  }, [storage]);

  const addItemHandler = () => {
    storage
      .idbPromise('products', 'put', {
        id: products.length + 1,
        name: 'test',
        description: 'test',
        price: 1,
        category: 'test',
      })
      .then((res) => {
        setProducts([...products, res]);
      });
  };

  const handleDelete = (item) => {
    storage.idbPromise('products', 'delete', item);
    // remove item from products array
    const newItem = products.filter((product) => product.id !== item.id);
    // set products to newProducts
    setProducts(newItem);
  };

  return (
    <div className='App'>
      <button onClick={addItemHandler}>add product</button>
      {products.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <p>{item.category}</p>
          <button onClick={() => handleDelete(item)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

## Questions

[email](mailto:jimenezraul1981@gmail.com).

## License

ISC License (ISC)
