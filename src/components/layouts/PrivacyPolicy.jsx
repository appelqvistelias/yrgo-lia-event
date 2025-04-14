import styles from "./PrivacyPolicy.module.css";
import Dropdown from "./Dropdown";
import ArrowLeft from "@/icons/arrow-left.svg";

export default function PrivacyPolicy() {
  return (
    <div className={styles.privacyContainer}>
      <div className={styles.privacyPolicy}>
        <h1 className={styles.heading}>Integritetspolicy</h1>
        <Dropdown title="Insamling av personuppgifter">
          <p>
            Vi kan samla in följande information när du besöker vår webbplats
            eller anmäler dig till vårt event:
          </p>
          <ul>
            <li>Namn</li>
            <li>E-postadress </li>
            <li>Telefonnummer </li>
            <li>Företagsnamn </li>
            <li>Portfoliolänk</li>
            <li>LinkedIn</li>
            <li>länk eller annan frivillig information du lämnar</li>
          </ul>
        </Dropdown>
        <Dropdown title="Användning av personuppgifter">
          <p>Vi använder dina uppgifter för att:</p>
          <ul>
            <li>Hantera din anmälan till eventet</li>
            <li>Skicka relevant information om eventet</li>
            <li>Kommunicera med dig vid frågor eller uppföljningar</li>
            <li>Förbättra vår webbplats och evenemangsupplevelse</li>
          </ul>
        </Dropdown>
        <Dropdown title="Delning av personuppgifter">
          <p>
            Vi delar inte dina personuppgifter med tredje part, förutom när det
            är nödvändigt för att administrera eventet, exempelvis med
            eventlokalen eller tekniska tjänsteleverantörer. Vi säkerställer att
            alla parter följer GDPR och skyddar din data.
          </p>
        </Dropdown>
        <Dropdown title="Lagring och skydd">
          <p>
            Dina uppgifter lagras endast så länge det är nödvändigt för eventets
            syfte och raderas efter en rimlig tidsperiod. Vi vidtar lämpliga
            tekniska och organisatoriska åtgärder för att skydda din data från
            obehörig åtkomst, förlust eller missbruk.
          </p>
        </Dropdown>
        <Dropdown title="Dina rättigheter">
          <p>Du har rätt att:</p>
          <ul>
            <li>Begära tillgång till dina personuppgifter</li>
            <li>Rätta felaktiga uppgifter</li>
            <li>Begära radering av dina uppgifter</li>
            <li>Invända mot eller begränsa behandling av dina uppgifter</li>
            <li>Återkalla samtycke där behandling grundas på samtycke</li>
          </ul>
          <p>
            För att utöva dessa rättigheter, vänligen kontakta oss på
            [E-postadress].
          </p>
        </Dropdown>
        <Dropdown title="Cookies och spårningstekniker">
          <p>
            Vår webbplats kan använda cookies för att förbättra
            användarupplevelsen. Du kan när som helst ändra dina
            cookie-inställningar via din webbläsare.
          </p>
        </Dropdown>
        <Dropdown title="Ändringar i denna policy">
          <p>
            Vi kan uppdatera denna integritetspolicy vid behov. Den senaste
            versionen kommer alltid att finnas tillgänglig på vår webbplats.
          </p>
        </Dropdown>
        <Dropdown title="Kontakt">
          <p>
            Har du frågor om vår integritetspolicy? Kontakta oss på: [Eventets
            namn] [E-postadress] [Telefonnummer]
          </p>
        </Dropdown>
        <div className={styles.backLink}>
          <a href="/">
            <ArrowLeft className={styles.icon} />{" "}
            <span className={styles.backText}>Tillbaka</span>
          </a>
        </div>
      </div>
    </div>
  );
}
