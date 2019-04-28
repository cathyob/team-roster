import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    background: url(${props => props.background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2em;
`;

const PageWrapper = props => (
  <Wrapper className="Wrapper" background={props.background}>{props.children}</Wrapper>
);

export default PageWrapper;

PageWrapper.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node,
};

PageWrapper.defaultProps = {
  background: null,
  children: null,
};
