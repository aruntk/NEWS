import './articles-page';
import './sources-page';

class newsApp {
  beforeRegister() {
    this.is = 'news-app';
    this.properties = {
      sources: Array,
      history: {
        type: Object,
        value: {
          prev: false,
          next: false,
          wentBack: 0,
        },
      },
    };
    this.observers = [
      'routeChange(route.path)',
    ];
    this.listeners = {
      'change-route': 'changeRoute',
      toast: 'toast',
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
    const hLength = window.history.length;
    if (!p) {
      this.set('route.path', '/sources');
    }
    if (hLength <= 1) {
      this.set('history', { prev: false, next: false });
    } else {
      this.set('history.prev', this.history.wentBack < hLength - 1);
      this.set('history.next', this.history.wentBack > 0);
    }
  }
  changeRoute(e) {
    this.set('route.path', e.detail.url);
  }
  goBack() {
    if (this.history.wentBack < window.history.length - 1) {
      this.set('history.wentBack', this.history.wentBack + 1);
    }
    window.history.back();
  }
  goForward() {
    if (this.history.wentBack > 0) {
      this.set('history.wentBack', this.history.wentBack - 1);
    }
    window.history.forward();
  }

}

Polymer(newsApp);
