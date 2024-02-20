# Image Handling

This sample Capacitor application demonstrates:
- Local image caching
- Image capture
- Loading and saving

## Local Image Caching
Whenever you reference an image using an `img` tag you'll generally specify the `src` property with an external url to an image (eg `https://myserver.com/images/my-image.jpg`). If the url is not available (eg no network connection) you'll find that the image does not display. You may instead want to cache or store images locally on the device so that the image can be displayed regardless of network connectivity or to avoid storing images elsewhere.

This application uses a technique to store images using the `@capacitor/filesystem` plugin. It will also work with external images by storing the image locally and always reference the local copy.

The file [`cached-store.ts`](./src/app/cached-img//cached-store.ts) is used to read and store images using the `@capacitor/filesystem` plugin. It is used by an Angular component [`app-cached-img`](./src/app/cached-img/cached-img.component.ts) which essentially replaces the standard html `img` tag but provides storage automatically.

## Example
In [`home.page.html`](./src/app/home/home.page.html) you'll find this line:
```html
<app-cached-img [src]="src"></app-cached-img>
```
This displays the image associated with the url in the `src` variable. It also automatically stores it on the device or browser.

In [`home.page.ts`](./src/app/home/home.page.ts) we set `src`:
```typescript
    const res = await Preferences.get({key: 'profile-image'});
    if (!res.value) return;
    this.src = res.value;
```
`src` is loaded from a url we saved using the `@capacitor/preferences` plugin.

We saved this url from an image we captured using the Camera (using the `@capacitor/camera` plugin) which is done with this code:
```typescript
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    if (!image.webPath) return;
    await Preferences.set({key: 'profile-image', value: image.webPath});
    this.src = image.webPath;
```

