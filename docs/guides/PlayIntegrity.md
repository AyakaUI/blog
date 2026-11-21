# Play Integrity

How to set the keybox and fingerprint, and what to try when an app fails.

Google Play, and plenty of other apps, check Play Integrity before they'll run. PixelOS handles that in the system, so you don't need a Magisk module for it.

Open `Settings > System > Developer options > Spoofing.` PixelOS won't download a keybox for you. You import one yourself.

::: info
Developer mode is now hidden from apps.
:::

## Set it up

<Steps>

### Keybox

Open **Spoofing > Attestation** and tap **Import keybox**. Pick a keybox XML that Google hasn't revoked, then clear Play Store data when asked.

### Fingerprint

Open **Spoofing > Play Integrity Fix** and tap **Fetch Pixel fingerprint**. Choose **Pixel 6a**, the one marked Recommended. If you already have a fingerprint file, tap **Import configuration** instead.

Either way, clear Play Store data when you're asked. That might sign you out of the Play Store.

If you're having trouble, toggle **Advanced spoofing > Play Store fingerprint**, clear Play Store data, reboot, and check integrity again.

### Check integrity

Open the Play Store, tap your profile, then **Settings > About**. Tap **Play Store version** until it says developer mode is enabled. Go back to Settings, open **General > Developer options**, and tap **Check integrity**.

Don't use a third-party app for it. Check integrity in the Play Store.

</Steps>

## Target apps
`Attestation > Target apps` is the list of apps that receive the keybox. Tap an app, pick a mode, and open the app again. PixelOS stops it when you change the mode, so it actually picks up the new one.

| Mode | What it does |
|---|---|
| Auto | Uses the imported keybox. Play Store and Play Services are already on this. Start here. |
| Leaf hack | Re-signs a certificate the app already has. |
| Certificate generation | Makes a new certificate when the app asks for a key. |
| Skip | Leaves the app on the list without giving it the keybox. Installing it again later stays that way. |
| Not targeted | Takes the app off the list. Install it again and it comes back as Auto. |

# An app still fails, or it says you're rooted

Add it under Spoofing > Attestation > Target apps and try the modes one at a time: Auto, then Leaf hack, then Certificate generation, then Skip. Open the app again after each change. If it still doesn't respond well, clear that app's data and try it again.

Some apps that need root, such as MT Manager and the Magisk app, can keep other apps from working. Try uninstalling those too. Another way of rooting, such as KernelSU (KSU), can cause the same trouble.

If it still doesn't work, it probably won't. You can try a different Magisk module, or whatever else you want to try.

::: info
Passing Play Integrity is best-effort. Google decides what passes on its servers, and that can change without a PixelOS update.
:::
