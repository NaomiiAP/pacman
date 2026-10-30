/// <reference types="vite/client" />

declare module 'virtual:amplify-outputs' {
  const outputs: Record<string, unknown> | null;
  export default outputs;
}
