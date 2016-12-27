/* globals MorphBehavior */
import { PolymerApolloBehavior } from '../client';
import feedQuery from '../model/feed';

class articlesPage {
  beforeRegister() {
    this.is = 'articles-page';
    this.properties = Object.assign({}, this.properties, {
      feed: {
        type: Array,
        value: [],
      },
      sources: Array,
      source: {
        type: Object,
        computed: 'getSource(sources, routeData.source)',
      },
      articles: {
        type: Array,
        computed: 'getArticles(feed)',
      },
      loading: Boolean,
      routeData: {
        type: Object,
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
        options: 'getOptions(routeData.type, routeData.source)',
        skip: true,
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
      skip: false,
    };
  }
  getArticles(f) {
    return f && f[0] ? f[0].articles : [];
  }
  getSource(sources) {
    const sourceName = this.routeData.source;
    const source = (sources || []).filter(v => v.id === sourceName);
    return source[0] || {};
  }
  routeChange(p) {
    if (!p) {
      this.set('route.path', '/techcrunch/latest');
    }
  }
  count(array) {
    return (array || []).length;
  }
  toast(text) {
    this.fire('toast', { text });
  }
}
Polymer(articlesPage);
