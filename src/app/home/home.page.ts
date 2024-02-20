import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { CachedImgComponent } from '../cached-img/cached-img.component';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, CachedImgComponent],
})
export class HomePage implements OnInit {


  src = 'https://ionic.io/blog/wp-content/uploads/2024/02/superappblog-feature-image-2048x1024.png';

  async change() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    if (!image.webPath) return;
    await Preferences.set({key: 'profile-image', value: image.webPath});
    this.src = image.webPath;
  }

  async ngOnInit() {
    const res = await Preferences.get({key: 'profile-image'});
    if (!res.value) return;
    this.src = res.value;

  }
}
