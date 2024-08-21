import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Membership from "./pages/Membership";
import Outreach from "./pages/Outreach";
import GriefSupport from "./pages/GriefSupport";
import Donation from "./pages/Donation";
import Volunteer from "./pages/Volunteer";
import SababuDocuments from "./pages/SababuDocuments";
import Join from "./pages/Join";
import { SubscribersProvider } from "./contexts/SubscribersContext";
import { ApplicationProvider } from "./contexts/ApplicationContext";
import { EventProvider } from "./contexts/EventContext";
import { DonationProvider } from "./contexts/DonationContext";
import { VolunteerProvider } from "./contexts/VolunteerConntext";
import ProfilePage from "./pages/ProfilePage";
import Members from "./pages/Members";
import MembershipCard from "./components/MembershipCard";
import { MembershipCardProvider } from "./contexts/MembershipCardContext";
import WelcomeNewsletter from "./components/Newsletters/WelcomeNewsletter";
import SolidarityNewsletter from "./components/Newsletters/SolidarityNewsletter";
import ForYouBlog from "./components/Newsletters/ForYouBlog";

function App() {
  return (
    <main className="main">
      <ApplicationProvider>
        <EventProvider>
          <SubscribersProvider>
            <DonationProvider>
              <MembershipCardProvider>
                <VolunteerProvider>
                  <Routes>
                    <Route path="/" element={<Navigate to="home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="services/*" element={<ServicePages />} />
                    <Route path="membership" element={<Membership />} />
                    <Route path="home/donate" element={<Donation />} />
                    <Route path="home/volunteer" element={<Volunteer />} />
                    <Route
                      path="home/sababu-documents"
                      element={<SababuDocuments />}
                    />
                    <Route path="home/join-now" element={<Join />} />
                    <Route path="my_sababu" element={<ProfilePage />} />
                    <Route path="my_sababu/members" element={<Members />} />
                    <Route
                      path="home/membership_card"
                      element={<MembershipCard />}
                    />
                    <Route
                      path="home/newsletters/welcome"
                      element={<WelcomeNewsletter />}
                    />
                    <Route
                      path="home/newsletters/showing-solidarity"
                      element={<SolidarityNewsletter />}
                    />
                    <Route
                      path="home/newsletters/sababu-for-you"
                      element={<ForYouBlog />}
                    />
                    <Route path="contacts" element={<Contact />} />
                  </Routes>
                </VolunteerProvider>
              </MembershipCardProvider>
            </DonationProvider>
          </SubscribersProvider>
        </EventProvider>
      </ApplicationProvider>
    </main>
  );
}

export default App;

function ServicePages() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="grief-support" element={<GriefSupport />} />
        <Route path="outreach" element={<Outreach />} />
      </Routes>
    </>
  );
}
