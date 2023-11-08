/**
 * Filename: AdvancedDataVisualization.js
 * 
 * This code demonstrates advanced data visualization using JavaScript and HTML5 Canvas.
 * It generates an interactive 3D scatter plot with zooming, panning, and rotating features.
 * The visualization is based on a simulated dataset.
 * 
 * Author: John Doe
 * Date: November 2021
 */

// Initialize the canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Define variables for plot parameters
const plotCenterX = canvas.width / 2;
const plotCenterY = canvas.height / 2;
const plotRadius = Math.min(canvas.width, canvas.height) / 2;
const pointSize = 5;

// Simulated data generation
const dataPoints = [];
for (let i = 0; i < 1000; i++) {
  const x = Math.random() * 2 - 1;  // Random number between -1 and 1
  const y = Math.random() * 2 - 1;
  const z = Math.random() * 2 - 1;
  dataPoints.push({ x, y, z });
}

// Define functions for rendering and interaction
function render() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the axes
  ctx.beginPath();
  ctx.moveTo(plotCenterX - plotRadius, plotCenterY);
  ctx.lineTo(plotCenterX + plotRadius, plotCenterY);
  ctx.moveTo(plotCenterX, plotCenterY - plotRadius);
  ctx.lineTo(plotCenterX, plotCenterY + plotRadius);
  ctx.strokeStyle = '#888888';
  ctx.stroke();

  // Draw the data points
  dataPoints.forEach((point) => {
    const plotX = plotCenterX + point.x * plotRadius;
    const plotY = plotCenterY - point.y * plotRadius;

    ctx.beginPath();
    ctx.arc(plotX, plotY, pointSize, 0, 2 * Math.PI);
    ctx.fillStyle = '#ff0000';
    ctx.fill();
  });
}

function handleMouseWheel(event) {
  // Handle zooming based on mouse wheel direction
  const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
  const scaleFactor = 1 + delta * 0.1;

  // Adjust plot radius and point size
  plotRadius *= scaleFactor;
  pointSize *= scaleFactor;

  // Re-render the plot
  render();
}

function handleMouseMove(event) {
  // Handle rotating the plot based on mouse movement
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left - plotCenterX;
  const mouseY = event.clientY - rect.top - plotCenterY;

  // Calculate rotation angles
  const angleX = mouseY / plotRadius;
  const angleY = mouseX / plotRadius;

  // Apply rotation to data points
  dataPoints.forEach((point) => {
    const newX = point.x * Math.cos(angleX) - point.z * Math.sin(angleX);
    const newZ = point.x * Math.sin(angleX) + point.z * Math.cos(angleX);
    const newY = point.y * Math.cos(angleY) - newZ * Math.sin(angleY);
    const newZ2 = point.y * Math.sin(angleY) + newZ * Math.cos(angleY);

    point.x = newX;
    point.y = newY;
    point.z = newZ2;
  });

  // Re-render the plot
  render();
}

// Add event listeners for interaction
canvas.addEventListener('mousewheel', handleMouseWheel);
canvas.addEventListener('DOMMouseScroll', handleMouseWheel);
canvas.addEventListener('mousemove', handleMouseMove);

// Initial rendering
render();