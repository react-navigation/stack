import React from 'react';
import ReactDOM from 'react-dom';

declare const document: Document;

export class NavContainer extends React.PureComponent {
  render() {
    return (
      <header>
        <nav role="navigation">{this.props.children}</nav>
      </header>
    );
  }
}

export class HeaderPortal extends React.PureComponent {
  render() {
    return ReactDOM.createPortal(this.props.children, document.body);
  }
}

export default class HeaderContainer extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <HeaderPortal>
        <NavContainer>{children}</NavContainer>
      </HeaderPortal>
    );
  }
}
