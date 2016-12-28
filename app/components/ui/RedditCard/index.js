import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';

// Style
import './style.scss';

// Images
import UnknowUserImg from './imgs/unknown.png';

@observer
class RedditCard extends React.Component {
  static propTypes = {
    post        : React.PropTypes.object,
    redditStore : React.PropTypes.object,
    shareMode   : React.PropTypes.bool,
  };

  render () {
    return (
      <div className={this.props.shareMode ? 'row reddit-card round' : 'reddit-card row'} onClick={this.sharePost.bind(this, this.props.post)}>
        <div className={this.props.shareMode ? 'col-xs-12 center-xs' : 'col-md-2 start-md col-xs-12 center-xs'}>
          <img src={!_.includes(['', 'nsfw', 'self', 'default'], this.props.post.thumbnail) ? this.props.post.thumbnail : UnknowUserImg} className="profile-pic" />
        </div>
        <div className={this.props.shareMode ? 'col-xs-12 center-xs' : 'col-md-10 start-md col-xs-12 center-xs'}>
          <p className="author">{this.props.post.author}</p>
          <p>{this.props.post.title}</p>
          <ul className="stats">
            <li><i className="fa fa-comment-o" aria-hidden="true" /> {this.props.post.num_comments} comments</li>
            <li><i className="fa fa-heart-o" aria-hidden="true" /> {this.props.post.ups} ups</li>
            <li><i className="fa fa-angle-double-down" aria-hidden="true" /> {this.props.post.downs} downs</li>
          </ul>
        </div>
      </div>
    );
  }

  sharePost = (post) => {
    if (!this.props.shareMode) {
      this.props.redditStore.toggleShare(post);
    }
  }
}

export default RedditCard;
