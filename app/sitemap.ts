import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://porraza.com";

  // Rutas públicas de la landing (sin protección)
  const publicRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
      alternates: {
        languages: {
          es: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
      alternates: {
        languages: {
          es: `${baseUrl}/privacy-policy`,
          en: `${baseUrl}/en/privacy-policy`,
        },
      },
    },
    {
      url: `${baseUrl}/legal-advise`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
      alternates: {
        languages: {
          es: `${baseUrl}/legal-advise`,
          en: `${baseUrl}/en/legal-advise`,
        },
      },
    },
    {
      url: `${baseUrl}/cookies-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
      alternates: {
        languages: {
          es: `${baseUrl}/cookies-policy`,
          en: `${baseUrl}/en/cookies-policy`,
        },
      },
    },
  ];

  return publicRoutes;
}
