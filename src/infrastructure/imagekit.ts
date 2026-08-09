const imageKitID = import.meta.env.VITE_IMAGEKIT_ID

if(!imageKitID) {
    console.warn(
        "[ImageKit] Missing VITE_IMAGEKIT_ID"
    )
}

export const IMAGE_KIT_ID = imageKitID || ""