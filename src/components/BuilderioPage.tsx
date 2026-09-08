import { type BuilderContent, Content, fetchOneEntry, setClientUserAttributes } from "@builder.io/sdk-react";
import { useEffect, useState } from "react";

interface BuilderioPageProps {
  id: string;
  content: BuilderContent | null;
  model: string;
  publicApiKey: string;
  apiLocale: string;
}

const TEST_LOCALES = ["en-US", "es-ES", "ja-JP", "ar-SA"];

function BuilderioPage({ id, model, publicApiKey, apiLocale, content }: Readonly<BuilderioPageProps>) {
  const [locale, setLocale] = useState(apiLocale);

  setClientUserAttributes({ locale });

  const [contentToRender, setContentToRender] = useState<BuilderContent | null>(content);

  useEffect(() => {
    setClientUserAttributes({ locale });

    const fetchData = async () => {
      const content = await fetchOneEntry({
        model: model,
        apiKey: publicApiKey,
        includeUnpublished: true,
        options: { cachebust: true },
        query: {
          id,
        },
        locale,
      });

      if (content) setContentToRender(content);
    };

    fetchData().catch(console.error);
  }, [id, model, publicApiKey, locale]);

  return (
    <>
      <div style={{ position: "fixed", top: 8, right: 8, zIndex: 9999, background: "#fff", padding: "6px 8px", borderRadius: 6, boxShadow: "0 1px 4px rgba(0,0,0,0.2)", fontFamily: "sans-serif", fontSize: 12 }}>
        <label htmlFor="locale-test-picker" style={{ marginRight: 6 }}>
          Test locale attribute:
        </label>
        <select id="locale-test-picker" value={locale} onChange={(e) => setLocale(e.target.value)}>
          {TEST_LOCALES.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <Content content={contentToRender} model={model} apiKey={publicApiKey} locale={locale} />
    </>
  );
}

export default BuilderioPage;
