const NUM_OF_HOURS_IN_A_DAY = 15;
const NUM_OF_TIMES_IN_A_WEEK = 5;
const NUM_OF_MONTHS_IN_A_YEAR = 9;

const NUM_OF_UNITS_IN_CLASSROOM = 4;
const NUM_OF_FLUORESCENT_TUBES_IN_UNIT = 4;
const COST_OF_FLUORESCENT_TUBE = 7;

const MIN_WORKING_HOURS = 100;
const MAX_WORKING_HOURS = 200;

/* utility methods */

// Returns an integer from min - max (inclusive of both min and max)
function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


// Returns the number of weeks given x number of months
function calculateWeeksFromMonths(months: number): number {
  // Assuming a month is approximately 4.33 weeks
  const weeksInAMonth = 4.33;
  const weeks = months * weeksInAMonth;
  // Round up the value of weeks to make sure we're never under estimating the time
  const roundedUpWeeks = Math.ceil(weeks);

  return roundedUpWeeks;
}

// Returns the total hours given the relevant hours per day, days per week, weeks per year
function calculateTotalHours(
  hoursPerDay: number,
  daysPerWeek: number,
  weeksPerYear: number
): number {
  const totalHours = hoursPerDay * daysPerWeek * weeksPerYear;
  return totalHours;
}

/* utility methods */

class FluorescentTube {
  hoursToFailure: number;

  constructor() {
    this.hoursToFailure = rand(MIN_WORKING_HOURS, MAX_WORKING_HOURS);
  }
}

class TubeUnit {
  tubes: FluorescentTube[] = [];
  tubesReplaced = 0;

  constructor() {
    this.changeTubes();
  }

  changeTubes() {
    // Empty the tube unit before adding new tubes
    this.tubes = [];
    for (let i = 0; i < NUM_OF_FLUORESCENT_TUBES_IN_UNIT; i++) {
      this.tubes.push(new FluorescentTube());
    }
  }

  run(hours: number) {
    while (hours > 0) {

      // Once 2 fluorescent tubes fail in a single unit, you should replace all 4 tubes.
      // Sort the array of tubes and pick out the second one
      // which will reflect the time it took for the first 2 tubes to fail
      this.tubes.sort((a, b) => a.hoursToFailure - b.hoursToFailure);
      const index2 = this.tubes[1];

      hours -= index2.hoursToFailure;
      this.tubesReplaced += NUM_OF_FLUORESCENT_TUBES_IN_UNIT;
      this.changeTubes();
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

function runSimulation(): void {
  const hoursToRunClassroom = calculateTotalHours(
    NUM_OF_HOURS_IN_A_DAY,
    NUM_OF_TIMES_IN_A_WEEK,
    calculateWeeksFromMonths(NUM_OF_MONTHS_IN_A_YEAR)
  );

  const classroom = new Classroom();
  classroom.run(hoursToRunClassroom);
  const tubesReplaced = classroom.getTotalTubesReplaced();

  console.log(`Tubes replaced in a year in that classroom: ${tubesReplaced}`);
}

function getCostPerYearPerClassroom(): void {
  const numOfSimulationsToRun = 10;
  let counter = 0;
  let totalCost = 0;

  while (numOfSimulationsToRun > counter) {
    const hoursToRunClassroom = calculateTotalHours(
      NUM_OF_HOURS_IN_A_DAY,
      NUM_OF_TIMES_IN_A_WEEK,
      calculateWeeksFromMonths(NUM_OF_MONTHS_IN_A_YEAR)
    );

    const classroom = new Classroom();
    classroom.run(hoursToRunClassroom);
    const tubesReplaced = classroom.getTotalTubesReplaced();

    const costOfReplacements = tubesReplaced * COST_OF_FLUORESCENT_TUBE;
    totalCost += costOfReplacements;
    counter++;
  }

  const averageCost = totalCost / numOfSimulationsToRun;

  console.log(`Cost per year per classroom: $${averageCost}`);
}

runSimulation()
getCostPerYearPerClassroom()

