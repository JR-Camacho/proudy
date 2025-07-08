
//ScrollIt JS File

(function($) {
    'use strict';

    var pluginName = 'ScrollIt',
        pluginVersion = '1.0.3';

    /*
     * OPTIONS
     */
    var defaults = {
        upKey: 38,
        downKey: 40,
        easing: 'linear',
        scrollTime: 600,
        activeClass: 'active',
        onPageChange: null,
        topOffset : 0
    };

    $.scrollIt = function(options) {

        /*
         * DECLARATIONS
         */
        var settings = $.extend(defaults, options),
            active = 0,
            lastIndex = $('[data-scroll-index]:last').attr('data-scroll-index');

        /*
         * METHODS
         */

        /**
         * navigate
         *
         * sets up navigation animation
         */
        var navigate = function(ndx) {
            if(ndx < 0 || ndx > lastIndex) return;

            var targetTop = $('[data-scroll-index=' + ndx + ']').offset().top + settings.topOffset + 1;
            $('html,body').animate({
                scrollTop: targetTop,
                easing: settings.easing
            }, settings.scrollTime);
        };

        /**
         * doScroll
         *
         * runs navigation() when criteria are met
         */
        var doScroll = function (e) {
            var target = $(e.target).closest("[data-scroll-nav]").attr('data-scroll-nav') ||
            $(e.target).closest("[data-scroll-goto]").attr('data-scroll-goto');
            navigate(parseInt(target));
        };

        /**
         * keyNavigation
         *
         * sets up keyboard navigation behavior
         */
        var keyNavigation = function (e) {
            var key = e.which;
            if($('html,body').is(':animated') && (key == settings.upKey || key == settings.downKey)) {
                return false;
            }
            if(key == settings.upKey && active > 0) {
                navigate(parseInt(active) - 1);
                return false;
            } else if(key == settings.downKey && active < lastIndex) {
                navigate(parseInt(active) + 1);
                return false;
            }
            return true;
        };

        /**
         * updateActive
         *
         * sets the currently active item
         */
        var updateActive = function(ndx) {
            if(settings.onPageChange && ndx && (active != ndx)) settings.onPageChange(ndx);

            active = ndx;
            $('[data-scroll-nav]').removeClass(settings.activeClass);
            $('[data-scroll-nav=' + ndx + ']').addClass(settings.activeClass);
        };

        /**
         * watchActive
         *
         * watches currently active item and updates accordingly
         */
        var watchActive = function() {
            var winTop = $(window).scrollTop();

            var visible = $('[data-scroll-index]').filter(function(ndx, div) {
                return winTop >= $(div).offset().top + settings.topOffset &&
                winTop < $(div).offset().top + (settings.topOffset) + $(div).outerHeight()
            });
            var newActive = visible.first().attr('data-scroll-index');
            updateActive(newActive);
        };

        /*
         * runs methods
         */
        $(window).on('scroll',watchActive).scroll();

        $(window).on('keydown', keyNavigation);

        $('body').on('click','[data-scroll-nav], [data-scroll-goto]', function(e){
            e.preventDefault();
            doScroll(e);
        });

    };
}(jQuery));

// Javascript main.js functions

$(document).ready(function() {
    $(window).on("scroll", function() {
        if($(this).scrollTop() > 90) {
            $(".navbar").addClass("navbar-shrink");
        } else {
            $(".navbar").removeClass("navbar-shrink");
        }
    });

    function parallaxMouse() {
        if($("#parallax").length) {
            var scene = document.getElementById("parallax");
            var parallax = new Parallax(scene);
        }
    }

    parallaxMouse();

    //skills meter

    $(window).scroll(function(){
        var hT = $("#skill-bar-wrapper").offset().top;
        var hH = $("#skill-bar-wrapper").outerHeight();
        var wH = $(window).height();
        var wS = $(this).scrollTop();

        if( wS > (hT + hH - 1.4 * wH)){
            jQuery('.skillbar-container').each(function(){
                jQuery(this).find('.skills').animate({
                    width:jQuery(this).attr('data-percent')
                }, 5000)
            })
        }
    })

    //filter
    ///enabling active button
    let $btns = $('.img-gallery .sortBtn .filter-btn');
    $btns.click(function(e) {
        $('.img-gallery .sortBtn .filter-btn').removeClass('active');
        e.target.classList.add('active');

    ///enabling filter selection according to the active button
        let selector = $(e.target).attr('data-filter');
        $('.img-gallery .grid').isotope({
            filter:selector
        })
        return false;
    })

    ///enabling gallery mode with magnific popup.js and maginif popup.css
    $('.image-popup').magnificPopup({
        type:'image',
        gallery: { enabled: true }
    })

    // owl carousel
    $('.testimonial-slider').owlCarousel({
        loop:true,
        margin:0,
        autoplay:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            1000:{
                items:3,
            }
        }
    })

    //scrollit
    $.scrollIt({
        topOffset:-50
    })

    //Hiding Mobile Navbar when a nav link is clicked
    $(".nav-link").on("click", function() {
        $(".navbar-collapse").collapse("hide");
    })

});

               <!--> <h4>Portfalio</h4>
                        <h2>Lo más  <span>Nuevo</span></h2>
                    </div>
                </div>
            </div>

            <div class="row ">
                <div class="col-lg-8 d-flex justify-content-center sortBtn flex-wrap">
                    <a href="#" class="filter-btn active" data-filter="*">All</a>
                    <a href="#" class="filter-btn " data-filter=".wordpress">Wordpress</a>
                    <a href="#" class="filter-btn " data-filter=".photoshop">Photoshop</a>
                    <a href="#" class="filter-btn " data-filter=".web-design">Web Design</a>
                </div>
            </div>

            <div class="row grid">
                <div class="col-lg-4 col-md-6 col-sm-6 wordpress">
                    <div class="single-work text-center mt-30">
                        <div class="work-image">
                            <img src="https://i.postimg.cc/0ykh0n4C/portfolio-1.jpg" alt="portfolio image">
                        </div>

                        <div class="work-overlay">
                            <div class="work-content">
                                <h3 class="work-title">Product Design</h3>
                                <ul>
                                    <li><a href="https://i.postimg.cc/0ykh0n4C/portfolio-1.jpg" class="image-popup"><i class="fa-solid fa-plus"></i></a></li>
                                    <li><a href="#"><i class="fa-solid fa-link"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 col-sm-6 photoshop">
                    <div class="single-work text-center mt-30">
                        <div class="work-image">
                            <img src="https://i.postimg.cc/Xqw7dLPb/portfolio-2.jpg" alt="portfolio image">
                        </div>

                        <div class="work-overlay">
                            <div class="work-content">
                                <h3 class="work-title">Product Design</h3>
                                <ul>
                                    <li><a href="https://i.postimg.cc/Xqw7dLPb/portfolio-2.jpg" class="image-popup"><i class="fa-solid fa-plus"></i></a></li>
                                    <li><a href="#"><i class="fa-solid fa-link"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 col-sm-6 wordpress">
                    <div class="single-work text-center mt-30">
                        <div class="work-image">
                            <img src="https://i.postimg.cc/26nfK67d/portfolio-3.jpg" alt="portfolio image">
                        </div>

                        <div class="work-overlay">
                            <div class="work-content">
                                <h3 class="work-title">Product Design</h3>
                                <ul>
                                    <li><a href="https://i.postimg.cc/26nfK67d/portfolio-3.jpg" class="image-popup"><i class="fa-solid fa-plus"></i></a></li>
                                    <li><a href="#"><i class="fa-solid fa-link"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 col-sm-6 web-design">
                    <div class="single-work text-center mt-30">
                        <div class="work-image">
                            <img src="https://i.postimg.cc/PxsgYHnC/portfolio-4.jpg" alt="portfolio image">
                        </div>

                        <div class="work-overlay">
                            <div class="work-content">
                                <h3 class="work-title">Product Design</h3>
                                <ul>
                                    <li><a href="https://i.postimg.cc/PxsgYHnC/portfolio-4.jpg" class="image-popup"><i class="fa-solid fa-plus"></i></a></li>
                                    <li><a href="#"><i class="fa-solid fa-link"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 col-sm-6 photoshop">
                    <div class="single-work text-center mt-30">
                        <div class="work-image">
                            <img src="https://i.postimg.cc/155LpM2r/portfolio-5.jpg" alt="portfolio image">
                        </div>

                        <div class="work-overlay">
                            <div class="work-content">
                                <h3 class="work-title">Product Design</h3>
                                <ul>
                                    <li><a href="https://i.postimg.cc/155LpM2r/portfolio-5.jpg" class="image-popup"><i class="fa-solid fa-plus"></i></a></li>
                                    <li><a href="#"><i class="fa-solid fa-link"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 col-sm-6 photoshop">
                    <div class="single-work text-center mt-30">
                        <div class="work-image">
                            <img src="https://i.postimg.cc/gJHTh6K7/portfolio-6.jpg" alt="portfolio image">
                        </div>

                        <div class="work-overlay">
                            <div class="work-content">
                                <h3 class="work-title">Product Design</h3>
                                <ul>
                                    <li><a href="https://i.postimg.cc/gJHTh6K7/portfolio-6.jpg" class="image-popup"><i class="fa-solid fa-plus"></i></a></li>
                                    <li><a href="#"><i class="fa-solid fa-link"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="call-to-action section-padding">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-8 col-lg-9">
                    <div class="call-action-content text-center">
                        <h2 class="action-title">Have any project in mind?</h2>
                        <p>I'd love to hear about it! Whether it's a small idea or a grand vision, I'm ready to bring it to life. Reach out today and let's make your project a reality!</p>
                        <ul>
                            <li><a href="#" class="btn btn-1">Download CV</a></li>
                            <li><a href="#" class="btn btn-2">HIRE ME</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="testimonials section-padding" id="testimonials" data-scroll-index="4">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="section-title">
                        <h4>Testimonials</h4>
                        <h2>What our clients <span>say</span></h2>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="testimonial-slider owl-carousel">
                    <div class="testimonial-item">
                        <div class="img-box">
                            <img src="https://i.postimg.cc/wBsx5R9q/1.jpg" alt="image">
                            <i class="fa-solid fa-quote-right"></i>
                        </div>
                        <p>Mark was hired to create a corporate identity. It's modern, clean and with a beautiful design. He has a lot of experience and is very concerned about the needs of client</p>
                        <h3>Brody Stevens</h3>
                        <span>Marketing Director</span>
                        <div class="rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                    </div>

                    <div class="testimonial-item">
                        <div class="img-box">
                            <img src="https://i.postimg.cc/qvW47By9/2.jpg" alt="image">
                            <i class="fa-solid fa-quote-right"></i>
                        </div>
                        <p>I couldn't be happier with the website that Richard created for us. His attention to detail and creativity is unmatched</p>
                        <h3>Ellena Evans</h3>
                        <span>Art Creative Director</span>
                        <div class="rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                    </div>

                    <div class="testimonial-item">
                        <div class="img-box">
                            <img src="https://i.postimg.cc/kGMdH2Pt/3.jpg" alt="image">
                            <i class="fa-solid fa-quote-right"></i>
                        </div>
                        <p>Working with Mark has been an absolute pleasure. I was impressed with his attention to detail, his web design</p>
                        <h3>Joshua Doe</h3>
                        <span>Marketing Director</span>
                        <div class="rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                    </div>

                    <div class="testimonial-item">
                        <div class="img-box">
                            <img src="https://i.postimg.cc/wxWKvTd0/4.jpg" alt="image">
                            <i class="fa-solid fa-quote-right"></i>
                        </div>
                        <p>I was overwhelmed with the thought of redesigning my online store, but Mark made the process seamless.  The site is not only visually appealing but also optimized for conversions</p>
                        <h3>Jessica Miller</h3>
                        <span>Small Business Owner</span>
                        <div class="rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="pricing section-padding" id="pricing" data-scroll-index="5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="section-title">
                        <h4>Pricing</h4>
                        <h2>Pricing <span>plan</span></h2>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6">
                    <div class="pricing-plan">
                        <div class="pricing-header">
                            <h3>Basic</h3>
                        </div>
                        <div class="pricing-price">
                            <span class="currency">$</span>
                            <span class="price">99</span>
                            <span class="period">/monthly</span>
                        </div>
                        <div class="pricing-body">
                            <ul>
                                <li><i class="fa-solid fa-check"></i>5GB Bandwidth</li>
                                <li><i class="fa-solid fa-check"></i>1 Free Update</li>
                                <li><i class="fa-solid fa-check"></i>High Regulation Printing</li>
                                <li><i class="fa-solid fa-check"></i>Branding</li>
                                <li><i class="fa-solid fa-check"></i>2 Free Maintenances</li>
                            </ul>
                        </div>
                        <div class="pricing-footer">
                            <a href="#" class="btn btn-2">Get Started</a>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6">
                    <div class="pricing-plan">
                        <div class="pricing-header">
                            <h3>Premium</h3>
                        </div>
                        <div class="pricing-price">
                            <span class="currency">$</span>
                            <span class="price">199</span>
                            <span class="period">/monthly</span>
                        </div>
                        <div class="pricing-body">
                            <ul>
                                <li><i class="fa-solid fa-check"></i>10GB Bandwidth</li>
                                <li><i class="fa-solid fa-check"></i>3 Free Update</li>
                                <li><i class="fa-solid fa-check"></i>High Regulation Printing</li>
                                <li><i class="fa-solid fa-check"></i>3 brandings</li>
                                <li><i class="fa-solid fa-check"></i>5 Free Maintenances</li>
                            </ul>
                        </div>
                        <div class="pricing-footer">
                            <a href="#" class="btn btn-1">Get Started</a>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6">
                    <div class="pricing-plan">
                        <div class="pricing-header">
                            <h3>Ultimate</h3>
                        </div>
                        <div class="pricing-price">
                            <span class="currency">$</span>
                            <span class="price">299</span>
                            <span class="period">/monthly</span>
                        </div>
                        <div class="pricing-body">
                            <ul>
                                <li><i class="fa-solid fa-check"></i>20GB Bandwidth</li>
                                <li><i class="fa-solid fa-check"></i>10 Free Update</li>
                                <li><i class="fa-solid fa-check"></i>Priority Regulation Printing</li>
                                <li><i class="fa-solid fa-check"></i>10 brandings</li>
                                <li><i class="fa-solid fa-check"></i>20 Free Maintenances</li>
                            </ul>
                        </div>
                        <div class="pricing-footer">
                            <a href="#" class="btn btn-2">Get Started</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="faq section-padding">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="section-title">
                        <h4>FAQ's</h4>
                        <h2>Frequently <span>asked</span> queries</h2>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div id="accordion">
                        <div class="accordion-item">
                            <div class="accordion-header collapsed" data-toggle="collapse" data-target="#collapse-01">
                                <h3>100% Fluid Responsive - Fits any device perfectly</h3>
                            </div>
                            <div class="collapse show" id="collapse-01" data-parent="#accordion">
                                <div class="accordion-body">
                                    <p>Your website will seamlessly adjust to fit any device perfectly, providing an optimal viewing experience for users. Whether on a smartphone, tablet, or desktop, content will be displayed beautifully and legibly, enhancing accessibility and user satisfaction</p>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <div class="accordion-header collapsed" data-toggle="collapse" data-target="#collapse-02">
                                <h3>Clean Code</h3>
                            </div>
                            <div class="collapse " id="collapse-02" data-parent="#accordion">
                                <div class="accordion-body">
                                    <p>My code is easy to read, understand, and maintain. It emphasizes clarity and simplicity, allowing others to work efficiently and collaboratively. I follow the best practices such as meaningful naming conventions and proper organization</p>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <div class="accordion-header collapsed" data-toggle="collapse" data-target="#collapse-03">
                                <h3>Flat, Modern and Clean Design</h3>
                            </div>
                            <div class="collapse " id="collapse-03" data-parent="#accordion">
                                <div class="accordion-body">
                                    <p>I emphasize simplicity and functionality, focusing on minimalistic elements and a user-friendly interface. This approach eliminates unnecessary distractions, allowing users to navigate effortlessly while enjoying a visually pleasing experience</p>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <div class="accordion-header collapsed" data-toggle="collapse" data-target="#collapse-04">
                                <h3>Custom Font Support</h3>
                            </div>
                            <div class="collapse " id="collapse-04" data-parent="#accordion">
                                <div class="accordion-body">
                                    <p>I use unique typefaces that enhance the aesthetics and branding of a website. By utilizing the @font-face rule in CSS, I can load fonts from various sources, ensuring that text appears consistently across different devices and browsers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>