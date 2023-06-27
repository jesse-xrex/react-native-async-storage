const Keychain = require("react-native-keychain");

const EMPTY_STRING = "__EMPTY_STRING__";

const setSecureStorage = (key, value) => {
  const _value = value === "" ? EMPTY_STRING : value;
  return Keychain.setGenericPassword(key, _value, { service: key });
};

const getSecureStorage = async (key) => {
  const credential = await Keychain.getGenericPassword({ service: key });
  return credential
    ? credential.password === EMPTY_STRING
      ? ""
      : credential.password
    : undefined;
};

const clearSecureStorage = async (key) => {
  return await Keychain.resetGenericPassword({ service: key });
};

const getAllKeys = async () => {
  return await Keychain.getAllGenericPasswordServices();
};

const AsyncStorage = {
  getItem(key, callback) {
    return new Promise((resolve, reject) => {
      getSecureStorage(key)
        .then((result) => {
          callback?.(null, result);
          resolve(result);
        })
        .catch((error) => {
          callback(error);
          reject(error);
        });
    });
  },
  setItem(key, value, callback) {
    return new Promise((resolve, reject) => {
      setSecureStorage(key, value)
        .then((result) => {
          callback?.();
          resolve(result);
        })
        .catch((error) => {
          callback(error);
          reject(error);
        });
    });
  },
  removeItem(key, callback) {
    return new Promise((resolve, reject) => {
      clearSecureStorage(key)
        .then((result) => {
          callback?.();
          resolve(result);
        })
        .catch((error) => {
          callback(error);
          reject(error);
        });
    });
  },
  getAllKeys(callback) {
    return new Promise((resolve, reject) => {
      getAllKeys()
        .then((result) => {
          callback?.(null, result);
          resolve(result);
        })
        .catch((error) => {
          callback(error);
          reject(error);
        });
    });
  },
  multiGet(keys, callback) {
    return new Promise((resolve, reject) => {
      Promise.all(keys.map((key) => getSecureStorage(key)))
        .then((result) => {
          const _result = result.map((value, index) => [keys[index], value]);
          callback?.(null, _result);
          resolve(_result);
        })
        .catch((error) => {
          callback(error);
          reject(error);
        });
    });
  },
  // Not used, just for compatibility
  multiSet(keyValuePairs, callback) {
    return new Promise((resolve, reject) => {
      Promise.all(
        keyValuePairs.map(([key, value]) => setSecureStorage(key, value))
      )
        .then((result) => {
          callback?.();
          resolve(result);
        })
        .catch((error) => {
          callback(error);
          reject(error);
        });
    });
  },
  multiRemove(keys, callback) {
    return new Promise((resolve, reject) => {
      Promise.all(keys.map((key) => clearSecureStorage(key)))
        .then((result) => {
          callback?.();
          resolve(result);
        })
        .catch((error) => {
          callback(error);
          reject(error);
        });
    });
  },
  clear() {
    return new Promise((resolve, reject) => {
      Keychain.resetGenericPassword()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  multiMerge() {
    // not used
  },
};

module.exports = AsyncStorage;
