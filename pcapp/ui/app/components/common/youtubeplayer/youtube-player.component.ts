
import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd, UrlSegment } from '@angular/router';
import { CTopic, CourseModel } from "../../../modals/topic";
import { TutorilaService } from "ui/app/service/tutorial/tutorialservice";
import { Topics } from '../../tutorial/topics/topics.component';
@Component({
  selector: 'play-youtube-video',
  templateUrl: './youtube-player.component.html',
  styleUrls:['./youtube-player.component.css']
})
export class YoutubePlayerComponent implements OnInit, OnDestroy, OnChanges {
    @Input()
    courses: CourseModel[];
    VideoUrl:string;
    vid: any;
    public topic: string;
    player: YT.Player;
    public videoid: any;
    videoname: any;
    height: number;
    public ytEvent;
  constructor(private route: ActivatedRoute, private router: Router,private courseService:TutorilaService) {
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.courseService.getAllTopics().pipe().subscribe(observable=>{this.courses=observable;
          this.route.url.subscribe((observer:UrlSegment[])=>{console.log("My video id "+Number(observer[0].path));this.getVideoId(Number(observer[0].path))});
        });
       
        //this.route.queryParams.subscribe((queryparams: Params) => { const vid = queryparams['watch']; this.getvideo(vid); } );
        this.vid = !this.vid;
        //this.route.params.subscribe((params: Params) => this.topic = params['topics']);
        //this.videoid = this.route.snapshot.queryParams['watch']; 
        //console.log("this.videoid"+this.videoid);
      }
    });
   }
   getVideoId=(id)=>{
this.courses.forEach(element => {
  if(this.courseService.TopicsObject.courseId==element.name){
  element.topics.map((value:CTopic)=> {
    if(value.topicId==id){
      this.VideoUrl=value.videoURL;
      this.videoid=value.videoId;
      this.topic=value.name;
      this.vid = !this.vid;
    }
  })}
});
   }
   getvideo(vid) {
     this.videoid = vid;
     
   }
  ngOnInit() {
    this.courseService.getAllTopics().pipe().subscribe(observable=>{this.courses=observable;
      this.route.url.subscribe((observer:UrlSegment[])=>{
        console.log("My video id "+Number(observer[0].path));
        this.getVideoId(Number(observer[0].path))});
        
    });
    this.route.fragment.subscribe((fragment) => {this.vid = fragment; } );  
    // this.route.params.subscribe((params: Params) => {this.videoname = params['topics']; });
    // this.route.queryParams.subscribe((queryparams: Params) => { this.videoid = queryparams['watch']; } );
    // console.log('videoid is :'+ this.videoid );
    // // console.log('name of video  ' + this.videos.name );
  }
  ngOnChanges() {
    this.route.url.subscribe((observer:UrlSegment[])=>{
      console.log("My video id "+Number(observer[0].path));
      this.getVideoId(Number(observer[0].path))});
        
    // this.route.params.subscribe((params: Params) => {this.videoname = params['topics']; });
    // this.route.queryParams.subscribe((queryparams: Params) => { this.videoid = queryparams['watch']; } );
    // console.log('videoid is :'+ this.videoid );
  }
    ngOnDestroy() {
  }
  onStateChange(event) {
    this.ytEvent = event.data;
    console.log(this.ytEvent);
    
  }
  savePlayer(player) {
    this.player = player;
    console.log(this.player);
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