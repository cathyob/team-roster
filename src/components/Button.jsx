import React, { Component } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonWrap = styled.button`
    background: ${props => props.color};
    color: ${props => props.fontColor};
    border: 0;
    font-size: 18px;
    padding: 12px 20px;
    width: 150px;
`;
export default class Button extends Component {
  constructor(props) {
    super(props);

    this.onGo = this.onGo.bind(this);
  }

  onGo() {
    if (this.props.onClick) {
      this.props.onClick(this.props.parameter);
    }
  }

  render() {
    /* using parameter set on each page that uses a Button to determine what to do on click */
    return (
      <ButtonWrap color={this.props.color} fontColor={this.props.fontColor} onClick={this.onGo} type={this.props.submit ? 'submit' : 'button'} id={this.props.id}>{this.props.children}</ButtonWrap>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  parameter: PropTypes.string,
  color: PropTypes.string,
  fontColor: PropTypes.string,
  submit: PropTypes.bool,
  id: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  onClick: () => {},
  parameter: null,
  color: null,
  fontColor: null,
  submit: false,
  id: null,
  children: null,
};
