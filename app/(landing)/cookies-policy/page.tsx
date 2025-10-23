import { Metadata } from "next";

import { LegalShell } from "@/presentation/components/ui/legal/legal-shell";

const UPDATED_AT = "2025-01-20";

export const metadata: Metadata = {
  title: "Política de cookies | Porraza",
  description:
    "Información transparente sobre las cookies utilizadas por Porraza, el consentimiento y cómo gestionarlas desde tu navegador.",
};

const googleAnalyticsCookies = [
  {
    name: "_ga",
    purpose:
      "Diferenciar usuarios únicos asignando un identificador aleatorio. No permite identificarte personalmente.",
    duration: "2 años",
  },
  {
    name: "_ga_*",
    purpose:
      "Mantener el estado de la sesión para funciones analíticas avanzadas.",
    duration: "1 año",
  },
];

export default function CookiesPolicyPage() {
  return (
    <LegalShell
      title="Política de cookies"
      description="Utilizamos cookies mínimas y transparentes. Aquí te contamos cuáles son, por qué las usamos y cómo puedes gestionarlas."
      updatedAt={UPDATED_AT}
    >
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          1. ¿Qué son las cookies?
        </h2>
        <p>
          Las cookies son pequeños archivos de texto que se instalan en tu
          navegador cuando visitas determinadas páginas web. Sirven para
          recordar información sobre la navegación o tus preferencias y facilitan
          el uso y funcionamiento del sitio.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          2. Tipos de cookies que utilizamos
        </h2>
        <p>Porraza emplea únicamente las siguientes categorías:</p>
        <ul className="space-y-1">
          <li>
            <strong className="text-foreground">Cookies técnicas:</strong> son
            imprescindibles para que el sitio funcione correctamente (gestión de
            sesión, control de consentimientos). Se instalan siempre y no pueden
            desactivarse.
          </li>
          <li>
            <strong className="text-foreground">Cookies analíticas:</strong> nos
            permiten medir el rendimiento del sitio y entender cómo se utiliza
            para seguir mejorándolo. Solo se activan si consientes su uso.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          3. Cookies de Google Analytics
        </h2>
        <p>
          Únicamente utilizamos Google Analytics para obtener estadísticas de
          uso agregadas y anónimas. Google no recibe información que permita
          identificarte personalmente desde Porraza.
        </p>
        <div className="overflow-hidden rounded-lg border border-border/70">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-muted/40 text-muted-foreground/80">
              <tr>
                <th className="px-4 py-3 font-semibold text-foreground">
                  Cookie
                </th>
                <th className="px-4 py-3 font-semibold text-foreground">
                  Finalidad
                </th>
                <th className="px-4 py-3 font-semibold text-foreground">
                  Duración
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {googleAnalyticsCookies.map((cookie) => (
                <tr key={cookie.name} className="align-top">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {cookie.name}
                  </td>
                  <td className="px-4 py-3">{cookie.purpose}</td>
                  <td className="px-4 py-3">{cookie.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Google puede alojar los datos en servidores ubicados fuera del Espacio
          Económico Europeo. En esos casos aplica las cláusulas contractuales
          tipo aprobadas por la Comisión Europea. Puedes ampliar información en
          la{" "}
          <a
            className="text-primary underline-offset-4 hover:underline"
            href="https://policies.google.com/privacy"
            rel="noopener noreferrer"
          >
            política de privacidad de Google
          </a>{" "}
          y en la{" "}
          <a
            className="text-primary underline-offset-4 hover:underline"
            href="https://support.google.com/analytics/answer/6004245"
            rel="noopener noreferrer"
          >
            documentación de Analytics
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          4. Gestión del consentimiento
        </h2>
        <p>
          Mostramos un banner de consentimiento en la primera visita. Las
          cookies analíticas solo se instalan cuando aceptas su uso. Puedes
          modificar o retirar tu consentimiento en cualquier momento desde el
          propio banner o borrando las cookies almacenadas en tu navegador.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          5. ¿Cómo desactivar las cookies?
        </h2>
        <p>
          Puedes deshabilitar o eliminar las cookies en cualquier momento desde
          la configuración de tu navegador. Estos recursos te sirven de guía:
        </p>
        <ul className="space-y-1">
          <li>
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="https://support.google.com/chrome/answer/95647?hl=es"
              rel="noopener noreferrer"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="https://support.mozilla.org/es/kb/Borrar%20cookies"
              rel="noopener noreferrer"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
              rel="noopener noreferrer"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
              rel="noopener noreferrer"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>
        <p>
          Además, Google ofrece un complemento de inhabilitación para navegadores
          que impide que Analytics utilice tus datos:{" "}
          <a
            className="text-primary underline-offset-4 hover:underline"
            href="https://tools.google.com/dlpage/gaoptout"
            rel="noopener noreferrer"
          >
            https://tools.google.com/dlpage/gaoptout
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          6. Actualizaciones
        </h2>
        <p>
          Podemos actualizar esta política para reflejar cambios normativos o
          funcionales. Publicaremos cualquier modificación relevante con aviso
          previo razonable.
        </p>
        <p>
          Si tienes dudas adicionales, contacta con nosotros en{" "}
          <a
            className="text-primary underline-offset-4 hover:underline"
            href="mailto:contacto@porraza.com"
          >
            contacto@porraza.com
          </a>{" "}
          o llama al +34 667 80 99 50.
        </p>
      </section>
    </LegalShell>
  );
}
