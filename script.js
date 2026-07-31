(function() {
    "use strict";

    // Akan Names (Corrected to match Ghanaian tradition)
    const  maleNames = [
      "Kwasi",    // Sunday
      "Nkrumah",   // Monday
      "Kobina",  // Tuesday
      "Kosi",    // Wednesday
      "kojo",      // Thursday
      "Dante",     // Friday
      "Kwame"     // Saturday

    ];

   const femaleNames = [
      "Ya",   // Sunday
      "Ama",    // Monday
      "Abenaa",   // Tuesday
      "Akua",     // Wednesday
      "Ashante",      // Thursday
      "Ashanta",     // Friday
      "Akosua"       // Saturday

    ];

    const weekDays = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    // DOM Elements - Getting references to HTML elements
    const dayInput = document.getElementById('dayInput');
    const monthInput = document.getElementById('monthInput');
    const yearInput = document.getElementById('yearInput');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const generateBtn = document.getElementById('generateBtn');
    const akanNameDisplay = document.getElementById('akanNameDisplay');
    const dayDisplay = document.getElementById('dayDisplay');

    // Function to get selected gender
    function getSelectedGender() {
        for (let radio of genderRadios) {
            if (radio.checked) return radio.value;
        }
        return null;
    }

    // Function to validate user inputs
    function validateInputs(day, month, year) {
        // Check if inputs are valid numbers
        if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
            alert('⚠️ Please enter valid numbers for day, month, and year.');
            return false;
        }

        // Check day range
        if (day < 1 || day > 31) {
            alert('📅 Day must be between 1 and 31.');
            return false;
        }

        // Check month range
        if (month < 1 || month > 12) {
            alert('📆 Month must be between 1 and 12.');
            return false;
        }

        // Check if the day exists in the month
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth) {
            alert(`⚠️ ${month}/${day} is not a valid date. This month has only ${daysInMonth} days.`);
            return false;
        }

        return true;
    }

    // Function to calculate day of week using the formula
    function computeDayOfWeek(day, month, year) {
        const CC = Math.floor(year / 100);
        const YY = year % 100;
        const MM = month;
        const DD = day;

        // Using the formula: d = ((4*CC - 2*CC - 1) + (45*YY) + (1026*(MM+1)) + DD) mod 7
        const term1 = (4 * CC) - (2 * CC) - 1;
        const term2 = 45 * YY;
        const term3 = 1026 * (MM + 1);
        const sum = term1 + term2 + term3 + DD;

        let dayIndex = ((sum % 7) + 7) % 7;

        // Correction for years 1900-1999
        if (year >= 1900 && year < 2000) {
            dayIndex = (dayIndex + 1) % 7;
        }

        return dayIndex; // Returns 0-6 (Sunday-Saturday)
    }

    // Main function to generate Akan name
    function generateAkanName() {
        // Get values from inputs
        const day = parseInt(dayInput.value, 10);
        const month = parseInt(monthInput.value, 10);
        const year = parseInt(yearInput.value, 10);
        const gender = getSelectedGender();

        // Validate inputs
        if (!validateInputs(day, month, year)) {
            return;
        }

        if (!gender) {
            alert('👤 Please select a gender (Male or Female).');
            return;
        }

        // Calculate day of week
        const dayIndex = computeDayOfWeek(day, month, year);
        const dayName = weekDays[dayIndex];

        // Get the corresponding Akan name
        let akanName = '';
        if (gender === 'male') {
            akanName = maleNames[dayIndex];
        } else {
            akanName = femaleNames[dayIndex];
        }

        // Display the results
        akanNameDisplay.textContent = akanName;
        dayDisplay.textContent = dayName;
    }

    // Event listener for the button
    generateBtn.addEventListener('click', generateAkanName);

    // Auto-generate on page load with default values
    window.addEventListener('load', function() {
        dayInput.value = 27;
        monthInput.value = 7;
        yearInput.value = 2026;
        // Set male as default (already checked in HTML)
        generateAkanName();
    });

})();
