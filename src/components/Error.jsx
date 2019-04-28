import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const PageError = styled.span`
  background: rgba(237, 20, 61, .6);
  padding: 3px;
`;

const Error = (props) => {
  if (props.children.length > 0) {
    return <PageError>{props.children}</PageError>;
  }
  return null;
};

export default Error;

Error.propTypes = {
  children: PropTypes.node,
};

Error.defaultProps = {
  children: null,
};
