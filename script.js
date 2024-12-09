let stepCount = 0;
const strideLength = 0.78; // Average stride length in meters (adjustable)
const stepsElement = document.getElementById("steps");
const distanceElement = document.getElementById("distance");
const statusElement = document.getElementById("status");
let isWalking = false;

// Check if the device supports motion events
if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
) {
    // For iOS
    DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
            if (permissionState === "granted") {
                window.addEventListener("devicemotion", trackSteps);
            } else {
                alert("Permission to access motion sensors denied.");
            }
        })
        .catch(console.error);
} else if (typeof DeviceMotionEvent !== "undefined") {
    // For other devices
    window.addEventListener("devicemotion", trackSteps);
} else {
    alert("DeviceMotionEvent is not supported on this device.");
}

function trackSteps(event) {
    const acceleration = event.accelerationIncludingGravity;
    const totalAcceleration = Math.sqrt(
        acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
    );

    // Threshold for detecting steps
    const threshold = 12; // Adjust based on device sensitivity

    if (totalAcceleration > threshold) {
        if (!isWalking) {
            isWalking = true;
            statusElement.textContent = "Status: Walking";
        }

        stepCount++;
        updateDisplay();
    } else {
        if (isWalking) {
            isWalking = false;
            statusElement.textContent = "Status: Stationary";
        }
    }
}

function updateDisplay() {
    stepsElement.textContent = `Steps: ${stepCount}`;
    distanceElement.textContent = `Distance: ${(
        stepCount * strideLength
    ).toFixed(2)} meters`;
}