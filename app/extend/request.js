'use strict';
module.exports = {
  get acceptJson() {
    const contentType = this.get('content-type');
    const content_type = ['application/x-www-form-urlencoded'];
    return content_type.indexOf(contentType) !== -1;
  },
};