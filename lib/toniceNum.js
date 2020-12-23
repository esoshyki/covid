function toNiceNum (num) {
      
      return num.match(/\d*/)[0]
      .split("")
      .reverse()
      .reduce((acc, cur, i) => (i > 0 && i % 3 === 0) ? acc + " " + cur : "" + acc + cur, "")
      .split("")
      .reverse()
      .join("")
}

export default toNiceNum