# IndexedDB Promise

## What is it?

This is a IndexedDB for React. IndexedDB is a browser API that allows you to store data in the browser. It is a great way to store data that you want to persist between sessions. It is also a great way to store data that you want to use offline.

## How do I use it?

### Installation

### Usage

Create a new directory in the react app inside of src folder called `utils`. Inside of that directory, create a new file called `helper.js`. Inside of that file, paste the following code:

```js
import { IdbPromise } from 'indexeddbpromise';

export const idb = new IdbPromise('store', [
  // store is the name of the database that will be created you can change it to whatever you want.
  {
    name: 'products', // name of the object store that will be created, you can change it to whatever category you want.
  },
  {
    name: 'categories',
  },
  {
    name: 'cart',
  },
  // you can add as many object stores as you want.
]);
```

Now, you can import the `idb` object into any component that you want to use it in. You can use it to add, get, and delete data from the database. To add or update you will use the `put` method. To get data you will use the `get` method. To delete data you will use the `delete` method.

```js
import { useState, useEffect } from 'react';
import { idb } from '../utils/helper';

const function componentOne{
  const storage = idb;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    storage.idbPromise('products', 'get').then((res) => {
      setProducts(res);
    });
  }, [storage]);

  const addItem = () => {
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
      <button onClick={addItem}>add product</button>
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

## How do I contribute?

If you would like to contribute to this project, please fork the repo and submit a pull request. If you have any questions, please feel free to reach out to me at [email](mailto:jimenezraul1981@gmail.com).

## License
 
ISC License (ISC)