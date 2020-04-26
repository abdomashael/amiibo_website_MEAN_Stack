import {Component, OnInit} from '@angular/core';
import {AmiiboiAPIService} from '../../services/amiiboi-api.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  constructor(private apiService: AmiiboiAPIService, private router: Router) {
  }

  ngOnInit(): void {

  }

  onSubmit(f: NgForm) {
    this.router.navigate(['/search'], {queryParams: {name: f.value.search}});

  }
}
