import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [ReactiveFormsModule],
  styleUrl: './app.css',
})
export class App implements OnInit {
  service = inject(AppService);

  private readonly backGroundFile = signal(new File([], ''));
  private readonly backGroundUrl = signal('template.png');
  configureForm!: FormGroup;

  ngOnInit(): void {
    this.configureForm = new FormGroup({
      nameTest: new FormControl(''),
      backGround: new FormControl(''),
      positionY: new FormControl(50),
      fontSize: new FormControl(30),
      fontColor: new FormControl('#000000'),
      textTransform: new FormControl('capitalize'),
      italic: new FormControl(false),
      bold: new FormControl(false),
      name: new FormControl(''),
      names: new FormArray([]),
    });
  }

  get nameTest(): string {
    return this.configureForm.get('nameTest')?.value ?? 'Nome Para Teste';
  }

  get positionY(): number {
    return this.configureForm.get('positionY')?.value!;
  }

  get fontSize(): number {
    return this.configureForm.get('fontSize')?.value!;
  }

  get fontColor(): string {
    return this.configureForm.get('fontColor')?.value!;
  }

  get textTransform(): string {
    return this.configureForm.get('textTransform')?.value!;
  }

  get italic(): string {
    return this.configureForm.get('italic')?.value! ? 'italic' : '';
  }

  get bold(): string {
    return this.configureForm.get('bold')?.value! ? 'bold' : '';
  }

  get names(): FormArray {
    return this.configureForm.get('names') as FormArray;
  }

  protected onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.configureForm.patchValue({
        file: file,
      });
      this.configureForm.get('backGround')?.updateValueAndValidity();

      this.backGroundUrl.update(() => URL.createObjectURL(file));
      this.backGroundFile.update(() => file);
    }
  }

  protected getBackGround(): object {
    return {
      backgroundImage: `url(${this.backGroundUrl()})`,
    };
  }

  protected addNames() {
    const namesRaw = this.configureForm.get('name');
    if (namesRaw) {
      const namesAsString = namesRaw.value as string;
      if (namesAsString.length > 0) {
        const names = namesAsString.split('\n');
        names.forEach((name) => this.names.push(new FormControl(name)));
        namesRaw.reset();
      }
    }
  }

  protected removeName(id: number) {
    this.names.removeAt(id);
  }

  protected getStyleText(): object {
    return {
      'font-size': `${this.fontSize}px`,
      color: this.fontColor,
      top: `${this.positionY - 2}%`,
      'text-transform': this.textTransform,
      'font-weight': this.bold,
      'font-style': this.italic,
    };
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

    const file = this.backGroundFile();
    const blob: Blob = file as Blob;

    formData.append('backGroundFile', blob, file.name);

    this.names.controls.forEach((name) => {
      formData.append('names', name.value);
    });

    formData.append('positionY', this.positionY.toString());
    formData.append('fontSize', this.fontSize.toString());
    formData.append('fontColor', this.fontColor);
    formData.append('textTransform', this.textTransform);
    formData.append('italic', this.configureForm.get('italic')?.value);
    formData.append('bold', this.configureForm.get('bold')?.value);

    return formData;
  }
}
