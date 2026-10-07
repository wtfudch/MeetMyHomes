/**
 * public/js/calendar.js
 *
 * Availability calendar + "Request to Book" form on the listing detail page.
 * Renders one month at a time, greys out past/booked dates (booked dates
 * come from data-busy, synced server-side from Airbnb/Booking.com iCal
 * feeds — see config/calendarSync.js), and lets a visitor pick a check-in/
 * check-out range before submitting a booking request.
 */
document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('availability-calendar');
  if (!calendarEl) return; // not on this page

  const busyRanges = JSON.parse(calendarEl.dataset.busy || '[]');
  const gridEl = document.getElementById('calendar-grid');
  const monthLabelEl = document.getElementById('calendar-month-label');
  const prevBtn = document.getElementById('calendar-prev');
  const nextBtn = document.getElementById('calendar-next');

  const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const MAX_MONTHS_AHEAD = 12;

  const toISODate = date => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();
  let checkIn = null;  // ISO date string
  let checkOut = null; // ISO date string

  function isDateBusy(iso) {
    // A date is busy if it falls within [start, end) of any synced range —
    // `end` is the checkout day on the source calendar, so it's free again.
    return busyRanges.some(({ start, end }) => iso >= start && iso < end);
  }

  // Is every night between two ISO dates (exclusive of checkout day) free?
  function isRangeAvailable(startIso, endIso) {
    const cursor = new Date(startIso);
    const end = new Date(endIso);
    while (cursor < end) {
      if (isDateBusy(toISODate(cursor))) return false;
      cursor.setDate(cursor.getDate() + 1);
    }
    return true;
  }

  function updateBookingButtonAndSummary() {
    const summaryEl = document.getElementById('selected-dates-summary');
    const submitBtn = document.getElementById('booking-submit-btn');
    document.getElementById('booking-checkin').value = checkIn || '';
    document.getElementById('booking-checkout').value = checkOut || '';

    if (checkIn && checkOut) {
      summaryEl.textContent = `${checkIn} → ${checkOut}`;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request to Book';
      const details = document.querySelector('.booking-details-toggle');
      if (details) details.open = true; // guide the visitor straight to the form
    } else if (checkIn) {
      summaryEl.textContent = `Check-in ${checkIn} — pick check-out`;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Select dates to request booking';
    } else {
      summaryEl.textContent = 'Select check-in & check-out';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Select dates to request booking';
    }
  }

  function handleDayClick(iso) {
    if (!checkIn || (checkIn && checkOut)) {
      // Starting a fresh selection
      checkIn = iso;
      checkOut = null;
    } else if (iso === checkIn) {
      // Clicking check-in again clears the selection
      checkIn = null;
      checkOut = null;
    } else if (iso > checkIn) {
      if (isRangeAvailable(checkIn, iso)) {
        checkOut = iso;
      } else {
        // Range would cross a booked date — start over from this date instead
        checkIn = iso;
        checkOut = null;
      }
    } else {
      // Picked a date before the current check-in — restart from there
      checkIn = iso;
      checkOut = null;
    }
    updateBookingButtonAndSummary();
    renderMonth();
  }

  function renderMonth() {
    monthLabelEl.textContent = `${MONTH_NAMES[viewMonth]} ${viewYear}`;
    prevBtn.disabled = viewYear === today.getFullYear() && viewMonth === today.getMonth();

    const maxDate = new Date(today.getFullYear(), today.getMonth() + MAX_MONTHS_AHEAD, 1);
    nextBtn.disabled = viewYear === maxDate.getFullYear() && viewMonth === maxDate.getMonth();

    gridEl.innerHTML = '';

    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const startWeekday = firstOfMonth.getDay(); // 0 = Sunday

    for (let i = 0; i < startWeekday; i++) {
      const filler = document.createElement('span');
      filler.className = 'calendar-day other-month';
      gridEl.appendChild(filler);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth, day);
      const iso = toISODate(date);
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'calendar-day';
      cell.textContent = String(day);

      const isPast = date < today;
      const isBusy = isDateBusy(iso);
      const isCheckIn = iso === checkIn;
      const isCheckOut = iso === checkOut;
      const isInRange = checkIn && checkOut && iso > checkIn && iso < checkOut;

      if (isPast) {
        cell.classList.add('past');
        cell.disabled = true;
      } else if (isBusy) {
        cell.classList.add('booked');
        // A day on which another booking starts can still be a check-out day:
        // the guest leaves in the morning. So once a check-in is picked, a
        // booked day stays clickable as long as every night before it is free.
        const canCheckOutHere = checkIn && !checkOut && iso > checkIn && isRangeAvailable(checkIn, iso);
        if (canCheckOutHere) {
          cell.classList.add('checkout-only');
          cell.addEventListener('click', () => handleDayClick(iso));
        } else {
          cell.disabled = true;
        }
      } else {
        cell.classList.add('available');
        cell.addEventListener('click', () => handleDayClick(iso));
      }

      if (isCheckIn || isCheckOut) cell.classList.add('selected');
      if (isInRange) cell.classList.add('in-range');
      if (iso === toISODate(today)) cell.classList.add('today');

      gridEl.appendChild(cell);
    }
  }

  prevBtn.addEventListener('click', () => {
    viewMonth -= 1;
    if (viewMonth < 0) { viewMonth = 11; viewYear -= 1; }
    renderMonth();
  });

  nextBtn.addEventListener('click', () => {
    viewMonth += 1;
    if (viewMonth > 11) { viewMonth = 0; viewYear += 1; }
    renderMonth();
  });

  renderMonth();
  updateBookingButtonAndSummary();

  // ── Booking request submission (client-side → Web3Forms, same pattern as
  // the general contact form) ────────────────────────────────────────────
  const bookingForm = document.getElementById('booking-request-form');
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('booking-submit-btn');
    const successEl = document.getElementById('booking-success');
    const errorEl = document.getElementById('booking-error');
    successEl.style.display = 'none';
    errorEl.style.display = 'none';
    submitBtn.disabled = true;
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(bookingForm),
      });
      const result = await response.json();
      if (result.success) {
        successEl.style.display = 'block';
        bookingForm.reset();
        checkIn = null;
        checkOut = null;
        renderMonth();
        updateBookingButtonAndSummary();
      } else {
        console.error('Booking request failed:', result.message);
        errorEl.style.display = 'block';
        submitBtn.disabled = false;
      }
    } catch (err) {
      console.error('Booking request error:', err);
      errorEl.style.display = 'block';
      submitBtn.disabled = false;
    } finally {
      if (errorEl.style.display === 'block') submitBtn.textContent = originalLabel;
    }
  });
});
