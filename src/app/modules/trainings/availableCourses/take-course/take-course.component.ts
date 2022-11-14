import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlyrComponent } from 'ngx-plyr';

@Component({
  selector: 'app-take-course',
  templateUrl: './take-course.component.html',
  styleUrls: ['./take-course.component.css']
})
export class TakeCourseComponent implements OnInit {
  uuid : any;

  //video config
  @ViewChild(PlyrComponent) plyr!: PlyrComponent;
  player!: Plyr;

  videoSources: Plyr.Source[] = [
    {
      src: 'bTqVqk7FSmY',
      provider: 'youtube',
    },
  ];

  constructor(private activeRoute : ActivatedRoute) {
    this.uuid = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.uuid)
  }

  ngOnInit(): void {
  }

  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
  }
  
  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }

  pause(){
    console.log(this.player.pause());
  }

}
