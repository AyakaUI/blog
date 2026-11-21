---
title: November 2026 Update
authors: [Akari]
banner: https://github.com/AyakaUI-CI/blog_assets/raw/refs/heads/main/2026-11-20/banner.webp
description: Android 17 Cinnamon Bun.
---

# November 2026 Update

<Banner src="https://github.com/AyakaUI-CI/blog_assets/raw/refs/heads/main/2026-11-20/banner.webp" />

The November update brings the latest security patches and, after a rough few weeks, a reworked Play Integrity setup that can pass Device and Strong Integrity again.


# What's new?

## November security patch
We've merged the November security patches into PixelOS, updating the platform security level to 2026-11-01. This includes fixes for a lock screen bypass through the default USB functions, a shell command vulnerability in the window manager, apps starting foreground services from the background, and permission checks for every activity inside a task.

## Play Integrity
In October, Google changed its server-side checks and PixelOS could only pass Basic Integrity. Over the past few weeks we went through how PixelOS handles Play Integrity from top to bottom, and found a few things on our side that were holding it back.

- Key attestation on more devices: Google Play Services asks for device ID attestation when it generates its attestation keys, and some devices refuse that request in hardware. When that happened, the key quietly fell back to a software key that Google rejects, so those devices were stuck on Basic Integrity no matter which keybox they used. PixelOS now leaves those ID fields out of the request to the hardware and adds the certified device's IDs back into the attestation certificate afterwards.
- Certified props for DroidGuard: The certified device properties used to reach DroidGuard through changes to the system's C library. They now go through Android's own system property override mechanism, which is turned on only for the DroidGuard process, so nothing else on your device sees the spoofed values.
- Matching build fields: Build.DISPLAY now matches the certified build ID, instead of showing the ROM's own build ID next to a Pixel fingerprint.
- Less reach: The spoofing config is only handed to the processes that actually use it, and Play Integrity setup only runs in DroidGuard and the Play Store.

While we were at it, we also tightened some of the permission exemptions that came with our spoofing code. They now only apply to preinstalled apps, and an app can no longer get past accessibility and content provider checks just by having "google" in its package name.

To pass Device and Strong Integrity:

Update to this build.
1. Load a keybox that Google hasn't revoked from Settings > System > Developer options > Spoofing > Keybox > Import Keybox. The default keybox may not be enough on its own.
2. Load the Pixel 6A fingerprint from Settings > System > Developer options > Spoofing > Play Integrity Fix > Fetch Pixel fingerprint
3. Turn on Settings > System > Developer options > Spoofing > Play Integrity Fix > Advanced spoofing > Play Store fingerprint.
4. Passing Play Integrity is still best-effort. Google decides what passes on its servers, and that can change at any time without a PixelOS update. If Google changes its checks and integrity stops passing again, that's outside our control. We'll update the [Play Integrity guide](https://blog-ayaka.vercel.app/docs/guides/PlayIntegrity) if that happens.

## Support our work

To support our work, consider making a donation at [blog.ayaka](https://blog-ayaka.vercel.app/docs/donate/) to assist in covering our infrastructure expenses.

Thanks, as always, for being part of AyakaUI.

