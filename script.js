$(function () {
  // Display the current date in the header of the page
  $('#currentDay').text(dayjs().format('MMMM D, YYYY HH:mm:ss'));
  // Update time blocks with past, present, or future classes
  function updateTimeBlocks() {
    const currentHour = dayjs().hour();

    $('.time-block').each(function () {
      const blockHour = parseInt($(this).attr('id').split('-')[1]);

      if (blockHour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Load saved data from localStorage
  function loadData() {
    $('.time-block').each(function () {
      const blockId = $(this).attr('id');
      const savedText = localStorage.getItem(blockId);
      if (savedText) {
        $(this).find('.description').val(savedText);
      }
    });
  }

  // Save data to localStorage on save button click
  $('.saveBtn').on('click', function () {
    const blockId = $(this).parent().attr('id');
    const description = $(this).siblings('.description').val();

    localStorage.setItem(blockId, description);
  });

  // Initial load and update loop
  loadData();
  updateTimeBlocks();
  setInterval(updateTimeBlocks, 1000);
   // Update time blocks every minute
});
