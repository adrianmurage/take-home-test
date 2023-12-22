# Take home test

## Assumptions
To solve the problem, I made the following assumptions:

1. All units in a classroom are controlled by a single switch. We do not have granular control over individual units.
2. The final cost the simulation prints does not include the initial setup cost of the fluorescent tubes.
3. We count any tube that is replaced as "broken". When the first 2 fail, all 4 are considered broken.
4. How much money fluorescent tubes cost the university per year per classroom is an average value, not the result of a single simulation.


## Installation

Follow these steps to set up and run the project on your local machine:

1. Clone the Repository

```bash
git clone https://github.com/adrianmurage/take-home-test.git
cd take-home-test
```

2. Install Dependencies:

```bash
npm install
```

3. Run the simulation:

```bash
npm run dev
```