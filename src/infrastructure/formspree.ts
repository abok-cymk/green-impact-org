const formspreeIdHash = import.meta.env.VITE_FORMSPREE_ID_HASH

if (!formspreeIdHash) {
    console.warn(
        "[Formspree] Missing VITE_FORMSPREE_ID_HASH"
    )
}

export const FORMSPREE_ID_HASH = formspreeIdHash || ""
