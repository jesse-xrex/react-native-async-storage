# `react-native-async-storage` mock

This is a mock of `@react-native-async-storage/async-storage`, implements the API with `react-native-keychain`.

## Why?

1. We already installed `react-native-keychain`.
2. Installing new native package is forbidden.
3. They basically did the same thing.

## Reference

- [The API doc of `@react-native-async-storage/async-storage`](https://react-native-async-storage.github.io/async-storage/docs/api)
- [The implementation of `@react-native-async-storage/async-storage`](https://github.com/react-native-async-storage/async-storage/blob/master/src/AsyncStorage.native.ts)
