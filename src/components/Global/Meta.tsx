import { NextSeo } from "next-seo";

// types
export type SEOProps = {
  title: string;
  description?: string;
  ogImagePath?: string;
  noindex?: boolean;
  noTitleTemplate?: boolean;
};

export const Meta: React.FC<SEOProps> = (props) => {
  const {
    title = "Home",
    description = "Default description",
    ogImagePath = "/logo.png",
    noindex,
    noTitleTemplate,
  } = props;

  return (
    <NextSeo
      title={noTitleTemplate ? title : `${title}`}
      description={description}
      noindex={noindex}
      openGraph={{
        title,
        description,
        type: "article",
        site_name: "MyAppName",
      }}
      twitter={{
        handle: "@cavemanalerts",
        site: "@cavemanalerts",
        cardType: "summary_large_image",
      }}
    />
  );
};
