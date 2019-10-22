## How to use

```node
const CHIDValidation = require('chidvalidation');
try {

  const addresses = undefined; // default: CHIDValidation.addresses;
  const option = undefined;// default: CHIDValidation.option;
  const rst = CHIDValidation('210421195405030415', option, addresses);
  
  if (rst.status == true) {
    // success
  } else {
    console.log(rst.message)
  }
} catch (e) {
  console.log(e.message)
}
```
