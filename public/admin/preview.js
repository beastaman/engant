/* Custom Decap CMS preview pane, styled to match the live Engant site. */
(function () {
  var COLORS = {
    dark: "#060C14",
    card: "#0D141F",
    light: "#E7E5D4",
    accent: "#ff4848",
    border: "#26303D",
    muted: "#9A9890",
  };

  var wrapStyle = {
    fontFamily: "'Lexend Deca', sans-serif",
    background: COLORS.dark,
    color: COLORS.light,
    minHeight: "100%",
    padding: "0",
  };

  var heroStyle = {
    position: "relative",
    width: "100%",
    height: "320px",
    backgroundColor: COLORS.card,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  var scrimStyle = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(6,12,20,0) 0%, rgba(6,12,20,0.9) 100%)",
  };

  var bodyWrapStyle = {
    maxWidth: "720px",
    margin: "0 auto",
    padding: "40px 24px 80px",
  };

  var pillStyle = {
    display: "inline-block",
    textTransform: "uppercase",
    fontSize: "12px",
    letterSpacing: "0.05em",
    color: COLORS.dark,
    background: COLORS.accent,
    borderRadius: "6px",
    padding: "6px 12px",
    marginRight: "12px",
  };

  var metaStyle = {
    fontSize: "13px",
    color: COLORS.muted,
    marginBottom: "24px",
  };

  var titleStyle = {
    fontFamily: "'Prata', serif",
    fontWeight: 400,
    fontSize: "34px",
    lineHeight: 1.3,
    color: "#FFFFFF",
    margin: "16px 0",
  };

  var descStyle = {
    fontSize: "16px",
    lineHeight: 1.7,
    color: COLORS.muted,
    marginBottom: "32px",
    paddingBottom: "32px",
    borderBottom: "1px solid " + COLORS.border,
  };

  var proseStyle = {
    fontSize: "17px",
    lineHeight: 1.8,
  };

  function BlogPreview(props) {
    var entry = props.entry;
    var data = entry.get("data");
    var title = data.get("title") || "Untitled post";
    var description = data.get("description") || "";
    var category = data.get("category") || "";
    var date = data.get("date") || "";
    var author = data.get("author") || "";
    var image = data.get("image");
    var imageUrl = null;

    if (image) {
      var asset = props.getAsset(image);
      imageUrl = asset ? asset.toString() : null;
    }

    var hero = h(
      "div",
      {
        style: Object.assign({}, heroStyle, {
          backgroundImage: imageUrl ? "url('" + imageUrl + "')" : "none",
        }),
      },
      h("div", { style: scrimStyle })
    );

    return h(
      "div",
      { style: wrapStyle },
      hero,
      h(
        "div",
        { style: bodyWrapStyle },
        h(
          "div",
          { style: metaStyle },
          category && h("span", { style: pillStyle }, category),
          h("span", null, [author, date].filter(Boolean).join("  •  "))
        ),
        h("h1", { style: titleStyle }, title),
        description && h("p", { style: descStyle }, description),
        h("div", { style: proseStyle }, props.widgetFor("body"))
      )
    );
  }

  function AuthorPreview(props) {
    var entry = props.entry;
    var data = entry.get("data");
    var name = data.get("title") || "Author name";
    var subtitle = data.get("subtitle") || "";
    var image = data.get("image");
    var imageUrl = null;

    if (image) {
      var asset = props.getAsset(image);
      imageUrl = asset ? asset.toString() : null;
    }

    return h(
      "div",
      { style: Object.assign({}, wrapStyle, { padding: "48px 24px" }) },
      h(
        "div",
        { style: { textAlign: "center", maxWidth: "480px", margin: "0 auto" } },
        imageUrl &&
          h("img", {
            src: imageUrl,
            style: {
              width: "96px",
              height: "96px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid " + COLORS.accent,
              marginBottom: "20px",
            },
          }),
        h("h1", { style: Object.assign({}, titleStyle, { fontSize: "26px" }) }, name),
        h("p", { style: { color: COLORS.accent, marginBottom: "24px" } }, subtitle),
        h("div", { style: proseStyle }, props.widgetFor("body"))
      )
    );
  }

  CMS.registerPreviewTemplate("blog", BlogPreview);
  CMS.registerPreviewTemplate("authors", AuthorPreview);
})();
