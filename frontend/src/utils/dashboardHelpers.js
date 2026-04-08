export const getMetricColor = (metric) => {
  if (metric.changeDir === "down" || metric.changeDir === "downGood") {
    return metric.changeDir === "downGood" ? "#10d4c7" : "#ff5c83";
  }
  return "#10d4c7";
};

export const changeDisplayColor = (metric) => {
  if (metric.changeDir === "down") return "#ff5c83";
  if (metric.changeDir === "downGood") return "#10d4c7";
  return "#10d4c7";
};