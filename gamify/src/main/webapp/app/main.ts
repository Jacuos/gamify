import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './gmain/app.module';
import {enableProdMode} from "@angular/core";

//enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
