// for (let i = 1; i < 8; i++) {
//     console.log(i);
// }

// function logging(a, b) {
//     console.log(a+b);
// }
// logging(2, 3);

// slick slider

// $(document).ready(function(){
//     $('.carousel__inner').slick(
//         {
//             infinite: true,
//             speed: 1300,
//             // adaptiveHeight: true,
//             autoplay: true,
//             autoplaySpeed: 2000,
//             prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.png"></button>',
//             nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.png"></button>',
//             responsive: [
//                 {
//                     breakpoint: 992,
//                     settings: {
//                     dots: true,
//                     arrows: false
//                     }
//                 }
//             ]
//         }
//     );
// });

// tiny-slider
// const slider = tns({
//     container: '.carousel__inner',
//     items: 1,
//     slideBy: 'page',
//     autoplay: false,
//     controls: false,
//     nav: false,

//     responsive: {
//         640: {
//         edgePadding: 20,
//         gutter: 20,
//         items: 2
//     },
//     700: {
//         gutter: 30
//     },
//     900: {
//         items: 3
//     }
//     }
// });
// document.querySelector('.next').addEventListener ('click', function () { slider.goTo('next') } );
// document.querySelector('.prev').addEventListener ('click', function () { slider.goTo('prev') } );

$(document).ready(function(){
    // переключение табов
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab__active)', function() {
        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    // переключение внутри превью карточки с основной стороны на другую 

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // modal windows
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
        
    });

    $('.modal-window__close').on('click', function() {
        $('.overlay, #consultation, #order, #gratitude').fadeOut('slow');
    });

    // name of the item in the modal window

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal-window__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // валидация форм связи
    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: 'required', 
                email: {
                required: true,
                email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите не меньше {0} символов!")
                },
                phone: "Пожалуйста, введите номер телефона",
                email: {
                    required: "Пожалуйста, введите почтовый адрес",
                    email: "Адрес почты должен быть формата name@domain.com"
                }
            }
        });
    };

    validateForm('#consultation form');
    validateForm('#consultation-form');
    validateForm('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // отправка данных через mailer
    $('form').submit(function(e) {
        e.preventDefault();

        // если форма не прошла валидацию, то скрипт прекращается
        if(!$(this).valid()) {
            return;
        }

        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').val('');

            $('#consultation, #order').fadeOut();
            $('.overlay, #gratitude').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // smooth scroll up
    $(window).scroll(function() {
        if($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    new WOW().init(); // скрипт анимации
});