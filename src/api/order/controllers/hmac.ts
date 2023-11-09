import * as crypto from 'crypto';

export const Hmac = {
  create: function (data: Record<string, any>, key: string, algo: string = 'sha256'): string {
    if (!crypto.getHashes().includes(algo)) {
      return '';
    }

    data = Hmac._strValAndSort(data);

    return crypto
      .createHmac(algo, key)
      .update(JSON.stringify(data).replace("/", "\\/"))
      .digest('hex');
  },

  verify: function (data: Record<string, any>, key: string, sign: string, algo: string = 'sha256'): boolean {
    const _sign = Hmac.create(data, key, algo);
    return _sign.toLowerCase() === sign.toLowerCase();
  },

  _strValAndSort: function (data: Record<string, any>): Record<string, any> {
    data = Hmac._sortObject(data);

    for (const item in data) {
      if (data.hasOwnProperty(item)) {
        if (typeof data[item] === "object") {
          data[item] = Hmac._strValAndSort(data[item]);
        } else {
          data[item] = data[item].toString();
        }
      }
    }

    return data;
  },

  _sortObject: function (obj: Record<string, any>): Record<string, any> {
    if (Array.isArray(obj)) {
      return obj;
    }

    return Object.keys(obj)
      .sort()
      .reduce((result, key) => {
        result[key] = obj[key];
        return result;
      }, {} as Record<string, any>);
  },
};
