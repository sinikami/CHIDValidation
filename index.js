const fun = require('./src/validate');
const defaultAddresses = require('./src/addresses');
const defaultOption = {
  success: function () {
    return { status: true, message: "您的身份证号已通过验证." };
  },
  failure: function () {
    return { status: false, message: "请提供有效的身份证信息!" };
  },
  checklength: function () {
    return { status: false, message: "身份证号码须为18位或15位数字.最后一位可以是大小写字母X." };
  }
};
const CHIDValidation = (sIdNumber, opt = defaultOption, addresses = defaultAddresses) => {
  if (opt == null) throw new Error('option cannot be null.')
  if (addresses == null) throw new Error('addresses cannot be null.')
  const sIdCard = sIdNumber.replace(/^\s+|\s+$/g, "");
  //to check id number length that is 18 or 15 and it is possible  to be a "X" at last letter when the length is 18. 
  if (sIdCard.match(/^\d{15}|\d{17}[0-9xX]{1}$/gi) == null) return opt.checklength();
  //to checke city.
  if (!fun.province(sIdCard, addresses)) return opt.failure();

  switch (sIdCard.length) {
    case 18:
      return (fun.eighteen(sIdCard) && fun.validate(sIdCard)) ? opt.success() : opt.failure();
    case 15:
      return fun.fifteen(sIdCard) ? opt.success() : opt.failure();
    default:
      return opt.checklength();
  }
}
exports = module.exports = CHIDValidation;
exports.default = CHIDValidation
exports.addresses = defaultAddresses
exports.option = defaultOption