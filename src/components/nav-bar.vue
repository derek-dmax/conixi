<script>
  import simplebar from "simplebar-vue";
  
  import i18n from "../i18n";
  
  /**
   * Nav-bar Component
   */
  export default {
    data() {
      return {
        userType: "consultant",
        userName: "Derek Macrae",
        userOrg: "Conixi",
        userTitle: "CTO",
        message: "Answered your comment on the cash flow forecast's graph 🔔.",
        userImage: require('@/assets/images/users/derekm.jpg'),
        languages: [{
            flag: require("@/assets/images/flags/gb.svg"),
            language: "gb-en",
            title: "English",
          },
          ],
        lan: i18n.locale,
        text: null,
        flag: null,
        value: null,
        myVar: 1,
      };
    },
    created() {
      this.userType = localStorage.getItem("userType");
      this.userOrg = localStorage.getItem("userOrg");
      this.userName = localStorage.getItem("userName");
      this.userTitle = localStorage.getItem("userTitle");
      this.userImage = localStorage.getItem("userImage");
      if(this.userName == 'Val Dugan'){
        this.message = 'New invite to respond - <a href="#">Department of Education Catering Contract</a>.'
      }
    },
    components: {
      simplebar
    },
  
    methods: {
  
      isCustomDropdown() {
        //Search bar
        var searchOptions = document.getElementById("search-close-options");
        var dropdown = document.getElementById("search-dropdown");
        var searchInput = document.getElementById("search-options");

        if(searchInput){
          searchInput.addEventListener("focus", () => {
            var inputLength = searchInput.value.length;
            if (inputLength > 0) {
              dropdown.classList.add("show");
              searchOptions.classList.remove("d-none");
            } else {
              dropdown.classList.remove("show");
              searchOptions.classList.add("d-none");
            }
          });

          searchInput.addEventListener("keyup", () => {
            var inputLength = searchInput.value.length;
            if (inputLength > 0) {
              dropdown.classList.add("show");
              searchOptions.classList.remove("d-none");
            } else {
              dropdown.classList.remove("show");
              searchOptions.classList.add("d-none");
            }
          });

          searchOptions.addEventListener("click", () => {
            searchInput.value = "";
            dropdown.classList.remove("show");
            searchOptions.classList.add("d-none");
          });

          document.body.addEventListener("click", (e) => {
            if (e.target.getAttribute("id") !== "search-options") {
              dropdown.classList.remove("show");
              searchOptions.classList.add("d-none");
            }
          });
        }
      },
      toggleHamburgerMenu() {
        var windowSize = document.documentElement.clientWidth;
  
        if (windowSize > 767)
          document.querySelector(".hamburger-icon").classList.toggle("open");
  
        //For collapse horizontal menu
        if (
          document.documentElement.getAttribute("data-layout") === "horizontal"
        ) {
          document.body.classList.contains("menu") ?
            document.body.classList.remove("menu") :
            document.body.classList.add("menu");
        }
  
        //For collapse vertical menu
        if (document.documentElement.getAttribute("data-layout") === "vertical") {
          if (windowSize < 1025 && windowSize > 767) {
            document.body.classList.remove("vertical-sidebar-enable");
            document.documentElement.getAttribute("data-sidebar-size") == "sm" ?
              document.documentElement.setAttribute("data-sidebar-size", "") :
              document.documentElement.setAttribute("data-sidebar-size", "sm");
          } else if (windowSize > 1025) {
            document.body.classList.remove("vertical-sidebar-enable");
            document.documentElement.getAttribute("data-sidebar-size") == "lg" ?
              document.documentElement.setAttribute("data-sidebar-size", "sm") :
              document.documentElement.setAttribute("data-sidebar-size", "lg");
          } else if (windowSize <= 767) {
            document.body.classList.add("vertical-sidebar-enable");
            document.documentElement.setAttribute("data-sidebar-size", "lg");
          }
        }
  
        //Two column menu
        if (document.documentElement.getAttribute("data-layout") == "twocolumn") {
          document.body.classList.contains("twocolumn-panel") ?
            document.body.classList.remove("twocolumn-panel") :
            document.body.classList.add("twocolumn-panel");
        }
      },
      toggleMenu() {
        this.$parent.toggleMenu();
      },
      toggleRightSidebar() {
        this.$parent.toggleRightSidebar();
      },
      initFullScreen() {
        document.body.classList.toggle("fullscreen-enable");
        if (
          !document.fullscreenElement &&
          /* alternative standard method */
          !document.mozFullScreenElement &&
          !document.webkitFullscreenElement
        ) {
          // current working methods
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(
              Element.ALLOW_KEYBOARD_INPUT
            );
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
        }
      },
      setLanguage(locale, country, flag) {
        this.lan = locale;
        this.text = country;
        this.flag = flag;
        document.getElementById("header-lang-img").setAttribute("src", flag);
        i18n.global.locale = locale;
      },
      toggleDarkMode() {
        if (document.documentElement.getAttribute("data-layout-mode") == "dark") {
          document.documentElement.setAttribute("data-layout-mode", "light");
        } else {
          document.documentElement.setAttribute("data-layout-mode", "dark");
        }
      },
      initTopbarComponents() {
        function updateCartPrice() {
          var currencySign = "$";
          var subtotal = 0;
          Array.from(document.getElementsByClassName("cart-item-price")).forEach(function (e) {
            subtotal += parseFloat(e.innerHTML);
          });
          if (document.getElementById("cart-item-total")) {
            document.getElementById("cart-item-total").innerHTML = currencySign + subtotal.toFixed(2);
          }
        }
        if (document.getElementsByClassName("dropdown-item-cart")) {
          var dropdownItemCart = document.querySelectorAll(".dropdown-item-cart").length;
          Array.from(document.querySelectorAll("#page-topbar .dropdown-menu-cart .remove-item-btn")).forEach(function (item) {
            item.addEventListener("click", function () {
              dropdownItemCart--;
              this.closest(".dropdown-item-cart").remove();
              Array.from(document.getElementsByClassName("cartitem-badge")).forEach(function (e) {
                e.innerHTML = dropdownItemCart;
              });
              updateCartPrice();
              if (document.getElementById("empty-cart")) {
                document.getElementById("empty-cart").style.display = dropdownItemCart == 0 ? "block" : "none";
              }
              if (document.getElementById("checkout-elem")) {
                document.getElementById("checkout-elem").style.display = dropdownItemCart == 0 ? "none" : "block";
              }
            });
          });
          Array.from(document.getElementsByClassName("cartitem-badge")).forEach(function (e) {
            e.innerHTML = dropdownItemCart;
          });
          if (document.getElementById("empty-cart")) {
            document.getElementById("empty-cart").style.display = "none";
          }
          if (document.getElementById("checkout-elem")) {
            document.getElementById("checkout-elem").style.display = "block";
          }
          updateCartPrice();
        }
  
        // notification messages
        if (document.getElementsByClassName("notification-check")) {
          Array.from(document.querySelectorAll(".notification-check input")).forEach(function (element) {
            element.addEventListener("click", function (el) {
              el.target.closest(".notification-item").classList.toggle("active");
            });
          });
        }
      }
    },
    computed: {},
    mounted() {
      document.addEventListener("scroll", function () {
        var pageTopbar = document.getElementById("page-topbar");
        if (pageTopbar) {
          document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ? pageTopbar.classList.add(
            "topbar-shadow") : pageTopbar.classList.remove("topbar-shadow");
        }
      });
      if (document.getElementById("topnav-hamburger-icon"))
        document
          .getElementById("topnav-hamburger-icon")
          .addEventListener("click", this.toggleHamburgerMenu);
  
      this.isCustomDropdown();
      this.initTopbarComponents();
    },
  };
  </script>
  
  <template>
    <header id="page-topbar">
      <div class="layout-width">
        <div class="navbar-header">
          <div class="d-flex">
            <!-- LOGO -->
            <div class="navbar-brand-box horizontal-logo">
              <router-link to="/" class="logo logo-dark">
                <span class="logo-sm">
                  <img src="@/assets/images/logo-sm-c.png" alt="" height="40" />
                </span>
                <span class="logo-lg">
                  <img src="@/assets/images/c-logo-dark.jpg" alt="" height="24" />
                </span>
              </router-link>
  
              <router-link to="/" class="logo logo-light">
                <span class="logo-sm">
                  <img src="@/assets/images/logo-sm-c.png" alt="" height="36" />
                </span>
                <span class="logo-lg">
                  <img src="@/assets/images/c-logo-light-gr.jpg" alt="" height="30" />
                </span>
              </router-link>
            </div>
  
            <button type="button" class="
                btn btn-sm
                px-3
                fs-16
                header-item
                vertical-menu-btn
                topnav-hamburger
              " id="topnav-hamburger-icon">
              <span class="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
  
            <!-- App Search-->
            <form class="app-search d-none d-md-block">
              <div class="position-relative">
                <input type="text" class="form-control" placeholder="Search..." autocomplete="off" id="search-options"
                  value="" />
                <span class="mdi mdi-magnify search-widget-icon"></span>
                <span class="
                    mdi mdi-close-circle
                    search-widget-icon search-widget-icon-close
                    d-none
                  " id="search-close-options"></span>
              </div>
              <div class="dropdown-menu dropdown-menu-lg" id="search-dropdown">
                <simplebar data-simplebar style="max-height: 320px">
                  <!-- item-->
                  <div class="dropdown-header">
                    <h6 class="text-overflow text-muted mb-0 text-uppercase">
                      Recent Searches
                    </h6>
                  </div>
  
                  <div class="dropdown-item bg-transparent text-wrap">
                    <router-link to="/" class="btn btn-soft-secondary btn-sm btn-rounded">how to setup <i
                        class="mdi mdi-magnify ms-1"></i></router-link>
                    <router-link to="/" class="btn btn-soft-secondary btn-sm btn-rounded">buttons <i
                        class="mdi mdi-magnify ms-1"></i></router-link>
                  </div>
                  <!-- item-->
                  <div class="dropdown-header mt-2">
                    <h6 class="text-overflow text-muted mb-1 text-uppercase">
                      Pages
                    </h6>
                  </div>
  
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item notify-item">
                    <i class="
                        ri-bubble-chart-line
                        align-middle
                        fs-18
                        text-muted
                        me-2
                      "></i>
                    <span>Analytics Dashboard</span>
                  </a>
  
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item notify-item">
                    <i class="ri-lifebuoy-line align-middle fs-18 text-muted me-2"></i>
                    <span>Help Center</span>
                  </a>
  
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item notify-item">
                    <i class="
                        ri-user-settings-line
                        align-middle
                        fs-18
                        text-muted
                        me-2
                      "></i>
                    <span>My account settings</span>
                  </a>
  
                  <!-- item-->
                  <div class="dropdown-header mt-2">
                    <h6 class="text-overflow text-muted mb-2 text-uppercase">
                      Members
                    </h6>
                  </div>
  
                  <div class="notification-list">
                    <!-- item -->
                    <a href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                      <img src="@/assets/images/users/avatar-2.jpg" class="me-3 rounded-circle avatar-xs"
                        alt="user-pic" />
                      <div class="flex-1">
                        <h6 class="m-0">Angela Bernier</h6>
                        <span class="fs-11 mb-0 text-muted">Manager</span>
                      </div>
                    </a>
                    <!-- item -->
                    <a href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                      <img src="@/assets/images/users/avatar-3.jpg" class="me-3 rounded-circle avatar-xs"
                        alt="user-pic" />
                      <div class="flex-1">
                        <h6 class="m-0">David Grasso</h6>
                        <span class="fs-11 mb-0 text-muted">Web Designer</span>
                      </div>
                    </a>
                    <!-- item -->
                    <a href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                      <img src="@/assets/images/users/avatar-5.jpg" class="me-3 rounded-circle avatar-xs"
                        alt="user-pic" />
                      <div class="flex-1">
                        <h6 class="m-0">Mike Bunch</h6>
                        <span class="fs-11 mb-0 text-muted">React Developer</span>
                      </div>
                    </a>
                  </div>
                </simplebar>
  
                <div class="text-center pt-3 pb-1">
                  <router-link to="/pages/search-results" class="btn btn-primary btn-sm">View All Results <i
                      class="ri-arrow-right-line ms-1"></i></router-link>
                </div>
              </div>
            </form>
          </div>
  
          <div class="d-flex align-items-center">
            <div class="dropdown d-md-none topbar-head-dropdown header-item">
              <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="bx bx-search fs-22"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown">
                <form class="p-3">
                  <div class="form-group m-0">
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Search ..."
                        aria-label="Recipient's username" />
                      <button class="btn btn-primary" type="submit">
                        <i class="mdi mdi-magnify"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
  
            <div class="dropdown ms-1 topbar-head-dropdown header-item">
              <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img id="header-lang-img" src="@/assets/images/flags/gb.svg" alt="Header Language" height="18"
                  class="rounded" />
              </button>
              <div class="dropdown-menu dropdown-menu-end">
                <!-- item-->
                <a href="javascript:void(0);" v-for="(entry, i) in languages" :key="`Lang${i}`" :value="entry"
                  @click="setLanguage(entry.language, entry.title, entry.flag)"
                  :class="{ active: lan === entry.language }" class="dropdown-item notify-item language py-2"
                  data-lang="en-gb" title="English">
                  <img :src="entry.flag" alt="user-image" class="me-2 rounded" height="18" />
                  <span class="align-middle">{{ entry.title }}</span>
                </a>
              </div>
            </div>
  
            <div class="dropdown topbar-head-dropdown ms-1 header-item">
              <div class="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
                aria-labelledby="page-header-cart-dropdown">
                <div class="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                  <div class="row align-items-center">
                    <div class="col">
                      <h6 class="m-0 fs-16 fw-semibold"> My Cart</h6>
                    </div>
                    <div class="col-auto">
                      <span class="badge badge-soft-warning fs-13"><span class="cartitem-badge">7</span>
                        items</span>
                    </div>
                  </div>
                </div>
                <simplebar data-simplebar style="max-height: 300px">
                  <div class="p-2">
                    <div class="text-center empty-cart" id="empty-cart">
                      <div class="avatar-md mx-auto my-3">
                        <div class="avatar-title bg-soft-info text-info fs-36 rounded-circle">
                          <i class='bx bx-cart'></i>
                        </div>
                      </div>
                      <h5 class="mb-3">Your Cart is Empty!</h5>
                      <b-link href="/ecommerce/products" class="btn btn-success w-md mb-3">Shop Now</b-link>
                    </div>
                    <div class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                      <div class="d-flex align-items-center">
                        <img src="@/assets/images/products/img-1.png" class="me-3 rounded-circle avatar-sm p-2 bg-light"
                          alt="user-pic">
                        <div class="flex-1">
                          <h6 class="mt-0 mb-1 fs-14">
                            <b-link href="/ecommerce/product-details" class="text-reset">Branded
                              T-Shirts</b-link>
                          </h6>
                          <p class="mb-0 fs-12 text-muted">
                            Quantity: <span>10 x £32</span>
                          </p>
                        </div>
                        <div class="px-2">
                          <h5 class="m-0 fw-normal">£<span class="cart-item-price">320</span></h5>
                        </div>
                        <div class="ps-2">
                          <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i
                              class="ri-close-fill fs-16"></i></button>
                        </div>
                      </div>
                    </div>
  
                    <div class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                      <div class="d-flex align-items-center">
                        <img src="@/assets/images/products/img-2.png" class="me-3 rounded-circle avatar-sm p-2 bg-light"
                          alt="user-pic">
                        <div class="flex-1">
                          <h6 class="mt-0 mb-1 fs-14">
                            <b-link href="/ecommerce/product-details" class="text-reset">Bentwood Chair</b-link>
                          </h6>
                          <p class="mb-0 fs-12 text-muted">
                            Quantity: <span>5 x £18</span>
                          </p>
                        </div>
                        <div class="px-2">
                          <h5 class="m-0 fw-normal">£<span class="cart-item-price">89</span></h5>
                        </div>
                        <div class="ps-2">
                          <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i
                              class="ri-close-fill fs-16"></i></button>
                        </div>
                      </div>
                    </div>
  
                    <div class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                      <div class="d-flex align-items-center">
                        <img src="@/assets/images/products/img-3.png" class="me-3 rounded-circle avatar-sm p-2 bg-light"
                          alt="user-pic">
                        <div class="flex-1">
                          <h6 class="mt-0 mb-1 fs-14">
                            <b-link href="/ecommerce/product-details" class="text-reset">
                              Borosil Paper Cup</b-link>
                          </h6>
                          <p class="mb-0 fs-12 text-muted">
                            Quantity: <span>3 x £250</span>
                          </p>
                        </div>
                        <div class="px-2">
                          <h5 class="m-0 fw-normal">£<span class="cart-item-price">750</span></h5>
                        </div>
                        <div class="ps-2">
                          <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i
                              class="ri-close-fill fs-16"></i></button>
                        </div>
                      </div>
                    </div>
  
                    <div class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                      <div class="d-flex align-items-center">
                        <img src="@/assets/images/products/img-6.png" class="me-3 rounded-circle avatar-sm p-2 bg-light"
                          alt="user-pic">
                        <div class="flex-1">
                          <h6 class="mt-0 mb-1 fs-14">
                            <b-link href="/ecommerce/product-details" class="text-reset">Gray
                              Styled T-Shirt</b-link>
                          </h6>
                          <p class="mb-0 fs-12 text-muted">
                            Quantity: <span>1 x £1250</span>
                          </p>
                        </div>
                        <div class="px-2">
                          <h5 class="m-0 fw-normal">$ <span class="cart-item-price">1250</span></h5>
                        </div>
                        <div class="ps-2">
                          <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i
                              class="ri-close-fill fs-16"></i></button>
                        </div>
                      </div>
                    </div>
  
                    <div class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                      <div class="d-flex align-items-center">
                        <img src="@/assets/images/products/img-5.png" class="me-3 rounded-circle avatar-sm p-2 bg-light"
                          alt="user-pic">
                        <div class="flex-1">
                          <h6 class="mt-0 mb-1 fs-14">
                            <b-link href="/ecommerce/product-details" class="text-reset">Stillbird Helmet</b-link>
                          </h6>
                          <p class="mb-0 fs-12 text-muted">
                            Quantity: <span>2 x £495</span>
                          </p>
                        </div>
                        <div class="px-2">
                          <h5 class="m-0 fw-normal">£<span class="cart-item-price">990</span></h5>
                        </div>
                        <div class="ps-2">
                          <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i
                              class="ri-close-fill fs-16"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </simplebar>
                <div class="p-3 border-bottom-0 border-start-0 border-end-0 border-dashed border" id="checkout-elem">
                  <div class="d-flex justify-content-between align-items-center pb-3">
                    <h5 class="m-0 text-muted">Total:</h5>
                    <div class="px-2">
                      <h5 class="m-0" id="cart-item-total">£1258.58</h5>
                    </div>
                  </div>
  
                  <b-link href="/ecommerce/checkout" class="btn btn-success text-center w-100">
                    Checkout
                  </b-link>
                </div>
              </div>
            </div>
  
            <div class="ms-1 header-item d-none d-sm-flex">
              <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                data-toggle="fullscreen" @click="initFullScreen">
                <i class="bx bx-fullscreen fs-22"></i>
              </button>
            </div>
  
            <div class="ms-1 header-item d-none d-sm-flex">
              <button type="button" class=" btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode"
                @click="toggleDarkMode">
                <i class="bx bx-moon fs-22"></i>
              </button>
            </div>
  
            <div class="dropdown topbar-head-dropdown ms-1 header-item">
              <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                <i class="bx bx-bell fs-22"></i>
                <span class="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                  1<span class="visually-hidden">unread messages</span></span>
              </button>
              <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-notifications-dropdown">
                <div class="dropdown-head bg-primary bg-pattern rounded-top">
                  <div class="p-3">
                    <div class="row align-items-center">
                      <div class="col">
                        <h6 class="m-0 fs-16 fw-semibold text-white">
                          Notifications
                        </h6>
                      </div>
                      <div class="col-auto dropdown-tabs">
                        <span class="badge badge-soft-light fs-13"> 1 New</span>
                      </div>
                    </div>
                  </div>
  
                  <div class="px-2 pt-2">
                    <ul class="nav nav-tabs dropdown-tabs nav-tabs-custom" data-dropdown-tabs="true"
                      id="notificationItemsTab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" data-bs-toggle="tab" href="#all-noti-tab" role="tab"
                          aria-selected="false" @click.capture.stop style="font-size:15px;">
                          All (1)
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" href="#messages-tab" role="tab" aria-selected="true"
                          @click.capture.stop style="font-size:15px;">
                          Messages (1)
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" href="#alerts-tab" role="tab" aria-selected="false"
                          @click.capture.stop style="font-size:15px;">
                          Alerts
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
  
                <div class="tab-content" id="notificationItemsTabContent">
  
                  <div class="tab-pane fade py-2 ps-2 show active" id="all-noti-tab" role="tabpanel">
                    <simplebar data-simplebar style="max-height: 300px" class="pe-2">
                      <div class="text-reset notification-item d-block dropdown-item position-relative">
                        <div class="d-flex">
                          <img src="@/assets/images/users/avatar-2.jpg" class="me-3 rounded-circle avatar-xs"
                            alt="user-pic" />
                          <div class="flex-1">
                            <a href="#!" class="stretched-link" v-if="userName === 'Laura Van Zyl'">
                              <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                                Derek Macrae
                              </h6>
                            </a>
                            <a href="#!" class="stretched-link" v-else>
                              <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                                Laura Van Zyl
                              </h6>
                            </a>
                            <div class="fs-13 text-muted">
                              <p class="mb-1" v-html="message">
                              </p>
                            </div>
                            <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                              <span v-if="userName != 'Val Dugan'"><i class="mdi mdi-clock-outline"></i> 2 hours ago</span>
                              <span v-else><i class="mdi mdi-clock-outline"></i> 2 mins ago</span>
                            </p>
                          </div>
                          <div class="px-2 fs-15">
                            <input class="form-check-input" type="checkbox" />
                          </div>
                        </div>
                      </div>
    
                      <div class="my-3 text-center">
                        <button type="button" class="btn btn-soft-success">
                          View All Notifications
                          <i class="ri-arrow-right-line align-middle"></i>
                        </button>
                      </div>
                    </simplebar>
                  </div>
  
                  <div class="tab-pane fade py-2 ps-2" id="messages-tab" role="tabpanel" aria-labelledby="messages-tab">
                    <simplebar data-simplebar style="max-height: 300px" class="pe-2">
                      <div class="text-reset notification-item d-block dropdown-item">
                        <div class="d-flex">
                          <img src="@/assets/images/users/avatar-2.jpg" class="me-3 rounded-circle avatar-xs"
                            alt="user-pic" />
                          <div class="flex-1">
                            <a href="#!" class="stretched-link" v-if="userName === 'Laura Van Zyl'">
                              <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                                Derek Macrae
                              </h6>
                            </a>
                            <a href="#!" class="stretched-link" v-else>
                              <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                                Laura Van Zyl
                              </h6>
                            </a>
                            <div class="fs-13 text-muted">
                              <p class="mb-1" v-html="message">
                              </p>
                            </div>
                            <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                              <span v-if="userName != 'Val Dugan'"><i class="mdi mdi-clock-outline"></i> 2 hours ago</span>
                              <span v-else><i class="mdi mdi-clock-outline"></i> 4 min ago</span>
                            </p>
                          </div>
                          <div class="px-2 fs-15">
                            <input class="form-check-input" type="checkbox" />
                          </div>
                        </div>
                      </div>
  
                      <div class="my-3 text-center">
                        <button type="button" class="btn btn-soft-success">
                          View All Messages
                          <i class="ri-arrow-right-line align-middle"></i>
                        </button>
                      </div>
                    </simplebar>
                  </div>
  
                  <div class="tab-pane fade p-4" id="alerts-tab" role="tabpanel" aria-labelledby="alerts-tab">
                    <div class="w-25 w-sm-50 pt-3 mx-auto">
                      <img src="@/assets/images/svg/bell.svg" class="img-fluid" alt="user-pic" />
                    </div>
                    <div class="text-center pb-5 mt-2">
                      <h6 class="fs-18 fw-semibold lh-base">
                        You have no alerts
                      </h6>
                    </div>
                  </div>
  
                </div>
              </div>
            </div>
  
            <div class="dropdown ms-sm-3 header-item topbar-user">
              <button type="button" class="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <span class="d-flex align-items-center">
                  <img class="rounded-circle header-profile-user" :src="userImage" alt="Header Avatar" />
                  <span class="text-start ms-xl-2">
                    <span class=" d-none d-xl-inline-block ms-1 fw-medium user-name-text">{{ userName }}</span>
                    <span class="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{{ userTitle }}</span>
                    <span class="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{{ userOrg }}</span>
                  </span>
                </span>
              </button>
              <div class="dropdown-menu dropdown-menu-end">
                <!-- item-->
                <router-link class="dropdown-item" to="/pages/profile"><i
                    class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                  <span class="align-middle">Profile</span>
                </router-link>
                <router-link class="dropdown-item" to="/chat">
                  <i class=" mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>
                  <span class="align-middle">Messages</span>
                </router-link>
                <router-link class="dropdown-item" to="/dashboard/admin" v-if="userType !== 'supplier'">
                  <i class="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>
                  <span class="align-middle">System Admin</span>
                </router-link>
                <router-link class="dropdown-item" to="/pages/faqs"><i
                    class="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>
                  <span class="align-middle">Help</span>
                </router-link>
                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" to="/pages/profile-setting"><i
                    class="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>
                  <span class="align-middle">Settings</span>
                </router-link>
                <router-link class="dropdown-item" to="/auth/lockscreen-basic"><i
                    class="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>
                  <span class="align-middle">Lock screen</span>
                </router-link>
                <a class="dropdown-item" href="/logout"><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                  <span class="align-middle" data-key="t-logout">Logout</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </template>