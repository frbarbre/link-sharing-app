import { links } from "@/constants";
import PlatformSelector from "./PlatformSelector";
import Button from "./Button";
export default async function AddLinks() {
  

    return (
     <div>
        <h2>Customize your links</h2>
        <p>Add/edit/remove links below and then share all your profiles with the world!</p>
        <Button/>
      <PlatformSelector/>
     </div>
    );
  }
  