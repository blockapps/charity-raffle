import React, { Component } from 'react';
import { Button, DialogContainer } from 'react-md';
import './howToPlay.css';

class HowToPlay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  handleModal(isOpen) {
    this.setState({ isOpen });
  }

  render() {
    const actions = [{
      onClick: this.handleModal.bind(this, false),
      primary: true,
      children: 'Close',
    }];

    return (
      <section className="ht-play-section">
        <div className="md-text-right">
          <Button raised primary onClick={this.handleModal.bind(this, true)}>
            How To Play
        </Button>
        </div>
        <DialogContainer
          id="simple-action-dialog"
          className="ht-play"
          visible={this.state.isOpen}
          actions={actions}
          onHide={this.handleModal.bind(this, false)}
          width={'40pc'}
          title="Welcome to the BlockApps Raffle!"
        >
          <div className="md-text-justify ht-play-content">
            <label className="md-font-bold">
              Create a raffle:
            </label>
            <p>
              To create your own raffle, click ​Create New Raffle​ and enter your account information and raffle description.
            </p>

            <label className="md-font-bold">
              Participate in a raffle:
            </label>
            <p>
              To participate in an existing raffle, select a raffle, click ​ Play​ and enter your account information for a chance to win some ether.
            </p>
          </div>
        </DialogContainer>
      </section>
    );
  }
}

export default HowToPlay;
