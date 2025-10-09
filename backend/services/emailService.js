const { Resend } = require("resend");

const resend = new Resend("re_Fe4pwmbH_E1KvQv2MGo1QZj9fZvfYAH6V");

// Helper function to handle empty strings, null, and undefined values
const getDisplayValue = (value, defaultText = "Not provided") => {
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
          userData.phoneNumber || "Not provided"
        }</li>
        <li><strong>Adres:</strong> ${userData.address || "Not provided"}</li>
      </ul>
      
      <p>Ons team zal je aanmelding bekijken en binnen 2-3 werkdagen contact met je opnemen.</p>
      
      <p>Met vriendelijke groet,<br>Tina van Virtueel Wandelen</p>
      
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">This is an automated email. Please do not reply to this email.</p>
    </div>
  `,

  volunteerSignupAdmin: (userData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">New Volunteer Registration</h2>
      <p>A new volunteer has registered on Virtueel Wandelen.</p>
      
      <h3 style="color: #5b6502;">Volunteer Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${userData.firstName} ${
    userData.lastName
  }</li>
        <li><strong>Email:</strong> ${userData.email}</li>
        <li><strong>Phone:</strong> ${
          userData.phoneNumber || "Not provided"
        }</li>
        <li><strong>Address:</strong> ${userData.address || "Not provided"}</li>
        <li><strong>Postal Code:</strong> ${
          userData.postal || "Not provided"
        }</li>
        <li><strong>First Time Volunteer:</strong> ${
          userData.isFirstTime ? "Yes" : "No"
        }</li>
        <li><strong>Updating Info:</strong> ${
          userData.isUpdate ? "Yes" : "No"
        }</li>
        <li><strong>Notes:</strong> ${userData.notes || "None"}</li>
      </ul>
      
      <p>Please review and contact the volunteer if needed.</p>
      
      <p>Virtueel Wandelen System</p>
    </div>
  `,

  // Quote request templates
  quoteRequestUser: (formData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Quote Request Received</h2>
      <p>Dear ${formData.fullName},</p>
      <p>Thank you for requesting a quote from Virtueel Wandelen. We have received your request and our support team will get back to you soon with a detailed proposal.</p>
      
      <h3 style="color: #5b6502;">Your Organization Details:</h3>
      <ul>
        <li><strong>Organization:</strong> ${formData.organizationName}</li>
        <li><strong>Contact Email:</strong> ${formData.contactEmail}</li>
        <li><strong>Phone:</strong> ${formData.phone}</li>
        <li><strong>Total Clients:</strong> ${formData.totalClients}</li>
        <li><strong>Estimated Users:</strong> ${formData.estimatedClients}</li>
        <li><strong>Start Date:</strong> ${formData.startDate}</li>
      </ul>
      
      <p>Our team will review your requirements and send you a customized quote within 1-2 business days.</p>
      
      <p>Best regards,<br>Virtueel Wandelen Sales Team</p>
      
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">This is an automated email. Please do not reply to this email.</p>
    </div>
  `,

  quoteRequestAdmin: (formData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">New Quote Request</h2>
      <p>A new quote request has been submitted.</p>
      
      <h3 style="color: #5b6502;">Organization Information:</h3>
      <ul>
        <li><strong>Organization Name:</strong> ${
          formData.organizationName
        }</li>
        <li><strong>Contact Email:</strong> ${formData.contactEmail}</li>
        <li><strong>Phone:</strong> ${formData.phone}</li>
        <li><strong>Address:</strong> ${formData.address}</li>
        <li><strong>Website:</strong> ${formData.website || "Not provided"}</li>
      </ul>
      
      <h3 style="color: #5b6502;">Contact Person:</h3>
      <ul>
        <li><strong>Name:</strong> ${formData.fullName}</li>
        <li><strong>Job Title:</strong> ${formData.jobTitle}</li>
        <li><strong>Email:</strong> ${formData.emailAddress}</li>
        <li><strong>Phone:</strong> ${formData.phoneContact}</li>
      </ul>
      
      <h3 style="color: #5b6502;">Requirements:</h3>
      <ul>
        <li><strong>Total Clients:</strong> ${formData.totalClients}</li>
        <li><strong>Number of Locations:</strong> ${
          formData.numberLocations
        }</li>
        <li><strong>Target Groups:</strong> ${
          formData.soortZorgorganisatie
        }</li>
        <li><strong>Estimated Users:</strong> ${formData.estimatedClients}</li>
        <li><strong>Desired Start Date:</strong> ${formData.startDate}</li>
        <li><strong>Onboarding Support:</strong> ${
          formData.onboardingSupport
        }</li>
        <li><strong>Additional Services:</strong> ${
          formData.additionalServices || "None"
        }</li>
        <li><strong>Notes:</strong> ${formData.notes || "None"}</li>
      </ul>
      
      <p>Please follow up with the client within 24 hours.</p>
      
      <p>Virtueel Wandelen System</p>
    </div>
  `,

  // Individual payment templates
  paymentUser: (userData, planData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Welcome to Virtueel Wandelen!</h2>
      <p>Dear ${userData.firstName} ${userData.lastName},</p>
      <p>Thank you for subscribing to Virtueel Wandelen. Your account has been created and your 7-day free trial has started.</p>
      
      <h3 style="color: #5b6502;">Subscription Details:</h3>
      <ul>
        <li><strong>Plan:</strong> ${planData.title}</li>
        <li><strong>Price:</strong> €${planData.price}/${planData.period}</li>
        <li><strong>Company:</strong> ${userData.companyName}</li>
        <li><strong>Email:</strong> ${userData.email}</li>
      </ul>
      
      <p>Your free trial will end in 7 days. You can cancel anytime before the trial ends to avoid charges.</p>
      
      <p>Our support team will get back to you soon with login credentials and setup instructions.</p>
      
      <p>Best regards,<br>Virtueel Wandelen Support Team</p>
      
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">This is an automated email. Please do not reply to this email.</p>
    </div>
  `,

  paymentAdmin: (userData, planData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">New Individual Subscription</h2>
      <p>A new individual subscription has been created.</p>
      
      <h3 style="color: #5b6502;">Customer Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${userData.firstName} ${userData.lastName}</li>
        <li><strong>Email:</strong> ${userData.email}</li>
        <li><strong>Company:</strong> ${userData.companyName}</li>
        <li><strong>Function:</strong> ${userData.function}</li>
        <li><strong>Phone:</strong> ${userData.telephone}</li>
        <li><strong>Country:</strong> ${userData.country}</li>
        <li><strong>Address:</strong> ${userData.address}, ${userData.city}, ${userData.postalCode}</li>
      </ul>
      
      <h3 style="color: #5b6502;">Subscription Details:</h3>
      <ul>
        <li><strong>Plan:</strong> ${planData.title}</li>
        <li><strong>Price:</strong> €${planData.price}/${planData.period}</li>
        <li><strong>Trial Period:</strong> 7 days</li>
      </ul>
      
      <p>Please set up the customer account and send login credentials.</p>
      
      <p>Virtueel Wandelen System</p>
    </div>
  `,

  // Customer creation/approval templates
  customerApprovalUser: (orgData, passwordLink, isUpdate = false) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">
        ${
          isUpdate
            ? "Virtueel Wandelen - Your Organization Account has been Updated!"
            : "Welcome to Virtueel Wandelen - Your Organization Account is Ready!"
        }
      </h2>
      <p>Dear ${orgData.contactPerson?.fullName || "Team"},</p>
      <p>
        ${
          isUpdate
            ? "Your organization account with Virtueel Wandelen has been successfully updated."
            : "Congratulations! Your organization account with Virtueel Wandelen has been approved and created successfully."
        }
      </p>
      
      <h3 style="color: #5b6502;">Organization Details:</h3>
      <ul>
        <li><strong>Organization:</strong> ${orgData.orgName}</li>
        <li><strong>Contact Email:</strong> ${
          orgData.contactPerson?.email || orgData.email
        }</li>
        <li><strong>Phone:</strong> ${orgData.phoneNo}</li>
        <li><strong>Address:</strong> ${getDisplayValue(
          orgData.address
        )}, ${getDisplayValue(orgData.city)} ${getDisplayValue(
    orgData.postal
  )}</li>
        <li><strong>Client Limit:</strong> ${orgData.clientLimit} users</li>
        <li><strong>Plan Valid From:</strong> ${getDisplayValue(
          orgData.planValidFrom,
          "Not specified"
        )}</li>
        <li><strong>Plan Valid To:</strong> ${getDisplayValue(
          orgData.planValidTo,
          "Not specified"
        )}</li>
        <li><strong>Amount Paid:</strong> ${getDisplayValue(
          orgData.amountPaid,
          "Not specified"
        )}</li>
      </ul>
      
      ${
        !isUpdate
          ? `
      <h3 style="color: #5b6502;">Next Steps:</h3>
      <p>To complete your account setup, please create your password by clicking the link below:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${passwordLink}" 
           style="background-color: #5b6502; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
          Set Your Password
        </a>
      </div>
      
      <p>Once you've set your password, you can:</p>
      <ul>
        <li>Log in to your organization dashboard</li>
        <li>Add and manage your clients/patients</li>
        <li>Access Virtueel Wandelen's virtual walking platform</li>
        <li>Monitor usage and progress</li>
      </ul>
      `
          : `
      <h3 style="color: #5b6502;">What's Next:</h3>
      <p>Your account details have been updated successfully. You can continue using your existing login credentials to access your organization dashboard.</p>
      `
      }
      
      <p>If you have any questions or need assistance, our support team is here to help.</p>
      
      <p>Best regards,<br>Virtueel Wandelen Support Team</p>
      
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">This is an automated email. ${
        !isUpdate
          ? "If you have any issues with the password setup link, please contact our support team."
          : ""
      }</p>
    </div>
  `,

  customerApprovalAdmin: (orgData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Organization Account ${
        orgData.requestStates === "approved" ? "Updated" : "Created"
      } Successfully</h2>
      <p>An organization account has been ${
        orgData.requestStates === "approved"
          ? "updated"
          : "created and approved"
      } in the system.</p>
      
      <h3 style="color: #5b6502;">Organization Information:</h3>
      <ul>
        <li><strong>Organization Name:</strong> ${orgData.orgName}</li>
        <li><strong>Contact Email:</strong> ${
          orgData.contactPerson?.email || orgData.email
        }</li>
        <li><strong>Phone:</strong> ${orgData.phoneNo}</li>
        <li><strong>Address:</strong> ${getDisplayValue(orgData.address)}</li>
        <li><strong>City:</strong> ${getDisplayValue(orgData.city)}</li>
        <li><strong>Postal Code:</strong> ${getDisplayValue(
          orgData.postal
        )}</li>
        <li><strong>Website:</strong> ${getDisplayValue(orgData.website)}</li>
      </ul>
      
      <h3 style="color: #5b6502;">Contact Person:</h3>
      <ul>
        <li><strong>Name:</strong> ${getDisplayValue(
          orgData.contactPerson?.fullName
        )}</li>
        <li><strong>Job Title:</strong> ${getDisplayValue(
          orgData.contactPerson?.jobTitle
        )}</li>
        <li><strong>Email:</strong> ${getDisplayValue(
          orgData.contactPerson?.email
        )}</li>
        <li><strong>Phone:</strong> ${getDisplayValue(
          orgData.contactPerson?.phoneNumber
        )}</li>
      </ul>
      
      <h3 style="color: #5b6502;">Plan Details:</h3>
      <ul>
        <li><strong>Amount Paid:</strong> ${getDisplayValue(
          orgData.amountPaid,
          "Not specified"
        )}</li>
        <li><strong>Plan Valid From:</strong> ${getDisplayValue(
          orgData.planValidFrom,
          "Not specified"
        )}</li>
        <li><strong>Plan Valid To:</strong> ${getDisplayValue(
          orgData.planValidTo,
          "Not specified"
        )}</li>
        <li><strong>Client Limit:</strong> ${orgData.clientLimit} users</li>
        <li><strong>Total Clients:</strong> ${getDisplayValue(
          orgData.totalClients,
          "Not specified"
        )}</li>
        <li><strong>Number of Locations:</strong> ${getDisplayValue(
          orgData.numberOfLocations,
          "Not specified"
        )}</li>
        <li><strong>Type of Care Organization:</strong> ${getDisplayValue(
          orgData.soortZorgorganisatie,
          "Not specified"
        )}</li>
        <li><strong>Estimated Users:</strong> ${getDisplayValue(
          orgData.estimatedUsers,
          "Not specified"
        )}</li>
        <li><strong>Desired Start Date:</strong> ${
          orgData.desiredStartDate
            ? new Date(orgData.desiredStartDate).toLocaleDateString()
            : "Not specified"
        }</li>
        <li><strong>Need Integration Support:</strong> ${
          orgData.needIntegrationSupport ? "Yes" : "No"
        }</li>
        <li><strong>Additional Services:</strong> ${
          orgData.additionalServices || "None"
        }</li>
        <li><strong>Notes:</strong> ${orgData.notes || "None"}</li>
      </ul>
      
      <p>The customer has been sent an email with a password setup link to complete their account activation.</p>
      
      <p>Action Required: Monitor the customer's onboarding process and provide support as needed.</p>
      
      <p>Virtueel Wandelen Admin System</p>
    </div>
  `,

  // Quote request templates for organizations
  quoteRequestUser: (orgData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">Quote Request Received - Virtueel Wandelen</h2>
      <p>Dear ${getDisplayValue(
        orgData.contactPerson?.fullName,
        "Valued Customer"
      )},</p>
      
      <p>Thank you for your interest in Virtueel Wandelen! We've received your quote request and our team will review it shortly.</p>
      
      <h3 style="color: #5b6502;">Your Request Details:</h3>
      <ul>
        <li><strong>Organization:</strong> ${orgData.orgName}</li>
        <li><strong>Email:</strong> ${
          orgData.contactPerson?.email || orgData.email
        }</li>
        <li><strong>Estimated Users:</strong> ${getDisplayValue(
          orgData.estimatedUsers,
          "Not specified"
        )}</li>
        <li><strong>Target Groups:</strong> ${
          orgData.targetGroup && orgData.targetGroup.length > 0
            ? orgData.targetGroup.join(", ")
            : "Not specified"
        }</li>
        <li><strong>Desired Start Date:</strong> ${
          orgData.desiredStartDate
            ? new Date(orgData.desiredStartDate).toLocaleDateString()
            : "Not specified"
        }</li>
      </ul>
      
      <h3 style="color: #5b6502;">What's Next?</h3>
      <p>Our sales team will:</p>
      <ul>
        <li>Review your requirements within 24 hours</li>
        <li>Prepare a customized quote based on your needs</li>
        <li>Contact you to discuss implementation details</li>
        <li>Schedule a demo if requested</li>
      </ul>
      
      <p>In the meantime, feel free to explore our website to learn more about Virtueel Wandelen's virtual walking platform and its benefits for cognitive health and wellness.</p>
      
      <p>If you have any urgent questions, please don't hesitate to contact us.</p>
      
      <p>Best regards,<br>Virtueel Wandelen Sales Team</p>
      
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">This is an automated confirmation. Our team will be in touch with you soon.</p>
    </div>
  `,

  quoteRequestAdmin: (orgData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">New Quote Request - Organization</h2>
      <p>A new organization has submitted a quote request.</p>
      
      <h3 style="color: #5b6502;">Organization Information:</h3>
      <ul>
        <li><strong>Organization Name:</strong> ${orgData.orgName}</li>
        <li><strong>Email:</strong> ${
          orgData.contactPerson?.email || orgData.email
        }</li>
        <li><strong>Phone:</strong> ${getDisplayValue(orgData.phoneNo)}</li>
        <li><strong>Address:</strong> ${getDisplayValue(orgData.address)}</li>
        <li><strong>City:</strong> ${getDisplayValue(orgData.city)}</li>
        <li><strong>Postal Code:</strong> ${getDisplayValue(
          orgData.postal
        )}</li>
        <li><strong>Website:</strong> ${getDisplayValue(orgData.website)}</li>
      </ul>
      
      <h3 style="color: #5b6502;">Contact Person:</h3>
      <ul>
        <li><strong>Name:</strong> ${getDisplayValue(
          orgData.contactPerson?.fullName
        )}</li>
        <li><strong>Job Title:</strong> ${getDisplayValue(
          orgData.contactPerson?.jobTitle
        )}</li>
        <li><strong>Email:</strong> ${getDisplayValue(
          orgData.contactPerson?.email
        )}</li>
        <li><strong>Phone:</strong> ${getDisplayValue(
          orgData.contactPerson?.phoneNumber
        )}</li>
      </ul>
      
      <h3 style="color: #5b6502;">Requirements:</h3>
      <ul>
        <li><strong>Total Clients:</strong> ${getDisplayValue(
          orgData.totalClients
        )}</li>
        <li><strong>Number of Locations:</strong> ${getDisplayValue(
          orgData.numberOfLocations
        )}</li>
        <li><strong>Target Groups:</strong> ${
          orgData.targetGroup && orgData.targetGroup.length > 0
            ? orgData.targetGroup.join(", ")
            : "Not specified"
        }</li>
        <li><strong>Estimated Users:</strong> ${getDisplayValue(
          orgData.estimatedUsers
        )}</li>
        <li><strong>Desired Start Date:</strong> ${
          orgData.desiredStartDate
            ? new Date(orgData.desiredStartDate).toLocaleDateString()
            : "Not specified"
        }</li>
        <li><strong>Need Integration Support:</strong> ${
          orgData.needIntegrationSupport ? "Yes" : "No"
        }</li>
        <li><strong>Additional Services:</strong> ${
          orgData.additionalServices || "None"
        }</li>
        <li><strong>Notes:</strong> ${orgData.notes || "None"}</li>
      </ul>
      
      <p><strong>Action Required:</strong> Please review the request and follow up with the organization within 24 hours.</p>
      
      <p>Virtueel Wandelen Admin System</p>
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
        <li><strong>Abonnementtype:</strong> Individual</li>
        <li><strong>Startdatum:</strong> ${
          clientData.startDate
            ? new Date(clientData.startDate).toLocaleDateString()
            : "Today"
        }</li>
        <li><strong>Einddatum:</strong> ${
          clientData.endDate
            ? new Date(clientData.endDate).toLocaleDateString()
            : "Not specified"
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
      <p style="font-size: 12px; color: #666;">Dit is een automatische bevestiging. Je ontvangt zo direct een mail met jouw  accountgegevens.</p>
    </div>
  `,

  individualSubscriptionAdmin: (clientData) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #381207;">New Individual Subscription</h2>
      <p>A new individual has subscribed to Virtueel Wandelen.</p>
      
      <h3 style="color: #5b6502;">Subscriber Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${getDisplayValue(
          clientData.firstName
        )} ${getDisplayValue(clientData.lastName)}</li>
        <li><strong>Email:</strong> ${clientData.email}</li>
        <li><strong>Phone:</strong> ${getDisplayValue(clientData.phoneNo)}</li>
        <li><strong>Company:</strong> ${getDisplayValue(
          clientData.company
        )}</li>
        <li><strong>Function:</strong> ${getDisplayValue(
          clientData.function
        )}</li>
        <li><strong>Country:</strong> ${getDisplayValue(
          clientData.country
        )}</li>
        <li><strong>Address:</strong> ${getDisplayValue(
          clientData.address
        )}</li>
        <li><strong>City:</strong> ${getDisplayValue(clientData.city)}</li>
        <li><strong>Postal Code:</strong> ${getDisplayValue(
          clientData.postal
        )}</li>
      </ul>
      
      <h3 style="color: #5b6502;">Subscription Details:</h3>
      <ul>
        <li><strong>Plan:</strong> ${getDisplayValue(clientData.plan)}</li>
        <li><strong>Subscription Type:</strong> ${getDisplayValue(
          clientData.subscriptionType,
          "Individual"
        )}</li>
        <li><strong>Start Date:</strong> ${
          clientData.startDate
            ? new Date(clientData.startDate).toLocaleDateString()
            : "Today"
        }</li>
        <li><strong>End Date:</strong> ${
          clientData.endDate
            ? new Date(clientData.endDate).toLocaleDateString()
            : "Not specified"
        }</li>
      </ul>
      
      <p><strong>Action Required:</strong> Please review and approve the subscription, then send login credentials to the subscriber.</p>
      
      <p>Virtueel Wandelen Admin System</p>
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
      <h2 style="color: #381207;">Password Reset OTP - Virtual Wandlen</h2>
      <p>Dear User,</p>
      <p>You have requested to reset your password for your Virtual Wandlen account. Please use the following One-Time Password (OTP) to complete the password reset:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <div style="display: inline-block; padding: 15px 30px; background-color: #5b6502; color: white; font-size: 24px; font-weight: bold; border-radius: 8px; letter-spacing: 2px;">
          ${otp}
        </div>
      </div>
      
      <p><strong>Important:</strong> This OTP is valid for 5 minutes only. Please do not share this code with anyone.</p>
      <p>If you did not request this password reset, please ignore this email.</p>
      
      <p>Best regards,<br>Virtual Wandlen Support Team</p>
      
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">This is an automated email. Please do not reply to this email.</p>
    </div>
  `,

  // Subscription renewal template
  subscriptionRenewed: (firstName, newEndDate) => ({
    subject: "Your Subscription Has Been Renewed",
    html: `
      <h2>Hi ${firstName},</h2>
      <p>Your subscription has been automatically renewed!</p>
      <p><strong>New expiration date:</strong> ${newEndDate.toLocaleDateString()}</p>
      <p>You can continue enjoying all premium features.</p>
    `,
  }),
};

module.exports = {
  sendEmail,
  emailTemplates,
};
