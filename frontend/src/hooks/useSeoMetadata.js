import { useEffect } from "react";

function upsertMeta(selector, attributes) {
  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => {
      if (key !== "content") {
        element.setAttribute(key, value);
      }
    });
    document.head.appendChild(element);
  }

  if (attributes.content) {
    element.setAttribute("content", attributes.content);
  }

  return element;
}

export function useSeoMetadata({ title, description, keywords, schema }) {
  useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    const keywordsTag = upsertMeta('meta[name="keywords"]', {
      name: "keywords",
      content: keywords || ""
    });
    const ogTitleTag = upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title
    });
    const ogDescriptionTag = upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description
    });

    if (!descriptionTag.parentNode) {
      document.head.appendChild(descriptionTag);
    }

    document.title = title;
    descriptionTag.setAttribute("content", description);
    keywordsTag.setAttribute("content", keywords || "");
    ogTitleTag.setAttribute("content", title);
    ogDescriptionTag.setAttribute("content", description);

    let schemaNode = document.getElementById("seo-schema");
    if (!schemaNode) {
      schemaNode = document.createElement("script");
      schemaNode.id = "seo-schema";
      schemaNode.type = "application/ld+json";
      document.head.appendChild(schemaNode);
    }
    schemaNode.textContent = JSON.stringify(schema);

    return () => {
      document.title = previousTitle;
    };
  }, [description, keywords, schema, title]);
}
