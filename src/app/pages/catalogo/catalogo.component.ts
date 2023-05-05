import { Component } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  title = "catalogo";
  constructor(private router: Router){
    

   
  }
  ngOnInit(): void{

  }
  
  playsound(){
    let audio=new Audio()
    audio.src="../assets/BATTLE.mp3"
    audio.load();
    audio.play();
  }
  volver(){
    this.router.navigate([''])
  }


}
