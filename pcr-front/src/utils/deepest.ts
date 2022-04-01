/**
 * Get deepest value in an object chain
 *
 * @param object Object to deep dive
 * @param key key of the object which contains same type instance
 */
export function deepest<T, K extends {[P in keyof T]: T[P] extends T ? P : never}[keyof T]>(object: T, key: K): T {
  while (object[key]) {
    // tslint:disable-next-line:no-any
    object = object[key] as any;
  }

  return object;
}
