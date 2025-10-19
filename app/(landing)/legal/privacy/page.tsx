import Link from "next/link";
import { Button } from "@/presentation/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 border-b">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Porraza
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Política de Privacidad
        </h1>

        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            Última actualización: {new Date().toLocaleDateString("es-ES")}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introducción
            </h2>
            <p className="text-gray-700 leading-relaxed">
              En Porraza, nos comprometemos a proteger tu privacidad. Esta
              política describe cómo recopilamos, usamos y protegemos tu
              información personal.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Información que Recopilamos
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Recopilamos información que nos proporcionas directamente:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Nombre y datos de contacto</li>
              <li>Información de la cuenta</li>
              <li>Datos de uso de la plataforma</li>
              <li>Información de pago (procesada de forma segura)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Uso de la Información
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Utilizamos tu información para proporcionar y mejorar nuestros
              servicios, procesar transacciones, comunicarnos contigo y
              garantizar la seguridad de la plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Protección de Datos
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas para
              proteger tus datos personales contra accesos no autorizados,
              pérdida o alteración.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Tus Derechos
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tienes derecho a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Acceder a tus datos personales</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Portabilidad de tus datos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Contacto
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Si tienes preguntas sobre esta política de privacidad, contáctanos
              en: privacy@porraza.com
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              © 2025 Porraza. Todos los derechos reservados.
            </div>
            <div className="flex gap-6">
              <Link
                href="/legal/privacy"
                className="text-gray-600 hover:text-gray-900"
              >
                Privacidad
              </Link>
              <Link
                href="/legal/terms"
                className="text-gray-600 hover:text-gray-900"
              >
                Términos
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
