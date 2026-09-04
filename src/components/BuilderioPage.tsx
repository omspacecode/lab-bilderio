import { type BuilderContent, Content, fetchOneEntry, setClientUserAttributes } from "@builder.io/sdk-react";
import { useEffect, useState } from "react";

interface BuilderioPageProps {
  id: string;
  content: BuilderContent | null;
  model: string;
  publicApiKey: string;
  apiLocale: string;
}

function BuilderioPage({ id, model, publicApiKey, apiLocale, content }: Readonly<BuilderioPageProps>) {
  setClientUserAttributes({ locale: apiLocale });

  const [contentToRender, setContentToRender] = useState<BuilderContent | null>(content);

  useEffect(() => {
    setClientUserAttributes({ locale: apiLocale });

    const fetchData = async () => {
      const content = await fetchOneEntry({
        model: model,
        apiKey: publicApiKey,
        includeUnpublished: true,
        options: { cachebust: true },
        query: {
          id,
        },
        locale: apiLocale,
      });

      if (content) setContentToRender(content);
    };

    fetchData().catch(console.error);
  }, [id, model, publicApiKey, apiLocale]);

  return <Content content={contentToRender} model={model} apiKey={publicApiKey} locale={apiLocale} />;
}

export default BuilderioPage;
