import { useEffect } from "react";

export function useSeoMetadata({ title, description, schema }) {
  useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    if (!descriptionTag.parentNode) {
      document.head.appendChild(descriptionTag);
    }

    document.title = title;
    descriptionTag.setAttribute("content", description);

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
  }, [description, schema, title]);
}
