export const generateActivationCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Generate Slug from title
export const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replaceAll(/[&,%,$,-,(,)]/g, "")
    .replaceAll(/\s+/g, "-")
    .trim();
};

export const getToday = () => {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    weekday: "long",
  });

  return formatter.format(date);
};

export const formatNotificationTime = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const isToday = today.toLocaleDateString() === date.toLocaleDateString();

  const options: Intl.DateTimeFormatOptions = isToday
    ? {
        hour: "numeric",
        minute: "numeric",
      }
    : {
        day: "numeric",
        month: "short",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
      };

  return new Intl.DateTimeFormat(undefined, options).format(date);
};

export const generateRandomString = (length: number = 4) => {
  let str = "";
  const all = "AB12ACD92EF923GH9IJ12K32LMNO0ERP234QRS2839TUV29WX92YZ";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * all.length - 1);
    str += all[index] ?? "0";
  }

  return str;
};

export const calculatePriceAfterDiscount = (
  originalPrice: number,
  discount: number
): number => {
  return Number((originalPrice - (1 - discount / 100)).toFixed(2));
};

export const formatVideoLength = (length: number) => {
  return `${Math.round(length / 60)}h ${length % 60}m`;
};
