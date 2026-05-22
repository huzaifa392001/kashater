import React, { useEffect, useState } from "react"
import classes from "./OwnBackyard.module.css"
import Manage from "../../../assets/image/svg/manage story.svg"
import CustomButton from "../../../components/UI/Button/Button"
import { useNavigate, useLocation } from "react-router-dom"
import book from "../../../assets/image/jpg/dummy image 3.png"
import play from "../../../assets/image/svg/play(small).svg"
import useApiHttp from "../../../hooks/ues-http"
import Swal from "sweetalert2"
import TabBar from "../../../components/UI/Tabs/Tabs"
import MappingDetails from "./MappingDetails"
import QuillDisplay from "../../../components/UI/RichText/QuillDisplay"
import GallerySections from "./GallerySections"

export default function OwnBackyard() {
  const location = useLocation()
  const { storyId } = location.state || {}
  console.log("storyId", storyId)
  const navigate = useNavigate()

  const [booksData, setBooksData] = useState()
  // console.log("booksData", booksData)
  const [activeTab, setActiveTab] = useState(0)
  const [refreshFlag, setrefreshFlag] = useState(false)

  const {
    isLoading: sendLoading,
    success: sendSuccess,
    error: sendError,
    sendRequest: sendRequest,
  } = useApiHttp()

  const {
    isLoading: regenerateLoading,

    sendRequest: regenerate,
  } = useApiHttp()

  const handlerEditStory = () => {
    navigate("/admin/storylists/upload-story", {
      state: { type: "edit", allata: booksData },
    })
  }
  const handlerDeleteStory = () => {
    // navigate("/admin/storylists/upload-story")
    Swal.fire({
      title: "Are you sure?",
      text: "You will be delete this record.",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(result => {
      if (result.isConfirmed) {
        sendRequest(
          {
            url: `admin/story-management/story/delete/${storyId}`,
            method: "DELETE",
          },
          data => {
            navigate("/admin/storylists")
          }
        )
      }
    })
  }
  const viewData = () => {
    sendRequest(
      {
        url: `admin/story-management/story/view/${storyId}`,
      },
      data => {
        setBooksData(data?.data)
      }
    )
  }
  useEffect(() => {
    viewData()
  }, [])

  useEffect(() => {
    if (location?.state?.tab) {
      setActiveTab(1)
    }
  }, [])

  const onTabClick = index => {
    setActiveTab(index) // Update the active tab index
  }

  const handleRegeneration = () => {
    Swal.fire({
      title: "Regenerate Story Processing",
      text: "This will continue processing the story from the page where it previously failed.",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F3C11D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then(result => {
      if (result.isConfirmed) {
        regenerate(
          {
            url: `admin/story-management/story/regenerate/${storyId}`,
          },
          res => {
            Swal.fire("Success!", res.message, "success")

            viewData()
            setrefreshFlag(f => !f)
          }
        )
      }
    })
  }

  return (
    <div className={classes.scanOut} style={{ marginBottom: "3rem" }}>
      <div className={classes.breadcrumb}>
        <span
          style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
          onClick={() => navigate(-1)}
        >
          <img
            style={{ width: "20px", height: "20px" }}
            src={Manage}
            alt="Manage"
          />{" "}
          Manage Story
        </span>{" "}
        &gt; <span className={classes.active}>{booksData?.name}</span>
      </div>

      <div className={classes.header_table}>
        <div className={classes.header_set}>
          <div className={classes.header_left}>
            <h3>{booksData?.name}</h3>
            <p>Uploaded on {booksData?.created_at}</p>
          </div>

          <div
            className={classes.header_right}
            style={
              activeTab === 1 && booksData?.dzine_status !== "failed" ? {} : {}
            }
          >
            {activeTab === 0 ? (
              <>
                <CustomButton
                  variant="contained"
                  customColor="#000000"
                  customBgColor="#F3C11D"
                  custmstyle={{
                    padding: "10px 20px",
                    width: "131px",
                    fontSize: "13px",
                  }}
                  onClick={() => handlerEditStory()}
                >
                  Edit Story
                </CustomButton>
                <CustomButton
                  variant="contained"
                  customColor="#ffffff"
                  customBgColor="#f31d1d"
                  custmstyle={{
                    padding: "10px 20px",
                    width: "131px",
                    fontSize: "13px",
                  }}
                  onClick={() => handlerDeleteStory()}
                >
                  Delete Story
                </CustomButton>
              </>
            ) : (
              <>
                <div className={classes.Details_box_cont}>
                  <p className={classes.Details_title}>Dzine Status</p>
                  <p
                    className={`${classes.Details_sub_title} ${classes[`dzine_${booksData?.dzine_status}`]
                      }`}
                  >
                    {booksData?.dzine_status}
                  </p>
                </div>
                {booksData?.dzine_status === "failed" && (
                  <CustomButton
                    variant="contained"
                    customColor="#000000"
                    customBgColor="#F3C11D"
                    custmstyle={{
                      padding: "10px 20px",
                      width: "131px",
                      fontSize: "13px",
                    }}
                    onClick={() => handleRegeneration()}
                  >
                    Re-Generate
                  </CustomButton>
                )}
              </>
            )}
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <TabBar
            tabs={[
              {
                title: "Story Details",
                render: () => (
                  <>
                    {" "}
                    <div className={classes.main}>
                      <div className={classes.main_box}>
                        <div className={classes.left_side}>
                          {booksData?.book_cover && (
                            <>
                              <div className={classes.book_boxs}>
                                <img src={booksData?.book_cover} alt="book" />
                              </div>
                              {/* <p className={classes.Sample_Preview}>
                                {" "}
                                <img src={play} alt="play" />
                                Sample Preview
                              </p> */}
                            </>
                          )}
                        </div>
                        <div className={classes.right_side}>
                          <div className={classes.container_set}>
                            <h1 className={classes.title}>{booksData?.name}</h1>
                            {booksData?.description !== "" ? (
                              <p className={classes.description}>
                                <QuillDisplay
                                  content={booksData?.description}
                                />
                              </p>
                            ) : (
                              <>
                                <p className={classes.description}>
                                  Step into a world of wonder right outside your
                                  door! In Your Own Backyard is a delightful
                                  personalized storybook that takes young
                                  readers on an exciting adventure through their
                                  own backyard. From uncovering hidden treasures
                                  to befriending playful creatures, this story
                                  transforms an ordinary space into a magical
                                  world of exploration.
                                </p>
                                <p
                                  className={classes.description}
                                  style={{ marginTop: "1rem" }}
                                >
                                  With engaging storytelling and vibrant
                                  illustrations, this book encourages curiosity,
                                  imagination, and a love for nature. Whether
                                  discovering tiny insects, watching birds soar,
                                  or creating their own backyard adventures,
                                  your child becomes the star of this
                                  heartwarming tale.
                                </p>

                                <div className={classes.perfectFor}>
                                  <p className={classes.perfectForTitle}>
                                    Perfect for:
                                  </p>
                                  <ul className={classes.bulletList}>
                                    <li className={classes.bulletItem}>
                                      <span className={classes.bullet}>🌿</span>
                                      Nature-loving kids
                                    </li>
                                    <li className={classes.bulletItem}>
                                      <span className={classes.bullet}>🔍</span>
                                      Little explorers with big imaginations
                                    </li>
                                    <li className={classes.bulletItem}>
                                      <span className={classes.bullet}>📖</span>
                                      Bedtime stories filled with outdoor magic
                                    </li>
                                  </ul>
                                </div>
                              </>
                            )}

                            <p className={classes.ageRecommendation}>
                              Recommended for {booksData?.age_group}
                            </p>

                            <p className={classes.personalize}>
                              Personalize it with your child’s name and make
                              their backyard adventure unforgettable! 🚀✨
                            </p>

                            <div className={classes.priceContainer}>
                              <div className={classes.price}>
                                ₹ {booksData?.price}
                              </div>
                              <div className={classes.discountBadge}>
                                {" "}
                                ₹ {booksData?.mrp}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.main}>
                      <div className={classes.Details_set}>
                        <div className={classes.container_set}>
                          <p className={classes.Details}>Character Details</p>

                          <div className={classes.formRow}>
                            {booksData?.characters?.map((item, index) => (
                              <div key={index}>
                                <div className={classes.AIMaskedImaged}>
                                  <p className={classes.AIMaskedImagedTitle}>
                                    {item.name}
                                  </p>
                                  <p
                                    className={
                                      classes.AIMaskedImagedDescription
                                    }
                                  >
                                    {item.description}
                                  </p>
                                </div>
                                <div className={classes.book_boxs}>
                                  <img src={item.image || book} alt="ai" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ),
              },
              {
                title: "Mapping Details",
                render: () => (
                  <>
                    <MappingDetails
                      refreshFlag={refreshFlag}
                      storyId={storyId}
                      booksData={booksData}
                    />
                  </>
                ),
              },
              {
                title: "Gallery",
                render: () => (
                  <>
                    <GallerySections
                      refreshFlag={refreshFlag}
                      storyId={storyId}
                      booksData={booksData}
                    />
                  </>
                ),
              },
            ]}
            onTabClick={onTabClick}
            activeTab={activeTab}
          />
        </div>
      </div>
    </div>
  )
}
