const getCountryData = (dataArray) => {
  const len = dataArray.length;
  if (!len) return;
  const lastDay = dataArray[len - 1];
  const previousDey = dataArray[len - 2];
  return {
    Confirmed: lastDay.Confirmed,
    Deaths: lastDay.Deaths,
    Recovered: lastDay.Recovered,
    day_Confirmed: lastDay.Confirmed - previousDey.Confirmed || 0,
    day_Deaths: lastDay.Deaths - previousDey.Deaths || 0,
    day_Recovered: lastDay.Recovered - previousDey.Recovered || 0
  }
}

export default getCountryData