import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartOptions } from 'chart.js';
import { Country } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { charsetDataTypes as toto } from 'src/app/core/types/charsetDataTypes';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);


  public pieChartOptions: ChartOptions<'pie'> = {
    //responsive: false
    responsive: false
    
    


  };
  //public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  public pieChartLabels:string[] = [];//
  public pieChartDatasets: toto[] = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public gameQuantity!:number;
  public countriesQuantity!:number;


  constructor(private olympicService: OlympicService,private instanceRouteur:Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe(arrayCountries=>{
      let nbrOfMedals:number[]=[];
      if (arrayCountries!=undefined) {
        this.countriesQuantity=arrayCountries.length;
        arrayCountries.forEach( (value:Country)=> {
          console.log(value);
          this.pieChartLabels.push(value.country);
          this.gameQuantity = value.participations.length;
          let totParticipation=0;
          value.participations.forEach ((p:Participation)=>{
            totParticipation=totParticipation+p.medalsCount;
          })
          nbrOfMedals.push(totParticipation);
          
        }); 
              
        this.pieChartDatasets = [{
          data: nbrOfMedals,
        }];

      }
      


    });
    
  }

  onChartClick = ($event:any) => 
    {

      
      const pId = $event.active[0].index;
      console.log("Index="+pId);
      this.instanceRouteur.navigateByUrl('liste-participations/'+pId);


    };

    
  
  

}import { charsetDataTypes } from 'src/app/core/types/charsetDataTypes';
import { Router } from '@angular/router';

