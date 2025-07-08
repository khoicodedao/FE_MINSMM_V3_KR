const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

const removeDoubleSpaces = (str: any, trimLinesToo: boolean = false) => {
  let strResult = ``;
  let prev: any = ``;
  const strCopy = [...str];

  while (strCopy.length) {
    const chr = strCopy.shift();
    strResult += prev + chr !== `  ` ? chr : ``;
    prev = chr;
  }

  return trimLinesToo
    ? strResult
        .split(/\n/)
        .map((v) => v.trim())
        .join(`\n`)
    : strResult.trim();
};

export { randomId, removeDoubleSpaces };
