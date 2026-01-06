/// <reference types="vite/client" />

// Declare module for vite-imagetools query parameters
declare module "*?webp" {
  const src: string;
  export default src;
}

declare module "*?format=webp" {
  const src: string;
  export default src;
}
