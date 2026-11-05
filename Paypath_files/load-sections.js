(function () {
    'use strict';

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
        var placeholders = document.querySelectorAll('[data-include]');
        var loads = Array.prototype.map.call(placeholders, async function (element) {
            var path = element.getAttribute('data-include');
            var html = await loadSection(path);
            var temp = document.createElement('div');
            temp.innerHTML = html.trim();
            var parent = element.parentNode;

            while (temp.firstChild) {
                parent.insertBefore(temp.firstChild, element);
            }

            parent.removeChild(element);
        });
        await Promise.all(loads);
    }

    async function loadAppScripts() {
        await loadScript('./Paypath_files/jquery.js.download');
        await loadScript('./Paypath_files/slick.min.js.download');
        await loadScript('./Paypath_files/aos.js.download');
        await loadScript('./Paypath_files/valdon-init.js');
    }

    injectSections()
        .then(loadAppScripts)
        .catch(function (error) {
            console.error(error);
            document.body.insertAdjacentHTML(
                'afterbegin',
                '<div style="padding:1rem;background:#fee;color:#900;">Неуспешно зареждане на секциите. Стартирайте локален сървър (напр. Live Server).</div>'
            );
        });
})();
