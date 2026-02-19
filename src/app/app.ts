import { Component } from '@angular/core';

import { Configuration } from "./configuration/configuration";
import { Preview } from "./preview/preview";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Configuration, Preview],
  styleUrl: './app.css',
})
export class App {



}
