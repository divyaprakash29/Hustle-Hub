import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      welcome: "HustleHub",
      login: "Login",
      register: "Register",
      home: "Home",
      logout: "Logout",
      landingPage: {
        heroTitle: "Welcome to HustleHub",
        heroSubtitle: "Where clients and freelancers collaborate seamlessly.",
        whyChoose: "Why Choose HustleHub?",
        features: {
          postProjects: {
            title: "Post Projects Easily",
            description:
              "Clients can list their projects with required skills, timelines, and budgets in minutes.",
          },
          findFreelancers: {
            title: "Find Qualified Freelancers",
            description:
              "Freelancers can showcase their expertise and connect with the right projects.",
          },
          securePayments: {
            title: "Secure Payments",
            description:
              "Manage contracts and payments efficiently through our secure platform.",
          },
          reviewsFeedback: {
            title: "Reviews and Feedback",
            description:
              "Clients can provide feedback to help freelancers grow and ensure project satisfaction.",
          },
        },
        testimonialsTitle: "What Our Users Say",
        testimonials: [
          {
            quote:
              "HustleHub helped me find the perfect freelancer for my project. The process was seamless, and the results were exceptional!",
            author: "- John Doe, Client",
          },
          {
            quote:
              "I’ve worked on multiple projects through HustleHub. The platform makes collaboration easy and stress-free.",
            author: "- Jane Smith, Freelancer",
          },
        ],
        authorsTitle: "Meet the Authors",
        authors: {
          divya: {
            name: "Divya Prakash",
            specialization: "Specializing in React-Redux",
          },
          priyanka: {
            name: "Priyanka Basavaraj Bhadrappanavar",
            specialization: "Specializing in React-Redux",
          },
          shivani: {
            name: "Shivani Sugurushetty",
            specialization: "Specializing in React-Redux",
          },
          shriya: {
            name: "Shriya Pratapwar",
            specialization: "Specializing in React-Redux",
          },
        },
      },
      footer: {
        copyright: "© {{year}} HustleHub. All Rights Reserved.",
        links: {
          about: "About",
          privacy: "Privacy Policy",
          contact: "Contact",
        },
      },
      about_us_title: "About HustleHub",
      about_us_description:
        "HustleHub is a digital platform that connects clients and freelancers to work on projects seamlessly. Clients can post their project requirements, timelines, and budgets, while freelancers can browse listings, showcase their skills, and get selected for their desired projects.",
      about_us_goal:
        "Our goal is to create a hassle-free experience for both clients and freelancers, offering tools for contract management, secure payments, and timely reviews.",
      mission_title: "Our Mission",
      mission_description:
        "At HustleHub, we aim to revolutionize the way businesses and freelancers collaborate. By offering a transparent, reliable, and efficient platform, we empower clients to find the best talent for their projects, while helping freelancers to grow and succeed in their careers.",
      values_title: "Our Values",
      values_description:
        "At HustleHub, we are driven by core values that guide our approach to business and the freelancer-client experience:",
      integrity:
        "Integrity: We believe in honesty and transparency at every step of the process.",
      collaboration:
        "Collaboration: We foster an environment where clients and freelancers work together toward common goals.",
      innovation:
        "Innovation: We continually improve our platform to provide better tools and experiences for our users.",
      respect:
        "Respect: We value the contributions of both clients and freelancers, promoting a culture of mutual respect.",
      how_it_works_title: "How It Works",
      how_it_works_description:
        "HustleHub is designed to make the entire project workflow smooth and efficient for both clients and freelancers:",
      step_1_title: "Step 1: Client Posts a Project",
      step_1_description:
        "Clients can easily post their project with details like required skills, budget, and timeline.",
      step_2_title: "Step 2: Freelancer Browses and Bids",
      step_2_description:
        "Freelancers browse the project listings, review the requirements, and submit their bids with a proposal.",
      step_3_title: "Step 3: Client Reviews Bids",
      step_3_description:
        "Clients review the submitted bids, evaluate the freelancers based on their expertise, and select the best match for the project.",
      step_4_title: "Step 4: Contract Agreement",
      step_4_description:
        "Once a freelancer is selected, a contract is created to outline the terms and expectations for both parties.",
      step_5_title: "Step 5: Payment and Review",
      step_5_description:
        "After the project is completed, payment is processed securely, and both the client and freelancer provide feedback on their experience.",
      privacy_policy_title: "Privacy Policy",
      privacy_policy_intro:
        "At HustleHub, your privacy is our priority. This Privacy Policy outlines the types of personal information we collect, how we use it, and the steps we take to protect your data. By using our platform, you consent to the collection and use of your information as described in this policy.",

      section_1_title: "1. Information We Collect",
      section_1_description:
        "We collect various types of personal information to provide and improve our services. This information may include:",
      personal_information_title: "Personal Information",
      personal_information_description:
        "Name, email address, phone number, and other details that you provide when registering or using our services.",
      usage_information_title: "Usage Information",
      usage_information_description:
        "Information about how you interact with our platform, including IP addresses, browser type, operating system, and pages you visit.",
      transaction_information_title: "Transaction Information",
      transaction_information_description:
        "Payment details, billing addresses, and other transaction-related information when making or receiving payments on the platform.",

      section_2_title: "2. How We Use Your Information",
      section_2_description:
        "We use the information we collect in the following ways:",
      use_1:
        "To provide and maintain our services, including enabling clients to post projects and freelancers to bid on them.",
      use_2: "To improve and personalize the user experience on the platform.",
      use_3:
        "To process payments and manage contracts between clients and freelancers.",
      use_4:
        "To communicate with users about updates, promotions, and customer support inquiries.",
      use_5:
        "To monitor and analyze platform usage for performance and security purposes.",

      section_3_title: "3. Data Sharing and Disclosure",
      section_3_description:
        "We do not sell, rent, or share your personal data with third parties without your consent, except in the following cases:",
      service_providers_title: "Service Providers",
      service_providers_description:
        "We may share your data with trusted third-party service providers who help us deliver our services, such as payment processors or email marketing platforms.",
      legal_requirements_title: "Legal Requirements",
      legal_requirements_description:
        "We may disclose your information if required to do so by law or in response to valid requests by public authorities.",
      business_transfers_title: "Business Transfers",
      business_transfers_description:
        "In the event of a merger, acquisition, or sale of all or part of our assets, your information may be transferred as part of the transaction.",

      section_4_title: "4. Data Security",
      section_4_description:
        "We take the security of your personal information seriously and employ industry-standard security measures to protect it.",

      section_5_title: "5. Your Rights",
      section_5_description:
        "You have the following rights regarding your personal data:",
      access_right: "Access",
      access_right_description:
        "You can request access to the personal information we hold about you.",
      correction_right: "Correction",
      correction_right_description:
        "You can request that we correct any inaccuracies in your personal information.",
      deletion_right: "Deletion",
      deletion_right_description:
        "You can request that we delete your personal information.",
      opt_out_right: "Opt-Out",
      opt_out_right_description:
        "You can opt-out of receiving marketing communications from us at any time.",

      section_6_title: "6. Cookies",
      section_6_description:
        "We use cookies and similar technologies to enhance your experience on our platform.",

      section_7_title: "7. Third-Party Links",
      section_7_description:
        "Our platform may contain links to third-party websites or services that are not operated by us.",

      section_8_title: "8. Changes to This Privacy Policy",
      section_8_description:
        "We may update this Privacy Policy from time to time. Any changes will be posted on this page.",
      contact: {
        title: "Get in touch",
        subTitle: "with us!!",
        name: "Name",
        email: "Email",
        message: "Message",
        "welcomeMessage": "We’re thrilled to connect with you!",
        "detailsMessage": "Our website is dedicated to bridging the gap between talent and opportunity, providing a platform where skilled professionals and businesses can collaborate to achieve amazing results. Whether you’re looking to hire the perfect freelancer or showcase your expertise to a global audience, we’re here to make the process seamless, secure, and successful. If you have any questions, suggestions, or just want to say hello, feel free to reach out—we’d love to hear from you.",
        send: "Send",
        validation: {
          name: "Name must be at least 5 characters long",
          email: "Please enter a valid email address",
          message: "Message must be at least 20 characters long",
        },
        successMessage: "Message sent successfully!",
        errorMessage: "Failed to send message. Please try again.",
      },
      logins: "Login",
      email: "Email",
      password: "Password",
      enterValidEmail: "Please enter a valid email address",
      passwordMinLength: "Password must be at least 8 characters long",
      loginSuccess: "Login successful!",
      loginFailure: "Failed to login. Please try again.",
      fullName: "Full Name",
      emails: "Email",
      passwords: "Password",
      role: "Role",
      signUp: "SignUp",
      alreadyHaveAccount: "Already have an account?",
      loginss: "Login",
      fullNameError: "Full Name is required",
      emailError: "Please enter a valid email address",
      passwordError: "Password must be at least 8 characters long",
      roleError: "Please select a role",
      registrationSuccess: "Register successfully!",
      registrationError: "Failed to register. Please try again.",
      createProfile: "Create Profile",
      description: "Description",
      skills: "Skills (Comma separated)",
      category: "Category",
      pricing: "Pricing ($)",
      daysToComplete: "Days to Complete",
      companies: "Companies (Comma separated)",
      portfolio: "Portfolio",
      createProfileButton: "Create Profile",
      profileCreatedSuccess: "Profile created successfully!",
      profileCreationFailed: "Failed to create. Please try again.",
      errorDescription: "Description is required",
      errorPricing: "Price is required",
      errorDaysToComplete: "No of days to complete is required",
      postProject: "Post Project",
      projectListing: {
        title: "Project Listings",
        loading: "Loading projects...",
        error: "Failed to load projects",
        confirmDelete: "Are you sure you want to delete this project?",
        viewDetails: "View Details",
        viewBids: "View Bids",
        makePayment: "Make Payment",
        budget: "Budget",
        deadline: "Deadline",
        status: "Status",
      },
      failed_to_load_project_details: "Failed to load project details",
      project_not_found: "Project not found",
      budget: "Budget",
      deadline: "Deadline",
      status: "Status",
      days_to_complete: "Days To Complete",
      tags: "Tags",
      categorys: "Category",
      posted_at: "Posted At",
      loading: "Loading...",
      error: "Failed to fetch project details or bids. Please try again later.",
      noBids: "No bids submitted for this project.",
      freelancerName: "Freelancer Name",
      bidAmount: "Bid Amount ($)",
      deliveryTime: "Delivery Time (Days)",
      statuss: "Status",
      pending: "Pending",
      accepted: "Accepted",
      rejected: "Rejected",
      back: "Back",
      statusUpdated: "Status updated to {{status}}",
      statusUpdateError: "Failed to update status. Please try again.",
      payment: {
        title: "Payment for Project",
        budget: "Budget",
        pay_button: "Pay {{amount}}",
        payment_success: "Payment successful!",
        payment_failed: "Payment failed!",
        error_message: "An error occurred. Please try again.",
        project_not_found: "Project not found",
      },
      projectListings: "Project Listings",
      viewDetails: "View Details",
      submitBid: "Submit Bid",
      budgets: "Budget: ${{budget}}",
      deadlines: "Deadline: {{deadline}}",
      loadingError: "Failed to load projects: {{error}}",
      projectNotFound: "Project not found",
      failedToLoad: "Failed to load project details",
      postedAt: "Posted At",
      projectName: "Project Name",
      clear: "Clear",
      successMessage: "Bid submitted successfully!",
      errorMessage: "Failed to submit bid. Please try again.",
      projectError: "Project ID and Freelancer Name are required.",
      editProject: "Edit Project",
      title: "Title",
      updateProject: "Update Project",
      noCategoriesAvailable: "No categories available",
      viewfreelancerprofile: "View Freelancer Profile",
      noCategories: "No categories available",
      requiredField: "This field is required",
      profiles: "Profiles",
      create_new_profile: "Create New Profile",
      edit_profile: "Edit Profile",
      delete_profile: "Delete Profile",
      confirm_delete: "Are you sure you want to delete this profile?",
      view_details: "View Details",
      edit_profile_button: "Edit Profile",
      no_categories_available: "No categories available",
      submit_bid: "Submit Bid",
      bid_submitted: "Bid Submitted",
      project_name: "Project Name",
      bid_amount: "Bid Amount",
      delivery_time: "Delivery Time (Days)",
      bid_success: "Bid submitted successfully!",
      bid_error: "Failed to submit bid. Please try again.",
      bid_already_submitted: "Bid already submitted for this project.",
      fetchError:
        "Failed to fetch project details or bids. Please try again later.",
      backButton: "Back",
      submitReview: "Submit a Review",
      ratingLabel: "Rating",
      commentsLabel: "Comments",
      submitButton: "Submit",
      freelancerIdError: "Freelancer ID is missing!",
      snackbarMessage: "Your review has been submitted successfully!",
      "reviewListing": {
        "title": "Reviews",
        "rating": "Rating",
        "comments": "Comments",
        "noReviews": "No reviews found.",
        "edit": "Edit",
        "delete": "Delete",
        "confirmDelete": "Are you sure you want to delete this review?",
      },
      "freelancerReviewListing": {
        "title": "Your Reviews",
        "rating": "Rating",
        "comments": "Comments",
        "noReviews": "No reviews found."
      },
      "submitted-bid": "Submitted Bid",
      "my-submitted-bid": "My Submitted Bids",
      "project-name": "Project Name",
      "bid-amount": "Bid Amount ($)",
      "delivery-time": "Delivery Time (Days)",
      "actions": "Actions",
      "sign-contract": "Sign Contract",
      "contract-signed": "Contract Signed!",
      "error-fetch": "Failed to fetch bids or project details. Please try again later.",
      "no-bids-found": "No bids found for this freelancer.",
      "missing-freelancer-id": "Freelancer ID is missing. Please log in again.",
      "contract_details": "Contract Details",
      "terms_and_conditions": "Terms and Conditions",
      "term_1": "The freelancer agrees to deliver the project within the agreed delivery time of {{deliveryTime}} days. Any delay must be communicated and approved by the client in advance.",
      "term_2": "The total payment of ${{bidAmount}} will be made to the freelancer upon successful completion of the project, subject to the client's satisfaction with the deliverables.",
      "term_3": "The freelancer is expected to maintain strict confidentiality regarding the project details and any client-provided resources or materials.",
      "term_4": "Any breach of these terms may result in the termination of the contract and withholding of payment.",
      "term_5": "The freelancer is required to ensure that all deliverables are original and free from plagiarism. The client reserves the right to request revisions if the deliverables do not meet the agreed-upon specifications.",
      "agree_terms": "I agree to the terms and conditions above",
      "digital_signature": "Please provide your digital signature below:",
      "submit_contract": "Submit Contract",
      "contract_submitted": "Contract submitted successfully!",
      "no_bid_data": "No Bid Data Found",
      "errors": "Failed to load project details: ",
      "notFound": "Profile not found",
      "skillss": "Skills",
    },
  },
  es: {
    translation: {
      welcome: "HustleHub",
      login: "Iniciar sesión",
      register: "Registrarse",
      home: "Inicio",
      logout: "Cerrar sesión",
      landingPage: {
        heroTitle: "Bienvenido a HustleHub",
        heroSubtitle:
          "Donde los clientes y los freelancers colaboran sin problemas.",
        whyChoose: "¿Por qué elegir HustleHub?",
        features: {
          postProjects: {
            title: "Publica proyectos fácilmente",
            description:
              "Los clientes pueden listar sus proyectos con las habilidades, los plazos y los presupuestos necesarios en minutos.",
          },
          findFreelancers: {
            title: "Encuentra freelancers calificados",
            description:
              "Los freelancers pueden mostrar su experiencia y conectarse con los proyectos adecuados.",
          },
          securePayments: {
            title: "Pagos seguros",
            description:
              "Administra contratos y pagos de manera eficiente a través de nuestra plataforma segura.",
          },
          reviewsFeedback: {
            title: "Opiniones y comentarios",
            description:
              "Los clientes pueden proporcionar comentarios para ayudar a los freelancers a crecer y garantizar la satisfacción del proyecto.",
          },
        },
        testimonialsTitle: "Lo que dicen nuestros usuarios",
        testimonials: [
          {
            quote:
              "HustleHub me ayudó a encontrar al freelancer perfecto para mi proyecto. ¡El proceso fue perfecto y los resultados excepcionales!",
            author: "- Juan Pérez, Cliente",
          },
          {
            quote:
              "He trabajado en múltiples proyectos a través de HustleHub. La plataforma hace que la colaboración sea fácil y sin estrés.",
            author: "- Ana García, Freelancer",
          },
        ],
        authorsTitle: "Conoce a los autores",
        authors: {
          divya: {
            name: "Divya Prakash",
            specialization: "Especializada en React-Redux",
          },
          priyanka: {
            name: "Priyanka Basavaraj Bhadrappanavar",
            specialization: "Especializada en React-Redux",
          },
          shivani: {
            name: "Shivani Sugurushetty",
            specialization: "Especializada en React-Redux",
          },
          shriya: {
            name: "Shriya Pratapwar",
            specialization: "Especializada en React-Redux",
          },
        },
      },
      footer: {
        copyright: "© {{year}} HustleHub. Todos los derechos reservados.",
        links: {
          about: "Acerca de",
          privacy: "Política de Privacidad",
          contact: "Contacto",
        },
      },
      about_us_title: "Sobre HustleHub",
      about_us_description:
        "HustleHub es una plataforma digital que conecta a clientes y freelancers para trabajar en proyectos sin problemas. Los clientes pueden publicar los requisitos de su proyecto, los plazos y los presupuestos, mientras que los freelancers pueden explorar las publicaciones, mostrar sus habilidades y ser seleccionados para los proyectos deseados.",
      about_us_goal:
        "Nuestro objetivo es crear una experiencia sin complicaciones para clientes y freelancers, ofreciendo herramientas para la gestión de contratos, pagos seguros y revisiones oportunas.",
      mission_title: "Nuestra Misión",
      mission_description:
        "En HustleHub, buscamos revolucionar la forma en que las empresas y los freelancers colaboran. Ofreciendo una plataforma transparente, confiable y eficiente, empoderamos a los clientes para encontrar el mejor talento para sus proyectos, mientras ayudamos a los freelancers a crecer y tener éxito en sus carreras.",
      values_title: "Nuestros Valores",
      values_description:
        "En HustleHub, estamos impulsados por valores fundamentales que guían nuestro enfoque hacia los negocios y la experiencia freelancer-cliente:",
      integrity:
        "Integridad: Creemos en la honestidad y la transparencia en cada paso del proceso.",
      collaboration:
        "Colaboración: Fomentamos un entorno en el que los clientes y los freelancers trabajen juntos hacia objetivos comunes.",
      innovation:
        "Innovación: Mejoramos continuamente nuestra plataforma para proporcionar mejores herramientas y experiencias para nuestros usuarios.",
      respect:
        "Respeto: Valoramos las contribuciones tanto de los clientes como de los freelancers, promoviendo una cultura de respeto mutuo.",
      how_it_works_title: "Cómo Funciona",
      how_it_works_description:
        "HustleHub está diseñado para hacer que todo el flujo de trabajo del proyecto sea fluido y eficiente tanto para clientes como para freelancers:",
      step_1_title: "Paso 1: El Cliente Publica un Proyecto",
      step_1_description:
        "Los clientes pueden publicar fácilmente su proyecto con detalles como las habilidades necesarias, el presupuesto y el plazo.",
      step_2_title: "Paso 2: Freelancer Explora y Ofrece Propuestas",
      step_2_description:
        "Los freelancers exploran las publicaciones de proyectos, revisan los requisitos y envían sus propuestas con una oferta.",
      step_3_title: "Paso 3: El Cliente Revisa las Ofertas",
      step_3_description:
        "Los clientes revisan las ofertas presentadas, evalúan a los freelancers según su experiencia y seleccionan al mejor candidato para el proyecto.",
      step_4_title: "Paso 4: Acuerdo de Contrato",
      step_4_description:
        "Una vez seleccionado un freelancer, se crea un contrato para establecer los términos y expectativas para ambas partes.",
      step_5_title: "Paso 5: Pago y Revisión",
      step_5_description:
        "Después de completar el proyecto, se realiza el pago de forma segura, y tanto el cliente como el freelancer proporcionan comentarios sobre su experiencia.",
      privacy_policy_title: "Política de Privacidad",
      privacy_policy_intro:
        "En HustleHub, tu privacidad es nuestra prioridad. Esta Política de Privacidad describe los tipos de información personal que recopilamos, cómo la usamos y las medidas que tomamos para proteger tus datos. Al usar nuestra plataforma, consientes la recopilación y el uso de tu información como se describe en esta política.",

      section_1_title: "1. Información que Recopilamos",
      section_1_description:
        "Recopilamos diversos tipos de información personal para proporcionar y mejorar nuestros servicios. Esta información puede incluir:",
      personal_information_title: "Información Personal",
      personal_information_description:
        "Nombre, dirección de correo electrónico, número de teléfono y otros detalles que proporcionas al registrarte o utilizar nuestros servicios.",
      usage_information_title: "Información de Uso",
      usage_information_description:
        "Información sobre cómo interactúas con nuestra plataforma, incluidos direcciones IP, tipo de navegador, sistema operativo y las páginas que visitas.",
      transaction_information_title: "Información de Transacción",
      transaction_information_description:
        "Detalles de pago, direcciones de facturación y otra información relacionada con las transacciones al realizar o recibir pagos en la plataforma.",

      section_2_title: "2. Cómo Usamos Tu Información",
      section_2_description:
        "Usamos la información que recopilamos de las siguientes maneras:",
      use_1:
        "Para proporcionar y mantener nuestros servicios, incluyendo permitir que los clientes publiquen proyectos y los freelancers pujen por ellos.",
      use_2:
        "Para mejorar y personalizar la experiencia del usuario en la plataforma.",
      use_3:
        "Para procesar pagos y gestionar los contratos entre clientes y freelancers.",
      use_4:
        "Para comunicarnos con los usuarios sobre actualizaciones, promociones y consultas de soporte al cliente.",
      use_5:
        "Para monitorear y analizar el uso de la plataforma con fines de rendimiento y seguridad.",

      section_3_title: "3. Compartir y Divulgar Datos",
      section_3_description:
        "No vendemos, alquilamos ni compartimos tus datos personales con terceros sin tu consentimiento, excepto en los siguientes casos:",
      service_providers_title: "Proveedores de Servicios",
      service_providers_description:
        "Podemos compartir tus datos con proveedores de servicios de terceros confiables que nos ayudan a ofrecer nuestros servicios, como procesadores de pagos o plataformas de marketing por correo electrónico.",
      legal_requirements_title: "Requisitos Legales",
      legal_requirements_description:
        "Podemos divulgar tu información si se nos requiere por ley o en respuesta a solicitudes válidas de autoridades públicas.",
      business_transfers_title: "Transferencias de Negocios",
      business_transfers_description:
        "En caso de una fusión, adquisición o venta de todos o parte de nuestros activos, tu información puede ser transferida como parte de la transacción.",

      section_4_title: "4. Seguridad de los Datos",
      section_4_description:
        "Nos tomamos la seguridad de tu información personal muy en serio y empleamos medidas de seguridad estándar en la industria para protegerla.",

      section_5_title: "5. Tus Derechos",
      section_5_description:
        "Tienes los siguientes derechos con respecto a tus datos personales:",
      access_right: "Acceso",
      access_right_description:
        "Puedes solicitar acceso a la información personal que tenemos sobre ti.",
      correction_right: "Corrección",
      correction_right_description:
        "Puedes solicitar que corregimos cualquier inexactitud en tu información personal.",
      deletion_right: "Eliminación",
      deletion_right_description:
        "Puedes solicitar que eliminemos tu información personal, sujeto a cualquier obligación legal que podamos tener.",
      opt_out_right: "Exclusión",
      opt_out_right_description:
        "Puedes optar por no recibir comunicaciones de marketing de nuestra parte en cualquier momento.",

      section_6_title: "6. Cookies",
      section_6_description:
        "Usamos cookies y tecnologías similares para mejorar tu experiencia en nuestra plataforma.",

      section_7_title: "7. Enlaces de Terceros",
      section_7_description:
        "Nuestra plataforma puede contener enlaces a sitios web o servicios de terceros que no son operados por nosotros.",

      section_8_title: "8. Cambios a Esta Política de Privacidad",
      section_8_description:
        "Podemos actualizar esta Política de Privacidad de vez en cuando. Cualquier cambio será publicado en esta página con una fecha de revisión actualizada.",
      contact: {
        title: "Póngase en contacto",
        subTitle: "con nosotros!!",
        name: "Nombre",
        email: "Correo electrónico",
        message: "Mensaje",
        welcomeMessage: "¡Estamos encantados de conectar contigo!",
        detailsMessage: "Nuestro sitio web está dedicado a cerrar la brecha entre el talento y las oportunidades, proporcionando una plataforma donde los profesionales cualificados y las empresas pueden colaborar para lograr resultados asombrosos. Ya sea que busques contratar al freelancer perfecto o mostrar tu experiencia a una audiencia global, estamos aquí para hacer que el proceso sea fácil, seguro y exitoso. Si tienes alguna pregunta, sugerencia o simplemente quieres saludar, no dudes en ponerte en contacto con nosotros. ¡Nos encantaría saber de ti!",
        send: "Enviar",
        validation: {
          name: "El nombre debe tener al menos 5 caracteres",
          email: "Por favor ingrese una dirección de correo válida",
          message: "El mensaje debe tener al menos 20 caracteres",
        },
        successMessage: "¡Mensaje enviado con éxito!",
        errorMessage: "Error al enviar el mensaje. Inténtalo de nuevo.",
      },
      logins: "Iniciar sesión",
      email: "Correo electrónico",
      password: "Contraseña",
      enterValidEmail: "Por favor ingrese una dirección de correo válida",
      passwordMinLength: "La contraseña debe tener al menos 8 caracteres",
      loginSuccess: "¡Inicio de sesión exitoso!",
      loginFailure: "Error al iniciar sesión. Inténtalo de nuevo.",
      fullName: "Nombre Completo",
      emails: "Correo Electrónico",
      passwords: "Contraseña",
      role: "Rol",
      signUp: "Registrarse",
      alreadyHaveAccount: "¿Ya tienes una cuenta?",
      loginss: "Iniciar sesión",
      fullNameError: "El nombre completo es obligatorio",
      emailError: "Por favor ingresa una dirección de correo válida",
      passwordError: "La contraseña debe tener al menos 8 caracteres",
      roleError: "Por favor selecciona un rol",
      registrationSuccess: "¡Registro exitoso!",
      registrationError: "Error al registrarse. Por favor intente nuevamente.",
      createProfile: "Crear perfil",
      description: "Descripción",
      skills: "Habilidades (separadas por comas)",
      category: "Categoría",
      pricing: "Precio ($)",
      daysToComplete: "Días para completar",
      companies: "Empresas (separadas por comas)",
      portfolio: "Portafolio",
      createProfileButton: "Crear perfil",
      profileCreatedSuccess: "¡Perfil creado exitosamente!",
      profileCreationFailed: "Falló la creación. Inténtalo de nuevo.",
      errorDescription: "La descripción es obligatoria",
      errorPricing: "El precio es obligatorio",
      errorDaysToComplete: "El número de días para completar es obligatorio",
      postProject: "Publicar Proyecto",
      projectListing: {
        title: "Listado de proyectos",
        loading: "Cargando proyectos...",
        error: "Error al cargar proyectos",
        confirmDelete: "¿Estás seguro de que deseas eliminar este proyecto?",
        viewDetails: "Ver detalles",
        viewBids: "Ver ofertas",
        makePayment: "Realizar pago",
        budget: "Presupuesto",
        deadline: "Fecha límite",
        status: "Estado",
      },
      failed_to_load_project_details:
        "No se pudieron cargar los detalles del proyecto",
      project_not_found: "Proyecto no encontrado",
      budget: "Presupuesto",
      deadline: "Fecha límite",
      status: "Estado",
      days_to_complete: "Días para completar",
      tags: "Etiquetas",
      categorys: "Categoría",
      posted_at: "Publicado en",
      loading: "Cargando...",
      error:
        "Error al obtener los detalles del proyecto o las ofertas. Inténtelo de nuevo más tarde.",
      noBids: "No se han enviado ofertas para este proyecto.",
      freelancerName: "Nombre del Freelancer",
      bidAmount: "Monto de la Oferta ($)",
      deliveryTime: "Tiempo de Entrega (Días)",
      statuss: "Estado",
      pending: "Pendiente",
      accepted: "Aceptado",
      rejected: "Rechazado",
      back: "Volver",
      statusUpdated: "Estado actualizado a {{status}}",
      statusUpdateError: "Error al actualizar el estado. Inténtelo de nuevo.",
      payment: {
        title: "Pago por el Proyecto",
        budget: "Presupuesto",
        pay_button: "Pagar {{amount}}",
        payment_success: "¡Pago exitoso!",
        payment_failed: "¡Pago fallido!",
        error_message: "Ocurrió un error. Por favor, inténtelo de nuevo.",
        project_not_found: "Proyecto no encontrado",
      },
      projectListings: "Listado de proyectos",
      viewDetails: "Ver detalles",
      submitBid: "Enviar oferta",
      budgets: "Presupuesto: ${{budget}}",
      deadlines: "Fecha límite: {{deadline}}",
      loadingError: "Error al cargar proyectos: {{error}}",
      postedAt: "Publicado en",
      projectName: "Nombre del proyecto",
      clear: "Limpiar",
      successMessage: "¡Oferta enviada con éxito!",
      errorMessage: "Error al enviar la oferta. Por favor, inténtelo de nuevo.",
      projectError: "Se requiere ID de proyecto y nombre de freelancer.",
      editProject: "Editar Proyecto",
      title: "Título",
      updateProject: "Actualizar Proyecto",
      noCategoriesAvailable: "No hay categorías disponibles",
      viewfreelancerprofile: "Ver perfil de freelancer",
      noCategories: "No hay categorías disponibles",
      requiredField: "Este campo es obligatorio",
      profiles: "Perfiles",
      create_new_profile: "Crear nuevo perfil",
      edit_profile: "Editar perfil",
      delete_profile: "Eliminar perfil",
      confirm_delete: "¿Estás seguro de que deseas eliminar este perfil?",
      view_details: "Ver detalles",
      edit_profile_button: "Editar perfil",
      no_categories_available: "No hay categorías disponibles",
      submit_bid: "Enviar oferta",
      bid_submitted: "Oferta enviada",
      project_name: "Nombre del proyecto",
      bid_amount: "Monto de la oferta",
      delivery_time: "Tiempo de entrega (días)",
      bid_success: "¡Oferta enviada con éxito!",
      bid_error: "Error al enviar la oferta. Intenta de nuevo.",
      bid_already_submitted: "Ya se ha enviado una oferta para este proyecto.",
      projectNotFound:
        "Falta el ID del proyecto. No se pueden obtener los detalles del proyecto.",
      fetchError:
        "Error al obtener los detalles del proyecto o las ofertas. Por favor, inténtalo de nuevo más tarde.",
      freelancerId: "ID del Freelancer",
      backButton: "Volver",
      "submitReview": "Enviar una reseña",
      "ratingLabel": "Calificación",
      "commentsLabel": "Comentarios",
      "submitButton": "Enviar",
      "freelancerIdError": "¡Falta el ID del freelancer!",
      "snackbarMessage": "¡Tu reseña se ha enviado con éxito!",
      "reviewListing": {
        "title": "Reseñas",
        "rating": "Calificación",
        "comments": "Comentarios",
        "noReviews": "No se encontraron reseñas.",
        "edit": "Editar",
        "delete": "Eliminar",
        "confirmDelete": "¿Estás seguro de que deseas eliminar esta reseña?"
      },
      "freelancerReviewListing": {
        "title": "Tus Reseñas",
        "rating": "Calificación",
        "comments": "Comentarios",
        "noReviews": "No se encontraron reseñas."
      },
      "submitted-bid": "Oferta Enviada",
      "my-submitted-bid": "Mis Ofertas Presentadas",
      "project-name": "Nombre del Proyecto",
      "bid-amount": "Monto de la Oferta ($)",
      "delivery-time": "Tiempo de Entrega (Días)",
      "actions": "Acciones",
      "sign-contract": "Firmar Contrato",
      "contract-signed": "¡Contrato Firmado!",
      "error-fetch": "No se pudo recuperar las ofertas o los detalles del proyecto. Por favor, inténtelo de nuevo más tarde.",
      "no-bids-found": "No se encontraron ofertas para este freelancer.",
      "missing-freelancer-id": "Falta el ID del freelancer. Por favor, inicie sesión nuevamente.",
      "contractDetails": "Detalles del Contrato",
      "noBidDataFound": "No se encontraron datos de ofertas",
      "days": "días",
      "termsAndConditions": "Términos y Condiciones",
      "term1": "El freelancer se compromete a entregar el proyecto dentro del tiempo de entrega acordado de {{deliveryTime}} días. Cualquier retraso debe ser comunicado y aprobado previamente por el cliente.",
      "term2": "El pago total de ${{bidAmount}} se realizará al freelancer tras la finalización exitosa del proyecto, sujeto a la satisfacción del cliente con los entregables.",
      "term3": "Se espera que el freelancer mantenga estricta confidencialidad con respecto a los detalles del proyecto y cualquier recurso o material proporcionado por el cliente.",
      "term4": "Cualquier incumplimiento de estos términos puede resultar en la terminación del contrato y la retención del pago.",
      "term5": "El freelancer debe garantizar que todos los entregables sean originales y estén libres de plagio. El cliente se reserva el derecho de solicitar revisiones si los entregables no cumplen con las especificaciones acordadas.",
      "agreeTerms": "Acepto los términos y condiciones anteriores",
      "digitalSignature": "Por favor, proporcione su firma digital a continuación:",
      "submitContract": "Enviar Contrato",
      "agreeToTermsError": "Debe aceptar los términos y condiciones para continuar.",
      "signatureError": "Por favor, proporcione su firma digital para continuar.",
      "contractSubmitted": "¡Contrato enviado con éxito!",
      "errors": "No se pudo cargar los detalles del proyecto: ",
      "notFound": "Perfil no encontrado",
      "skillss": "Habilidades",
      "previousCompanies": "Empresas Anteriores",
    },
  },
  fr: {
    translation: {
      welcome: "HustleHub",
      login: "Connexion",
      register: "S'inscrire",
      home: "Accueil",
      logout: "Se déconnecter",
      landingPage: {
        heroTitle: "Bienvenue à HustleHub",
        heroSubtitle:
          "Où clients et freelances collaborent en toute simplicité.",
        whyChoose: "Pourquoi choisir HustleHub?",
        features: {
          postProjects: {
            title: "Publiez facilement des projets",
            description:
              "Les clients peuvent répertorier leurs projets avec les compétences, les délais et les budgets requis en quelques minutes.",
          },
          findFreelancers: {
            title: "Trouvez des freelances qualifiés",
            description:
              "Les freelances peuvent mettre en avant leur expertise et se connecter aux bons projets.",
          },
          securePayments: {
            title: "Paiements sécurisés",
            description:
              "Gérez les contrats et les paiements efficacement via notre plateforme sécurisée.",
          },
          reviewsFeedback: {
            title: "Avis et commentaires",
            description:
              "Les clients peuvent fournir des retours pour aider les freelances à progresser et garantir la satisfaction du projet.",
          },
        },
        testimonialsTitle: "Ce que disent nos utilisateurs",
        testimonials: [
          {
            quote:
              "HustleHub m'a aidé à trouver le freelance parfait pour mon projet. Le processus a été fluide et les résultats exceptionnels!",
            author: "- Jean Dupont, Client",
          },
          {
            quote:
              "J'ai travaillé sur plusieurs projets via HustleHub. La plateforme facilite une collaboration sans stress.",
            author: "- Marie Dubois, Freelance",
          },
        ],
        authorsTitle: "Rencontrez les auteurs",
        authors: {
          divya: {
            name: "Divya Prakash",
            specialization: "Spécialisée en React-Redux",
          },
          priyanka: {
            name: "Priyanka Basavaraj Bhadrappanavar",
            specialization: "Spécialisée en React-Redux",
          },
          shivani: {
            name: "Shivani Sugurushetty",
            specialization: "Spécialisée en React-Redux",
          },
          shriya: {
            name: "Shriya Pratapwar",
            specialization: "Spécialisée en React-Redux",
          },
        },
      },
      footer: {
        copyright: "© {{year}} HustleHub. Tous droits réservés.",
        links: {
          about: "À propos",
          privacy: "Politique de Confidentialité",
          contact: "Contact",
        },
      },
      about_us_title: "À propos de HustleHub",
      about_us_description:
        "HustleHub est une plateforme numérique qui connecte les clients et les freelances pour travailler sur des projets en toute fluidité. Les clients peuvent publier leurs exigences de projet, les délais et les budgets, tandis que les freelances peuvent parcourir les annonces, mettre en valeur leurs compétences et être sélectionnés pour leurs projets souhaités.",
      about_us_goal:
        "Notre objectif est de créer une expérience sans tracas pour les clients et les freelances, en offrant des outils pour la gestion des contrats, des paiements sécurisés et des avis en temps voulu.",
      mission_title: "Notre Mission",
      mission_description:
        "Chez HustleHub, nous avons pour objectif de révolutionner la manière dont les entreprises et les freelances collaborent. En offrant une plateforme transparente, fiable et efficace, nous permettons aux clients de trouver les meilleurs talents pour leurs projets, tout en aidant les freelances à grandir et à réussir dans leur carrière.",
      values_title: "Nos Valeurs",
      values_description:
        "Chez HustleHub, nous sommes guidés par des valeurs fondamentales qui orientent notre approche des affaires et de l'expérience client-freelancer :",
      integrity:
        "Intégrité : Nous croyons en l'honnêteté et la transparence à chaque étape du processus.",
      collaboration:
        "Collaboration : Nous favorisons un environnement où clients et freelances travaillent ensemble vers des objectifs communs.",
      innovation:
        "Innovation : Nous améliorons continuellement notre plateforme pour offrir de meilleurs outils et expériences à nos utilisateurs.",
      respect:
        "Respect : Nous valorisons les contributions des clients et des freelances, en promouvant une culture de respect mutuel.",
      how_it_works_title: "Comment Ça Marche",
      how_it_works_description:
        "HustleHub est conçu pour rendre l'ensemble du flux de travail du projet fluide et efficace pour les clients et les freelances :",
      step_1_title: "Étape 1 : Le Client Publie un Projet",
      step_1_description:
        "Les clients peuvent facilement publier leur projet avec des détails tels que les compétences requises, le budget et le délai.",
      step_2_title: "Étape 2 : Le Freelance Explore et Soumet des Candidatures",
      step_2_description:
        "Les freelances explorent les annonces de projets, examinent les exigences et soumettent leurs candidatures avec une proposition.",
      step_3_title: "Étape 3 : Le Client Examine les Candidatures",
      step_3_description:
        "Les clients examinent les candidatures soumises, évaluent les freelances en fonction de leur expertise et sélectionnent le meilleur match pour le projet.",
      step_4_title: "Étape 4 : Accord de Contrat",
      step_4_description:
        "Une fois un freelance sélectionné, un contrat est créé pour définir les termes et attentes des deux parties.",
      step_5_title: "Étape 5 : Paiement et Avis",
      step_5_description:
        "Une fois le projet terminé, le paiement est traité en toute sécurité, et tant le client que le freelance laissent un avis sur leur expérience.",
      privacy_policy_title: "Politique de Confidentialité",
      privacy_policy_intro:
        "Chez HustleHub, votre confidentialité est notre priorité. Cette Politique de Confidentialité décrit les types d'informations personnelles que nous collectons, comment nous les utilisons et les mesures que nous prenons pour protéger vos données. En utilisant notre plateforme, vous consentez à la collecte et à l'utilisation de vos informations comme décrit dans cette politique.",

      section_1_title: "1. Informations que Nous Collectons",
      section_1_description:
        "Nous collectons divers types d'informations personnelles pour fournir et améliorer nos services. Ces informations peuvent inclure:",
      personal_information_title: "Informations Personnelles",
      personal_information_description:
        "Nom, adresse e-mail, numéro de téléphone et autres détails que vous fournissez lors de l'inscription ou de l'utilisation de nos services.",
      usage_information_title: "Informations d'Utilisation",
      usage_information_description:
        "Informations sur la façon dont vous interagissez avec notre plateforme, y compris les adresses IP, le type de navigateur, le système d'exploitation et les pages que vous visitez.",
      transaction_information_title: "Informations sur les Transactions",
      transaction_information_description:
        "Détails de paiement, adresses de facturation et autres informations liées aux transactions lors de l'envoi ou de la réception de paiements sur la plateforme.",

      section_2_title: "2. Comment Nous Utilisons Vos Informations",
      section_2_description:
        "Nous utilisons les informations que nous collectons de la manière suivante:",
      use_1:
        "Pour fournir et maintenir nos services, y compris permettre aux clients de publier des projets et aux freelances de soumettre des propositions.",
      use_2:
        "Pour améliorer et personnaliser l'expérience utilisateur sur la plateforme.",
      use_3:
        "Pour traiter les paiements et gérer les contrats entre clients et freelances.",
      use_4:
        "Pour communiquer avec les utilisateurs concernant les mises à jour, promotions et demandes de support client.",
      use_5:
        "Pour surveiller et analyser l'utilisation de la plateforme à des fins de performance et de sécurité.",

      section_3_title: "3. Partage et Divulgation des Données",
      section_3_description:
        "Nous ne vendons, louons ni partageons vos données personnelles avec des tiers sans votre consentement, sauf dans les cas suivants:",
      service_providers_title: "Fournisseurs de Services",
      service_providers_description:
        "Nous pouvons partager vos données avec des fournisseurs de services tiers de confiance qui nous aident à fournir nos services, tels que des processeurs de paiement ou des plateformes de marketing par e-mail.",
      legal_requirements_title: "Exigences Légales",
      legal_requirements_description:
        "Nous pouvons divulguer vos informations si cela est requis par la loi ou en réponse à des demandes valides d'autorités publiques.",
      business_transfers_title: "Transferts d'Affaires",
      business_transfers_description:
        "En cas de fusion, d'acquisition ou de vente de tout ou partie de nos actifs, vos informations peuvent être transférées dans le cadre de la transaction.",

      section_4_title: "4. Sécurité des Données",
      section_4_description:
        "Nous prenons la sécurité de vos informations personnelles très au sérieux et employons des mesures de sécurité standard dans l'industrie pour les protéger.",

      section_5_title: "5. Vos Droits",
      section_5_description:
        "Vous avez les droits suivants concernant vos données personnelles:",
      access_right: "Accès",
      access_right_description:
        "Vous pouvez demander l'accès aux informations personnelles que nous détenons à votre sujet.",
      correction_right: "Correction",
      correction_right_description:
        "Vous pouvez demander que nous corrigions toute inexactitude dans vos informations personnelles.",
      deletion_right: "Suppression",
      deletion_right_description:
        "Vous pouvez demander que nous supprimions vos informations personnelles, sous réserve de toute obligation légale que nous pourrions avoir.",
      opt_out_right: "Exclusion",
      opt_out_right_description:
        "Vous pouvez choisir de ne pas recevoir de communications marketing de notre part à tout moment.",

      section_6_title: "6. Cookies",
      section_6_description:
        "Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience sur notre plateforme.",

      section_7_title: "7. Liens Tiers",
      section_7_description:
        "Notre plateforme peut contenir des liens vers des sites Web ou des services tiers qui ne sont pas exploités par nous.",

      section_8_title: "8. Modifications de Cette Politique de Confidentialité",
      section_8_description: "Nous pouvons mettre à jour",
      contact: {
        title: "Contactez-nous",
        subTitle: "avec nous !!",
        name: "Nom",
        email: "Email",
        message: "Message",
        welcomeMessage: "Nous sommes ravis de vous connecter!",
        detailsMessage: "Notre site web est dédié à combler le fossé entre le talent et l'opportunité, offrant une plateforme où des professionnels qualifiés et des entreprises peuvent collaborer pour obtenir des résultats impressionnants. Que vous cherchiez à embaucher le freelance idéal ou à mettre en valeur votre expertise auprès d'un public mondial, nous sommes ici pour rendre le processus fluide, sécurisé et réussi. Si vous avez des questions, des suggestions ou si vous souhaitez simplement dire bonjour, n'hésitez pas à nous contacter, nous serions ravis d'avoir de vos nouvelles!",
        send: "Envoyer",
        validation: {
          name: "Le nom doit comporter au moins 5 caractères",
          email: "Veuillez entrer une adresse e-mail valide",
          message: "Le message doit comporter au moins 20 caractères",
        },
        successMessage: "Message envoyé avec succès!",
        errorMessage: "Échec de l'envoi du message. Veuillez réessayer.",
      },
      logins: "Se connecter",
      email: "Email",
      password: "Mot de passe",
      enterValidEmail: "Veuillez entrer une adresse e-mail valide",
      passwordMinLength: "Le mot de passe doit comporter au moins 8 caractères",
      loginSuccess: "Connexion réussie!",
      loginFailure: "Échec de la connexion. Veuillez réessayer.",
      fullName: "Nom Complet",
      emails: "E-mail",
      passwords: "Mot de passe",
      role: "Rôle",
      signUp: "S'inscrire",
      alreadyHaveAccount: "Vous avez déjà un compte?",
      loginss: "Se connecter",
      fullNameError: "Le nom complet est requis",
      emailError: "Veuillez entrer une adresse e-mail valide",
      passwordError: "Le mot de passe doit comporter au moins 8 caractères",
      roleError: "Veuillez sélectionner un rôle",
      registrationSuccess: "Inscription réussie!",
      registrationError: "Échec de l'inscription. Veuillez réessayer.",
      createProfile: "Créer le profil",
      description: "Description",
      skills: "Compétences (séparées par des virgules)",
      category: "Catégorie",
      pricing: "Prix ($)",
      daysToComplete: "Jours pour terminer",
      companies: "Entreprises (séparées par des virgules)",
      portfolio: "Portfolio",
      createProfileButton: "Créer le profil",
      profileCreatedSuccess: "Profil créé avec succès!",
      profileCreationFailed: "Échec de la création. Veuillez réessayer.",
      errorDescription: "La description est obligatoire",
      errorPricing: "Le prix est obligatoire",
      errorDaysToComplete: "Le nombre de jours pour compléter est obligatoire",
      postProject: "Publier un projet",
      projectListing: {
        title: "Liste des projets",
        loading: "Chargement des projets...",
        error: "Échec du chargement des projets",
        confirmDelete: "Êtes-vous sûr de vouloir supprimer ce projet ?",
        viewDetails: "Voir les détails",
        viewBids: "Voir les offres",
        makePayment: "Effectuer le paiement",
        budget: "Budget",
        deadline: "Date limite",
        status: "Statut",
      },
      failed_to_load_project_details:
        "Échec du chargement des détails du projet",
      project_not_found: "Projet non trouvé",
      budget: "Budget",
      deadline: "Date limite",
      status: "Statut",
      days_to_complete: "Jours pour compléter",
      tags: "Étiquettes",
      categorys: "Catégorie",
      posted_at: "Posté le",
      loading: "Chargement...",
      error:
        "Échec de la récupération des détails du projet ou des offres. Veuillez réessayer plus tard.",
      noBids: "Aucune offre soumise pour ce projet.",
      freelancerName: "Nom du Freelancer",
      bidAmount: "Montant de l'offre ($)",
      deliveryTime: "Délai de livraison (Jours)",
      statuss: "Statut",
      pending: "En attente",
      accepted: "Accepté",
      rejected: "Rejeté",
      back: "Retour",
      statusUpdated: "Statut mis à jour sur {{status}}",
      statusUpdateError:
        "Échec de la mise à jour du statut. Veuillez réessayer.",
      payment: {
        title: "Paiement pour le projet",
        budget: "Budget",
        pay_button: "Payer {{amount}}",
        payment_success: "Paiement réussi!",
        payment_failed: "Échec du paiement!",
        error_message: "Une erreur est survenue. Veuillez réessayer.",
        project_not_found: "Projet non trouvé",
      },
      projectListings: "Annonces de projets",
      viewDetails: "Voir les détails",
      submitBid: "Soumettre une offre",
      budgets: "Budget: ${{budget}}",
      deadlines: "Date limite: {{deadline}}",
      loadingError: "Échec du chargement des projets: {{error}}",
      postedAt: "Publié le",
      projectName: "Nom du projet",
      clear: "Effacer",
      successMessage: "Offre soumise avec succès!",
      errorMessage: "Échec de la soumission de l'offre. Veuillez réessayer.",
      projectError: "L'ID du projet et le nom du freelancer sont requis.",
      editProject: "Modifier le projet",
      title: "Titre",
      updateProject: "Mettre à jour le projet",
      noCategoriesAvailable: "Aucune catégorie disponible",
      viewfreelancerprofile: "Voir le profil du freelance",
      noCategories: "Aucune catégorie disponible",
      requiredField: "Ce champ est requis",
      profiles: "Profils",
      create_new_profile: "Créer un nouveau profil",
      edit_profile: "Modifier le profil",
      delete_profile: "Supprimer le profil",
      confirm_delete: "Êtes-vous sûr de vouloir supprimer ce profil ?",
      view_details: "Voir les détails",
      edit_profile_button: "Modifier le profil",
      no_categories_available: "Aucune catégorie disponible",
      submit_bid: "Soumettre une offre",
      bid_submitted: "Offre soumise",
      project_name: "Nom du projet",
      bid_amount: "Montant de l'offre",
      delivery_time: "Délai de livraison (jours)",
      bid_success: "Offre soumise avec succès!",
      bid_error: "Échec de l'envoi de l'offre. Veuillez réessayer.",
      bid_already_submitted: "Offre déjà soumise pour ce projet.",
      projectNotFound:
        "L'ID du projet est manquant. Impossible d'obtenir les détails du projet.",
      fetchError:
        "Échec de la récupération des détails du projet ou des offres. Veuillez réessayer plus tard.",
      freelancerId: "ID du Freelancer",
      backButton: "Retour",
      "submitReview": "Soumettre un avis",
      "ratingLabel": "Évaluation",
      "commentsLabel": "Commentaires",
      "submitButton": "Soumettre",
      "freelancerIdError": "L'ID du freelancer est manquant !",
      "snackbarMessage": "Votre avis a été soumis avec succès !",
      "reviewListing": {
        "title": "Avis",
        "rating": "Évaluation",
        "comments": "Commentaires",
        "noReviews": "Aucun avis trouvé.",
        "edit": "Modifier",
        "delete": "Supprimer",
        "confirmDelete": "Êtes-vous sûr de vouloir supprimer cet avis ?"
      },
      "freelancerReviewListing": {
        "title": "Vos Avis",
        "rating": "Évaluation",
        "comments": "Commentaires",
        "noReviews": "Aucun avis trouvé."
      },
      "submitted-bid": "Offre Soumise",
      "my-submitted-bid": "Mes Offres Soumises",
      "project-name": "Nom du Projet",
      "bid-amount": "Montant de l'Offre ($)",
      "delivery-time": "Délai de Livraison (Jours)",
      "actions": "Actions",
      "sign-contract": "Signer le Contrat",
      "contract-signed": "Contrat Signé !",
      "error-fetch": "Échec de récupération des offres ou des détails du projet. Veuillez réessayer plus tard.",
      "no-bids-found": "Aucune offre trouvée pour ce freelance.",
      "missing-freelancer-id": "L'ID du freelance est manquant. Veuillez vous reconnecter.",
      "contractDetails": "Détails du Contrat",
      "noBidDataFound": "Aucune donnée d'offre trouvée",
      "days": "jours",
      "termsAndConditions": "Termes et Conditions",
      "term1": "Le freelance s'engage à livrer le projet dans le délai convenu de {{deliveryTime}} jours. Tout retard doit être communiqué et approuvé à l'avance par le client.",
      "term2": "Le paiement total de ${{bidAmount}} sera effectué au freelance après l'achèvement réussi du projet, sous réserve de la satisfaction du client vis-à-vis des livrables.",
      "term3": "Le freelance est tenu de maintenir une stricte confidentialité concernant les détails du projet et les ressources ou matériels fournis par le client.",
      "term4": "Toute violation de ces termes peut entraîner la résiliation du contrat et la retenue du paiement.",
      "term5": "Le freelance doit s'assurer que tous les livrables sont originaux et exempts de plagiat. Le client se réserve le droit de demander des révisions si les livrables ne répondent pas aux spécifications convenues.",
      "agreeTerms": "J'accepte les termes et conditions ci-dessus",
      "digitalSignature": "Veuillez fournir votre signature numérique ci-dessous :",
      "submitContract": "Soumettre le Contrat",
      "agreeToTermsError": "Vous devez accepter les termes et conditions pour continuer.",
      "signatureError": "Veuillez fournir votre signature numérique pour continuer.",
      "contractSubmitted": "Contrat soumis avec succès !",
      "previousCompanies": "Entreprises Précédentes",
      "skillss": "Compétences",
      "errors": "Impossible de charger les détails du projet : ",
    },
  },
};

i18n
  .use(LanguageDetector) // Automatically detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: "en", // Default language if none is detected
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
