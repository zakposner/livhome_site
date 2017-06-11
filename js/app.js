<script>
    jQuery(document).ready(function() {

  var liv_home_vars = {
    mobileCutoff: 800 // pixel width trigger point for many functions, chnage this to adjust which devices are impacted by mobile-only functions
  }

  // Determine the size of the user's device
  function getWindowWidth() {
    var width = $(window).width();
    console.log('Window width set: ', width);
    return width;
  }

  function checkForHomePage() {
    var $body = $('body');
    return $body.hasClass('home');
  }



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

  (function() {
    // DOM Referneces
    var $sliderRef = $('#rev_slider_2_1'),
        $sectionRef = $('.home-page-top-section');


    // Build an array of the mobile slides
      // FIXME add <a> to the buttons with correct links
    var $mobileSlides = [
      $('<section id="rev-mobile-slide-1" class="rev-mobile-slide"><div class="rev-primary-mobile"><h2>Life is better with LivHOME</h2><h1>Caregiving + Life Care Management</h1><p>Our Life Care Managers work collaboratively with Caregivers to ease the burden of care—so you can be a family again.</p><div class="button-box"><a href="tel:1-800-807-5854"><button type="button" class="cta-primary">1-800-807-5854</button></a><a href="https://www.livhome.com/contact"><button type="button" class="cta-secondary">Get Started</button></a></div></div></section>'),
      $('<section id="rev-mobile-slide-2" class="rev-mobile-slide"><div class="rev-connect-mobile"><h2>Introducing LivHOME Connect</h2><p>LivHOME Connect is a senior-friendly care tablet—helping seniors and families stay informed and in control of their care.</p><a href="https://www.livhome.com/contact"><button type="button" class="cta-primary">Get Started</button></a>></div></section>')
    ]

    // Attach the mobile slides, then hide them
    $.each($mobileSlides, function(index, value) {
      $sectionRef.before($(this));
    });
    $boundSlides = $('.rev-mobile-slide');
    $boundSlides.hide();

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
      var onHomePage = checkForHomePage();
      if (onHomePage && width < liv_home_vars.mobileCutoff) {

        // hide the arrows if we dont have more than 1 or 2 slides
        if ($mobileSlides.length < 3) {
          $('#rev_slider_2_1 .tparrows').hide(); // remove arrows since we are only showing 1 slidie on mobile.
        }

        $('#rev-mobile-slide-1').show(); // failsafe: make sure first slide shows immediately
        revapi2.bind('revolution.slide.onchange', initMobileSlide);
      }
    }

    window.addEventListener('load', configRevolution);

  })();

  // ==========
  //  Mobile Caregiver Application
  // ==========

  (function() {

    function initCaregiverApp() {
      var width = getWindowWidth();
      var onHomePage = checkForHomePage();
      if (onHomePage && width < liv_home_vars.mobileCutoff) { // if we're on a mobile device on the home page
        // build the caregiver application popup
        // FIXME: link needs to change on site migration
        var caregiverApp = $('<div class="caregiver-application"><a class="sign-up" href="#"><button class="cta-primary" type="button" name="button">Apply to be a caregiver</button></a><div class="close-app"><i class="fa fa-times" aria-hidden="true"></i></div></div>');

        // Attach the popup
        $('.l-canvas').before(caregiverApp);

        //bind close function to .close-app click
        $('.close-app').click(function(e) {
          $('.caregiver-application').slideUp();
        })
      }
    }

    window.addEventListener('load', initCaregiverApp);

  })();



  // ==========
  //  Mini Form Config
  // ==========

  var $miniForm = $('.looking-form'),
      $miniSelect = $('.looking-select'),
      $miniSubmit = $('.looking-form .cta-primary');

  // Only enable submit button if a valid option is selected
  $miniSelect.change(function(e) {
    var currentVal = $miniSelect.val();

    if (currentVal !== 'null') {
      $miniSubmit.prop('disabled', false);
    } else {
      $miniSubmit.prop('disabled', true);
    }
  });

  // Transmit form data to full contact form on submission
  $miniForm.submit(function(e) {
    e.preventDefault(); // stop browser refresh
    var carefor = $('.looking-select').val(); // pull desired value from $miniform
    carefor = encodeURIComponent(carefor); // encode value for query string

    // FIXME change url at site launch
    window.location.href= 'http://bwmsites.com/livhome2/contact?carefor=' + carefor; // send data to contact form
  });



  // ==========
  //  Contact Form Validation & Config
  // ==========



});

</script>
