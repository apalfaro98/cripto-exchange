import numeral from "numeral";

const dollarFilter = (dollar) => {
  if (!dollar) return "$0";

  return numeral(dollar).format("$0,0.00");
};

const percentFilter = (percent) => {
  if (!percent) return "0%";

  return `${Number(percent).toFixed(2)}%`;
};

export { dollarFilter, percentFilter };
