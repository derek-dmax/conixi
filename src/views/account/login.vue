<script>
import { required, email, helpers } from "@vuelidate/validators";
import appConfig from "../../../app.config";
import axios from "axios";
import { layoutMethods, layoutComputed } from "@/state/helpers";

import { authMethods, authFackMethods, notificationMethods } from "@/state/helpers";

export default {
  page: {
    title: "Login",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      email: "",
      passedEmail: "admin@themesbrand.com",
      password: "123456",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
    };
  },
  validations: {
    email: {
      required: helpers.withMessage("Email is required", required),
      email: helpers.withMessage("Please enter valid email", email),
    },
    password: {
      required: helpers.withMessage("Password is required", required),
    },
  },
  computed: {
    ...layoutComputed,
    userType: {
      get() {
        return this.$store ? this.$store.state.layout.userType : "" || "";
      },
      set(userType) {
        this.changeUserType({
          userType: userType,
        });
      },
      userOrg: {
        get() {
          return this.$store ? this.$store.state.layout.userOrg : "" || "";
        },
        set(userOrg) {
          this.changeUserOrg({
            userOrg: userOrg,
          });
        },
      },
      userName: {
        get() {
          return this.$store ? this.$store.state.layout.userName : "" || "";
        },
        set(userName) {
          this.changeUserName({
            userName: userName,
          });
        },
      },
      userTitle: {
        get() {
          return this.$store ? this.$store.state.layout.userTitle : "" || "";
        },
        set(userTitle) {
          this.changeUserTitle({
            userTitle: userTitle,
          });
        },
      },
      userImage: {
        get() {
          return this.$store ? this.$store.state.layout.userImage : "" || "";
        },
        set(userImage) {
          this.changeUserImage({
            userImage: userImage,
          });
        },
      },
    }
  },
  methods: {
    ...layoutMethods,
    ...authMethods,
    ...authFackMethods,
    ...notificationMethods,

    async signinapi() {
      if (this.email !== "derek@conixi.co.uk"
        && this.email !== "derek@dmax.design"
        && this.email !== "developer@ventura.co.uk"
        && this.email !== "laura@conixi.co.uk") {
        this.passedEmail = "";
      }

      const result = await axios.post(
        "https://api-node.themesbrand.website/auth/signin",
        {
          email: this.passedEmail,
          password: this.password,
        }
      );
      if (result.data.status == "errors") {
        return (this.authError = result.data.data);
      }

      localStorage.setItem("jwt", result.data.token);
      if (this.email === "derek@conixi.co.uk") {
        this.userType = "consultant";
        this.userOrg = "Conixi"
        this.userName = "Derek Macrae"
        this.userTitle = "CTO"
        this.userImage = require('@/assets/images/users/derekm.jpg')
      }
      if (this.email === "laura@conixi.co.uk") {
        this.userType = "manager";
        this.userOrg = "Conixi"
        this.userName = "Laura Van Zyl"
        this.userTitle = "Manager"
        this.userImage = require('@/assets/images/users/avatar-2.jpg')
      }
      if (this.email === "derek@dmax.design") {
        this.userType = "supplier";
        this.userOrg = "DMax Design"
        this.userName = "Derek Macrae"
        this.userTitle = "Supply Consultant"
        this.userImage = require('@/assets/images/users/derekm.jpg')
      }
      if (this.email === "developer@ventura.co.uk") {
        this.userType = "supplier";
        this.userOrg = "Ventura Associates"
        this.userName = "Val Dugan"
        this.userTitle = "Developer"
        this.userImage = require('@/assets/images/users/avatar-6.jpg')
      }
      localStorage.setItem("userType", this.userType);
      localStorage.setItem("userName", this.userName);
      localStorage.setItem("userOrg", this.userOrg);
      localStorage.setItem("userTitle", this.userTitle);
      console.log("UserImage: " + this.userImage)
      localStorage.setItem("userImage", this.userImage);
      if(this.userType !== "supplier") {
        this.$router.push({
          path: "/",
        })
      } else {
        this.$router.push ({name: 'projects-list'})
      }
    },

    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$touch;

      if (this.$invalid) {
        return;
      } else {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          this.tryingToLogIn = true;
          // Reset the authError if it existed.
          this.authError = null;
          return (
            this.logIn({
              email: this.passedEmail,
              password: this.password,
            })
              // eslint-disable-next-line no-unused-vars
              .then((token) => {
                this.tryingToLogIn = false;
                this.isAuthError = false;
                // Redirect to the originally requested page, or to the home page
                this.$router.push({
                  path: "/",
                });
              })
              .catch((error) => {
                this.tryingToLogIn = false;
                this.authError = error ? error : "";
                this.isAuthError = true;
              })
          );
        }
      }
    },
  },
};
</script>

<template>
  <div class="auth-page-wrapper pt-5">
    <!-- auth page bg -->
    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
      <div class="bg-overlay"></div>

      <div class="shape">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120"
        >
          <path
            d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
          ></path>
        </svg>
      </div>
      <Particles
        id="tsparticles"
        :options="{
          particles: {
            number: {
              value: 90,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: '#ffffff',
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000',
              },
              polygon: {
                nb_sides: 5,
              },
              image: {
                src: 'img/github.svg',
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 0.8,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0,
                sync: false,
              },
            },
            size: {
              value: 4,
              random: true,
              anim: {
                enable: false,
                speed: 4,
                size_min: 0.2,
                sync: false,
              },
            },
            line_linked: {
              enable: false,
              distance: 150,
              color: '#ffffff',
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'bubble',
              },
              onclick: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 4,
                duration: 2,
                opacity: 0.8,
                speed: 3,
              },
              repulse: {
                distance: 200,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
          config_demo: {
            hide_card: false,
            background_color: '#b61924',
            background_image: '',
            background_position: '50% 50%',
            background_repeat: 'no-repeat',
            background_size: 'cover',
          },
        }"
      />
    </div>

    <!-- auth page content -->
    <div class="auth-page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center text-white-50">
              <div>
                <router-link to="/" class="d-inline-block auth-logo">
                  <img src="@/assets/images/c-logo-light-tr.png" alt="" height="50" />
                </router-link>
              </div>
              <p class="fs-18 fw-medium">Procurement for Humans</p>
            </div>
          </div>
        </div>
        <!-- end row -->

        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card mt-4">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Welcome Back !</h5>
                  <p class="text-muted">Sign in to access your account.</p>
                </div>
                <div class="p-2 mt-4">
                  <b-alert
                    v-model="authError"
                    variant="danger"
                    class="mt-3"
                    dismissible
                    >{{ authError }}</b-alert
                  >

                  <div></div>

                  <form @submit.prevent="tryToLogIn">
                    <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input
                        type="text"
                        class="form-control"
                        id="email"
                        placeholder="Enter email"
                        v-model="email"
                      />
                      <div class="invalid-feedback">
                        <span></span>
                      </div>
                    </div>

                    <div class="mb-3">
                      <div class="float-end">
                        <router-link to="/forgot-password" class="text-muted"
                          >Forgot password?</router-link
                        >
                      </div>
                      <label class="form-label" for="password-input">Password</label>
                      <div class="position-relative auth-pass-inputgroup mb-3">
                        <input
                          type="password"
                          v-model="password"
                          class="form-control pe-5"
                          placeholder="Enter password"
                          id="password-input"
                        />
                        <button
                          class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                          type="button"
                          id="password-addon"
                        >
                          <i class="ri-eye-fill align-middle"></i>
                        </button>
                        <div class="invalid-feedback">
                          <span></span>
                        </div>
                      </div>
                    </div>

                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="auth-remember-check"
                      />
                      <label class="form-check-label" for="auth-remember-check"
                        >Remember me</label
                      >
                    </div>

                    <div class="mt-4">
                      <button
                        class="btn btn-success w-100"
                        type="submit"
                        @click="signinapi"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <!-- end card body -->
            </div>
            <!-- end card -->
          </div>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
    <!-- end auth page content -->

    <!-- footer -->
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <p class="mb-0 text-muted">&copy; {{ new Date().getFullYear() }} Conixi</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- end Footer -->
  </div>
  <!-- end auth-page-wrapper -->
</template>
