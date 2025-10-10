const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to handle empty strings, null, and undefined values
const getDisplayValue = (value, defaultText = "Niet opgegeven") => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return defaultText;
  }
  return value;
};

const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "send@virtueelwandelen.nl",
      to: to,
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("Email sending error:", error);
      return { success: false, error };
    }

    console.log("Email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Email service error:", error);
    return { success: false, error: error.message };
  }
};

// Email templates
const emailTemplates = {
  // Volunteer signup templates
  volunteerSignupUser: (userData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Welkom bij Virtueel Wandelen!</h2>
      <p>Beste ${userData.firstName} ${userData.lastName},</p>
      <p>Bedankt voor je aanmelding als vrijwilliger bij Virtueel Wandelen. We hebben je aanmelding ontvangen en ons neemt binnenkort contact met je op.</p>
      
      <h3 style="color: #5b6502;">Je opgegeven gegevens:</h3>
      <ul>
        <li><strong>Naam:</strong> ${userData.firstName} ${
    userData.lastName
  }</li>
        <li><strong>Email:</strong> ${userData.email}</li>
        <li><strong>Telefoon:</strong> ${
          userData.phoneNumber || "Niet opgegeven"
        }</li>
        <li><strong>Adres:</strong> ${userData.address || "Niet opgegeven"}</li>
      </ul>
      
      <p>Ons team zal je aanmelding bekijken en binnen 2-3 werkdagen contact met je opnemen.</p>
      
      <p>Met vriendelijke groet,<br>Tina van Virtueel Wandelen</p>
      
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">Dit is een automatische e-mail. Beantwoord deze e-mail niet.</p>
    </div>
  `,

  volunteerSignupAdmin: (userData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Nieuwe Vrijwilliger Registratie</h2>
      <p>Een nieuwe vrijwilliger heeft zich aangemeld bij Virtueel Wandelen.</p>
      
      <h3 style="color: #5b6502;">Vrijwilliger Details:</h3>
      <ul>
        <li><strong>Naam:</strong> ${userData.firstName} ${
    userData.lastName
  }</li>
        <li><strong>Email:</strong> ${userData.email}</li>
        <li><strong>Telefoon:</strong> ${
          userData.phoneNumber || "Niet opgegeven"
        }</li>
        <li><strong>Adres:</strong> ${userData.address || "Niet opgegeven"}</li>
        <li><strong>Postcode:</strong> ${
          userData.postal || "Niet opgegeven"
        }</li>
        <li><strong>Eerste keer vrijwilliger:</strong> ${
          userData.isFirstTime ? "Ja" : "Nee"
        }</li>
        <li><strong>Info bijwerken:</strong> ${
          userData.isUpdate ? "Ja" : "Nee"
        }</li>
        <li><strong>Notities:</strong> ${userData.notes || "Geen"}</li>
      </ul>
      
      <p>Bekijk de aanmelding en neem contact op met de vrijwilliger indien nodig.</p>
      
      <p>Virtueel Wandelen Systeem</p>
    </div>
  `,

  // Quote request templates
  quoteRequestUser: (formData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Offerte Aanvraag Ontvangen</h2>
      <p>Beste ${formData.fullName},</p>
      <p>Bedankt voor het aanvragen van een offerte bij Virtueel Wandelen. We hebben uw aanvraag ontvangen en ons ondersteuningsteam zal binnenkort contact met u opnemen met een gedetailleerd voorstel.</p>
      
      <h3 style="color: #5b6502;">Uw Organisatiegegevens:</h3>
      <ul>
        <li><strong>Organisatie:</strong> ${formData.organizationName}</li>
        <li><strong>Contact Email:</strong> ${formData.contactEmail}</li>
        <li><strong>Telefoon:</strong> ${formData.phone}</li>
        <li><strong>Totaal aantal cliënten:</strong> ${formData.totalClients}</li>
        <li><strong>Geschat aantal gebruikers:</strong> ${formData.estimatedClients}</li>
        <li><strong>Startdatum:</strong> ${formData.startDate}</li>
      </ul>
      
      <p>Ons team zal uw eisen bekijken en binnen 1-2 werkdagen een aangepaste offerte naar u sturen.</p>
      
      <p>Met vriendelijke groet,<br>Virtueel Wandelen Sales Team</p>
      
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">Dit is een automatische e-mail. Beantwoord deze e-mail niet.</p>
    </div>
  `,

  quoteRequestAdmin: (formData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Nieuwe Offerte Aanvraag</h2>
      <p>Er is een nieuwe offerte aanvraag ingediend.</p>
      
      <h3 style="color: #5b6502;">Organisatie Informatie:</h3>
      <ul>
        <li><strong>Organisatie Naam:</strong> ${formData.organizationName}</li>
        <li><strong>Contact Email:</strong> ${formData.contactEmail}</li>
        <li><strong>Telefoon:</strong> ${formData.phone}</li>
                <li><strong>Website:</strong> ${
                  formData.website || "Niet opgegeven"
                }</li>
      </ul>
      
      <h3 style="color: #5b6502;">Contactpersoon:</h3>
      <ul>
        <li><strong>Naam:</strong> ${formData.fullName}</li>
        <li><strong>Functie:</strong> ${formData.jobTitle}</li>
        <li><strong>Email:</strong> ${formData.emailAddress}</li>
        <li><strong>Telefoon:</strong> ${formData.phoneContact}</li>
      </ul>
      
      <h3 style="color: #5b6502;">Eisen:</h3>
      <ul>
        <li><strong>Totaal aantal cliënten:</strong> ${
          formData.totalClients
        }</li>
        <li><strong>Aantal locaties:</strong> ${formData.numberLocations}</li>
        <li><strong>Doelgroepen:</strong> ${formData.soortZorgorganisatie}</li>
        <li><strong>Geschat aantal gebruikers:</strong> ${
          formData.estimatedClients
        }</li>
        <li><strong>Gewenste startdatum:</strong> ${formData.startDate}</li>
        <li><strong>Onboarding ondersteuning:</strong> ${
          formData.onboardingSupport
        }</li>
        <li><strong>Aanvullende diensten:</strong> ${
          formData.additionalServices || "Geen"
        }</li>
        <li><strong>Notities:</strong> ${formData.notes || "Geen"}</li>
      </ul>
      
      <p>Neem binnen 24 uur contact op met de klant.</p>
      
      <p>Virtueel Wandelen Systeem</p>
    </div>
  `,

  // Individual payment templates
  paymentUser: (userData, planData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Welkom bij Virtueel Wandelen!</h2>
      <p>Beste ${userData.firstName} ${userData.lastName},</p>
      <p>Bedankt voor het abonneren op Virtueel Wandelen. Uw account is aangemaakt en uw 7-daagse gratis proefperiode is gestart.</p>
      
      <h3 style="color: #5b6502;">Abonnementsgegevens:</h3>
      <ul>
        <li><strong>Abonnement:</strong> ${planData.title}</li>
        <li><strong>Prijs:</strong> €${planData.price}/${planData.period}</li>
        <li><strong>Bedrijf:</strong> ${userData.companyName}</li>
        <li><strong>Email:</strong> ${userData.email}</li>
      </ul>
      
      <p>Uw gratis proefperiode eindigt over 7 dagen. U kunt op elk moment annuleren voordat de proefperiode eindigt om kosten te vermijden.</p>
      
      <p>Ons ondersteuningsteam zal binnenkort contact met u opnemen met inloggegevens en installatie-instructies.</p>
      
      <p>Met vriendelijke groet,<br>Virtueel Wandelen Support Team</p>
      
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">Dit is een automatische e-mail. Beantwoord deze e-mail niet.</p>
    </div>
  `,

  paymentAdmin: (userData, planData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Nieuw Individueel Abonnement</h2>
      <p>Er is een nieuw individueel abonnement aangemaakt.</p>
      
      <h3 style="color: #5b6502;">Klantgegevens:</h3>
      <ul>
        <li><strong>Naam:</strong> ${userData.firstName} ${userData.lastName}</li>
        <li><strong>Email:</strong> ${userData.email}</li>
        <li><strong>Bedrijf:</strong> ${userData.companyName}</li>
        <li><strong>Functie:</strong> ${userData.function}</li>
        <li><strong>Telefoon:</strong> ${userData.telephone}</li>
        <li><strong>Land:</strong> ${userData.country}</li>
        <li><strong>Adres:</strong> ${userData.address}, ${userData.city}, ${userData.postalCode}</li>
      </ul>
      
      <h3 style="color: #5b6502;">Abonnementsgegevens:</h3>
      <ul>
        <li><strong>Abonnement:</strong> ${planData.title}</li>
        <li><strong>Prijs:</strong> €${planData.price}/${planData.period}</li>
        <li><strong>Proefperiode:</strong> 7 dagen</li>
      </ul>
      
      <p>Stel het klantaccount in en stuur inloggegevens.</p>
      
      <p>Virtueel Wandelen Systeem</p>
    </div>
  `,

  // Customer creation/approval templates
  customerApprovalUser: (orgData, passwordLink, isUpdate = false) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">
        ${
          isUpdate
            ? "Virtueel Wandelen - Uw Organisatie Account is Bijgewerkt!"
            : "Welkom bij Virtueel Wandelen - Uw Organisatie Account is Gereed!"
        }
      </h2>
      <p>Beste ${orgData.contactPerson?.fullName || "Team"},</p>
      <p>
        ${
          isUpdate
            ? "Uw organisatie account bij Virtueel Wandelen is succesvol bijgewerkt."
            : "Gefeliciteerd! Uw organisatie account bij Virtueel Wandelen is goedgekeurd en succesvol aangemaakt."
        }
      </p>
      
      <h3 style="color: #5b6502;">Organisatiegegevens:</h3>
      <ul>
        <li><strong>Organisatie:</strong> ${orgData.orgName}</li>
        <li><strong>Contact Email:</strong> ${
          orgData.contactPerson?.email || orgData.email
        }</li>
        <li><strong>Telefoon:</strong> ${orgData.phoneNo}</li>
        <li><strong>Adres:</strong> ${getDisplayValue(
          orgData.address
        )}, ${getDisplayValue(orgData.city)} ${getDisplayValue(
    orgData.postal
  )}</li>
        <li><strong>Klantlimiet:</strong> ${orgData.clientLimit} gebruikers</li>
        <li><strong>Abonnement geldig vanaf:</strong> ${getDisplayValue(
          orgData.planValidFrom,
          "Niet opgegeven"
        )}</li>
        <li><strong>Abonnement geldig tot:</strong> ${getDisplayValue(
          orgData.planValidTo,
          "Niet opgegeven"
        )}</li>
        <li><strong>Bedrag betaald:</strong> ${getDisplayValue(
          orgData.amountPaid,
          "Niet opgegeven"
        )}</li>
      </ul>
      
      ${
        !isUpdate
          ? `
      <h3 style="color: #5b6502;">Volgende stappen:</h3>
      <p>Om uw account setup te voltooien, maak uw wachtwoord aan door op de onderstaande link te klikken:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${passwordLink}" 
           style="background-color: #5b6502; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
          Stel Uw Wachtwoord In
        </a>
      </div>
      
      <p>Eenmaal uw wachtwoord ingesteld, kunt u:</p>
      <ul>
        <li>Inloggen op uw organisatie dashboard</li>
        <li>Cliënten/patiënten toevoegen en beheren</li>
        <li>Toegang krijgen tot Virtueel Wandelen's virtuele wandelplatform</li>
        <li>Gebruik en voortgang monitoren</li>
      </ul>
      `
          : `
      <h3 style="color: #5b6502;">Wat nu?</h3>
      <p>Uw accountgegevens zijn succesvol bijgewerkt. U kunt doorgaan met het gebruik van uw bestaande inloggegevens om toegang te krijgen tot uw organisatie dashboard.</p>
      `
      }
      
      <p>Als u vragen heeft of hulp nodig heeft, ons ondersteuningsteam staat voor u klaar.</p>
      
      <p>Met vriendelijke groet,<br>Virtueel Wandelen Support Team</p>
      
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">Dit is een automatische e-mail. ${
        !isUpdate
          ? "Als u problemen heeft met de wachtwoord setup link, neem dan contact op met ons ondersteuningsteam."
          : ""
      }</p>
    </div>
  `,

  customerApprovalAdmin: (orgData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Organisatie Account ${
        orgData.requestStates === "approved" ? "Bijgewerkt" : "Aangemaakt"
      } Succesvol</h2>
      <p>Een organisatie account is ${
        orgData.requestStates === "approved"
          ? "bijgewerkt"
          : "aangemaakt en goedgekeurd"
      } in het systeem.</p>
      
      <h3 style="color: #5b6502;">Organisatie Informatie:</h3>
      <ul>
        <li><strong>Organisatie Naam:</strong> ${orgData.orgName}</li>
        <li><strong>Contact Email:</strong> ${
          orgData.contactPerson?.email || orgData.email
        }</li>
        <li><strong>Telefoon:</strong> ${orgData.phoneNo}</li>
        <li><strong>Adres:</strong> ${getDisplayValue(orgData.address)}</li>
        <li><strong>Stad:</strong> ${getDisplayValue(orgData.city)}</li>
        <li><strong>Postcode:</strong> ${getDisplayValue(orgData.postal)}</li>
        <li><strong>Website:</strong> ${getDisplayValue(orgData.website)}</li>
      </ul>
      
      <h3 style="color: #5b6502;">Contactpersoon:</h3>
      <ul>
        <li><strong>Naam:</strong> ${getDisplayValue(
          orgData.contactPerson?.fullName
        )}</li>
        <li><strong>Functie:</strong> ${getDisplayValue(
          orgData.contactPerson?.jobTitle
        )}</li>
        <li><strong>Email:</strong> ${getDisplayValue(
          orgData.contactPerson?.email
        )}</li>
        <li><strong>Telefoon:</strong> ${getDisplayValue(
          orgData.contactPerson?.phoneNumber
        )}</li>
      </ul>
      
      <h3 style="color: #5b6502;">Abonnementsgegevens:</h3>
      <ul>
        <li><strong>Bedrag betaald:</strong> ${getDisplayValue(
          orgData.amountPaid,
          "Niet opgegeven"
        )}</li>
        <li><strong>Abonnement geldig vanaf:</strong> ${getDisplayValue(
          orgData.planValidFrom,
          "Niet opgegeven"
        )}</li>
        <li><strong>Abonnement geldig tot:</strong> ${getDisplayValue(
          orgData.planValidTo,
          "Niet opgegeven"
        )}</li>
        <li><strong>Klantlimiet:</strong> ${orgData.clientLimit} gebruikers</li>
        <li><strong>Totaal aantal cliënten:</strong> ${getDisplayValue(
          orgData.totalClients,
          "Niet opgegeven"
        )}</li>
        <li><strong>Aantal locaties:</strong> ${getDisplayValue(
          orgData.numberOfLocations,
          "Niet opgegeven"
        )}</li>
        <li><strong>Type zorgorganisatie:</strong> ${getDisplayValue(
          orgData.soortZorgorganisatie,
          "Niet opgegeven"
        )}</li>
        <li><strong>Geschat aantal gebruikers:</strong> ${getDisplayValue(
          orgData.estimatedUsers,
          "Niet opgegeven"
        )}</li>
        <li><strong>Gewenste startdatum:</strong> ${
          orgData.desiredStartDate
            ? new Date(orgData.desiredStartDate).toLocaleDateString()
            : "Niet opgegeven"
        }</li>
        <li><strong>Integratie ondersteuning nodig:</strong> ${
          orgData.needIntegrationSupport ? "Ja" : "Nee"
        }</li>
        <li><strong>Aanvullende diensten:</strong> ${
          orgData.additionalServices || "Geen"
        }</li>
        <li><strong>Notities:</strong> ${orgData.notes || "Geen"}</li>
      </ul>
      
      <p>De klant heeft een e-mail ontvangen met een wachtwoord setup link om hun account activatie te voltooien.</p>
      
      <p>Actie vereist: Monitor het onboarding proces van de klant en bied ondersteuning indien nodig.</p>
      
      <p>Virtueel Wandelen Admin Systeem</p>
    </div>
  `,

  // Quote request templates for organizations
  quoteRequestUser: (orgData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Offerte Aanvraag Ontvangen - Virtueel Wandelen</h2>
      <p>Beste ${getDisplayValue(
        orgData.contactPerson?.fullName,
        "Gewaardeerde Klant"
      )},</p>
      
      <p>Bedankt voor uw interesse in Virtueel Wandelen! We hebben uw offerte aanvraag ontvangen en ons team zal deze binnenkort bekijken.</p>
      
      <h3 style="color: #5b6502;">Uw Aanvraaggegevens:</h3>
      <ul>
        <li><strong>Organisatie:</strong> ${orgData.orgName}</li>
        <li><strong>Email:</strong> ${
          orgData.contactPerson?.email || orgData.email
        }</li>
        <li><strong>Geschat aantal gebruikers:</strong> ${getDisplayValue(
          orgData.estimatedUsers,
          "Niet opgegeven"
        )}</li>
        <li><strong>Doelgroepen:</strong> ${
          orgData.targetGroup && orgData.targetGroup.length > 0
            ? orgData.targetGroup.join(", ")
            : "Niet opgegeven"
        }</li>
        <li><strong>Gewenste startdatum:</strong> ${
          orgData.desiredStartDate
            ? new Date(orgData.desiredStartDate).toLocaleDateString()
            : "Niet opgegeven"
        }</li>
      </ul>
      
      <h3 style="color: #5b6502;">Wat nu?</h3>
      <p>Ons salesteam zal:</p>
      <ul>
        <li>Uw eisen binnen 24 uur bekijken</li>
        <li>Een aangepaste offerte op basis van uw behoeften opstellen</li>
        <li>Contact met u opnemen om implementatiedetails te bespreken</li>
        <li>Indien gewenst een demo plannen</li>
      </ul>
      
      <p>Intussen kunt u onze website verkennen om meer te leren over Virtueel Wandelen's virtuele wandelplatform en de voordelen voor cognitieve gezondheid en welzijn.</p>
      
      <p>Als u dringende vragen heeft, aarzel dan niet om contact met ons op te nemen.</p>
      
      <p>Met vriendelijke groet,<br>Virtueel Wandelen Sales Team</p>
      
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">Dit is een automatische bevestiging. Ons team zal binnenkort contact met u opnemen.</p>
    </div>
  `,

  quoteRequestAdmin: (orgData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Nieuwe Offerte Aanvraag - Organisatie</h2>
      <p>Een nieuwe organisatie heeft een offerte aanvraag ingediend.</p>
      
      <h3 style="color: #5b6502;">Organisatie Informatie:</h3>
      <ul>
        <li><strong>Organisatie Naam:</strong> ${orgData.orgName}</li>
        <li><strong>Email:</strong> ${
          orgData.contactPerson?.email || orgData.email
        }</li>
        <li><strong>Telefoon:</strong> ${getDisplayValue(orgData.phoneNo)}</li>
        <li><strong>Adres:</strong> ${getDisplayValue(orgData.address)}</li>
        <li><strong>Stad:</strong> ${getDisplayValue(orgData.city)}</li>
        <li><strong>Postcode:</strong> ${getDisplayValue(orgData.postal)}</li>
        <li><strong>Website:</strong> ${getDisplayValue(orgData.website)}</li>
      </ul>
      
      <h3 style="color: #5b6502;">Contactpersoon:</h3>
      <ul>
        <li><strong>Naam:</strong> ${getDisplayValue(
          orgData.contactPerson?.fullName
        )}</li>
        <li><strong>Functie:</strong> ${getDisplayValue(
          orgData.contactPerson?.jobTitle
        )}</li>
        <li><strong>Email:</strong> ${getDisplayValue(
          orgData.contactPerson?.email
        )}</li>
        <li><strong>Telefoon:</strong> ${getDisplayValue(
          orgData.contactPerson?.phoneNumber
        )}</li>
      </ul>
      
      <h3 style="color: #5b6502;">Eisen:</h3>
      <ul>
        <li><strong>Totaal aantal cliënten:</strong> ${getDisplayValue(
          orgData.totalClients
        )}</li>
        <li><strong>Aantal locaties:</strong> ${getDisplayValue(
          orgData.numberOfLocations
        )}</li>
        <li><strong>Doelgroepen:</strong> ${
          orgData.targetGroup && orgData.targetGroup.length > 0
            ? orgData.targetGroup.join(", ")
            : "Niet opgegeven"
        }</li>
        <li><strong>Geschat aantal gebruikers:</strong> ${getDisplayValue(
          orgData.estimatedUsers
        )}</li>
        <li><strong>Gewenste startdatum:</strong> ${
          orgData.desiredStartDate
            ? new Date(orgData.desiredStartDate).toLocaleDateString()
            : "Niet opgegeven"
        }</li>
        <li><strong>Integratie ondersteuning nodig:</strong> ${
          orgData.needIntegrationSupport ? "Ja" : "Nee"
        }</li>
        <li><strong>Aanvullende diensten:</strong> ${
          orgData.additionalServices || "Geen"
        }</li>
        <li><strong>Notities:</strong> ${orgData.notes || "Geen"}</li>
      </ul>
      
      <p><strong>Actie vereist:</strong> Bekijk de aanvraag en neem binnen 24 uur contact op met de organisatie.</p>
      
      <p>Virtueel Wandelen Admin Systeem</p>
    </div>
  `,

  // Individual subscription templates
  individualSubscriptionUser: (clientData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Abonnement ontvangen - Virtueel Wandelen</h2>
      <p>Beste ${getDisplayValue(clientData.firstName)} ${getDisplayValue(
    clientData.lastName
  )},</p>
      
      <p>Bedankt voor jouw aanmelding bij Virtueel Wandelen! We hebben jouw aanmelding in goede orde ontvangen.</p>
      
      <h3 style="color: #5b6502;">Jouw abonnementsgegevens:</h3>
      <ul>
        <li><strong>Naam:</strong> ${getDisplayValue(
          clientData.firstName
        )} ${getDisplayValue(clientData.lastName)}</li>
        <li><strong>Email:</strong> ${clientData.email}</li>
        <li><strong>Telefoon:</strong> ${getDisplayValue(
          clientData.phoneNo
        )}</li>
        <li><strong>Abonnement:</strong> ${getDisplayValue(
          clientData.plan
        )}</li>
        <li><strong>Abonnementtype:</strong> Individueel</li>
        <li><strong>Startdatum:</strong> ${
          clientData.startDate
            ? new Date(clientData.startDate).toLocaleDateString()
            : "Vandaag"
        }</li>
        <li><strong>Einddatum:</strong> ${
          clientData.endDate
            ? new Date(clientData.endDate).toLocaleDateString()
            : "Niet opgegeven"
        }</li>
      </ul>
      
      <h3 style="color: #5b6502;">Wat nu?</h3>
      <p>Je ontvangt van ons:</p>
      <ul>
        <li>Verander je wachtwoord in jouw profiel. </li>
        <li>Directe toegang tot àlle wandelvideo’s van Virtueel Wandelen</li>
        <li>3 mails de komende week over het gebruik en ervaren van het platform. </li>
      </ul>
      
      <p>Heeft u vragen? Neem dan gerust contact op met ons supportteam via de chat.</p>
      
      <p>Met vriendelijke groet,<br>Virtueel Wandelen Supportteam</p>
      
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">Dit is een automatische bevestiging. U ontvangt zo direct een mail met uw accountgegevens.</p>
    </div>
  `,

  individualSubscriptionAdmin: (clientData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Nieuw Individueel Abonnement</h2>
      <p>Een nieuwe persoon heeft zich geabonneerd op Virtueel Wandelen.</p>
      
      <h3 style="color: #5b6502;">Abonnee Informatie:</h3>
      <ul>
        <li><strong>Naam:</strong> ${getDisplayValue(
          clientData.firstName
        )} ${getDisplayValue(clientData.lastName)}</li>
        <li><strong>Email:</strong> ${clientData.email}</li>
        <li><strong>Telefoon:</strong> ${getDisplayValue(
          clientData.phoneNo
        )}</li>
        <li><strong>Bedrijf:</strong> ${getDisplayValue(
          clientData.company
        )}</li>
        <li><strong>Functie:</strong> ${getDisplayValue(
          clientData.function
        )}</li>
        <li><strong>Land:</strong> ${getDisplayValue(clientData.country)}</li>
        <li><strong>Adres:</strong> ${getDisplayValue(clientData.address)}</li>
        <li><strong>Stad:</strong> ${getDisplayValue(clientData.city)}</li>
        <li><strong>Postcode:</strong> ${getDisplayValue(
          clientData.postal
        )}</li>
      </ul>
      
      <h3 style="color: #5b6502;">Abonnementsgegevens:</h3>
      <ul>
        <li><strong>Abonnement:</strong> ${getDisplayValue(
          clientData.plan
        )}</li>
        <li><strong>Abonnementstype:</strong> ${getDisplayValue(
          clientData.subscriptionType,
          "Individueel"
        )}</li>
        <li><strong>Startdatum:</strong> ${
          clientData.startDate
            ? new Date(clientData.startDate).toLocaleDateString()
            : "Vandaag"
        }</li>
        <li><strong>Einddatum:</strong> ${
          clientData.endDate
            ? new Date(clientData.endDate).toLocaleDateString()
            : "Niet opgegeven"
        }</li>
      </ul>
      
      <p><strong>Actie vereist:</strong> Bekijk het abonnement en keur het goed, stuur dan inloggegevens naar de abonnee.</p>
      
      <p>Virtueel Wandelen Admin Systeem</p>
    </div>
  `,

  // OTP email template
  otpEmail: (otp) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Uw eenmalig wachtwoord voor Virtueel Wandelen</h2>
      <p>Beste gebruiker,</p>
      <p>Je hebt een verzoek ingediend om in te loggen op jouw Virtueel Wandelen account. Gebruik het volgende eenmalige wachtwoord (verificatiecode) om jouw login te voltooien:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <div style="display: inline-block; padding: 15px 30px; background-color: #5b6502; color: white; font-size: 24px; font-weight: bold; border-radius: 8px; letter-spacing: 2px;">
          ${otp}
        </div>
      </div>
      
      <p><strong>Belangrijk:</strong>Deze code is slechts 5 minuten geldig. Deel deze code met niemand.</p>
      <p>Als je deze login niet hebt aangevraagd, dan kan je deze e-mail negeren.</p>
      
      <p>Met vriendelijke groet,<br>Virtueel Wandelen Support Team</p>
      
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">Dit is een automatisch gegenereerde e-mail. Beantwoord deze e-mail niet.</p>
    </div>
  `,

  // Forgot password OTP email template
  forgotPasswordOtpEmail: (otp) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Wachtwoord Reset OTP - Virtueel Wandelen</h2>
      <p>Beste gebruiker,</p>
      <p>U heeft verzocht om uw wachtwoord te resetten voor uw Virtueel Wandelen account. Gebruik de volgende Eenmalige Wachtwoord (OTP) om de wachtwoord reset te voltooien:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <div style="display: inline-block; padding: 15px 30px; background-color: #5b6502; color: white; font-size: 24px; font-weight: bold; border-radius: 8px; letter-spacing: 2px;">
          ${otp}
        </div>
      </div>
      
      <p><strong>Belangrijk:</strong> Deze OTP is slechts 5 minuten geldig. Deel deze code met niemand.</p>
      <p>Als u deze wachtwoord reset niet heeft aangevraagd, negeer dan deze e-mail.</p>
      
      <p>Met vriendelijke groet,<br>Virtueel Wandelen Support Team</p>
      
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">Dit is een automatische e-mail. Beantwoord deze e-mail niet.</p>
    </div>
  `,

  // Subscription renewal template
  subscriptionRenewed: (firstName, newEndDate) => ({
    subject: "Uw Abonnement is Vernieuwd",
    html: `
      <h2>Hoi ${firstName},</h2>
      <p>Uw abonnement is automatisch vernieuwd!</p>
      <p><strong>Nieuwe vervaldatum:</strong> ${newEndDate.toLocaleDateString()}</p>
      <p>U kunt blijven genieten van alle premium functies.</p>
    `,
  }),
};

module.exports = {
  sendEmail,
  emailTemplates,
};
