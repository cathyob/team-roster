import React, { Component } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import Images from '../assets/Images';
import PlayerModel from '../models/Player';

const Player = styled.div`
    background: Gold;
    box-sizing: border-box;
    border: 5px solid rgba(255,255,255,.7);
    color: black;
    display: flex;
    align-items: flex-end;
    min-height: 300px;
    flex: 0 0 calc(100% / 3 - 24px);
    margin: 12px;
    overflow: hidden;
    position: relative;
    min-width: 190px;
    max-width: 220px;
    .delete {
      background: none;
      border: none;
      position: absolute;
      top: 7px;
      right: 7px;
      z-index: 10;
    }
    >svg {
        height: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
    }
    >.Jersey {
        flex-grow: 0;
        position: absolute;
        top: 7px;
        left: 7px;
        width: 50px;
    }
    .Details {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-content: flex-end;
        z-index: 2;
    }
    .Details h2 {
        background: rgba(255,255,255,.7);
        flex: 100%;
        margin: 0;
        padding: 12px;
        text-align: right;
    }
    .Details .Stats {
        background: rgba(255,255,255,.7);
        display: flex;
        order: -1;
        padding: 12px 12px 0;
        position: relative;
    }
    .Details:before {
        background: linear-gradient(to bottom right, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(255,255,255,.7) 50%, rgba(255,255,255,.7));
        content: '';
        flex-grow: 1;
        order: -1;
        width: 24px;
    }
    .Details .Stats .Stat>span,
    .Jersey .Stat {
        display: block;
        font-size: .6em;
    }
    .Details .Stat+.Stat {
        border-left: 1px solid black;
        margin-left: 12px;
        padding-left: 12px;
    }
`;
export default class PlayerItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.onDelete) {
      this.props.onDelete(this.props.player.id);
    }
  }

  render() {
    return (
      <Player className="Trading-Card">
        {Images.FOOS_PLAYER('Crimson', 'Crimson')}
        <button onClick={this.handleClick} className="delete">X</button>
        <div className="Details">
          <h2>{this.props.player.firstName} {this.props.player.lastName}</h2>
          <div className="Stats"><span className="Stat"><span>Rating</span>{this.props.player.rating}</span><span className="Stat"><span>Handedness</span>{this.props.player.handedness.charAt(0).toUpperCase() + this.props.player.handedness.substring(1).toLowerCase()}</span></div>
        </div>
        <span className="Jersey"><span className="Stat">Player<br />Number</span>{this.props.number}</span>
      </Player>
    );
  }
}

PlayerItem.propTypes = {
  player: PropTypes.instanceOf(PlayerModel),
  onDelete: PropTypes.func,
  number: PropTypes.number,
};

PlayerItem.defaultProps = {
  player: null,
  onDelete: () => {},
  number: null,
};
