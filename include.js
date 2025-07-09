function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');
  const promises = [];

  elements.forEach(el => {
    const file = el.getAttribute('data-include');
    if (file) {
      const p = fetch(file)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Could not fetch ${file}: ${response.statusText}`);
          }
          return response.text();
        })
        .then(data => {
          el.innerHTML = data;
        })
        .catch(err => {
          console.error(err);
          el.innerHTML = `<p style="color:red;">Failed to load ${file}</p>`;
        });
      promises.push(p);
    }
  });

  return Promise.all(promises);
}


document.addEventListener('DOMContentLoaded', () => {
  includeHTML().then(() => {
    const topHeader = document.querySelector('.top-header');

    if (!topHeader) {
      console.warn('No .top-header found in DOM');
      return;
    } else {
      console.log('Success: .top-header found!');
    }

    window.addEventListener('scroll', () => {
      console.log('Scroll detected, scrollY:', window.scrollY);

      if (window.scrollY > 50) {
        if (!topHeader.classList.contains('hidden')) {
          console.log('Adding hidden class to top-header');
          topHeader.classList.add('hidden');
        }
      } else {
        if (topHeader.classList.contains('hidden')) {
          console.log('Removing hidden class from top-header');
          topHeader.classList.remove('hidden');
        }
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  includeHTML().then(() => {
    // Now the header and nav should be loaded, safe to select elements
    const navToggle = document.querySelector('.nav-toggle');
    console.log('navToggle:', navToggle);
    const nav = document.querySelector('header nav');
    console.log('nav:', nav);

    if (navToggle && nav) {
      navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
      });
    } else {
      console.warn('Nav toggle or nav element missing after includeHTML');
    }
  });
});
