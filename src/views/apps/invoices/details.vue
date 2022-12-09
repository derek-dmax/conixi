<script>
  import Layout from "../../../layouts/main.vue";
  import PageHeader from "@/components/page-header";
  import appConfig from "../../../../app.config";
  import axios from 'axios';
  export default {
    page: {
      title: "Invoice Details",
      meta: [{
        name: "description",
        content: appConfig.description
      }],
    },
    data() {
      return {
        title: "Invoice Details",
        items: [{
            text: "Conixi",
            href: "/",
          },
          {
            text: "Invoice Details",
            active: true,
          },
        ],
        amount: 875,
        billing_address: "30 Gabriel Road, Alton, Hampshire - HP2 4RF",
        billing_name: "Ragner Resources",
        billing_phone: "+(44) 1727 789045",
        billing_taxno: "12-3456789",
        card_holder_name: "David Nichols",
        card_number: "xxx xxxx xxxx 1234",
        company_address: "403 H Fan Faranh Blvd, London, United Kingdom",
        contact: "01727 821222",
        country: "UK",
        date: "2021-04-06T16:28:00.000",
        discount: "53.99",
        email: "admin@conixi.co.uk",
        estimated_tax: "920",
        img: "assets/images/users/lauraheadshot.jpg",
        invoiceId: "#VL25000351",
        name: "Laura Van Zyl",
        notes: "All accounts will be paid within 14 days from due date of invoice. If account is not paid within 14 days please contact our accounts payable department.",
        payment_method: "Mastercard",
        postalcode: 91798,
        product_detail: [{
          name: 'Initial Task Delivery',
          category: 'Main Module Code Stage One',
          price: '1600',
          stock: '1'
        }, {
          name: 'Additional Time & Materials',
          category: 'Coding Outside of Specifications',
          price: '250',
          stock: '12'
        }],
        registration_no: "9000906561",
        shipping_address: "345 Elm Ave, Alton, Hampshire - HP1 5AF",
        shipping_charge: "65.00",
        shipping_name: "Donald Palmer",
        shipping_phone: "+(44) 01987-01234",
        shipping_taxno: "12-3456789",
        status: "Not Yet Due",
        sub_total: 4600.00,
        total_amount: 5520.00,
        website: "www.conixi.co.uk",
      };
    },
    mounted() {
      if (this.$route.params.id) {
        axios.get(`https://api-node.themesbrand.website/apps/invoice/${this.$route.params.id}`)
          .then((data) => {
            console.log(data.data.data)
            data = data.data.data
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct",
              "Nov", "Dec"
            ];
            var dd = new Date(data.date)
            data.date = dd.getDate() + " " + monthNames[dd.getMonth()] + ", " + dd.getFullYear();
            var hours = dd.getHours();
            var minutes = dd.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            data.time = strTime;

            this.company_address = data.company_address;
            this.postalcode = data.postalcode;
            this.registration_no = data.registration_no;
            this.email = data.email;
            this.website = data.website;
            this.contact = data.contact;
            this.invoiceId = data.invoiceId;
            this.product_detail = data.product_detail;
            this.date = data.date;
            this.time = data.time;
            this.status = data.status;

            var itemclass = data.status == 'Paid' ? 'badge-soft-success' : data.status == 'Cancel' ?
              'badge-soft-danger' : data.status == 'Unpaid' ? 'badge-soft-warning' : data.status ==
              'Refund' ? 'badge-soft-primary' : '';
            document.getElementById('payment-status').classList.add(itemclass);

            this.total_amount = data.total_amount;

            this.billing_name = data.billing_name;
            this.billing_address = data.billing_address;
            this.billing_phone = data.billing_phone;
            this.billing_taxno = data.billing_taxno;

            this.shipping_name = data.shipping_name;
            this.shipping_address = data.shipping_address;
            this.shipping_phone = data.shipping_phone;
            this.shipping_taxno = data.shipping_taxno;

            this.payment_method = data.payment_method;
            this.card_holder_name = data.card_holder_name;
            this.card_number = data.card_number;
            this.total_amount = data.total_amount;
            this.notes = data.notes;

          }).catch((er) => {
            console.log(er)
          });
      }
    },
    components: {
      Layout,
      PageHeader,
    },
  };
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row justify-content-center">
      <div class="col-xxl-9">
        <div class="card" id="demo">
          <div class="card-header border-bottom-dashed p-4">
            <div class="d-sm-flex">
              <div class="flex-grow-1">
                <img src="@/assets/images/c-logo-dark.jpg" class="card-logo card-logo-dark" alt="logo dark" height="17">
                <img src="@/assets/images/c-logo-light.jpg" class="card-logo card-logo-light" alt="logo light"
                  height="17">
                <div class="mt-sm-5 mt-4">
                  <h6 class="text-muted text-uppercase fw-semibold">Address</h6>
                  <p class="text-muted mb-1" id="address-details">Alton, Hampshire</p>
                  <p class="text-muted mb-0" id="postcode"><span>Postcode:</span> HP1 5AF</p>
                </div>
              </div>
              <div class="flex-shrink-0 mt-sm-0 mt-3">
                <h6><span class="text-muted fw-normal">Company No: </span>
                  <span id="legal-register-no">{{registration_no}}</span>
                </h6>
                <h6><span class="text-muted fw-normal">Email: </span>
                  <span id="email">{{email}}</span>
                </h6>
                <h6><span class="text-muted fw-normal">Website:</span> <a href="https://themesbrand.com/"
                    class="link-primary" target="_blank" id="website">{{website}}</a></h6>
                <h6 class="mb-0"><span class="text-muted fw-normal">Contact No: </span><span
                    id="contact-no">{{contact}}</span></h6>
              </div>
            </div>
          </div>
          <!--end card-header-->
          <div class="card-body p-4">
            <div class="row g-3">
              <div class="col-lg-3 col-6">
                <p class="text-muted mb-2 text-uppercase fw-semibold">Invoice No</p>
                <h5 class="fs-14 mb-0"><span id="invoice-no">{{invoiceId}}</span></h5>
              </div>
              <!--end col-->
              <div class="col-lg-3 col-6">
                <p class="text-muted mb-2 text-uppercase fw-semibold">Due Date</p>
                <h5 class="fs-14 mb-0"><span id="invoice-date">25th Feb 2023</span></h5>
              </div>
              <!--end col-->
              <div class="col-lg-3 col-6">
                <p class="text-muted mb-0 text-uppercase fw-semibold">Payment Status</p>
                <span class="badge bg-warning fs-11" id="payment-status">{{status}}</span>
              </div>
              <!--end col-->
              <div class="col-lg-3 col-6">
                <p class="text-muted mb-2 text-uppercase fw-semibold">Total Amount</p>
                <h5 class="fs-14 mb-0">£<span id="total-amount">{{total_amount}}</span></h5>
              </div>
              <!--end col-->
            </div>
            <!--end row-->
          </div>
          <!--end card-body-->
          <div class="card-body p-4 border-top border-top-dashed">
            <div class="row g-3">
              <div class="col-sm-6">
                <h6 class="text-muted text-uppercase fw-semibold mb-3">Billing Address</h6>
                <p class="fw-medium mb-2" id="billing-name">{{billing_name}}</p>
                <p class="text-muted mb-1" id="billing-address">{{billing_address}}</p>
                <p class="text-muted mb-1" id="billing-phone">Phone: {{billing_phone}}</p>
                <p class="text-muted mb-0" id="billing-tax">VAT: {{billing_taxno}}</p>
              </div>
              <!--end col-->
            </div>
            <!--end row-->
          </div>
          <!--end card-body-->
          <div class="card-body p-4">
            <div class="table-responsive">
              <table class="table table-borderless text-center table-nowrap align-middle mb-0">
                <thead>
                  <tr class="table-active">
                    <th scope="col" style="width: 50px;">#</th>
                    <th scope="col">Description</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Quantity</th>
                    <th scope="col" class="text-end">Amount</th>
                  </tr>
                </thead>
                <tbody id="products-list">
                  <tr v-for="(item, index) of product_detail" :key="index">
                    <th scope="row">0{{(index+1)}}</th>
                    <td class="text-start">
                      <span class="fw-medium">{{item.name}}</span>
                      <p class="text-muted mb-0">{{item.category}}
                      </p>
                    </td>
                    <td>£{{item.price}}</td>
                    <td>{{item.stock}}</td>
                    <td class="text-end">{{item.price*item.stock}}</td>
                  </tr>
                  <tr class="border-top border-top-dashed mt-2">
                    <td colspan="3"></td>
                    <td colspan="2" class="fw-medium p-0">
                      <table class="table table-borderless text-start table-nowrap align-middle mb-0">
                        <tbody>
                          <tr>
                            <td>Sub Total</td>
                            <td class="text-end">£{{sub_total}}</td>
                          </tr>
                          <tr>
                            <td>VAT (20%)</td>
                            <td class="text-end">£{{estimated_tax}}</td>
                          </tr>
                          <tr class="border-top border-top-dashed">
                            <th scope="row">Total Amount</th>
                            <td class="text-end">£{{total_amount}}</td>
                          </tr>
                        </tbody>
                      </table>
                      <!--end table-->
                    </td>
                  </tr>
                </tbody>
              </table>
              <!--end table-->
            </div>
            <div class="mt-4">
              <div class="alert alert-info">
                <p class="mb-0"><span class="fw-semibold">NOTES:</span>
                  <span id="note">{{notes}}
                  </span>
                </p>
              </div>
            </div>
            <div class="hstack gap-2 justify-content-end d-print-none mt-4">
              <a href="javascript:window.print()" class="btn btn-success"><i
                  class="ri-printer-line align-bottom me-1"></i> Print</a>
              <a href="javascript:void(0);" class="btn btn-primary"><i class="ri-download-2-line align-bottom me-1"></i>
                Download</a>
            </div>
          </div>
          <!--end card-body-->
        </div>
        <!--end card-->
      </div>
      <!--end col-->
    </div>
    <!--end row-->
  </Layout>
</template>