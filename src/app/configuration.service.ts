import { Injectable, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  readonly backGroundFile = signal(new File([], ''));
  readonly backGroundUrl = signal('template.png');
  configureForm: FormGroup;
  constructor() {
    this.configureForm = new FormGroup({
      nameTest: new FormControl(null),
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

}
