import { Component } from '@angular/core';
import * as moment from 'moment';
import { Music } from 'src/app/domains/music';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
  tittle="ReproductorMP3"
  audio = new Audio();
  musicLength: string = '0:00';
  duration: number = 1;
  currentTime: string = '0:00';

  constructor(){
    this.audio.ondurationchange = () => {
        const totalSeconds = Math.floor(this.audio.duration),
              duration = moment.duration(totalSeconds, 'seconds');
        this.musicLength = duration.seconds() < 10 ? 
                            `${Math.floor(duration.asMinutes())}:
                            0${duration.seconds()}` : 
                            `${Math.floor(duration.asMinutes())}:
                            ${duration.seconds()}`;
        this.duration = totalSeconds;
      }
    
      

    this.audio.ontimeupdate = () => {
      const duration = moment.duration(
        Math.floor(this.audio.currentTime), 'seconds');
      this.currentTime = duration.seconds() < 10 ? 
          `${Math.floor(duration.asMinutes())}:
          0${duration.seconds()}` : 
          `${Math.floor(duration.asMinutes())}:
          ${duration.seconds()}`;
    }
    
    
    
    

  }
  musicList: Music[] = [];
  
  displayedColumns: string[] = ['title', 'artist', 'album','actions'];
  trackPointer: number = 0;
  currentMusic: Music = {
    album: "",
    title: "",
    artist: "",
    url: ""
  }

  
  play(index?: number): void {
    if (index === undefined) {
      if (this.audio.paused) {
        if (this.audio.readyState === 0) {
          this.trackPointer = 0;
          this.currentMusic = this.musicList[0];
          this.audio.src = this.currentMusic.url;
        }
        this.audio.play();
      } else {
        this.audio.pause();
      }
    } else {
      this.trackPointer = index;
      this.currentMusic = this.musicList[index];
      this.audio.src = this.currentMusic.url;
      this.audio.play();
    } 
  }
  prev(): void {
    this.trackPointer--;
    this.currentMusic = this.musicList[this.trackPointer];
    this.audio.src = this.currentMusic.url;
    this.audio.play();
  }
  volumeSlider(event: any) {
    this.audio.volume = event.value / 16;
  }

  durationSlider(event: any) {
    this.audio.currentTime = event.value;
  }

  /*getAllMusic(): Observable<Music[]> {
    return this.store
      .collection('music', 
      ref => ref.orderBy('title'))
      .valueChanges({ idField: 'id' }).pipe() as Observable<Music[]>;
  }*/
  next(): void {
    this.trackPointer++;
    this.currentMusic = this.musicList[this.trackPointer];
    this.audio.src = this.currentMusic.url;
    this.audio.play();
  }

}
