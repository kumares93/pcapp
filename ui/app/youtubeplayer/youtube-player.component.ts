import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'play-youtube-video',
  templateUrl: './youtube-player.component.html'
})
export class YoutubePlayerComponent {
  
  constructor(private activeRoute: ActivatedRoute){

  }
  player: YT.Player;
  
 // @Input()
  private id: string;
 
  ngOnInit () {
    this.activeRoute.parent.params.subscribe(params => {
      console.log('Youtub player parent params:', params)
    });
    this.activeRoute.params.subscribe(params => {
      console.log('Youtub child params:', params.topicId);
      this.id = params.topicId;
      if(this.player){
        console.log('loading new video............?')
        this.player.loadVideoById(this.id);
      }
    });
  }
  
  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }
  onStateChange(event) {
    console.log('player state', event.data);
  }

  onDestroy(){
    console.log('Destorying >>', this.id);
  }
}