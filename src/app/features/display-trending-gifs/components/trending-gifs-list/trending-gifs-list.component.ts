import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgStyle } from '@angular/common';
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
import { MessageService } from 'primeng/api';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMasonryModule, NgxMasonryComponent } from 'ngx-masonry';
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
    ProgressBarModule
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

  constructor(
    private trendingGifsService: TrendingGifsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.trendingGifsService.getTrendingGifs().subscribe((response: any) => {
      this.trendingGifs = response.data;
      this.isLoading = false;
    });
  }

  search() {
    this.isLoading = true;
    if (this.searchValue == '') {
      this.trendingGifsService.getTrendingGifs().subscribe((response: any) => {
        this.trendingGifs = response.data;
        this.isLoading = false;
      });
    } else {
      this.trendingGifsService.searchGifs(this.searchValue).subscribe({
        next: (response: any) => {
          this.trendingGifs = response.data;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'error',
            summary: error.name,
            detail: error.message
          });
        }
      });
    }
  }

  onScroll() {
    this.isScrolling = true;
    if (this.searchValue != '') {
      this.trendingGifsService.searchMoreGifs(this.searchValue).subscribe({
        next: (response: any) => {
          this.trendingGifs = [...this.trendingGifs, ...response.data];
          this.isScrolling = false;
          this.masonry.reloadItems();
          this.masonry.layout();
        },
        error: (error: any) => {
          this.isScrolling = false;
          this.messageService.add({
            severity: 'error',
            summary: error.name,
            detail: error.message
          });
        }
      });
    } else {
      this.trendingGifsService.getMoreTrendingGifs().subscribe({
        next: (response: any) => {
          this.trendingGifs = [...this.trendingGifs, ...response.data];
          this.isScrolling = false;
          this.masonry.reloadItems();
          this.masonry.layout();
        },
        error: (error) => {
          this.isScrolling = false;
          this.messageService.add({
            severity: 'error',
            summary: error.name,
            detail: error.message
          });
        }
      });
    }
  }
}
