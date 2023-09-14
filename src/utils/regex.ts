export const getPhoneNumberWithHyphen = (phoneNumber: string) => {
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

export const isNumberOnly = (str: string) => {
  return /^[0-9]*$/.test(str);
};
