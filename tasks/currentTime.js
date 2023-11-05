const nowTime = () => {
  const now = new Date();
  function toDoubleDigits(i) {
    if (i < 10) i = "0" + i;
    return i;
  }
  return "\x1b[2m[" + toDoubleDigits(now.getHours()) + ":" + toDoubleDigits(now.getMinutes()) + ":" + toDoubleDigits(now.getSeconds()) + "]\u001b[0m ";
};

module.exports = nowTime;
