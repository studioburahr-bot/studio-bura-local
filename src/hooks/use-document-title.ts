import { useEffect } from "react";

// Tab titles. The static project pages from scripts/generate-og-pages.mjs start with the same ones.
export const HOME_TITLE = "BURA | Design Studio";
export const pageTitle = (name: string) => `${name} — Studio Bura`;

// Keeps the tab title in step with the page during client-side navigation.
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
