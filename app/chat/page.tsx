import type { Metadata, Viewport } from "next";
import { PhoneChat } from "@/components/chat/PhoneChat";

export const metadata: Metadata = {
  title: "Hablar",
  description: "Una conversación sencilla para usar desde el celular.",
  robots: { index: false, follow: false },
  manifest: "/chat.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Hablar",
    statusBarStyle: "default",
  },
  icons: {
    apple: "/chat-icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#163445",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function ChatPage() {
  return <PhoneChat />;
}
