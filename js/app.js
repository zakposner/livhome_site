jQuery(document).ready(function() {

  // ==========
  //  Revolution Mobile Config
  // ==========
  // To create a mobile version of a revolution slide
    // 1. Add new slide to the home page slider using the revolution builder
    // 2. Add the slide content to the $mobileSlides array
      // 3. must be a jquery object
      // 4. must be wrapped by a section element
        // 5. section must have the class 'rev-mobile-slide'
        // 6. section must have the id 'rev-mobile-slide-[number]'
  // ==========

  // Change this number to alter when mobile config executes
  var mobileCutoff = 800; // pixel width of viewing device

  // DOM Referneces
  var $sliderRef = $('#rev_slider_2_1'),
      $sectionRef = $('.home-page-top-section');

  // Build an array of the mobile slides
  var $mobileSlides = [
    $('<section id="rev-mobile-slide-1" class="rev-mobile-slide"><div class="rev-primary-mobile"><h2>Life is better with LivHOME</h2><h1>Caregiving + Life Care Management</h1><p>Our Life Care Managers works collaboratively with Caregivers to ease the burden of care—so you can be a family again.</p><div class="button-box"><button type="button" class="cta-primary">1-800-807-5854</button><button type="button" class="cta-secondary">Learn More</button></div></div></section>'),
    $('<section id="rev-mobile-slide-2" class="rev-mobile-slide"><div class="rev-connect-mobile"><h2>Introducing LivHOME Connect</h2><p>LivHOME Connect is a senior-friendly care tablet—helping seniors and families  stay informed and in control of their care.</p><button class="cta-primary">Learn More</button></div></section>')
  ]

  // Attach the mobile slides, then hide them
  $.each($mobileSlides, function(index, value) {
    $sectionRef.before($(this));
  });
  $boundSlides = $('.rev-mobile-slide');
  $boundSlides.hide();

  // Determine the size of the user's device
  function getWindowWidth() {
    var width = $(window).width();
    console.log('Window width set: ', width);
    return width;
  }

  // renders the text to the corresponding slideIndex
    // binds to revolution slider event
  function initMobileSlide(event, data) {
    var current = data.slideIndex;
    var selec = '#rev-mobile-slide-' + current;
    $boundSlides.hide(); // hide all slides
    $(selec).show(); // but show the relevant one
  }

  // If the user is on mobile or tablet
    // bind the mobile slide init function
    // otherwise leave everything as is
  function configRevolution() {
    var width = getWindowWidth();
    if (width < mobileCutoff) {
        revapi2.bind('revolution.slide.onchange', initMobileSlide);
    }
  }

  configRevolution();

  // ==========
  //  Mini Form Config
  // ==========

  var $miniForm = $('.looking-form'),
      $miniSelect = $('.looking-select'),
      $miniSubmit = $('.looking-form .cta-primary');

  // Enable submit button if a valid option is selected
  $miniSelect.change(function(e) {
    var currentVal = $miniSelect.val();
    console.log('current value: ', currentVal);
    if (currentVal !== 'null') {
      $miniSubmit.disabled = false;
    } else {
      $miniSubmit.disabled = true;
    }
  });

  // Transmit form data to full contact form on submission
  $miniForm.submit(function(e) {
    e.preventDefault(); // stop browser refresh
    var carefor = $('.looking-select').val(); // pull desired value from $miniform
    carefor = encodeURIComponent(carefor); // encode value for query string
    window.location.href= 'http://bwmsites.com/livhome2/contact?carefor=' + carefor; // send data to contact form
  });




});
