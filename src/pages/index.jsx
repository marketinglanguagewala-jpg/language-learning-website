import HomePage1 from "./(homes)/home-01/page";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Languagewala - Education Online Courses LMS Reactjs Template",
  description: "Languagewala - Education Online Courses LMS Reactjs Template",
};
export default function Home() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <HomePage1 />
    </>
  );
}
