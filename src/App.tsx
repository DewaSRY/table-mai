// import Button from "@/common/Button";
// import Expand from "@common/Expanded";
import TansStack from "@components/TanstakTable";
// import { Fragment } from "react";
import { faker } from "@faker-js/faker";
const images = Array(10)
  .fill(null)
  .map(() => {
    return {
      img: faker.image.urlPicsumPhotos(),
      profile: faker.person.fullName(),
      locations: faker.location.city(),
    };
  });
function App() {
  return (
    <>
      <div className="flex flex-wrap gap-4">
        {images.map((profile, id) => (
          <div key={id}>
            <img width={300} height={300} src={profile.img} />
            <p className="text-right text-gray-500">{profile.locations}</p>
            <h2 className="text-2xl underline font-bold">{profile.profile}</h2>
          </div>
        ))}
      </div>
      <TansStack />
    </>
  );
}

export default App;
