
import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { Http } from '@angular/http';
import { Topic, CourseModel } from "../../../modals/topic";
import { TutorilaService } from "ui/app/service/tutorial/tutorialservice";
@Component({
  selector: 'play-youtube-video',
  templateUrl: './youtube-player.component.html',
  styleUrls:['./youtube-player.component.css']
})
export class YoutubePlayerComponent implements OnInit, OnDestroy, OnChanges {
    @Input()
    courses: CourseModel[];
    player: YT.Player;
    videoid: any;
    videoname: any;
    height: number;
    public ytEvent;
    vid: any;
    topic: any;
  constructor(private route: ActivatedRoute, private router: Router,private courseService:TutorilaService) {
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.route.queryParams.subscribe((queryparams: Params) => { const vid = queryparams['watch']; this.getvideo(vid); } );
        this.vid = !this.vid;
        this.route.params.subscribe((params: Params) => this.topic = params['topics']);
        this.videoid = this.route.snapshot.queryParams['watch']; 
      
      
      }
    });
   }
   getvideo(vid) {
     this.videoid = vid;
   }
  ngOnInit() {
    this.courseService.getAllTopics().pipe().subscribe(observable=>{this.courses=observable;});
    this.route.params.subscribe((params: Params) => {this.videoname = params['topics']; });
    this.route.queryParams.subscribe((queryparams: Params) => { this.videoid = queryparams['watch']; } );
    console.log('videoid is :'+ this.videoid );
    this.route.fragment.subscribe((fragment) => {this.vid = fragment; } );
    // console.log('name of video  ' + this.videos.name );
  }
  ngOnChanges() {
    this.route.params.subscribe((params: Params) => {this.videoname = params['topics']; });
    this.route.queryParams.subscribe((queryparams: Params) => { this.videoid = queryparams['watch']; } );
    console.log('videoid is :'+ this.videoid );
  }
    ngOnDestroy() {
  }
  onStateChange(event) {
    this.ytEvent = event.data;
  }
  savePlayer(player) {
    this.player = player;
  }
  playVideo() {
    this.player.playVideo();
  }
  pauseVideo() {
    this.player.pauseVideo();
  }
}

// {
  
//   constructor(private activeRoute: ActivatedRoute){

//   }
//   player: YT.Player;
  
//  // @Input()
//   private id: string;
 
//   ngOnInit () {
//     this.activeRoute.parent.params.subscribe(params => {
//       console.log('Youtub player parent params:', params)
//     });
//     this.activeRoute.params.subscribe(params => {
//       console.log('Youtub child params:', params.topicId);
//       this.id = params.topicId;
//       if(this.player){
//         console.log('loading new video............?')
//         this.player.loadVideoById(this.id);
//       }
//     });
//   }
  
//   savePlayer(player) {
//     this.player = player;
//     console.log('player instance', player);
//   }
//   onStateChange(event) {
//     console.log('player state', event.data);
//   }

//   onDestroy(){
//     console.log('Destorying >>', this.id);
//   }
// }