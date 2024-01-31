import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgStyle, UpperCasePipe } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AvatarModule } from 'primeng/avatar';
import { MessageService } from 'primeng/api';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMasonryModule, NgxMasonryComponent } from 'ngx-masonry';
import { firstValueFrom } from 'rxjs';
import { TrendingGifsService } from '../../services/trending-gifs.service';
import { Gif } from '../../models/Gif';

@Component({
  selector: 'app-trending-gifs-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgStyle,
    InputTextModule,
    ImageModule,
    SkeletonModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    ToastModule,
    CardModule,
    FormsModule,
    InfiniteScrollModule,
    NgxMasonryModule,
    ProgressBarModule,
    DialogModule,
    ProgressSpinnerModule,
    AvatarModule,
    UpperCasePipe
  ],
  providers: [MessageService, provideAnimations()],
  templateUrl: './trending-gifs-list.component.html',
  styleUrl: './trending-gifs-list.component.scss'
})
export class TrendingGifsListComponent implements OnInit {
  @ViewChild(NgxMasonryComponent) masonry!: NgxMasonryComponent;

  trendingGifs: Gif[] = [];
  searchValue: string = '';
  isLoading: boolean = false;
  isScrolling: boolean = false;
  displayDialog: boolean = false;
  selectedGif!: Gif;
  isLoadingGif: boolean = false;

  constructor(
    private trendingGifsService: TrendingGifsService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    await this.loadGifs();
  }

  async search() {
    this.isLoading = true;
    this.trendingGifsService.resetOffset();
    await this.loadGifs();
  }

  async onScroll() {
    this.isScrolling = true;
    await this.loadMoreGifs();
  }

  //TODO Gif Details
  //TODO Git work flow and deployment

  private async loadGifs() {
    try {
      const response: any =
        this.searchValue === ''
          ? await firstValueFrom(this.trendingGifsService.getTrendingGifs())
          : await firstValueFrom(
              this.trendingGifsService.searchGifs(this.searchValue)
            );
      this.trendingGifs = response.data;
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isLoading = false;
    }
  }

  private async loadMoreGifs() {
    try {
      const response: any =
        this.searchValue === ''
          ? await firstValueFrom(this.trendingGifsService.getMoreTrendingGifs())
          : await firstValueFrom(
              this.trendingGifsService.searchMoreGifs(this.searchValue)
            );
      this.trendingGifs = [...this.trendingGifs, ...response.data];
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isScrolling = false;
    }
  }

  private handleError(error: any) {
    this.messageService.add({
      severity: 'error',
      summary: error.name,
      detail: error.message
    });
  }

  showDialog(gif: Gif) {
    this.isLoadingGif = true;
    this.selectedGif = gif;
    console.log(this.selectedGif);
    setTimeout(() => {
      this.isLoadingGif = false;
    }, 500);
    this.displayDialog = true;
  }
}
