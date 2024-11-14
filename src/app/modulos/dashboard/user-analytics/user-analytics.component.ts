import { Component } from '@angular/core';
import { ChartComponent, NgxApexchartsModule } from 'ngx-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
  ApexPlotOptions,
  ApexDataLabels,
  ApexFill,
  ApexStroke,
  ApexTooltip,
  ApexGrid,
  ApexStates,
  ApexTheme
} from 'ngx-apexcharts';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-user-analytics',
  standalone: true,
  imports: [
    NgxApexchartsModule,
    ChartComponent,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './user-analytics.component.html',
  styleUrl: './user-analytics.component.css'
})
export class UserAnalyticsComponent {
  // Crecimiento Mensual de Usuarios (Gráfico de Líneas)
  public lineChartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
  } = {
    series: [
      {
        name: 'Usuarios Registrados',
        data: [30, 45, 60, 80, 120, 150, 170, 200, 220, 240, 260, 280],
      }
    ],
    chart: {
      type: 'line',
      height: 300
    },
    title: {
      text: 'Crecimiento Mensual de Usuarios',
      align: 'left'
    },
    xaxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    }
  };

  // Distribución Geográfica (Gráfico de Pastel)
  public pieChartOptions: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    title: ApexTitleSubtitle;
    responsive: ApexResponsive[];
  } = {
    series: [40, 25, 20, 10, 5],
    chart: {
      type: 'pie',
      height: 300
    },
    labels: ['Norteamérica', 'Europa', 'Asia', 'Latinoamérica', 'África'],
    title: {
      text: 'Distribución Geográfica de Usuarios',
      align: 'left'
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          } as ApexLegend
        }
      }
    ]
  };

  // Actividad Reciente de Usuarios (Gráfico de Barras)
  public barChartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    plotOptions: ApexPlotOptions;
    title: ApexTitleSubtitle;
    dataLabels: ApexDataLabels;
  } = {
    series: [
      {
        name: 'Usuarios Activos',
        data: [50, 60, 80, 40, 70, 100, 90],
      }
    ],
    chart: {
      type: 'bar',
      height: 300
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        // endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: 'Actividad Reciente de Usuarios',
      align: 'left'
    },
    xaxis: {
      categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
    }
  };
}
