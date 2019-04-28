import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const Field = styled.div`
    border: 0 solid White;
    border-bottom-width: 1px;
    margin: 12px 0px;
    max-width: 220px;
`;

/* use the secure property to say that if an input is secure the text should be *'s */
const Input = props => (
  <Field className="Field">
    <label htmlFor={props.id}>{props.labelName}
      <input type={props.secure ? 'password' : 'text'} name={props.name} id={props.id} />
    </label>
  </Field>
);

export default Input;

Input.propTypes = {
  secure: PropTypes.bool,
  labelName: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

Input.defaultProps = {
  secure: false,
  labelName: null,
  name: null,
  id: null,
};
