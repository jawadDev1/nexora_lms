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
