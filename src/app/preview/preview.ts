import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-preview',
  imports: [],
  templateUrl: './preview.html',
  styleUrl: './preview.css',
})
export class Preview {
  nameTest: string = 'Name Test';
  private readonly backGroundUrl = signal('template.png');
  getStyleText() {
    // throw new Error('Method not implemented.');
  }
  getBackGround() {
    return {
      'background-image': `url(${this.backGroundUrl()})`,
    }
  }

}
