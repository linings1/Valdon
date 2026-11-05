(function () {
    'use strict';

    function initMobileMenu() {
        var menuToggle = document.getElementById('valdon-menu-toggle');
        var mobileNav = document.getElementById('valdon-mobile-nav');
        var mobileClose = document.getElementById('valdon-mobile-close');

        function openMenu() {
            if (mobileNav) {
                mobileNav.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeMenu() {
            if (mobileNav) {
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            }
        }

        if (menuToggle) {
            menuToggle.addEventListener('click', openMenu);
        }

        if (mobileClose) {
            mobileClose.addEventListener('click', closeMenu);
        }

        if (mobileNav) {
            mobileNav.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', closeMenu);
            });
        }
    }

    function scrollWithHeaderOffset(target) {
        if (!target) {
            return;
        }
        if (target.id === 'nachalo') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        var rootStyles = getComputedStyle(document.documentElement);
        var headerOffset = parseFloat(rootStyles.getPropertyValue('--valdon-header-height')) || 0;
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }

    function clearNachaloHashJump() {
        if (location.hash !== '#nachalo') {
            return;
        }
        window.scrollTo(0, 0);
        if (history.replaceState) {
            history.replaceState(null, '', location.pathname + location.search);
        }
    }

    function initSmoothScroll() {
        clearNachaloHashJump();
        window.addEventListener('load', clearNachaloHashJump);

        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (event) {
                var targetId = this.getAttribute('href');
                if (!targetId || targetId.length <= 1) {
                    return;
                }
                var target = document.querySelector(targetId);
                if (target) {
                    event.preventDefault();
                    scrollWithHeaderOffset(target);
                }
            });
        });
    }

    function initSliders() {
        if (!window.jQuery || !jQuery.fn.slick) {
            return;
        }

        var $reviews = jQuery('.valdon-reviews-slider');
        if ($reviews.length && !$reviews.hasClass('slick-initialized')) {
            $reviews.slick({
                arrows: false,
                dots: true,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 5000,
                speed: 700,
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true
                        }
                    }
                ]
            });
        }
    }

    function initAos() {
        if (window.AOS) {
            AOS.init({
                once: true,
                duration: 1200,
                easing: 'ease',
                offset: 40
            });
        }
    }

    function initMonumentCompare() {
        document.querySelectorAll('[data-valdon-compare]').forEach(function (root) {
            var range = root.querySelector('.valdon-monument-compare-range');
            var before = root.querySelector('.valdon-monument-compare-before');
            var beforeImg = root.querySelector('.valdon-monument-compare-before-img');
            var handle = root.querySelector('.valdon-monument-compare-handle');
            if (!range || !before || !beforeImg) {
                return;
            }

            function sync() {
                var pct = Number(range.value);
                var width = root.clientWidth;
                before.style.width = pct + '%';
                beforeImg.style.width = width + 'px';
                if (handle) {
                    handle.style.left = pct + '%';
                }
            }

            sync();
            range.addEventListener('input', sync);
            window.addEventListener('resize', sync);
        });
    }

    function syncFixedHeaderOffset() {
        var header = document.querySelector('.valdon-header--standalone, .valdon-hero-wrapper > .valdon-header');
        if (!header) {
            return;
        }
        document.documentElement.style.setProperty('--valdon-header-height', header.offsetHeight + 'px');
    }

    function initFixedHeader() {
        syncFixedHeaderOffset();
        window.addEventListener('resize', syncFixedHeaderOffset);
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(syncFixedHeaderOffset);
        }
        window.addEventListener('load', syncFixedHeaderOffset);
    }

    function initBackToTop() {
        var btn = document.getElementById('backToTopBtn');
        if (!btn) {
            return;
        }

        window.addEventListener('scroll', function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                btn.style.display = 'flex';
            } else {
                btn.style.display = 'none';
            }
        });
    }

    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    function initActiveNav() {
        var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        if (!path || path === '/') {
            path = 'index.html';
        }
        document.querySelectorAll('.valdon-nav a, .valdon-mobile-nav a').forEach(function (link) {
            var href = (link.getAttribute('href') || '').split('#')[0].toLowerCase();
            if (!href || href.indexOf('tel:') === 0) {
                return;
            }
            var file = href.split('/').pop() || href;
            var isHome = (path === 'index.html' || path === '') && (file === 'index.html' || file === '' || file === './');
            var isMatch = file === path || isHome;
            link.classList.toggle('active', isMatch);
        });
    }

    function initDeathMenu() {
        document.querySelectorAll('[data-valdon-death-menu]').forEach(function (root) {
            var tabs = Array.prototype.slice.call(root.querySelectorAll('[data-death-tab]'));
            var panels = Array.prototype.slice.call(root.querySelectorAll('[data-death-panel]'));
            var slider = root.querySelector('.valdon-death-slider');
            var track = root.querySelector('.valdon-death-track');
            var viewport = root.querySelector('.valdon-death-viewport');
            var prevBtn = root.querySelector('[data-death-dir="-1"]');
            var nextBtn = root.querySelector('[data-death-dir="1"]');
            if (!tabs.length || !panels.length || !track || !viewport || !slider) {
                return;
            }

            var index = 0;
            var touchStartX = 0;
            var touchDeltaX = 0;

            function panelIndexFromHash() {
                var hash = (location.hash || '').replace(/^#/, '');
                if (!hash) {
                    return 0;
                }
                var found = panels.findIndex(function (panel) {
                    return panel.id === hash || panel.getAttribute('data-death-panel') === hash;
                });
                return found >= 0 ? found : 0;
            }

            function sizeSlides() {
                var viewportWidth = viewport.clientWidth || root.clientWidth;
                var arrowRoom = 72;
                var slideWidth = Math.min(Math.round(viewportWidth - arrowRoom * 2), 600);
                if (viewportWidth < 520) {
                    slideWidth = Math.max(240, viewportWidth - arrowRoom * 2);
                }
                panels.forEach(function (panel) {
                    panel.style.flex = '0 0 ' + slideWidth + 'px';
                    panel.style.width = slideWidth + 'px';
                });
            }

            function syncArrowPosition() {
                var active = panels[index];
                var sliderRect = slider.getBoundingClientRect();
                var headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--valdon-header-height')) || 72;
                var tabsBar = root.querySelector('.valdon-death-tabs');
                var tabsBottom = tabsBar ? tabsBar.getBoundingClientRect().bottom : headerOffset;
                var visibleTop = Math.max(sliderRect.top, tabsBottom + 8);
                var visibleBottom = Math.min(sliderRect.bottom, window.innerHeight - 24);
                if (visibleBottom <= visibleTop) {
                    return;
                }
                var mid = ((visibleTop + visibleBottom) / 2) - sliderRect.top;
                mid = Math.max(48, Math.min(mid, slider.offsetHeight - 48));

                var arrowSize = (prevBtn && prevBtn.offsetWidth) || 50;
                var gap = 8;

                if (active) {
                    var cardRect = active.getBoundingClientRect();
                    var leftPos = cardRect.left - sliderRect.left - arrowSize - gap;
                    var rightPos = sliderRect.right - cardRect.right - arrowSize - gap;

                    if (prevBtn) {
                        prevBtn.style.top = mid + 'px';
                        prevBtn.style.left = leftPos + 'px';
                        prevBtn.style.right = 'auto';
                        prevBtn.style.transform = 'translateY(-50%)';
                    }
                    if (nextBtn) {
                        nextBtn.style.top = mid + 'px';
                        nextBtn.style.right = rightPos + 'px';
                        nextBtn.style.left = 'auto';
                        nextBtn.style.transform = 'translateY(-50%)';
                    }
                }
            }

            function syncSlidePosition() {
                var active = panels[index];
                if (!active) {
                    return;
                }
                sizeSlides();
                var viewportWidth = viewport.clientWidth;
                var slideWidth = active.offsetWidth;
                var left = active.offsetLeft;
                var offset = left - Math.max(0, (viewportWidth - slideWidth) / 2);
                var maxOffset = Math.max(0, track.scrollWidth - viewportWidth);
                if (offset < 0) {
                    offset = 0;
                }
                if (offset > maxOffset) {
                    offset = maxOffset;
                }
                track.style.transform = 'translateX(-' + offset + 'px)';
                viewport.style.height = active.offsetHeight + 'px';
                syncArrowPosition();
            }

            function goTo(nextIndex, updateHash) {
                if (nextIndex < 0 || nextIndex >= panels.length) {
                    return;
                }
                index = nextIndex;

                tabs.forEach(function (tab, i) {
                    var selected = i === index;
                    tab.classList.toggle('is-active', selected);
                    tab.setAttribute('aria-selected', selected ? 'true' : 'false');
                    tab.tabIndex = selected ? 0 : -1;
                });

                panels.forEach(function (panel, i) {
                    var selected = i === index;
                    panel.classList.toggle('is-active', selected);
                    panel.setAttribute('aria-hidden', selected ? 'false' : 'true');
                });

                if (prevBtn) {
                    prevBtn.disabled = index === 0;
                }
                if (nextBtn) {
                    nextBtn.disabled = index === panels.length - 1;
                }

                requestAnimationFrame(syncSlidePosition);
                setTimeout(syncArrowPosition, 480);

                if (updateHash) {
                    var id = panels[index].id;
                    if (id && history.replaceState) {
                        history.replaceState(null, '', '#' + id);
                    }
                }
            }

            tabs.forEach(function (tab, i) {
                tab.addEventListener('click', function () {
                    goTo(i, true);
                });
            });

            if (prevBtn) {
                prevBtn.addEventListener('click', function () {
                    goTo(index - 1, true);
                });
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', function () {
                    goTo(index + 1, true);
                });
            }

            viewport.addEventListener('touchstart', function (event) {
                if (!event.changedTouches || !event.changedTouches[0]) {
                    return;
                }
                touchStartX = event.changedTouches[0].clientX;
                touchDeltaX = 0;
            }, { passive: true });

            viewport.addEventListener('touchmove', function (event) {
                if (!event.changedTouches || !event.changedTouches[0]) {
                    return;
                }
                touchDeltaX = event.changedTouches[0].clientX - touchStartX;
            }, { passive: true });

            viewport.addEventListener('touchend', function () {
                if (Math.abs(touchDeltaX) < 50) {
                    return;
                }
                if (touchDeltaX < 0) {
                    goTo(index + 1, true);
                } else {
                    goTo(index - 1, true);
                }
            });

            function scrollTabsIntoView() {
                var tabsBar = root.querySelector('.valdon-death-tabs');
                if (tabsBar) {
                    scrollWithHeaderOffset(tabsBar);
                }
            }

            window.addEventListener('resize', syncSlidePosition);
            window.addEventListener('scroll', syncArrowPosition, { passive: true });
            window.addEventListener('hashchange', function () {
                goTo(panelIndexFromHash(), false);
                scrollTabsIntoView();
            });

            var startIndex = panelIndexFromHash();
            goTo(startIndex, false);
            window.addEventListener('load', function () {
                syncSlidePosition();
                if (location.hash) {
                    scrollTabsIntoView();
                }
            });
            setTimeout(syncSlidePosition, 120);
            if (location.hash) {
                setTimeout(scrollTabsIntoView, 80);
            }
        });
    }

    initFixedHeader();
    initMobileMenu();
    initSmoothScroll();
    initActiveNav();
    initDeathMenu();
    initSliders();
    initAos();
    initMonumentCompare();
    initBackToTop();
})();
