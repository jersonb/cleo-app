import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { ConfigurationService } from '../configuration.service';

@Component({
  selector: 'app-configuration',
  imports: [ReactiveFormsModule],
  templateUrl: './configuration.html',
  styleUrl: './configuration.css',
})
export class Configuration {
  service = inject(AppService);

  configureFormService = inject(ConfigurationService);
  configureForm = this.configureFormService.configureForm;

  protected onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.configureForm.patchValue({
        file: file,
      });
      this.configureForm.get('backGround')?.updateValueAndValidity();

      this.configureFormService.backGroundUrl.update(() => URL.createObjectURL(file));
      this.configureFormService.backGroundFile.update(() => file);
    }
  }



  protected addNames() {
    const namesRaw = this.configureForm.get('name');
    if (namesRaw) {
      const namesAsString = namesRaw.value as string;
      if (namesAsString.length > 0) {
        const names = namesAsString.split('\n');
        names.forEach((name) => this.configureFormService.names.push(new FormControl(name)));
        namesRaw.reset();
      }
    }
  }

  protected removeName(id: number) {
    this.configureFormService.names.removeAt(id);
  }

  sendFormData() {
    this.service.createRequest(this.getFormData()).subscribe({
      next: (response) => {
        const locationUrl = response.headers.get('Location');
        if (locationUrl) {

          this.service.downloadFile(locationUrl).subscribe((response) => {

            const blob = response.body as Blob;
            const filename = 'certificado.zip';
            const a = document.createElement('a');
            const objectUrl = URL.createObjectURL(blob);
            a.href = objectUrl;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(objectUrl);
          });
        }
      },
      error: (err) => console.error('Error creating request', err),
    });
  }

  private getFormData(): FormData {
    const formData = new FormData();

    const file = this.configureFormService.backGroundFile();
    const blob: Blob = file as Blob;

    formData.append('backGroundFile', blob, file.name);

    this.configureFormService.names.controls.forEach((name) => {
      formData.append('names', name.value);
    });

    formData.append('positionY', (this.configureFormService.positionY).toString());
    formData.append('fontSize', (this.configureFormService.fontSize * 1.6).toString());
    formData.append('fontColor', this.configureFormService.fontColor);
    formData.append('textTransform', this.configureFormService.textTransform);
    formData.append('italic', this.configureForm.get('italic')?.value);
    formData.append('bold', this.configureForm.get('bold')?.value);

    return formData;
  }
}

