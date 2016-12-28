import React from 'react';
import {observer} from 'mobx-react';

// Style
import './style.scss';

@observer
class TopMenu extends React.Component {
  static propTypes = {
    redditStore : React.PropTypes.object,
  };

  render () {
    return (
      <div id="TopMenu" className="row center-xs middle-xs">
        <div className="col-md-6 col-xs-12">
          <div className="row">
            <div className="col-md-7 col-xs-3 start-xs">
              <h1 className="title">Reddit</h1>
            </div>
            <div className="col-md-5 col-xs-9 end-xs">
              <input {...{
                className    : 'searchInput',
                type         : 'text',
                defaultValue : 'funny',
                onChange     : this.search,
              }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  search = (e) => {
    const searchCriteria = e.target.value;
    this.props.redditStore.findByKeyword(searchCriteria);
  }
}

export default TopMenu;
