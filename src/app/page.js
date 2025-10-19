import Main from "@/components/main/Main";
import Script from "next/script";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vijay Thakur",
    jobTitle: "Full Stack Web Developer",
    image: "https://dev.vijstack.com/og-image.png",
    url: "https://dev.vijstack.com",
    worksFor: {
      "@type": "Organization",
      name: "VIJSTACK",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Greater Noida",
      addressRegion: "Uttar Pradesh",
      addressCountry: "India",
    },
    sameAs: [
      "https://github.com/theajthakur",
      "https://linkedin.com/in/theajthakur",
      "https://instagram.com/aj_thakur_rock",
    ],
  };
  return (
    <>
      <Main />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
