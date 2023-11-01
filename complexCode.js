// filename: complexCode.js

/*
This code implements a complex sorting algorithm called Merge Sort.
Merge Sort is a divide and conquer algorithm that recursively divides
the list into two halves, sorts them, and then merges the sorted halves.

This code takes an array of numbers as input and returns a new sorted array.

To execute this code, call the `mergeSort()` function with the input array.
*/

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr; // return the input array if it's empty or has only one element
  }

  const mid = Math.floor(arr.length / 2); // find the middle index
  const left = mergeSort(arr.slice(0, mid)); // divide the left half
  const right = mergeSort(arr.slice(mid)); // divide the right half

  return merge(left, right); // merge the sorted halves
}

function merge(left, right) {
  const sorted = [];

  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      sorted.push(left[leftIndex]);
      leftIndex++;
    } else {
      sorted.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return sorted.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Example usage:
const numbers = [8, 3, 2, 10, 7, 6, 9, 1, 4, 5];
const sortedNumbers = mergeSort(numbers);
console.log(sortedNumbers); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Feel free to add more test cases or modify the input array as needed.