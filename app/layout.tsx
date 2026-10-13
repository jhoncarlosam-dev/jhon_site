import type { Metadata } from "next";
import { DM_Sans, Saira_Extra_Condensed } from "next/font/google";
import { resume } from "@/data/resume";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const saira = Saira_Extra_Condensed({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ac3.netlify.app"),
  title: resume.title,
  description: resume.description,
  authors: [{ name: resume.fullName }],
  openGraph: {
    title: resume.title,
    description: resume.description,
    type: "website",
    locale: "es_CO",
    images: [
      {
        url: resume.profileImageFallback,
        alt: resume.fullName,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${saira.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-sand font-sans text-ink">{children}</body>
    </html>
  );
}
