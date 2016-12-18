class sourceItem {
  beforeRegister() {
    this.is = 'source-item';
    this.properties = Object.assign({}, this.properties, {
      source: Object,
    });
  }
  goToArticle() {
    this.fire('go-to-source', {
      url: `${this.source.id}/${this.source.sortBysAvailable[0]}`,
    });
  }
  getLogo(obj) {
    return obj.large || obj.medium || obj.small;
  }
}
Polymer(sourceItem);
