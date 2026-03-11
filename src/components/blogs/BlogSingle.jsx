import React from "react";

import REview from "./Review";
import ReplayForm from "./ReplayForm";

export default function BlogSingle({ blogItem }) {
  return (
    <section className="tf-spacing tf-spacing-3">
      <div className="page-blog-single">
        <div className="image-head">
          <img
            className="w-100 lazyload"
            data-src="/images/blog/blog-detail.jpg"
            alt=""
            src="/images/blog/blog-detail.jpg"
            width={2700}
            height={1050}
          />
        </div>
        <div className="blog-single-wrap">
          <div className="blog-single-content">
            <div className="meta wow fadeInUp">
              <div className="meta-item">
                <i className="flaticon-calendar" />
                <p>16 December 2025</p>
              </div>
              <div className="meta-item">
                <i className="flaticon-message" />
                <p>14</p>
              </div>
              <a href="#" className="meta-item">
                <i className="flaticon-user-1" />
                <p>Esther Howard</p>
              </a>
            </div>
            <h2 className="font-cardo fw-7 wow fadeInUp">{blogItem.title}</h2>
            <div className="title text-22 fw-5 wow fadeInUp">
              Introduction: Understanding the Origin of the Portuguese Language
            </div>
            <p className="fs-15">
              The Portuguese language origin can be traced back thousands of years to ancient Europe. Many people ask where did Portuguese originate and how it became one of the most spoken languages in the world. Portuguese came from Latin and evolved through centuries of cultural, political, and historical influences. Today, it connects millions across continents.
            </p>
            
            <br />

            <div className="title text-22 fw-5 wow fadeInUp">
              Early Roots of the Portuguese Language
            </div>
            <div className="title text-15 fw-5 wow fadeInUp">
              Portuguese Came from Latin
            </div>
             <p className="fs-15">
              Portuguese is a Latin language that developed from Vulgar Latin, spoken by Roman soldiers and settlers. When the Romans reached the Iberian Peninsula, Latin slowly replaced local languages and became the foundation of Portuguese.
              <br />
              <br />
              Latin was not uniform. Over time, pronunciation and grammar changed. These changes formed the early roots of the Portuguese language and set it apart from classical Latin.
             </p>
              <br />
                      
            <div className="title text-22 fw-5 wow fadeInUp">
              Influence of Local Peoples on Portugue
            </div>
            <div className="title text-15 fw-5 wow fadeInUp">
              Celtic and Iberian Contributions
            </div>
             <p className="fs-15">
              Before Roman rule, Celtic and Iberian groups lived in the region. Their languages influenced early Portuguese vocabulary, pronunciation, and place names.
              <br />
              <br />
              Words related to geography, agriculture, and daily life were absorbed into Latin speech. This blending helped shape how Portuguese developed differently from other Romance languages.
             </p>
              <br />            
            <div className="title text-22 fw-5 wow fadeInUp">
              Role of the Roman Empire
            </div>
            <div className="title text-15 fw-5 wow fadeInUp">
              How Roman Rule Shaped Portuguese
            </div>
             <p className="fs-15">
              The Roman Empire played a key role in spreading Latin across modern Portugal. Roads, trade, and administration made Latin the dominant language.
              <br />
              <br />
              Roman education and governance ensured Latin survived long after the empire declined. This continuity allowed Portuguese to evolve rather than disappear.
             </p>

             <br />            
            <div className="title text-22 fw-5 wow fadeInUp">
              Formation of Galician-Portuguese
            </div>
            <div className="title text-15 fw-5 wow fadeInUp">
              Language Evolution in the Northwest
            </div>
             <p className="fs-15">
              In northwest Iberia, Latin evolved into a regional language called Galician-Portuguese. This language was spoken in present-day northern Portugal and Galicia.
              <br />
              <br />
              By the 12th century, Galician-Portuguese was used in poetry, legal texts, and daily communication. This stage marks a major moment in the history of the Portuguese language.
             </p>

             <br />            
            <div className="title text-22 fw-5 wow fadeInUp">
              Separation Into Modern Portuguese
            </div>
            <div className="title text-15 fw-5 wow fadeInUp">
              Portugal Becomes a Kingdom
            </div>
             <p className="fs-15">
              When Portugal became an independent kingdom in the 12th century, its language began to develop separately. Political independence strengthened linguistic identity.
              <br />
              <br />
              Portuguese gained official status and replaced Latin in administration. Over time, spelling, grammar, and pronunciation formed what we recognize as modern Portuguese.
             </p>

             <br />            
            <div className="title text-22 fw-5 wow fadeInUp">
              Impact of Exploration on Portuguese
            </div>
            <div className="title text-15 fw-5 wow fadeInUp">
              How Portuguese Spread Worldwide
            </div>
             <p className="fs-15">
              During the Age of Exploration, Portuguese sailors traveled across the globe. They carried their language to Brazil, Africa, and Asia.
              <br />
              <br />
              Portuguese became a trade and colonial language. Local languages influenced it, especially in Brazil and African nations. This global spread explains why Portuguese is spoken far beyond Europe.
             </p>

             <br />            
            <div className="title text-22 fw-5 wow fadeInUp">
              Modern Portuguese Varieties
            </div>
            <div className="title text-15 fw-5 wow fadeInUp">
              European vs Brazilian Portuguese
            </div>
             <p className="fs-15">
              Today, Portuguese has several varieties. The two main ones are European Portuguese and Brazilian Portuguese.
              <br />
              <br />
              European Portuguese sounds more compact and formal. Brazilian Portuguese is more open and melodic. Vocabulary and pronunciation differ, but speakers understand each other easily.
             </p>

             <br />            
            <div className="title text-22 fw-5 wow fadeInUp">
              Conclusion: Why the Portuguese Language Matters Today
            </div>
           
             <p className="fs-15">
              The roots of the Portuguese language show a journey from Latin to a global language. From Roman influence to worldwide exploration, Portuguese reflects history, culture, and identity.
              <br />
              <br />
              Today, it connects people across continents. Understanding where Portuguese came from helps us appreciate its importance in modern communication. Explore, learn, and experience this rich language.
             </p>

             <br />

            <div className="title text-22 fw-5 wow fadeInUp">
              FAQs
            </div>

            <div className="title text-15 fw-5 wow fadeInUp">
              Is Portuguese similar to Spanish?
            </div>
            <p className="fs-15">
              Yes. Portuguese and Spanish both come from Latin. They share vocabulary and
              grammar, but pronunciation and some sentence structures are different.
            </p>

            <br />

            <div className="title text-15 fw-5 wow fadeInUp">
              Why did Portuguese spread outside Europe?
            </div>
            <p className="fs-15">
              Portuguese spread due to exploration and colonization. Sailors and traders
              introduced it to Brazil, Africa, and parts of Asia.
            </p>

            <br />

            <div className="title text-15 fw-5 wow fadeInUp">
              Which countries speak Portuguese today?
            </div>
            <p className="fs-15">
              Portugal, Brazil, Angola, Mozambique, Cape Verde, Guinea-Bissau, São Tomé and
              Príncipe, East Timor, and Equatorial Guinea speak Portuguese officially.
            </p>

            <br />

            <div className="title text-15 fw-5 wow fadeInUp">
              Is Portuguese influenced by Arabic?
            </div>
            <p className="fs-15">
              Yes. Arabic influenced Portuguese during Moorish rule. Many words related to
              science, food, and architecture come from Arabic.
            </p>

            <br />

            <div className="title text-15 fw-5 wow fadeInUp">
              What alphabet does Portuguese use?
            </div>
            <p className="fs-15">
              Portuguese uses the Latin alphabet with additional accents like ã, ç, and ê
              to show pronunciation differences.
            </p>






























            
            
            
          </div>
          <div className="bottom flex items-center justify-between gap-20 flex-wrap">
            <div className="share flex items-center gap-20p">
              <h6 className="fw-5">Share this post</h6>
              <ul className="tf-social-icon flex items-center gap-10">
                <li>
                  <a href="#">
                    <i className="flaticon-facebook-1" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="icon-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="flaticon-instagram" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="flaticon-linkedin-1" />
                  </a>
                </li>
              </ul>
            </div>
            <ul className="tags-list">
              <li>
                <a href="#" className="tags-item">
                  Course
                </a>
              </li>
              <li>
                <a href="#" className="tags-item">
                  SEO
                </a>
              </li>
              <li>
                <a href="#" className="tags-item">
                  Designer
                </a>
              </li>
              <li>
                <a href="#" className="tags-item">
                  Software
                </a>
              </li>
            </ul>
          </div>
          <div className="profile-item">
            <div className="image">
              <img
                alt=""
                src="/images/avatar/profile-1.png"
                width={281}
                height={280}
              />
            </div>
            <div className="content">
              <h5>
                <a className="fw-5">Theresa Edin</a>
              </h5>
              <div className="sub fs-15">Professional Web Developer</div>
              <div className="fs-15">
                Lorem ipsum dolor sit amet. Qui incidunt dolores non similique
                ducimus et debitis molestiae. Et autem quia eum reprehenderit
                voluptates est reprehenderit illo est enim perferendis est neque
                sunt.
              </div>
            </div>
          </div>
          <div className="post-control flex items-center justify-between gap-20 flex-wrap">
            <div className="prev wow fadeInLeft">
              <a href="#" className="flex items-center fw-5 h6">
                <i className="icon-arrow-left" />
                Previous Post
              </a>
              <div className="fs-15">
                Given Set was without from god divide rule Hath
              </div>
            </div>
            <div className="next wow fadeInRight">
              <a href="#" className="flex items-center justify-end fw-5 h6">
                Next Post
                <i className="icon-arrow-right" />
              </a>
              <div className="fs-15">
                Tree earth fowl given moveth deep lesser After
              </div>
            </div>
          </div>
          <REview />
          <ReplayForm />
        </div>
      </div>
    </section>
  );
}
