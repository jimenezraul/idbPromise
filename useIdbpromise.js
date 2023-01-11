import { useState, useEffect } from "react";

const useIdbPromise = (idb, table, method, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await idb.idbPromise(table, method, params);
 
        let item;
        if (response.length > 0) {
          item = response[0];
        } 
        setData(item);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [table, method, params, idb]);

  return { data, loading, error };
};

export default useIdbPromise;