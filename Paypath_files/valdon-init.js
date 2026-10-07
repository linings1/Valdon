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

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (event) {
                var targetId = this.getAttribute('href');
                if (!targetId || targetId.length <= 1) {
                    return;
                }
                var target = document.querySelector(targetId);
                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    initMobileMenu();
    initSmoothScroll();
    initSliders();
    initAos();
    initMonumentCompare();
    initBackToTop();
})();
