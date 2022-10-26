const formatMoney = (value: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  }).format(Number(value));

export default formatMoney;
