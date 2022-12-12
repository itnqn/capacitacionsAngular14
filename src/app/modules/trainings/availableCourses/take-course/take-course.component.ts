import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlyrComponent } from 'ngx-plyr';

/*****************************************
 * services
 */
import { TrainingsService } from 'src/app/services/trainings/trainings.service';

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

  // videoSources: Plyr.Source[] = [];

  constructor(
    private activeRoute : ActivatedRoute,
    private _trainings : TrainingsService
    ) {
    this.uuid = this.activeRoute.snapshot.paramMap.get('uuid');
    this.takeCourse();
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
    this.player.on('ready', (event) => {
      const instance = event.detail.plyr;
      console.log(event.detail.plyr);
    });
  }

  takeCourse(){
    this._trainings.takeCourse(this.uuid).subscribe(res=>{
      for(let i = 0; i < res.length; i++){
        this.videoSources.push({src : res[i].path, provider : 'youtube'})
      }

      console.log(this.videoSources)
      
    })
  }

}
