import { Component, inject } from '@angular/core';
import { ConfigurationService } from '../configuration.service';

@Component({
  selector: 'app-preview',
  imports: [],
  templateUrl: './preview.html',
  styleUrl: './preview.css',
})
export class Preview {

  configureFormService = inject(ConfigurationService);

  getStyleText() {
    return {
      'font-size': `${this.configureFormService.fontSize * 0.25}cqh`,
      color: this.configureFormService.fontColor,
      top: `${this.configureFormService.positionY - 1}%`,
      'text-transform': this.configureFormService.textTransform,
      'font-weight': this.configureFormService.bold,
      'font-style': this.configureFormService.italic,
    };
  }

  getBackGround() {
    return {
      'background-image': `url(${this.configureFormService.backGroundUrl()})`,
    }
  }

}
