const addressReadable = (str: string) => {
  const first6 = str.slice(0, 6);
  const last3 = str.slice(-3);

  return `${first6}...${last3}`;
};

export default addressReadable;
