import type { Metadata } from "next";
import PrivacyPolicy from "./PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy — Purrsome™",
  description:
    "Privacy Policy for Purrsome LLC. How we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
