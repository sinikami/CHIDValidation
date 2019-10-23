const CHIDValidation = require('../index');
test("check:fail wrong length", () => {
  const rst = CHIDValidation("10000")
  expect(rst.status).toBe(false);
  expect(rst.message).toBe('身份证号码须为18位或15位数字.最后一位可以是大小写字母X.');
})
test("check:sucess 15 length ID", () => {
  const rst = CHIDValidation("210411540503042")
  expect(rst.status).toBe(true);
  expect(rst.message).toBe('您的身份证号已通过验证.');
})
test("check:sucess 18 length ID", () => {
  const rst = CHIDValidation("210421195405030415")
  expect(rst.status).toBe(true);
  expect(rst.message).toBe('您的身份证号已通过验证.');
})
test("check:fail  18 length ID ", () => {
  const rst = CHIDValidation("11204416541220243x")
  expect(rst.status).toBe(false);
  expect(rst.message).toBe('请提供有效的身份证信息!');
})
test("check:fail to throw exception", () => {
  expect(() => CHIDValidation("11204416541220243x", null, null)).toThrow();
})
test("type error", () => {
  expect(() => CHIDValidation(11204416541220243)).toThrow();
})