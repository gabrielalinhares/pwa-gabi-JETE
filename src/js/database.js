import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database -- OK
export const putDb = async (content) => {
  const DatabaseJate = await openDB("jate", 1);
  const transc = DatabaseJate.transaction("jate", "readwrite");
  const storeJT = transc.objectStore("jate");

  const count = (await storeJT.get("counter")) || 0;
  count++;
  const result = await storeJT.put({ id: count, value: content });

  await transaction.done;

  console.log("Text has been saved in the database!", result);
};
// console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database -- OK
export const getDb = async () => {
  console.log("Text pulled from the database.");
  const DatabaseJate = await openDB("jate", 1);

  const transc = DatabaseJate.transaction("jate", "readwrite");
  const storeJT = transc.objectStore("jate");

  const result = await storeJT.getAll();

  await transaction.done;

  console.log("result.value", result.value);

  return result.value;
};
//console.error('getDb not implemented');

initdb();
