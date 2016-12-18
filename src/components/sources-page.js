/* globals MorphBehavior */
import { PolymerApolloBehavior } from '../client';
import sourceQuery from '../model/source';
import './source-item';

class sourcesPage {
  beforeRegister() {
    this.is = 'sources-page';
    this.properties = Object.assign({}, this.properties, {
      sources: {
        type: Array,
        value: [],
      },
      _sources: {
        type: Array,
        notify: true,
        computed: 'getSources(sources)',
      },
      loading: Boolean,
      routeData: {
        type: Object,
      },
    });
    this.observers = [
      'routeChange(route.path)',
    ];
    this.listeners = {
      'go-to-source': 'goToSource',
    };
  }
  get behaviors() {
    return [
      PolymerApolloBehavior,
    ];
  }
  get apollo() {
    return {
      sources: {
        query: sourceQuery,
        options: 'getOptions(routeData.category, routeData.country, routeData.language)',
        variables: {
          category: '',
          country: null,
          language: null,
        },
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
  getOptions(category, country, language) {
    return {
      variables: {
        category,
        country,
        language,
      },
    };
  }
  getSources(f) {
    return f && f[0] ? f[0].sources : [];
  }
  routeChange(p) {
    if (!p) {
      // this.set('route.path', '/general/us/en');
    }
  }
  goToSource(e) {
    const url = e.detail.url;
    this.fire('change-route', { url: `/articles/${url}` });
  }
  count(array) {
    return (array || []).length;
  }
  processFilter(val) {
    const search = (val || '').toLowerCase();
    return (source) => {
      const name = (source.name || '').toLowerCase();
      return name.indexOf(search) > -1;
    };
  }
  toast(text) {
    this.fire('toast', { text });
  }
}
Polymer(sourcesPage);
