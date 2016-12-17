/* globals MorphBehavior */
import { PolymerApolloBehavior } from '../client';
import feedQuery from '../model/feed';
import './article-item';

class articlesPage {
  beforeRegister() {
    this.is = 'articles-page';
    this.properties = Object.assign({}, this.properties, {
      feed: {
        type: Array,
        value: [],
      },
      articles: {
        type: Array,
        computed: 'getArticles(feed)',
      },
      loading: Boolean,
      routeData: {
        type: Object,
      },
      source: {
        type: String,
        value: 'techcrunch',
      },
    });
    this.observers = [
      'routeChange(route.path)',
    ];
  }
  get behaviors() {
    return [
      PolymerApolloBehavior,
    ];
  }
  get apollo() {
    return {
      feed: {
        query: feedQuery,
        options: 'getOptions(routeData.type, source)',
        loadingKey: 'loading',
        success(r) {
          this.set('loading', r.loading);
        },
        error(e) {
          console.log(e); // eslint-disable-line no-console
        },
      },
    };
  }
  getOptions(sortBy, source) {
    return {
      variables: {
        sortBy,
        source,
        // not working settings right now
        offset: 0,
        limit: 10,
      },
    };
  }
  getArticles(f) {
    return f && f[0] ? f[0].articles : [];
  }
  routeChange(p) {
    if (!p) {
      this.set('route.path', '/top');
    }
  }

  toast(text) {
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
}
Polymer(articlesPage);
