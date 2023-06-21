import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Music } from 'src/app/domains/music';
import { MatTableDataSource } from '@angular/material/table';


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
  isPlaying: boolean = false; 
  tiempoRestante:string='';
  fileName: string="";

  audioSrc!: string;

  audioTitles: string[]=[];

  dataSource!: MatTableDataSource<any>;
  searchText!: string;
  

  constructor(private http: HttpClient){

    this.audioTitles = [];

    this.audio.ondurationchange = () => {
        const totalSeconds = Math.floor(this.audio.duration),
              duration = moment.duration(totalSeconds, 'seconds');
        this.musicLength = duration.seconds() < 10 ? 
                            `${Math.floor(duration.asMinutes())}:
                            0${duration.seconds()}` : 
                            `${Math.floor(duration.asMinutes())}:
                            ${duration.seconds()}`;
        this.duration = totalSeconds;
        this.tiempoRestante=this.convertirAFormatoCronometro(this.duration);
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
    this.audio.addEventListener('timeupdate', () => {
      const tiempoActual = this.audio.duration - this.audio.currentTime;
      this.tiempoRestante = this.convertirAFormatoCronometro(tiempoActual);
    });
    

  }

  ngOnInit() {
    this.getAudioFileNames();
    
  }
  convertirAFormatoCronometro(tiempo: number): string {
    const minutos = Math.floor(tiempo / 60);
    const segundos = Math.floor(tiempo % 60);
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  }
  
 
  

  loadAndPlayAudio(): void {
    console.log(this.fileName)
    this.audioSrc = `assets/Mp3/${this.fileName}.mp3`;
    console.log(this.audioSrc)
    this.audio.src=this.audioSrc;
  }
 
  data!:any[];
  musicList: Music[] = [];
  
  displayedColumns: string[] = ['miniatura','title','actions' /*, 'artist', 'album'*/];
  trackPointer: number = 0
  
  currentMusic: Music = {
    album: "",
    title: "",
    artist: "",
    url: ""
  }
  filteredData!:any[]

  tocarAudio(fileName:string){
    this.fileName=fileName
    console.log(fileName)
    this.loadAndPlayAudio()
  }
  togglePlay() {
    this.isPlaying = !this.isPlaying;
    this.play();
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
  filtrado(){
    this.data=this.audioTitles;
    

    const filterValue = this.searchText.toLowerCase();

    this.filteredData = this.data.filter(item => {
        const columnValue = item[this.audioTitles[1]].toLowerCase();
        return columnValue.includes(filterValue);
    });
  }
  

  
  next(): void {
    this.trackPointer++;
    this.currentMusic = this.musicList[this.trackPointer];
    this.audio.src = this.currentMusic.url;
    this.audio.play();
  }
  getAudioFileNames() {
    this.http.get<any[]>('assets/mp3-files.json').subscribe(response => {
      this.audioTitles= response.map(file => file.name);
    });
  }

}
