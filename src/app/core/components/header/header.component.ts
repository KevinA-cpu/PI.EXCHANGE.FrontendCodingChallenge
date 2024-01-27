import { Component } from '@angular/core';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ThemeService } from '../../../theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToggleButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'PiExchangeFrontendCodingChallenge';
  theme: boolean = false;

  constructor(private themeService: ThemeService) {}
  switchTheme() {
    this.theme = !this.theme;
    this.themeService.switchTheme(
      this.theme ? 'lara-light-indigo' : 'lara-dark-indigo'
    );
  }
}
