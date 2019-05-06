import React from 'react';

export class NavContainer extends React.PureComponent {
  render() {
    return this.props.children;
  }
}

export class HeaderPortal extends React.PureComponent {
  render() {
    return this.props.children;
  }
}

export default class HeaderContainer extends React.PureComponent {
  render() {
    return this.props.children;
  }
}
