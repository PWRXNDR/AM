(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

document.addEventListener('DOMContentLoaded', function () {
    const profileToggle = document.querySelector('#profile-toggle');
    const toggleText = document.querySelector('#toggle-text');
    const elementsToUpdate = document.querySelectorAll('[data-profile]');

    profileToggle.addEventListener('change', function () {
        if (this.checked) {
            toggleText.textContent = 'Designer';
            document.body.className = 'designer';
        } else {
            toggleText.textContent = 'Pianist';
            document.body.className = 'pianist';
        }

        elementsToUpdate.forEach(el => {
            const pianistContent = el.getAttribute('data-pianist');
            const designerContent = el.getAttribute('data-designer');
            el.textContent = this.checked ? designerContent : pianistContent;
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('#navbar .nav-link');
    const toggle = document.querySelector('.profile-toggle');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (this.getAttribute('href') !== '#header') {
                toggle.classList.add('move-right');
            } else {
                toggle.classList.remove('move-right');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const profileToggle = document.querySelector('#profile-toggle');
    const elementsToUpdate = document.querySelectorAll('[data-profile]');
    const imageToUpdate = document.querySelector('#profile-image'); // Select the image element
    const iconsToUpdate = document.querySelectorAll('.icon i'); // Assuming all your icons are within <i> tags under .icon divs

    profileToggle.addEventListener('change', function () {
        const profile = this.checked ? 'designer' : 'pianist'; // Assuming 'checked' means 'designer'

        // Update text content and handle specific element types
        elementsToUpdate.forEach(el => {
            const pianistContent = el.getAttribute('data-pianist');
            const designerContent = el.getAttribute('data-designer');

            if (el.tagName.toLowerCase() === 'img') { // Specific handling for img tags
                el.src = profile === 'pianist' ? pianistContent : designerContent;
            } else if (el.tagName.toLowerCase() === 'i') { // Specific handling for icon tags
                el.className = profile === 'pianist' ? pianistContent : designerContent;
            } else if (el.tagName.toLowerCase() === 'li') { // Special handling for <li> tags
                el.innerHTML = profile === 'pianist' ? pianistContent : designerContent;
            } else {
                el.textContent = profile === 'pianist' ? pianistContent : designerContent;
            }
        });

        // Update icon classes
        iconsToUpdate.forEach(icon => {
            const pianistIcon = icon.dataset.pianist;
            const designerIcon = icon.dataset.designer;
            icon.className = profile === 'pianist' ? pianistIcon : designerIcon;
        });

        // Update image source
        if (imageToUpdate) {
            imageToUpdate.src = profile === 'pianist' ? imageToUpdate.getAttribute('data-pianist') : imageToUpdate.getAttribute('data-designer');
        }

        // Update body class for theme styling
        document.body.className = profile;
    });
});

//document.addEventListener('DOMContentLoaded', function () {
  //  const toggle = document.getElementById('profile-toggle');
  //  const prompt = document.getElementById('switch-mode-prompt');

    // Hide prompt after 10 to 30 seconds or when the toggle is used
  //  setTimeout(function () {
   //     prompt.style.display = 'none';
    //}, 30000); // Adjust time as needed between 10000 (10 seconds) and 30000 (30 seconds)

    //toggle.addEventListener('change', function () {
    //    prompt.style.display = 'none';
    //});
//});
