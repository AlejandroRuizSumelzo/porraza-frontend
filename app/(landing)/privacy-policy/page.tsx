import { Metadata } from "next";

import { LegalShell } from "@/presentation/components/ui/legal/legal-shell";

const UPDATED_AT = "2025-01-20";

export const metadata: Metadata = {
  title: "Política de privacidad | Porraza",
  description:
    "Conoce cómo Porraza trata los datos personales, las finalidades, la base legal y tus derechos como persona usuaria.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      title="Política de privacidad"
      description="En esta política te explicamos de forma transparente cómo tratamos tus datos personales cuando utilizas Porraza."
      updatedAt={UPDATED_AT}
    >
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          1. Responsable del tratamiento
        </h2>
        <p>
          Hector García Fernández (en adelante, “Porraza”), trabajador
          autónomo, es el responsable del tratamiento de los datos personales
          recopilados a través del sitio web.
        </p>
        <ul className="space-y-1">
          <li>
            <strong className="text-foreground">Domicilio:</strong> 50011
            Miralbueno, Zaragoza, España.
          </li>
          <li>
            <strong className="text-foreground">Correo electrónico:</strong>{" "}
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="mailto:contacto@porraza.com"
            >
              contacto@porraza.com
            </a>
          </li>
          <li>
            <strong className="text-foreground">Teléfono:</strong> +34 667 80 99
            50
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          2. Datos que tratamos
        </h2>
        <p>
          Tratamos únicamente la información necesaria para prestar nuestros
          servicios y mejorar la experiencia de uso:
        </p>
        <ul className="space-y-1">
          <li>
            Datos identificativos y de contacto facilitados al crear una cuenta
            o al interactuar con nosotros (nombre, email, teléfono).
          </li>
          <li>
            Información de uso imprescindible para operar la plataforma (por
            ejemplo, preferencias de liga o estadísticas de participación).
          </li>
          <li>
            Datos analíticos agregados y anónimos obtenidos mediante Google
            Analytics, que nos ayudan a mejorar el sitio web.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          3. Finalidades y base legitimadora
        </h2>
        <p>Utilizamos tus datos para los siguientes fines legítimos:</p>
        <ul className="space-y-1">
          <li>
            Gestionar tu registro y el acceso a la plataforma (ejecución del
            contrato).
          </li>
          <li>
            Prestar soporte y comunicarnos contigo sobre el servicio (interés
            legítimo y, cuando proceda, tu consentimiento).
          </li>
          <li>
            Analizar el uso del sitio mediante Google Analytics para mejorar la
            experiencia de usuario (consentimiento, a través del banner de
            cookies).
          </li>
          <li>
            Cumplir con obligaciones legales y prevenir actividades ilícitas u
            operaciones fraudulentas (obligación legal e interés legítimo).
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          4. Conservación de los datos
        </h2>
        <p>
          Conservaremos tus datos mientras mantengas tu cuenta activa o sea
          necesario para prestarte el servicio. Una vez solicites la eliminación
          o cierre de tu cuenta, bloquearemos la información y la conservaremos
          únicamente durante los plazos exigidos por la legislación vigente.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          5. Destinatarios y encargados
        </h2>
        <p>
          No vendemos tus datos. Solo los compartimos con proveedores que nos
          ayudan a operar el servicio y que ofrecen garantías adecuadas:
        </p>
        <ul className="space-y-1">
          <li>
            Google Ireland Ltd. (Google Analytics) para analítica web. El
            tratamiento se realiza dentro del Espacio Económico Europeo cuando
            es posible, y en su defecto se aplican las cláusulas contractuales
            tipo aprobadas por la Comisión Europea.
          </li>
          <li>
            Servicios de infraestructura o herramientas estrictamente
            necesarios, siempre bajo contratos de encargo de tratamiento y con
            medidas de seguridad equivalentes.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          6. Tus derechos
        </h2>
        <p>
          Puedes ejercer en cualquier momento los derechos que te reconoce la
          normativa (Reglamento (UE) 2016/679 y Ley Orgánica 3/2018):
        </p>
        <ul className="space-y-1">
          <li>Acceso a tus datos personales.</li>
          <li>Rectificación de información inexacta o incompleta.</li>
          <li>Supresión (derecho al olvido) cuando los datos ya no sean necesarios.</li>
          <li>
            Limitación u oposición al tratamiento en situaciones concretas.
          </li>
          <li>
            Portabilidad de los datos cuando la base jurídica sea contractual o
            el consentimiento.
          </li>
          <li>
            Revocación del consentimiento en cualquier momento, sin efectos
            retroactivos.
          </li>
        </ul>
        <p>
          También puedes presentar una reclamación ante la Agencia Española de
          Protección de Datos si consideras que se ha vulnerado tu derecho a la
          protección de datos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          7. Ejercicio de derechos
        </h2>
        <p>
          Para ejercer tus derechos o plantear consultas sobre privacidad, escribe a{" "}
          <a
            className="text-primary underline-offset-4 hover:underline"
            href="mailto:contacto@porraza.com"
          >
            contacto@porraza.com
          </a>{" "}
          o llama al +34 667 80 99 50. Para tramitar tus solicitudes, podrá
          pedirse que acredites tu identidad.
        </p>
      </section>
    </LegalShell>
  );
}
