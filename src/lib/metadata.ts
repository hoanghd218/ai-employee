import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://ai-employee.vn"),
  title: "AI Employee — Biến AI Thành Nhân Viên Cho Doanh Nghiệp",
  description:
    "Chương trình đào tạo 3 tuần giúp bạn xây dựng Nhân Viên AI đầu tiên với Claude Code. Tiết kiệm 10+ giờ/tuần, tạo $10K+/năm giá trị cho business.",
  keywords: [
    "AI Employee",
    "Claude Code",
    "nhân viên AI",
    "tự động hóa doanh nghiệp",
    "AI cho business",
  ],
  authors: [{ name: "AI Employee" }],
  openGraph: {
    title: "AI Employee — Biến AI Thành Nhân Viên Cho Doanh Nghiệp",
    description:
      "Chương trình đào tạo 3 tuần giúp bạn xây dựng Nhân Viên AI đầu tiên.",
    url: "https://ai-employee.vn",
    siteName: "AI Employee",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Employee - Chương trình đào tạo AI 3 tuần",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Employee — Biến AI Thành Nhân Viên Cho Doanh Nghiệp",
    description:
      "Chương trình đào tạo 3 tuần giúp bạn xây dựng Nhân Viên AI đầu tiên.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI Employee - Xây Dựng Nhân Viên AI Cho Doanh Nghiệp",
  description:
    "Chương trình đào tạo 3 tuần giúp bạn xây dựng Nhân Viên AI đầu tiên với Claude Code.",
  provider: {
    "@type": "Organization",
    name: "AI Employee",
    url: "https://ai-employee.vn",
  },
  offers: {
    "@type": "Offer",
    price: "1200",
    priceCurrency: "USD",
    availability: "https://schema.org/LimitedAvailability",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    duration: "P3W",
  },
};
