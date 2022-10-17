import '../css/about.css'
import React from 'react'

export default function About () {
  return (
    <div className="layout-about">
      <div className="about-web-container">
        <img className="item1" src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/image/pages/about1.png" alt="item1"></img>
        <h1 className="aboutThisWebsiteHeading">About this Website</h1>
        <p className="aboutThisWebsiteContent">
          Our website is a welcoming community for anyone who wants to share,
          post or sell their little things. While browsing our website, you may
          find someone&apos;s handmade ceramic mugs, an artist&apos;s hand sketches, or
          even an old gentleman&apos;s favourite old story books! We are here to
          support people with creativity with their little business, as well as
          to provide a platform for people to sell the things that no longer
          needed but too good to be thrown away.
        </p>
        <img className="item2" src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/image/pages/about2.png" alt="item2"></img>
        <h1 className="whyThisWebsiteHeading">Why this Website</h1>
        <p className="whyThisWebsiteContent">
          Nowadays, everything is always fast-paced and commercial. Our team
          would like to encourage people to slow down a bit while using our
          website - in here, you can discover someone&apos;s magical thoughts through
          their handicrafts, you may got a chance to hear a good old memory from
          a stranger, or simply, you can chill on our website and have a fun
          time browsing unique items that don&apos;t follow a certain formula.{' '}
        </p>
      </div>
      <div className="about-us-container">
        <img className="item3" src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/groupPhoto/hailin.png" alt="hailin"></img>
        <img className="item4" src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/groupPhoto/ashley.png" alt="ashley"></img>
        <img className="item5" src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/groupPhoto/lina.png" alt="lina"></img>
        <img className="item6" src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/groupPhoto/lily.png" alt="lily"></img>
        <img className="item7" src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/groupPhoto/di.png" alt="di"></img>
        <img className="item8" src="https://it-project-002.s3.ap-southeast-2.amazonaws.com/admin/unimelb.png" alt="item8"></img>
        <h1 className="aboutUsHeading">About Us</h1>
        <div className="aboutUsContent">
          <p>Da-dum-da-dum…!</p>
          <p>
            Let me introduce you with our lovely team who built this website!{' '}
          </p>
          <p>
            We are a group of students studying at University of Melbourne,
            majoring in Computing and Software Systems. This website is a final
            product of a semester-long project from the subject IT Project.{' '}
          </p>
          <p>
            Hailin Jiang, our scrum master and front-end developer, manages
            project risks and adjust project plans.
          </p>
          <p>
            Ashley Wang, our product owner and front-end developer, communicates
            with both the clients and the team.
          </p>
          <p>
            Hanlin Zhu, our UI designer and front-end developer, designs User
            interface and improve user experience.
          </p>
          <p>
            Lily Li, our back-end developer, writes functionalities and deals
            with data.
          </p>
          <p>
            Di Lu, our back-end developer, web project design, interact with
            database and api calls, feature release.
          </p>
        </div>
      </div>
    </div>
  )
}
