import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const PageTitle = styled.h1`
    color: White;
    flex: 100%;
    margin: 0 0 .67em;
    text-align: center;
`;

const Title = props => (
  <PageTitle>{props.children}</PageTitle>
);

export default Title;

Title.propTypes = {
  children: PropTypes.node,
};

Title.defaultProps = {
  children: null,
};
