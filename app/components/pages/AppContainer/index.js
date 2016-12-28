import React from 'react';
import {observer} from 'mobx-react';

// Pages
import Home from '../Home';

// UI components
import TopMenu from '../../ui/TopMenu';

// Stores
import RedditStore from '../../../stores/Reddit';

@observer
class AppContainer extends React.Component {
  render () {
    return (
      <div className="row end-xs">
        <TopMenu {...{redditStore : RedditStore}} />
        <div className="col-xs-12">
          <Home {...{redditStore : RedditStore}} />
        </div>
      </div>
    );
  }
}

export default AppContainer;
