// src/app/shared/components/chart-wrapper/chart-wrapper.component.ts
import { Component, input, OnInit, OnDestroy, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

interface ChartDataPoint {
  label: string;
  value: number;
}

@Component({
  selector: 'app-chart-wrapper',
  standalone: true,
  host: { style: 'display: contents' },
  imports: [CommonModule],
  template: `
    <div class="bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-black text-black uppercase tracking-tight">{{ title() }}</h3>
        @if (icon()) {
          <span class="material-icons text-[#0ABAB5]">{{ icon() }}</span>
        }
      </div>
      <div #chartContainer class="flex-1 w-full min-h-[200px] relative overflow-hidden">
        <!-- D3 Chart will be rendered here -->
      </div>
    </div>
  `
})
export class ChartWrapperComponent implements OnInit, OnDestroy {
  title = input<string>('');
  icon = input<string>('');
  data = input<ChartDataPoint[]>([]);
  type = input<'bar' | 'line' | 'pie'>('bar');

  chartContainer = viewChild<ElementRef>('chartContainer');
  private resizeObserver: ResizeObserver | null = null;

  ngOnInit() {
    this.initChart();
    this.setupResizeObserver();
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private initChart() {
    // Basic D3 implementation for the mock look
    const container = this.chartContainer()?.nativeElement;
    if (!container) return;

    d3.select(container).selectAll('*').remove();
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Mock data if none provided
    const chartData: ChartDataPoint[] = this.data().length > 0 ? this.data() : [
      { label: 'Mon', value: 30 },
      { label: 'Tue', value: 80 },
      { label: 'Wed', value: 45 },
      { label: 'Thu', value: 60 },
      { label: 'Fri', value: 20 },
      { label: 'Sat', value: 90 },
      { label: 'Sun', value: 55 }
    ];

    const x = d3.scaleBand()
      .range([0, width - margin.left - margin.right])
      .domain(chartData.map(d => d.label))
      .padding(0.2);

    const y = d3.scaleLinear()
      .range([height - margin.top - margin.bottom, 0])
      .domain([0, 100]);

    // X Axis
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('class', 'font-bold text-black');

    // Y Axis
    svg.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .selectAll('text')
      .attr('class', 'font-bold text-black');

    // Bars
    svg.selectAll('.bar')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.label) || 0)
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.value))
      .attr('height', d => height - margin.top - margin.bottom - y(d.value))
      .attr('fill', '#0ABAB5')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('rx', 4);
  }

  private setupResizeObserver() {
    const container = this.chartContainer()?.nativeElement;
    if (!container) return;

    this.resizeObserver = new ResizeObserver(() => {
      this.initChart();
    });
    this.resizeObserver.observe(container);
  }
}
