export const localStorageSession = {
  setItem: function(key, jsonData, expirationMin) {
    var expirationMS = expirationMin * 60 * 1000;
    var record = {
      value: JSON.stringify(jsonData),
      timestamp: new Date().getTime() + expirationMS
    };
    localStorage.setItem(key, JSON.stringify(record));
    return jsonData;
  },
  setItemValue: function(key, jsonData, expirationMin) {
    var record = JSON.parse(localStorage.getItem(key));
    if (!record) {
      return this.setItem(key, jsonData, expirationMin);
    }
    var newrecord = {
      value: JSON.stringify(jsonData),
      timestamp: record.timestamp
    };
    localStorage.setItem(key, JSON.stringify(newrecord));
    return jsonData;
  },
  getItem: function(key) {
    var record = JSON.parse(localStorage.getItem(key));
    if (!record) {
      return false;
    }
    return new Date().getTime() < record.timestamp && JSON.parse(record.value);
  }
};

Date.prototype.format = function(fmt) {
  var o = {
    "m+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "i+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};
