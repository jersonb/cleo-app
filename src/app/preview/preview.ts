import { Component, inject, signal } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-preview',
  imports: [],
  templateUrl: './preview.html',
  styleUrl: './preview.css',
})
export class Preview {

  service = inject(AppService);
  private readonly backGroundUrl = signal('template.png');

  get nameTest(): string {
    return this.service.configurationPreview?.get('nameTest')?.value ?? 'Nome Para Teste';
  }

  get positionY(): number {
    return this.service.configurationPreview?.get('positionY')?.value!;
  }

  get fontSize(): number {
    return this.service.configurationPreview?.get('fontSize')?.value!;
  }

  get fontColor(): string {
    return this.service.configurationPreview?.get('fontColor')?.value!;
  }

  get textTransform(): string {
    return this.service.configurationPreview?.get('textTransform')?.value!;
  }

  get italic(): string {
    return this.service.configurationPreview?.get('italic')?.value! ? 'italic' : '';
  }

  get bold(): string {
    return this.service.configurationPreview?.get('bold')?.value! ? 'bold' : '';
  }
  getStyleText() {
    return {
      'font-size': `${this.fontSize}px`,
      color: this.fontColor,
      top: `${this.positionY - 3}%`,
      'text-transform': this.textTransform,
      'font-weight': this.bold,
      'font-style': this.italic,
    };
  }

  getBackGround() {
    return {
      'background-image': `url(${this.backGroundUrl()})`,
    }
  }

}
