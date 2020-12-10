const getSumCases = (obj, arr, ...keys) => {
  const lastDay = arr[arr.length - 1] || 0;
  const previousDay = arr[arr.length - 2] || 0;

  [...keys].forEach(key => {
    if (lastDay.Status === key) {
      obj[key] = lastDay ? lastDay.Cases : lastDay;
      obj['day_' + key] = previousDay ? lastDay.Cases - previousDay.Cases : previousDay
    }
  })
}

export default getSumCases