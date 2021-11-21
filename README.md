# K6 - Creating Load an Stress Tests with k6

This repository show to use [k6](https://k6.io/) to create Load and Stress tests.

* Load Test: Is a type of Performance Testing used to determine a system's behavior under both normal and peak conditions.
Load Testing is used to ensure that the application performs satisfactorily when many users access it at the same time.
  
* Stress Test: Is a type of load testing used to determine the limits of the system. The purpose of this test is to verify the stability and reliability of the system under   **extreme conditions**.

## Installation

To install k6, follow the steps of the [installation guide](https://k6.io/docs/getting-started/installation/)

#### After clone this repository:

Running Load Test:

```sh
$ k6 run load_test\script.js
```

Running Stress Test:

```sh
$ k6 run stress-test\stress-test-script.js
```

## Checking the results

Inspect the k6 end-of-test summary. In console, we can see the print of summary report to stdout that contains a general overview of your test results.
For example:

![load-k6](https://user-images.githubusercontent.com/4943122/142746856-e43cf18d-0024-4f44-ab70-57a64b73c1f3.png)

In example above, we can see the _execution context_, any _logs of my script_ (when the response is longer than expected) and the _checks result_.

## Next Steps

* Create GithubAction workflow to execute k6 tests
* Send results and alerts to Slack Channel


