import { Metadata } from "next";

import { LegalShell } from "@/presentation/components/ui/legal/legal-shell";

const UPDATED_AT = "2025-01-20";

export const metadata: Metadata = {
  title: "Aviso legal | Porraza",
  description:
    "Información corporativa básica de Porraza, condiciones de uso del sitio web y derechos de propiedad intelectual.",
};

export default function LegalAdvisePage() {
  return (
    <LegalShell
      title="Aviso legal"
      description="Condiciones generales que regulan el acceso y uso del sitio web porraza.com por parte de las personas usuarias."
      updatedAt={UPDATED_AT}
    >
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          1. Identidad del titular
        </h2>
        <p>
          De conformidad con la Ley 34/2002, de 11 de julio, de servicios de la
          sociedad de la información y comercio electrónico (LSSI), se informa
          que el presente sitio web es titularidad de:
        </p>
        <ul className="space-y-1">
          <li>
            <strong className="text-foreground">Titular:</strong> Hector García
            Fernández, trabajador autónomo.
          </li>
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
            .
          </li>
          <li>
            <strong className="text-foreground">Teléfono:</strong> +34 667 80 99
            50.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          2. Objeto
        </h2>
        <p>
          Este aviso legal regula las condiciones de acceso y uso del sitio web
          porraza.com (en adelante, el “Sitio”), cuya finalidad es ofrecer
          información y servicios relacionados con la plataforma Porraza.
        </p>
        <p>
          El acceso al Sitio atribuye la condición de persona usuaria e implica
          la aceptación plena y sin reservas de todas las condiciones incluidas
          en este aviso legal en el momento de dicho acceso.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          3. Condiciones de uso
        </h2>
        <ul className="space-y-1">
          <li>
            Te comprometes a hacer un uso diligente y lícito del Sitio,
            respetando la legislación vigente y la buena fe.
          </li>
          <li>
            Queda prohibida cualquier actuación que pueda provocar daños o
            alteraciones en los sistemas del Sitio o dificultar su
            funcionamiento.
          </li>
          <li>
            Nos reservamos el derecho a denegar o retirar el acceso al Sitio a
            las personas usuarias que incumplan estas condiciones, sin necesidad
            de aviso previo.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          4. Propiedad intelectual e industrial
        </h2>
        <p>
          Todos los contenidos del Sitio (textos, imágenes, logotipos, diseños,
          código fuente, software, etc.) están protegidos por derechos de
          propiedad intelectual e industrial titularidad de Porraza o de terceros
          autorizados. El acceso al Sitio no supone la cesión de dichos
          derechos.
        </p>
        <p>
          Se prohíbe la reproducción, distribución, comunicación pública,
          transformación o cualquier otra forma de explotación de los contenidos
          sin autorización previa y expresa del titular.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          5. Enlaces externos
        </h2>
        <p>
          El Sitio puede contener enlaces a sitios web de terceros. Porraza no
          se hace responsable de los contenidos ni de las políticas de dichos
          sitios, siendo la persona usuaria quien accede a ellos bajo su propia
          responsabilidad.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          6. Responsabilidad
        </h2>
        <p>
          Porraza no garantiza la disponibilidad ininterrumpida del Sitio ni se
          responsabiliza de los daños que puedan derivarse de interferencias,
          interrupciones, virus informáticos o desconexiones ajenas a nuestra
          voluntad. Trabajamos para mantener la seguridad y el correcto
          funcionamiento en todo momento.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          7. Protección de datos personales
        </h2>
        <p>
          El tratamiento de los datos personales que recogemos a través del
          Sitio se rige por nuestra{" "}
          <a
            className="text-primary underline-offset-4 hover:underline"
            href="/privacy-policy"
          >
            política de privacidad
          </a>
          , que complementa este aviso legal.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          8. Legislación aplicable y jurisdicción
        </h2>
        <p>
          La relación entre Porraza y la persona usuaria se rige por la
          normativa española vigente. Para la resolución de cualquier conflicto,
          las partes se someten a los juzgados y tribunales de Zaragoza, salvo
          que la normativa de protección de consumidores y usuarios determine
          otro fuero imperativo.
        </p>
      </section>
    </LegalShell>
  );
}
