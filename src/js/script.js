//Добавление стрелки если есть меню второго уровня
if ($(window).width() <= 939) {
  let $bottomNavItems = $('.bottom-nav__item');
  $bottomNavItems.each(function () {
    if ($(this).find('ul').length) {
      var getvalue = $(this).find('a').attr('href');
      $(this).children('ul').prepend("<li><a class='bottom-subnav__item--all' href=" + getvalue + ">Смотреть все</a></li>");
      $(this).children('a').addClass('bottom-nav__item-arrow');
    }
  });
}

//На десктопе показ меню второго уровня
if ($(window).width() >= 940) {
  $('.bottom-subnav__list').hide();
  $('.bottom-nav__item').hover(
    function() {
      $(this).find('ul').slideDown();
    },
    function() {
      $(this).find('ul').slideUp('fast');
  });

  // //Скрытие не влезающих пунктов меню
  function responseMenu(){
    $('ul.dropdown-menu li.bottom-nav__item').appendTo('ul.bottom-nav__list');
    var items = $('ul.bottom-nav__list li.bottom-nav__item');
    var max_width = $('ul.bottom-nav__list').width() - $('ul.bottom-nav__list li.dd_menu').outerWidth() - $('.bottom-header__cart').outerWidth() - 20;
    var width = 0;
    var hide_from = 0;

    //console.log(max_width);

    items.css({'width':'auto'});

    items.each(function(index){
      if (width + $(this).outerWidth() > max_width)
      {
        return false;
      }
      else
      {
        //console.log(index);
        hide_from = index;
        width += $(this).outerWidth();
      }
    });
    if (hide_from < items.length - 1) {
      items.eq(hide_from).nextAll('li.bottom-nav__item').appendTo('ul.dropdown-menu');
      items.css({'width':(max_width / (hide_from + 1)) + 'px'});
      $('ul.bottom-nav__list li.dd_menu').show();
    }
    else
    {
      $('ul.bottom-nav__list li.dd_menu').hide();
    }
  }

    $(document).ready(function () {
      $('.dd_menu').hover(
        function () {
          $(this).find('.dropdown-menu').slideDown();
        },
        function () {
          $(this).find('.dropdown-menu').slideUp('fast');
        })
      });

      // $('.dd_menu .bottom-nav__item').hover(
      //   function () {
      //     var scrollTop = $(window).scrollTop(),
      //       elementOffset = $('.dd_menu').offset().top,
      //       distance = (elementOffset - scrollTop);
      //     var he = $('.bottom-header__nav').height();
      //     var wiTop = $('.bottom-header__nav').width() - $('.dropdown-menu').width();
      //     var heTop = distance + he;
      //
      //     $('.dropdown-menu .bottom-subnav__list').css({'top' : heTop, 'width' : wiTop});
      //     $('body').toggleClass('overflow-hidden');
      //   },
      //   function () {
      //     $(this).find('.dropdown-menu').slideDown();
      //   },
      //   function () {
      //     $(this).find('.dropdown-menu').slideUp('fast');
      //     $('body').toggleClass('overflow-hidden');
      //   },
      // );



    // $(window).on('scroll', function () {
    //   var scrollTop = $(window).scrollTop(),
    //     elementOffset = $('.dd_menu').offset().top,
    //     distance = (elementOffset - scrollTop);
    //   var he = $('.bottom-header__nav').height();
    //   var wiTop = $('.bottom-header__nav').width();
    //   var heTop = distance + he;
    //
    //   $('.dropdown-menu .bottom-subnav__list').css({'top' : heTop, 'width' : 'wiTop'});
    //   console.log(he);
    // });

    $(window).on('resize', function(){
      responseMenu();
    }).trigger('resize');

    // $(window).on('scroll', function(){
    //   responseMenu();
    // }).trigger('resize');
}

//Добавление стрелки если есть меню третьего уровня
let $bottomSubNavItems = $('.bottom-subnav__list li');
$bottomSubNavItems.each(function () {
  if ($(this).find('ul').length) {
    $(this).children('a').addClass('bottom-subnav__item-arrow');
  }
});

//Мобильное меню
$('.top-nav__open').click(function() {
  $('.top-nav').toggleClass('top-nav--open');
  $('.aside-left__nav').toggleClass('aside-left__nav--open');
  $('body').toggleClass('overflow-hidden');
  const height = $('.top-nav').height();
  $('.aside-left__nav').css('top', height);//устанавливаем отступ на высоту левого меню
  $('.mask').toggleClass('show');
});

$('.top-nav__close').click(function() {
  $('.top-nav').removeClass('top-nav--open');
  $('.aside-left__nav').removeClass('aside-left__nav--open');
  $('body').removeClass('overflow-hidden');
  $('.mask').removeClass('show');
});

//Нижнее мобильное меню
$('.bottom-nav__open').click(function() {
  $('.bottom-header__nav').toggleClass('bottom-nav--open');
  $('body').toggleClass('overflow-hidden');
  $('.mask').toggleClass('show');
});

$('.bottom-nav__close-nav').click(function() {
  $('.bottom-header__nav').removeClass('bottom-nav--open');
  $('.bottom-nav__buttons-block').removeClass('bottom-nav__close-subnav--show');
  $('.bottom-nav__item-arrow').removeClass('bottom-nav__item--open')
  $('body').removeClass('overflow-hidden');
  $('.mask').removeClass('show');
});

$('.mask').click(function() {
  $('.top-nav').removeClass('top-nav--open');
  $('.bottom-header__nav').removeClass('bottom-nav--open');
  $('.aside-left__nav').removeClass('aside-left__nav--open');
  $('body').removeClass('overflow-hidden');
  $('.mask').removeClass('show');
});

//Запрет перехода по ссылки при открытии меню второго уровня
$('.bottom-nav__item-arrow').on('click', function (e) {
  e.preventDefault();
  $('.bottom-nav__item-arrow').removeClass('bottom-nav__item--open');
  $('.bottom-nav__buttons-block').removeClass('bottom-nav__close-subnav--show');
  $('.bottom-nav__buttons-block').toggleClass('bottom-nav__close-subnav--show');
  $(this).toggleClass('bottom-nav__item--open');
});

//Закрытие меню второго уровня
$('.bottom-nav__close-subnav').on('click', function () {
  $('.bottom-nav__buttons-block').removeClass('bottom-nav__close-subnav--show');
  $('.bottom-nav__item-arrow').removeClass('bottom-nav__item--open');
});

//Показ мобильного поиска
$('.top-header__search').click(function() {
  $('.top-header__search-block').toggleClass('top-header__search-block--show');
});

$('.top-header__search-close').click(function() {
  $('.top-header__search-block').removeClass('top-header__search-block--show');
});

//Показ параметров поиска
$('.top-header__options-button').click(function() {
  $('.top-header__options-form-block').toggleClass('top-header__options-form-block--show');
  $('body').toggleClass('overflow-hidden');
});

$('.top-header__options-form-close').click(function() {
  $('.top-header__options-form-block').removeClass('top-header__options-form-block--show');
  $('body').removeClass('overflow-hidden');
});

//Показ параметров поиска в среднем хедере
$('.middle-header__options-button').click(function() {
  $('.middle-header__options-form-block').toggleClass('middle-header__options-form-block--show');
});

$('.middle-header__options-form-close').click(function() {
  $('.middle-header__options-form-block').removeClass('middle-header__options-form-block--show');
});

//Ползунок в параметрах
var $optSl = $(".js-range-slider");
var $minPrice = $(".options__min-price");
var $maxPrice = $(".options__max-price");
$optSl.ionRangeSlider({
  hide_from_to: true,
  hide_min_max: true,
  skin: "round",

  onStart: function(data) {
    $minPrice.prop("value", data.from);
    $maxPrice.prop("value", data.to);
  },
  onChange: function(data) {
    $minPrice.prop("value", data.from);
    $maxPrice.prop("value", data.to);
  }
});

//SELECT
$(document).ready(function() {
  $('.options__select').select2({
    dropdownAutoWidth: true,
    minimumResultsForSearch: -1,
    width: '100%',
    theme: "default custom-option-select"
  });
});

//Select сортировка
$('.products__select').select2({
   minimumResultsForSearch: -1,
  theme: "products",
  placeholder: {
    id: '-1', // the value of the option
    text: 'Сортировать:'
  }
});

//Слайдер в хедере
var swiperHeader = new Swiper('.swiper-header', {
  pagination: {
    el: '.swiper-pagination__header',
    clickable: true,
  },
});

//Слайдер товара в левом блоке
var swiperLeftProduct = new Swiper('.swiper-slider__left', {
  breakpointsInverse: true,
  pagination: {
    el: '.swiper-pagination__left-product',
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    680: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    940: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1100: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  },
});

//Слайдер товара в правом блоке
var swiperRightProduct = new Swiper('.swiper-slider__right', {
  breakpointsInverse: true,
  pagination: {
    el: '.swiper-pagination__right-product',
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    680: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    940: {
      slidesPerView: 1
    }
  },
});

//Слайдер Акции
var swiperStocks = new Swiper('.swiper__stocks', {
  pagination: {
    el: '.swiper-pagination__aside-left',
    clickable: true,
  },
});

//Слайдер Новости
var swiperNews = new Swiper('.swiper__news', {
  pagination: {
    el: '.swiper-pagination__aside-right',
    clickable: true,
  },
});

$(document).ready(function(){
  $("#sticker").sticky({topSpacing:0});
});

$('.products-view__toggle').click(function() {
  $('.products-view__toggle').removeClass('products-view__toggle--active');
  $(this).toggleClass('products-view__toggle--active');
});

//Плюс минус количество товаров
$('.minus').click(function () {
  var $input = $(this).parent().find('input');
  var count = parseInt($input.val()) - 1;
  count = count < 1 ? 1 : count;
  $input.val(count);
  $input.change();
  return false;
});
$('.plus').click(function () {
  var $input = $(this).parent().find('input');
  $input.val(parseInt($input.val()) + 1);
  $input.change();
  return false;
});
