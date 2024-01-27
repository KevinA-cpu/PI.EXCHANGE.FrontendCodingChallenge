import { Component } from '@angular/core';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ImageModule } from 'primeng/image';
import { ThemeService } from '../../../theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToggleButtonModule, ImageModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  theme: boolean = false;
  title = 'Frontend Coding Challenge';
  logoLightMode = 'assets/images/logo-light-mode.png';
  logoDarkMode = 'assets/images/logo-dark-mode.png';

  constructor(private themeService: ThemeService) {}
  switchTheme() {
    this.theme = !this.theme;
    this.themeService.switchTheme(
      this.theme ? 'lara-light-indigo' : 'lara-dark-indigo'
    );
  }
}
