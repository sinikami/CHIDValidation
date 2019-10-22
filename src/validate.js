
const config = {
  Wi: [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
  Xi: [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2],
}
const validate = {
  eighteen: function (sIdCard) {//when the ID length equals to eighteen
    const year = parseFloat(sIdCard.substr(6, 4));
    const month = parseFloat(sIdCard.substr(10, 2));
    const day = parseFloat(sIdCard.substr(12, 2));
    const checkDay = new Date(year, month - 1, day);
    const nowDay = new Date();
    //if someone who is younger than 18 years old not able to get a id card in china
    return (year >= 1900 && year <= nowDay.getFullYear() - 18 && month == (checkDay.getMonth() + 1) && day == checkDay.getDate()) ? true : false;
  },
  fifteen: function (sIdCard) { //when the ID length equals to fifteen
    const year = parseFloat("19" + sIdCard.substr(6, 2));
    const month = parseFloat(sIdCard.substr(8, 2));
    const day = parseFloat(sIdCard.substr(10, 2));
    const checkDay = new Date(year, month - 1, day);
    //after 1999 the id card number changed to the eighteen length
    return (year >= 1900 && year < 2000 && month == (checkDay.getMonth() + 1) && day == checkDay.getDate()) ? true : false;
  },
  validate: function (sIdCard) {//check last number when the length is 18 by algorithm
    const aIdCard = sIdCard.split("");
    let sum = 0;
    const len = config.Wi.length;
    for (var i = 0; i < len; i++) {
      sum += config.Wi[i] * aIdCard[i]; //线性加权求和
    }
    const index = sum % 11;//求模，可能为0~10,可求对应的校验码是否于身份证的校验码匹配
    return config.Xi[index] == aIdCard[17].toUpperCase() ? true : false;
  },
  province: function (sIdCard, addresses) {//to check the zipcode
    const p2 = sIdCard.substr(0, 6);
    return addresses.hasOwnProperty(p2);
  }
}
module.exports = validate