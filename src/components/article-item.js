import moment from 'moment';

class articleItem {
  beforeRegister() {
    this.is = 'article-item';
    this.properties = Object.assign({}, this.properties, {
      article: Object,
    });
  }
  timeAgo(date) {
    return moment(date).fromNow();
  }
  goToArticle() {
    const win = window.open(this.article.url, '_blank', 'toolbar=0,location=0,menubar=0');
    win.focus();
  }
}
Polymer(articleItem);
