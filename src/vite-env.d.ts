/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_IMAGEKIT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
