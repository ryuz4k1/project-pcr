import { environment } from 'src/environments/environment';

export function modelDataMatcher<T>(data: Partial<T>, context: T): void {
  for (const [key, value] of Object.entries(data)) {
    // @ts-ignore
    if (context.hasOwnProperty(key)) {
      // tslint:disable-next-line:no-any
      (context as any)[key] = value;
    }
  }
}

export function fromCouple<T, S>(
  data: Partial<S>,
  model: new (data: Partial<T>) => T,
  keysToConvert: { [P in keyof Partial<S>]: (value: S[P], stock: Partial<T>) => { [K in keyof Partial<T>]: T[K] } },
  dataToSet: Partial<T> = {}
): T {
  const convertedData: Partial<T> = {};

  // tslint:disable-next-line:no-any
  for (const [key, value] of Object.entries(data).filter(([, v]) => v !== null) as [keyof S, any][]) {
    if (key in keysToConvert) {
      const result = keysToConvert[key](value, convertedData);

      for (const [k, v] of Object.entries(result)) {
        // tslint:disable-next-line:no-any
        (convertedData as any)[k] = v;
      }

    } else {
      // tslint:disable-next-line:no-any
      (convertedData as any)[key as string] = value;
    }
  }

  return new model({...convertedData, ...dataToSet});
}

type PropsOf<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];

export function toDate<S>(...propNames: PropsOf<S, string>[]): { [key: string]: (value: string) => { [key: string]: Date } } {
  return propNames.reduce((acc, next) => ({...acc, [next]: (date: string) => ({[next]: new Date(date)})}), {});
}

export function toIsoString<S>(...propNames: PropsOf<S, Date>[]): { [key: string]: (value: Date) => { [key: string]: string } } {
  return propNames.reduce((acc, next) => ({...acc, [next]: (date: Date) => ({[next]: date.toISOString()})}), {});
}

export function toUrl<S>(...propNames: PropsOf<S, string>[]): { [key: string]: (value: string) => { [key: string]: string } } {
  return propNames.reduce((acc, next) => ({...acc, [next]: (url: string) => ({[next]: environment.api + url})}), {});
}

export function toPhoneNumber<S>(...propNames: PropsOf<S, string>[]): { [key: string]: (value: string) => { [key: string]: string } } {
  return propNames.reduce((acc, next) => ({
    // tslint:disable-next-line:no-any
    ...acc, [next]: (url: any) => ({
      [next]: url.replace(
        /^(90|9|0)?(\d{3})?\s?(\d{3})?\s?(\d{4}|\d{2}\s\d{2})?(.*)/g,
        replacer
      )
    })
  }), {});
}

export function replacer(_full: string, _prefix: string, operator: string, group1: string, group2: string, rest: string): string {
  rest = rest.replace(/\D/g, '');

  if (!operator) {
    return rest;
  }
  if (!group1) {
    return `${operator} ${rest}`;
  }
  if (!group2) {
    return `${operator} ${group1} ${rest}`;
  }
  return `${operator} ${group1} ${(group2 || '').replace(/\s/, '')}`;
}

export function pluck(
  propName: string,
  key: string,
  modelPropName: string = propName
): { [key: string]: (value: string) => { [key: string]: string } } {
  // tslint:disable-next-line:no-any
  return {[propName]: value => ({[modelPropName]: (value as any)[key]})};
}

export function parseWith<S, SS, _M, MM>(
  propName: PropsOf<S, SS>, parser: (value: SS) => MM
): { [key: string]: (value: SS) => { [key: string]: MM } } {
  return {[propName]: value => ({[propName]: parser(value)})};
}

export function parseArrayWith<S, SS, _M, MM>(
  propName: string, parser: (value: SS) => MM
): { [key: string]: (value: SS[]) => { [key: string]: MM[] } } {
  return {[propName]: value => ({[propName]: value.map(item => parser(item))})};
}

const LANGUAGES = ['En'];

// tslint:disable-next-line:max-line-length
export function langualize<S>(prop: keyof S): { [key: string]: (value: string, current: { [key: string]: { [key: string]: string } }) => { [key: string]: { [key: string]: string } } } {
  return {
    [prop]: value => ({[prop]: {Tr: value}}),
    // tslint:disable-next-line:max-line-length
    ...LANGUAGES.reduce((acc, next) => ({
      ...acc,
      [prop + next]: (val: string, current: { [key: string]: { [key: string]: string } }) => ({
        [prop]: {
          ...current[prop as string],
          [next]: val
        }
      })
    }), {}),
  };
}

export function deLangualize<S>(prop: keyof S): { [key: string]: (value: { [key: string]: string }) => { [key: string]: string; } } {
  return {
    [prop]: value => ({
      [prop]: value.Tr,
      ...LANGUAGES.reduce((acc, next) => ({...acc, [prop + next]: value[next]}), {})
    })
  };
}
