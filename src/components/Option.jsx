import React, { Component } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const Field = styled.div`
    border: 0 solid White;
    border-bottom-width: 1px;
    margin: 12px 0;
    max-width: 220px;
`;
export default class Option extends Component {
  createOptionList() {
    const options = [];

    for (let i = 0; i < this.props.data.length; i += 1) {
      options.push(<option key={i}>{this.props.data[i]}</option>);
    }

    return options;
  }

  render() {
    return (
      <Field className="Field">
        <label htmlFor={this.props.id}>{this.props.labelName}
          <select name={this.props.name} id={this.props.id}>{this.createOptionList()}</select>
        </label>
      </Field>
    );
  }
}

Option.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  labelName: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

Option.defaultProps = {
  data: [],
  labelName: null,
  name: null,
  id: null,
};
