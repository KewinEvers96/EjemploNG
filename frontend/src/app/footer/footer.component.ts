import { Component, OnInit } from '@angular/core';
import {  faGithub, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  fa_Github  = faGithub;
  fa_ig = faInstagram;
  fa_yt = faYoutube;
  constructor() { }

  ngOnInit(): void {
  }

}
