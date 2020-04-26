import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AmiiboiAPIService} from '../../services/amiiboi-api.service';
import {isArray} from 'util';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  maxPagesCount: number;
  pageData: any;
  maxCardsCount: number;
  searchResultCount;
  currentPageNo = 0;


  fakeArray = [0, 0, 0, 0, 0];

  constructor(private api: AmiiboiAPIService, private  route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const name = params.name;
      if (name) {
        this.api.getSearch(name).subscribe(pageData => {
          this.pageData = pageData;
          this.searchResultCount = this.pageData.length;
        });
      } else {
        this.api.getMaxPages().subscribe((pagesNumber) => {
          this.maxPagesCount = pagesNumber;
          this.setFooterPages(1, 5);
        });

        this.api.getPage(1).subscribe((pageData) => this.pageData = pageData);
      }
      this.api.getMAxCardCount().subscribe(cardsCount => this.maxCardsCount = cardsCount);

    });

  }


  private setFooterPages(start: number, size: number) {
    this.fakeArray = [0, 0, 0, 0, 0];
    this.currentPageNo = start;
    let idx = start - 2;

    if (start < 3) {
      idx = 1;
    } else if (start >= this.maxPagesCount - 2) {
      idx = this.maxPagesCount - 4;
    }

    this.fakeArray = this.fakeArray.map(arrElement => arrElement + idx++);

  }


  refresh(pageNo: number) {
    pageNo = Number(pageNo ? pageNo : 1);
    this.setFooterPages(pageNo, 5);
    this.api.getPage(pageNo).subscribe((pageData) => {
      this.pageData = pageData;
    });

  }


  next() {
    this.refresh(this.currentPageNo + 1);
  }

  previous() {
    this.refresh(this.currentPageNo - 1);
  }
}
