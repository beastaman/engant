export const slugify = (value) => {
  const source =
    typeof value === "string"
      ? value
      : Array.isArray(value)
        ? value.join(" ")
        : value && typeof value === "object" && value.props?.children
          ? value.props.children
          : value == null
            ? ""
            : String(value);

  return source
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2013\u2014\u2012\u2011\u2010\u2015]/g, "-")
    .replace(/[’'`]/g, "")
    .replace(/[^a-zA-Z0-9\s-]+/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};
