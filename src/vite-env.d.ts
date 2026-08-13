/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_IMAGEKIT_ID: string
    readonly VITE_FORMSPREE_ID_HASH: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
