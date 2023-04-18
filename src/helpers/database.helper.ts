import { db } from '@/firebaseConfig';
import {
  ref,
  onValue,
  set,
  push,
  child,
  query,
  limitToLast,
  update,
  get,
  remove,
  type DatabaseReference
} from 'firebase/database';

export default class useDb {
  private dbRef:DatabaseReference;

  constructor(path:string) {
    this.dbRef = ref(db, path);
  }

  public fetchAll(callback:Function, limit = 25) {
    const fetchQuery = query(this.dbRef, limitToLast(limit));

    onValue(fetchQuery, (snapshot) => {
      callback(snapshot.val());
    });
  }

  public add(data:any, key?:string) {
    const newKey = this.getNewKey();
    set(child(this.dbRef, `${key || newKey}`), data);
    return key || newKey;
  }

  public get(id:string) {
    return new Promise((resolve, reject) => {
      get(child(this.dbRef, id))
        .then((snapshot) => {
          if (snapshot.exists()) {
            resolve(snapshot.val());
          } else {
            reject(null);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public update(id:string, data:object) {
    update(child(this.dbRef, id), data);
  }

  public delete(id:string) {
    remove(child(this.dbRef, id));
  }

  public getNewKey(path = '') {
    return push(child(this.dbRef, `/${path}`)).key;
  }
}
