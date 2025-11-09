import { createHead, transformHtmlTemplate } from "unhead/server";
import { loadConfig } from "../scripts/config.js";

/**
 * Transform the index.html file to inject the hero metadata
 */
export async function transformIndexHtml(html: string) {
  try {
    const config = loadConfig();
    const head = createHead({ disableDefaults: true });

    head.push({
      title: config.hero.title,
      meta: [
        {
          property: "og:title",
          content: config.hero.title,
        },
        {
          property: "og:description",
          content: config.hero.description,
        },
      ],
    });

    return await transformHtmlTemplate(head, html);
  } catch (error) {
    console.warn("Failed to inject hero metadata:", error);
    return html;
  }
}
