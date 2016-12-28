// Third party modules
import axios from 'axios';
import _ from 'lodash';
import { observable, action, useStrict, runInAction } from 'mobx';

useStrict(true);

class Reddit {
  @observable postsFound = [];
  @observable postToShare = {};
  @observable openShare = false;
  @observable searchCriteria = 'funny';

  @action findByKeyword = async (searchCriteria) => {
    this.postsFound = [];
    try {
      this.searchCriteria = searchCriteria;
      const {status, data} = await axios.get(`https://www.reddit.com/r/${searchCriteria}/.json`);
      if (status === 200) {
        runInAction('Update personFound', () => {
          this.postsFound = _.get(data, 'data.children', []);
        });
      }
    } catch (e) {
      console.log('reddit post error');
    }
  }

  @action toggleShare (post) {
    this.openShare = !this.openShare;
    if (this.openShare) this.postToShare = post;
  }
}

const reddit = new Reddit();
export default reddit;
