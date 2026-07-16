import { Component, computed, signal } from '@angular/core';

type CounterValue = {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
};

@Component({
  selector: 'app-relationship-counter',
  imports: [],
  templateUrl: './relationship-counter.html',
  styleUrl: './relationship-counter.scss',
})
export class RelationshipCounter {
  private readonly firstDate = new Date('2024-09-27T00:00:00-03:00');
  private readonly now = signal(new Date());

  protected readonly counter = computed(() => this.calculateCounter(this.now()));

  constructor() {
    setInterval(() => this.now.set(new Date()), 1000);
  }

  private calculateCounter(now: Date): CounterValue {
    const cursor = new Date(this.firstDate);
    let years = now.getFullYear() - cursor.getFullYear();
    cursor.setFullYear(cursor.getFullYear() + years);

    if (cursor > now) {
      years -= 1;
      cursor.setFullYear(cursor.getFullYear() - 1);
    }

    let months = now.getMonth() - cursor.getMonth();

    if (months < 0) {
      months += 12;
    }

    cursor.setMonth(cursor.getMonth() + months);

    if (cursor > now) {
      months -= 1;
      cursor.setMonth(cursor.getMonth() - 1);
    }

    const diff = now.getTime() - cursor.getTime();
    const days = Math.floor(diff / 86400000);
    const totalMs = now.getTime() - this.firstDate.getTime();

    return {
      years,
      months,
      days,
      totalDays: Math.floor(totalMs / 86400000),
      totalHours: Math.floor(totalMs / 3600000),
    };
  }
}
