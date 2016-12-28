import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';

// Styles
import './style.scss';

// UI Components
import RedditCard from '../../ui/RedditCard';
import Share from '../../ui/Share';

@observer
class Home extends React.Component {
  static propTypes = {
    redditStore : React.PropTypes.object,
  };

  componentWillMount () {
    this.props.redditStore.findByKeyword('funny');
  }

  render () {
    return (
    	<div id="Home" className="row center-xs middle-xs">
        <div className="col-md-5 col-xs-12">
          {_.isEmpty(this.props.redditStore.postsFound) ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw spinner" /> : null}
          {_.map(this.props.redditStore.postsFound, (post) => {
            return <RedditCard {...{key : post.data.id, post : post.data, redditStore : this.props.redditStore, shareMode : false}} />;
          })}
        </div>
        <Share {...{redditStore : this.props.redditStore}} />
      </div>
    );
  }
}

export default Home;
