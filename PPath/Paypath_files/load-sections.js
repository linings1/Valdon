(function () {
    'use strict';

    const SECTIONS = [
        'sections/header.html',
        'sections/hero.html',
        'sections/about.html',
        'sections/finance.html',
        'sections/ipsum-logo.html',
        'sections/gateway.html',
        'sections/services.html',
        'sections/visa.html',
        'sections/pricing.html',
        'sections/professional.html',
        'sections/question.html',
        'sections/news-cards.html',
        'sections/footer.html'
    ];

    function loadScript(src) {
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    async function loadSection(path) {
        var response = await fetch(path);
        if (!response.ok) {
            throw new Error('Failed to load section: ' + path);
        }
        return response.text();
    }

    async function injectSections() {
        var firstGroup = document.getElementById('first-nav-hero-about');
        var mainSections = document.getElementById('main-sections');
        var htmlParts = await Promise.all(SECTIONS.map(loadSection));

        firstGroup.innerHTML = htmlParts.slice(0, 3).join('\n');
        mainSections.innerHTML = htmlParts.slice(3).join('\n');
    }

    async function loadAppScripts() {
        await loadScript('./Paypath_files/jquery.js.download');
        await loadScript('./Paypath_files/bootstrap.min.js.download');
        await loadScript('./Paypath_files/slick.min.js.download');
        await loadScript('./Paypath_files/waypoints.min.js.download');
        await loadScript('./Paypath_files/custom.js.download');
        await loadScript('./Paypath_files/aos.js.download');

        if (window.AOS) {
            AOS.init({
                once: true,
                duration: 1500
            });
        }
    }

    injectSections()
        .then(loadAppScripts)
        .catch(function (error) {
            console.error(error);
            document.body.insertAdjacentHTML(
                'afterbegin',
                '<div style="padding:1rem;background:#fee;color:#900;">Could not load page sections. Serve this folder with a local web server (e.g. Live Server).</div>'
            );
        });
})();
