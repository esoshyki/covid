function toNiceNum (num){

      let stringNumber = num.toString();
      let number  = /\d*/
      console.log(stringNumber)
      console.log(stringNumber.match(number)[0])
      return stringNumber.match(number)[0]
          .split("")
          .reverse()
          .reduce((acc, cur, i) => (i > 0 && i % 3 === 0) ? acc + " " + cur : "" + acc + cur, "")
          .split("")
          .reverse()
          .join("")
  }

export default toNiceNum