import React, { useState } from "react"
import classes from "./SectionPrivacy.module.css"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import parent from "../../../assets/image/child-privacy-data.png"
const SectionPrivacy = () => {
  const data = {
    faq: [
      {
        question: "How We Protect Your Data",
        answer: [
          "End-to-end encryption",
          "Limited access controls",
          "Secure storage",
          "Data retention policy",
        ],
      },
      {
        question: "Our Data Protection Standards",
        answer: [
          {
            contant:
              "We follow stringent Indian and international data security standards to ensure your child’s information is handled with the utmost care and confidentiality:",
            heading: "Indian Standards",
            list: [
              "ISO/IEC 27000 Series Compliance",
              "Indian Data Protection Guidelines",
            ],
          },
          {
            heading: "Global Standards",
            list: [
              "COPPA (Children’s Online Privacy Protection Act)",
              "GDPR (General Data Protection Regulation)",
            ],
          },
        ],
      },
      {
        question: "Your Rights",
        answer: `You can request to view, update, or delete your stored data at any time. Opt in or out of having your creations featured in our marketing (with consent).`,
      },
      {
        question: "Why This Matters",
        answer: [
          "Because our customers are families, privacy and safety are not just policies — they are core values. Every photo, every detail, and every story you share is handled as if it were our own.",
          "Your trust is the foundation of our stories",
        ],
      },
    ],
  }

  const [accordionIndex, setAccordionIndex] = useState(0)
  const toggleAccordion = index => {
    setAccordionIndex(prev => (prev === index ? null : index))
  }
  return (
    <>
      <section
        className={`${classes.section__privacy} ${classes.content__outer}`}
      >
        <div className={classes.imge_section}>
          <img src={parent} alt="parent" />
        </div>
        <div className={classes.acodians_section}>
          <ul
            className={`${classes.content} ${classes.section__container__space}`}
          >
            {data.faq.map((item, i) => {
              return (
                <li>
                  <section onClick={() => toggleAccordion(i)}>
                    <h3>{item.question}</h3>

                    {accordionIndex === i ? (
                      <KeyboardArrowDownIcon
                        style={{ fontSize: "32px", color: "#000" }}
                      />
                    ) : (
                      <KeyboardArrowUpIcon
                        style={{ fontSize: "32px", color: "#000" }}
                      />
                    )}
                  </section>
                  {accordionIndex === i && (
                    <>
                      {Array.isArray(item.answer) ? (
                        // Case: Array → could be list of strings or objects
                        <div className={classes.main_text_show}>
                          {typeof item.answer[0] === "string" ? (
                            // Bullet list
                            <ul className={classes.bullet_point}>
                              {item.answer.map((point, idx) => (
                                <li key={idx}>{point}</li>
                              ))}
                            </ul>
                          ) : (
                            // Nested sections
                            item.answer.map((section, idx) => (
                              <div key={idx} style={{ marginBottom: "15px" }}>
                                {section?.contant && (
                                  <p style={{ marginBottom: "8px" }}>
                                    {section?.contant}
                                  </p>
                                )}

                                <h4 style={{ marginBottom: "10px" }}>
                                  {section.heading}
                                </h4>
                                <ul className={classes.bullet_point}>
                                  {section.list.map((point, j) => (
                                    <li key={j}>{point}</li>
                                  ))}
                                </ul>
                              </div>
                            ))
                          )}
                        </div>
                      ) : (
                        // Case: Plain string
                        <div className={classes.main_text_show}>
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </>
                  )}

                  {i !== data.faq.length - 1 && (
                    <div className={`${classes.divider}`}></div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}

export default SectionPrivacy
