# React Navigation Stack

[![Build Status][build-badge]][build]
[![Version][version-badge]][package]
[![MIT License][license-badge]][license]

Stack navigator para uso em iOS e Android.

## Instalação

Abra um terminal na pasta do seu projeto e execute:

```sh
yarn add react-navigation-stack
```

ou

```sh
npm install react-navigation-stack
```

## Como Utilizar

```js
import { createStackNavigator } from 'react-navigation-stack';

export default createStackNavigator({
  Inbox: InboxScreen
  Drafts: DraftsScreen,
}, {
  initialRouteName: 'Inbox',
});
```

## Modo de Desenvolvedor

Para configurar o ambiente de desenvolvimento, abra um Terminal no diretório repo e execute o seguinte:

```sh
yarn bootstrap
```

Durante o desenvolvimento, você pode executar o aplicativo com [Expo](https://expo.io/) para testar suas alterações:

```sh
yarn example start
```

Se você utilizar typescript e eslint no seu código basta executar:

```sh
yarn typescript
yarn lint
```
Para corrigir erros de formatação, execute o seguinte:

```sh
yarn lint --fix
```

## Documentação

A documentação pode ser consultada em [React Navigation website](https://reactnavigation.org/docs/en/stack-navigator-2.0.html).

<!-- badges -->

[build-badge]: https://img.shields.io/circleci/project/github/react-navigation/stack/master.svg?style=flat-square
[build]: https://circleci.com/gh/react-navigation/stack
[version-badge]: https://img.shields.io/npm/v/react-navigation-stack.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-navigation-stack
[license-badge]: https://img.shields.io/npm/l/react-navigation-stack.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
