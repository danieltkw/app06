export default {
  // Function to convert ID to a formatted string with a 'P' prefix
  idConverter: function (num) {
    if (num === undefined || num === null) {
      console.error('idConverter: num is undefined or null');
      return '';
    }
    let str = num.toString();
    let leadingZeros = "00000".substring(0, 5 - str.length);
    return 'P' + leadingZeros + str;
  }
};

// ------------------------------------------------------------
// ID Conversion logic
// File name: idConverter.js
// ------------------------------------------------------------
