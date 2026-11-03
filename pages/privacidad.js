import LegalPage from "../components/LegalPage";
import { privacyPolicy } from "../lib/legal";

export default function Privacidad() {
  return <LegalPage doc={privacyPolicy} path="/privacidad" />;
}
