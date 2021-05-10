import { Component, OnInit } from '@angular/core';
import {  faGithub, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faGithub  = faGithub;
  faIg = faInstagram;
  faYt = faYoutube;
  constructor() { }

  ngOnInit(): void {
  }

}
