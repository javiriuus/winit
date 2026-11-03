import LegalPage from "../components/LegalPage";
import { legalNotice } from "../lib/legal";

export default function AvisoLegal() {
  return <LegalPage doc={legalNotice} path="/aviso-legal" />;
}
