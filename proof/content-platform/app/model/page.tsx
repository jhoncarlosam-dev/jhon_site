import type { Metadata } from "next";
import { contentTypes } from "@/content/model";

export const metadata: Metadata = {
  title: "Content model",
};

export default function ModelPage() {
  return (
    <div className="model-list">
      <header className="story">
        <p className="eyebrow">Headless model</p>
        <h1>Content types</h1>
        <p className="intro">
          Entries in this demo live in the repository so it runs without a
          Contentstack account. These are the types you would create there, or
          in Contentful or Strapi: a page of modular blocks, a story, and an
          author reference.
        </p>
      </header>
      {contentTypes.map((contentType) => (
        <article key={contentType.uid} className="model-card">
          <h2>{contentType.title}</h2>
          <p>{contentType.description}</p>
          <p>{contentType.stackEquivalent}</p>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Required</th>
              </tr>
            </thead>
            <tbody>
              {contentType.fields.map((field) => (
                <tr key={field.uid}>
                  <td>{field.uid}</td>
                  <td>{field.type}</td>
                  <td>{field.required ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      ))}
    </div>
  );
}
