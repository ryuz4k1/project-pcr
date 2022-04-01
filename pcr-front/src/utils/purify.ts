/**
 * Remove props which has value `undefined` or `null`
 *
 * @param object Object to purify
 */
export function purify<T extends Object>(object: T): Partial<T> { // tslint:disable-line:ban-types
  const newObject = {...object};

  for (const [key, value] of Object.entries(newObject)) {
    if (value === null || value === undefined || value === '') {
      Reflect.deleteProperty(newObject, key);
    }
  }

  return newObject;
}
