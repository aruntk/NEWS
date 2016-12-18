import './articles-page';
import './sources-page';

class newsApp {
  beforeRegister() {
    this.is = 'news-app';
    this.listeners = {
      toast: 'toast',
    };
    this.observers = [
      'routeChange(route.path)',
    ];
    this.listeners = {
      'change-route': 'changeRoute',
    };
  }
  toast(e) {
    const text = e.detail.text;
    if (text) {
      this.$.mainToast.hide();
      this.$.mainToast.text = text;
      this.async(() => {
        this.$.mainToast.show();
      }, 300);
    }
  }
  displayInstalledToast() {
    this.$['caching-complete'].show();
  }
  routeChange(p) {
    if (!p) {
      this.set('route.path', '/sources');
    }
  }
  changeRoute(e) {
    this.set('route.path', e.detail.url);
  }

}

Polymer(newsApp);
