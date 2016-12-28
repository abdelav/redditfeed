// Third party Modules
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observe} from 'mobx';
import ReactDOM from 'react-dom';
import gsap from 'gsap';

// Style
import './style.scss';

// Images
import RedditAlienImg from './imgs/reddit-logo.png';
import EmailImg from './imgs/mail-logo.png';

// UI Component
import RedditCard from '../RedditCard';

@observer
class Share extends Component {
  static propTypes = {
    redditStore : React.PropTypes.object,
  };

  componentWillMount () {
    observe(this.props.redditStore, 'openShare', (value) => this.animateShare(value));
  }

  onDragOver (e) {
    e.preventDefault();
  }

  render () {
    return (
      <div id="Share" ref="share" className="col-xs-12">
        <div className="close-btn">
          <i className="fa fa-times" aria-hidden="true" onClick={this.closeShare} />
        </div>
        <div className="row center-xs middle-xs cards-cont">
          <div className="col-md-2 col-xs-12" draggable="true">
            <RedditCard {...{post : this.props.redditStore.postToShare, shareMode : true}} />
          </div>
          <div className="col-md-2 col-xs-12">
            <p className="instructios-text">Drag the card on the lef to the desired action</p>
          </div>
          <div className="col-md-2 col-xs-12">
            <div onDragOver={this.onDragOver} onDrop={this.dropReddit} className="dropCard">
              <img src={RedditAlienImg} />
              <p>Open on reddit</p>
            </div>
            <div onDragOver={this.onDragOver} onDrop={this.dropEmail} className="dropCard">
              <img src={EmailImg} className="mail-img"/>
              <p>Email to a friend</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  dropReddit = () => {
    window.open(`https://www.reddit.com${this.props.redditStore.postToShare.permalink}`, '_blank');
  }

  dropEmail = () => {
    window.location.href = `mailto:friend@email.org?subject=Check out this reddit post yo!&body=https://www.reddit.com${this.props.redditStore.postToShare.permalink}`;
  }

  closeShare = () => {
    this.props.redditStore.toggleShare();
  }

  animateShare = (isOpen) => {
    const modalCont = ReactDOM.findDOMNode(this.refs.share);
    const givenOpacity = isOpen ? 1 : 0;
    const overflow = isOpen ? 'hidden' : 'auto';
    if (isOpen) modalCont.style.visibility = 'visible';
    document.body.style.overflowY = overflow;
    gsap.to(modalCont, 0.5, {
      opacity    : givenOpacity,
      onComplete : () => {
        if (!isOpen) modalCont.style.visibility = 'hidden';
      },
    });
  }
}

export default Share;
