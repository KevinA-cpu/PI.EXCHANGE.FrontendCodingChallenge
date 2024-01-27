import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { TrendingGifsListComponent } from './features/display-trending-gifs/components/trending-gifs-list/trending-gifs-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, TrendingGifsListComponent]
})
export class AppComponent {
  title = 'PiExchangeFrontendCodingChallenge';
}
