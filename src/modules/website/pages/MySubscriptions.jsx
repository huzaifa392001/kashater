import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";


// images
import logo from "../../website/assets/image/logo-main.png";
import logo_fav from "../../website/assets/image/logo-main-fav.png";
import kadhaster_img from "../../website/assets/image/kadhaster-story-img.png";
import profile_place from "../../website/assets/image/profile-placeholder.png";
import retry_arrow from "../../website/assets/image/retry-arrow.png";

const MySubscriptions = () => {
  return (
    <>
      <Header />

      

      <section className="try-now-sample-preview">
        <div className="container">
          <div className="sample-preview-content">
            <h2 className="title-40px">Try Now</h2>
            <div className="">
              <h3>
                Here’s a sneak peek at how your photo will look in your
                personalised story!
              </h3>
              <p>
                This is a sample preview to help you visualise how the uploaded
                photo will appear in our personalised stories
              </p>
            </div>
            <div className="sample-preview-cont text-center">
              <div className="sample-preview-img">
                <img className="" src={kadhaster_img} alt="" />
              </div>
              <span>
                Like what you see? Just click ‘Personalise my book’ to explore
                our library, upload your favourite photos, and make story time
                truly unforgettable!
              </span>
            </div>

            <div className="btn-pur text-center">
              <button>Personalize My Book </button>
            </div>
            <div className="btn-retry">
              <img className="" src={retry_arrow} alt="" />

              <button>Retry </button>
            </div>
          </div>


          <div className="my-request-tab">
            <div className="my-request-info">
              <h4>Open Requests</h4>
              <h6>2 Requests</h6>
            </div>
            <div className="df f-w">
              <div className="col-lg-4 col-12 mt-4 pe-md-4 pe-0">
            <div className="my-request-card ">
              <div className="df ac j-sb">
                <div className="request-id">
                  <h4>RID#049583</h4>
                  <p>Requested on 31 Mar 2024</p>
                </div>
                <span className="status-badge">Order Confirmed</span>
              </div>
              <div className="view-tkt-info">
                <div className="df ae">
                <div className="col-4 pe-2 mt-4">
                  <span>Order ID</span>
                  <h4>OID#00489</h4>
                </div>
                <div className="col-4 pe-2 mt-4">
                  <span>Order ID</span>
                  <h4>OID#00489</h4>
                </div>
                <div className="col-4 view-tkt-btn text-end mt-4">
                  <a href="">View Ticket</a>
                </div>
                </div>
              </div>
            </div>
            </div>
            <div className="col-lg-4 col-12 mt-4 pe-md-4 pe-0">
            <div className="my-request-card ">
              <div className="df ac j-sb">
                <div className="request-id">
                  <h4>RID#049583</h4>
                  <p>Requested on 31 Mar 2024</p>
                </div>
                <span className="status-badge-green">Order Confirmed</span>
              </div>
              <div className="view-tkt-info">
                <div className="df ae">
                <div className="col-4 pe-2 mt-4">
                  <span>Order ID</span>
                  <h4>OID#00489</h4>
                </div>
                <div className="col-4 pe-2 mt-4">
                  <span>Order ID</span>
                  <h4>OID#00489</h4>
                </div>
                <div className="col-4 view-tkt-btn text-end mt-4">
                  <a href="">View Ticket</a>
                </div>
                </div>
              </div>
            </div>
            </div>
            <div className="col-lg-4 col-12 mt-4 pe-md-4 pe-0">
            <div className="my-request-card ">
              <div className="df ac j-sb">
                <div className="request-id">
                  <h4>RID#049583</h4>
                  <p>Requested on 31 Mar 2024</p>
                </div>
                <span className="status-badge">Order Confirmed</span>
              </div>
              <div className="view-tkt-info">
                <div className="df ae">
                <div className="col-4 pe-2 mt-4">
                  <span>Order ID</span>
                  <h4>OID#00489</h4>
                </div>
                <div className="col-4 pe-2 mt-4">
                  <span>Order ID</span>
                  <h4>OID#00489</h4>
                </div>
                <div className="col-4 view-tkt-btn text-end mt-4">
                  <a href="">View Ticket</a>
                </div>
                </div>
              </div>
            </div>
            </div>
            </div>
            <div className="my-request-info mt-4">
              <h4>Closed Requests</h4>
              <h6>Items (3)</h6>
            </div>

            <div className="my-request-table mt-4">
              <table>
                <tr className="request-th">
                  <th>Request ID</th>
                  <th>Order ID</th>
                  <th>Category</th>
                  <th>Requested Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
                <tr className="request-tr">
                  <td className="req-id">RID#049583</td>
                  <td>OID#00193</td>
                  <td>Delivery Issue</td>
                  <td>23 Mar 2025</td>
                  <td><span className="status-badge-req-success">Order Confirmed</span></td>  
                  <td>
                    <div className="view-tkt-btn"><a href=""> View details</a></div></td>
                </tr>
                <tr className="request-tr">
                  <td className="req-id">RID#049583</td>
                  <td>OID#00193</td>
                  <td>Delivery Issue</td>
                  <td>23 Mar 2025</td>
                  <td><span className="status-badge-req-reject">Rejected</span></td>  
                  <td>
                    <div className="view-tkt-btn"><a href=""> View details</a></div></td>
                </tr>
                <tr className="request-tr">
                  <td className="req-id">RID#049583</td>
                  <td>OID#00193</td>
                  <td>Delivery Issue</td>
                  <td>23 Mar 2025</td>
                  <td><span className="status-badge-req-success">Order Confirmed</span></td>  
                  <td>
                    <div className="view-tkt-btn"><a href=""> View details</a></div></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default MySubscriptions;
