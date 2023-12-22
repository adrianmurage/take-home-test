const NUM_OF_HOURS_IN_A_DAY = 15;
const NUM_OF_TIMES_IN_A_WEEK = 5;
const NUM_OF_MONTHS_IN_A_YEAR = 9;

const NUM_OF_UNITS_IN_CLASSROOM = 4;
const NUM_OF_FLUORESCENT_TUBES_IN_UNIT = 4;
const COST_OF_FLUORESCENT_TUBE = 7;

const MIN_WORKING_HOURS = 100;
const MAX_WORKING_HOURS = 200;

/* utility functions */

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function calculateWeeksFromMonths(months: number): number {

  // Assuming a month is approximately 4.33 weeks
  const weeksInAMonth = 4.33;
  const weeks = months * weeksInAMonth;
  // Round up weeks to make sure we're never under estimating the time
  const roundedUpWeeks = Math.ceil(weeks);

  return roundedUpWeeks;
}

function calculateTotalHours(
  hoursPerDay: number,
  daysPerWeek: number,
  weeksPerYear: number
): number {
  const totalHours = hoursPerDay * daysPerWeek * weeksPerYear;
  return totalHours;
}

/* utility functions */

class FluorescentTube {
  hoursToFailure: number;

  constructor() {
    this.hoursToFailure = rand(MIN_WORKING_HOURS, MAX_WORKING_HOURS);
  }
}

class TubeUnit {
  tubes: FluorescentTube[] = [];
  tubesReplaced: number = 0;

  constructor() {
    this.changeTubes()
  }

  changeTubes() {
    this.tubes = []
    for (let i = 0; i < NUM_OF_FLUORESCENT_TUBES_IN_UNIT; i++) {
      this.tubes.push(new FluorescentTube());
    }
  }

  run(hours: number) {
    while (hours > 0) {
      this.tubes.sort((a, b) => a.hoursToFailure - b.hoursToFailure);
      console.log(this.tubes)
      const index2 = this.tubes[1];

      hours -= index2.hoursToFailure;
      this.tubesReplaced += NUM_OF_FLUORESCENT_TUBES_IN_UNIT;
      this.changeTubes()
    }
  }
}

class Classroom {
  units: TubeUnit[] = [];

  constructor() {
    for (let i = 0; i < NUM_OF_UNITS_IN_CLASSROOM; i++) {
      this.units.push(new TubeUnit());
    }
  }

  run(hours: number) {
    for (let unit of this.units) {
      unit.run(hours);
    }
  }

  getTotalTubesReplaced(): number {
    return this.units.reduce((total, unit) => total + unit.tubesReplaced, 0);
  }
}

const hoursToRunClassroom = calculateTotalHours(
  NUM_OF_HOURS_IN_A_DAY,
  NUM_OF_TIMES_IN_A_WEEK,
  calculateWeeksFromMonths(NUM_OF_MONTHS_IN_A_YEAR)
);

const classroom = new Classroom();
classroom.run(hoursToRunClassroom);
const tubesReplaced = classroom.getTotalTubesReplaced();

console.log(`Tubes replaced in a year: ${tubesReplaced}`);
console.log(`Cost per year: $${tubesReplaced * COST_OF_FLUORESCENT_TUBE}`);
