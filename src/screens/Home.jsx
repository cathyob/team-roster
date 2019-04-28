import React, { Component } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import PageWrapper from '../components/PageWrapper';
import Images from '../assets/Images';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';

const Splash = styled.div`
    button {
        margin: 12px;
    }
`;
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.clickToGo = this.clickToGo.bind(this);
  }

  clickToGo(route) {
    // take route from Button parameter below to navigate to the route page
    this.props.history.push(route);
  }

  render() {
    return (
      <PageWrapper background={Images.FOOS_OVERHEAD.image} >
        <Splash className="Splash">
          <PageTitle>Foosball League Roster</PageTitle>
          {/* using parameter to pass down route needed on Button.jsx */}
          <Button parameter="/login" color="Gold" onClick={this.clickToGo}>Login</Button>
          <Button parameter="/register" color="Crimson" fontColor="White" onClick={this.clickToGo}>Register</Button>
        </Splash>
      </PageWrapper>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Home.defaultProps = {
  history: {},
};
