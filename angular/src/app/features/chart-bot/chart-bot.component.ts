import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-bot',
  // templateUrl: './chart-bot.component.html',
    template: '',

  styleUrls: ['./chart-bot.component.css'],
  standalone: true,
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class ChartBotComponent implements OnInit, OnDestroy {
  private scriptElement?: HTMLScriptElement;

  ngOnInit(): void {
    this.scriptElement = document.createElement('script');
    this.scriptElement.type = 'text/javascript';
    this.scriptElement.async = true;
    this.scriptElement.src = 'https://embed.tawk.to/6901e4d6bfd24a194fbe6a91/1j8nmbq9p';
    this.scriptElement.charset = 'UTF-8';
    this.scriptElement.setAttribute('crossorigin', '*');
    document.body.appendChild(this.scriptElement);
  }

  ngOnDestroy(): void {
    if (this.scriptElement) {
      document.body.removeChild(this.scriptElement);
    }
  }
}
